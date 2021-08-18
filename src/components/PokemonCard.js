import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContextInfo } from "../context/Context";

export default function PokemonCard() {
  let { pokeID } = useParams();
  const [details, setDetails] = useState([]);
  const [img, setImg] = useState("");
  const { types } = useContextInfo();

  async function getDetails() {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeID}`)
      .then((response) => response.json())
      .then((data) => {
        setDetails(data);
        setImg(
          data.sprites.other.dream_world.front_default
            ? data.sprites.other.dream_world.front_default
            : data.sprites.front_default
        );
      });
  }

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <>
      {img && (
        <div
          className="PokemonCard"
          style={{ background: `${types[details.types[0].type.name]}` }}
        >
          <div className="inner">{img && <img src={img} />}</div>
          {details && <h2>{details.name}</h2>}
          <div className="types-card flex-center flex-column">
            {img && (
              <>
                <div className="name">{details.name} #{details.id}</div>
                <div className="type-list flex-center">
                  {details.types.map((x, i) => {
                    return (
                      <div
                        className="type hover-effect"
                        style={{ background: `${types[x.type.name]}` }}
                        key={i}
                      >
                        {x.type.name}
                      </div>
                    );
                  })}
                </div>
                <div className="stats stat-card flex-center">
                  <div>Hp: {details.stats[0].base_stat}</div>
                  <div>Atk: {details.stats[1].base_stat}</div>
                  <div>Def: {details.stats[2].base_stat}</div>
                  <div>Sp. Atk: {details.stats[3].base_stat}</div>
                  <div>Sp. Def: {details.stats[4].base_stat}</div>
                  <div>Spd: {details.stats[5].base_stat}</div>
                </div>
                <div className="characteristics">
                  <div>Height: {details.height}</div>
                  <div>Weight: {details.weight / 10} Kg</div>
                </div>
              </>
            )}
          </div>
          <div className="others">
            <h3>Moves</h3>
            <div className="moves flex-column">
              {details.moves.map((x, i) => {
                return <div key={i}>{x.move.name}</div>;
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
