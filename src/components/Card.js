import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useContextInfo } from "../context/Context";


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

  return (
    <div
      className="Card flex-center flex-column hover-effect"
      onClick={() => {
        onClickHandler(details.id);
      }}
    >
      {img && <img src={img} alt={props.pokemon.name} />}
      <div>{props.pokemon.name}</div>
      <div className="types">
        {img &&
          details.types.map((x, i) => {
            return (
              <div
                className="type"
                style={{ background: `${types[x.type.name]}` }}
                key={i}
              >
                {x.type.name}
              </div>
            );
          })}
      </div>
      {img && (
        <div className="stats">
          <div>Hp: {details.stats[0].base_stat}</div>
          <div>Atk: {details.stats[1].base_stat}</div>
          <div>Def: {details.stats[2].base_stat}</div>
          <div>Sp. Atk: {details.stats[3].base_stat}</div>
          <div>Sp. Def: {details.stats[4].base_stat}</div>
          <div>Spd: {details.stats[5].base_stat}</div>
        </div>
      )}
    </div>
  );
}

export default Card;
