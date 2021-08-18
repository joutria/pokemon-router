import { useEffect, useState } from "react";
import Card from "./Card";
import { useContextInfo } from "../context/Context";

function Grid(props) {
  const { info } = useContextInfo();
  const [x, setX] = useState(info);

  useEffect(() => {
    if (props.suggestions.length === 0) {
      setX(info);
    } else {
      setX(props.suggestions);
    }
  }, [info, props.suggestions]);

  return (
    <div className="Grid">
      {x.map((obj, i) => {
        if (
          i >= (props.page - 1) * props.elements &&
          i < props.page * props.elements
        ) {
          return <Card pokemon={obj} key={i} />;
        } else {
          return '';
        }
      })}
    </div>
  );
}

export default Grid;
