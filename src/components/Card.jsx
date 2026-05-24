import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useHistory } from "react-router-dom";
import { useContextInfo } from "../context/Context";

function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function Card(props) {
  const [details, setDetails] = useState([]);
  const [img, setImg] = useState("");
  let history = useHistory();
  const { types } = useContextInfo();

  async function fetcher(url) {
    const result = await fetch(url).then((result) => {
      if (result.ok) {
        return result.json();
      } else {
        return result.message;
      }
    });

    return result;
  }

  useEffect(() => {
    async function fun() {
      fetcher(props.pokemon.url)
        .then((data) => {
          setDetails(data);
          setImg(data.sprites.front_default);
        })
        .catch((err) => {
          alert(err);
        });
    }
    fun();
  }, [props.info, props.pokemon]);

  function onClickHandler(i) {
    history.push(`/Pokemon/${i}`);
  }

  const [hovered, setHovered] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const cardRef = useRef(null);

  // On mouse enter, get bounding rect for portal positioning
  const handleMouseEnter = (e) => {
    setHovered(true);
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setCoords({
        top: rect.top + window.scrollY + 10,
        left: rect.right + window.scrollX + 10,
      });
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  // Portal target
  let portalRoot = document.getElementById("overlay-root");
  if (!portalRoot) {
    portalRoot = document.createElement("div");
    portalRoot.id = "overlay-root";
    document.body.appendChild(portalRoot);
  }

  return (
    <div
      className="Card flex-center flex-column hover-effect card-hover-group"
      ref={cardRef}
      onClick={() => {
        onClickHandler(details.id);
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {img && <img src={img} alt={capitalize(props.pokemon.name)} />}
      <div>{capitalize(props.pokemon.name)}</div>
      <div className="types">
        {img &&
          details.types.map((x, i) => {
            return (
              <div className={`type ${x.type.name}`} key={i}>
                {capitalize(x.type.name)}
              </div>
            );
          })}
      </div>
      {img &&
        hovered &&
        createPortal(
          <div
            className="stats-float"
            style={{
              display: "flex",
              position: "absolute",
              top: coords.top,
              left: coords.left,
              zIndex: 99999,
            }}
          >
            <div className="stat-hp">Hp: {details.stats[0].base_stat}</div>
            <div className="stat-atk">Atk: {details.stats[1].base_stat}</div>
            <div className="stat-def">Def: {details.stats[2].base_stat}</div>
            <div className="stat-spatk">
              Sp. Atk: {details.stats[3].base_stat}
            </div>
            <div className="stat-spdef">
              Sp. Def: {details.stats[4].base_stat}
            </div>
            <div className="stat-spd">Spd: {details.stats[5].base_stat}</div>
          </div>,
          portalRoot,
        )}
    </div>
  );
}

export default Card;
