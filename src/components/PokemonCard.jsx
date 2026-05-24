import { useEffect, useState, useMemo, useCallback } from "react";
import './PokemonSkeleton.css';
import { useParams } from "react-router-dom";
import { useContextInfo } from "../context/Context";

const capitalize = (str) => (str ? str.charAt(0).toUpperCase() + str.slice(1) : "");

export default function PokemonCard() {
  let { pokeID } = useParams();
  const [details, setDetails] = useState([]);
  const [img, setImg] = useState("");
  const { types } = useContextInfo();
  // Collapsible moves state
  const [movesOpen, setMovesOpen] = useState(false);

  const getDetails = useCallback(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeID}`)
      .then((response) => response.json())
      .then((data) => {
        setDetails(data);
        setImg(
          data.sprites.other.dream_world.front_default
            ? data.sprites.other.dream_world.front_default
            : data.sprites.front_default,
        );
      });
  }, [pokeID]);

  useEffect(() => {
    getDetails();
  }, [getDetails]);

  // Memoize stat names and moves for performance
  const statNames = useMemo(() => [
    { key: "hp", label: "Hp" },
    { key: "atk", label: "Atk" },
    { key: "def", label: "Def" },
    { key: "spatk", label: "Sp. Atk" },
    { key: "spdef", label: "Sp. Def" },
    { key: "spd", label: "Spd" },
  ], []);

  const movesList = useMemo(() =>
    details.moves ? details.moves.map((x, i) => <div key={i}>{capitalize(x.move.name)}</div>) : [],
    [details.moves]
  );

  const handleToggleMoves = useCallback(() => setMovesOpen(open => !open), []);

  if (!img) {
    return (
      <div className="PokemonCard pokemoncard-skeleton">
        <div className="skeleton-img" />
        <div className="skeleton-title" />
        <div className="skeleton-types" />
        <div className="skeleton-stats" />
      </div>
    );
  }
  return (
    <>
      <div
        className="PokemonCard"
        style={{ background: details.types && details.types[0] ? types[details.types[0].type.name] : undefined }}
      >
  <div className="inner">{img && <img src={img} alt={details.name ? capitalize(details.name) : "Pokémon image"} />}</div>
        {details && <h2>{capitalize(details.name)}</h2>}
        <div className="types-card flex-center flex-column">
          {img && (
            <>
              <div className="name">
                {capitalize(details.name)} #{details.id}
              </div>
              <div className="type-list flex-center">
                {details.types && details.types.map((x, i) => (
                  <div className={`type ${x.type.name}`} key={i}>
                    {capitalize(x.type.name)}
                  </div>
                ))}
              </div>
              <div className="stats stat-card-col">
                {details.stats && details.stats.map((stat, idx) => {
                  const name = statNames[idx]?.key || "stat";
                  const label = statNames[idx]?.label || stat.stat.name;
                  const value = stat.base_stat;
                  const max = 200;
                  const percent = Math.max(10, Math.min(100, (value / max) * 100));
                  return (
                    <div
                      key={name}
                      className={`stat-${name} stat-bar-container`}
                    >
                      <span className="stat-label">
                        {label}: {value}
                      </span>
                      <div
                        className="stat-bar"
                        style={{ width: percent + "%" }}
                      ></div>
                    </div>
                  );
                })}
              </div>
              <div className="characteristics">
                <div>Height: {details.height}</div>
                <div>Weight: {details.weight / 10} Kg</div>
              </div>
            </>
          )}
        </div>
        <div className="others">
          <h3
            className="moves-toggle"
            onClick={handleToggleMoves}
          >
            Moves {movesOpen ? "▲" : "▼"}
          </h3>
          <div className={`moves flex-column${movesOpen ? " open" : ""}`}>
            {movesOpen && movesList}
          </div>
        </div>
      </div>
    </>
  );
}
