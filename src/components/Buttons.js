import { useState, useEffect } from "react";

function Buttons(props) {
  // number of buttons for the pages
  const [buttons, setButtons] = useState([]);

  // effect to assign the number of pages per location
  useEffect(() => {
    if (props.infolen) {
      let x = new Array(Math.ceil(props.infolen / props.elements))
        .fill()
        .map((item, index) => {
          item = index + 1;
          return item;
        });
      setButtons(x);
    }
  }, [props.infolen, props.elements]);

  // function to update page
  const pageHandler = (value) => {
    props.setPage(value);
  };

  return (
    <>
      {buttons.map((item, index) => {
        if (index >= props.page - 5 && index <= props.page + 3) {
          return (
            <button
              className="hover-effect"
              onClick={(e) => {
                pageHandler(item);
              }}
              key={index}
              style={
                index === props.page - 1
                  ? { background: "rgba(255,255,255,0.5)" }
                  : { background: "rgba(0,175,255,0.5)" }
              }
            >
              {item}
            </button>
          );
        } else {
          return "";
        }
      })}
      {buttons.length > 0 && (
        <select
          value={props.elements}
          onChange={(e) => {
            props.setElements(e.target.value);
          }}
        >
          <option>4</option>
          <option>8</option>
          <option>12</option>
          <option>16</option>
        </select>
      )}
    </>
  );
}

export default Buttons;
