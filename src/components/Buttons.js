import { useState, useEffect } from "react";

function Buttons(props) {
  // number of buttons for the pages
  const [buttons, setButtons] = useState([]);
  const [rowOptions, setRowOptions] = useState([props.elements]);

  // Dynamically calculate N (cards per row) and set options
  useEffect(() => {
    function updateOptions() {
      const grid = document.querySelector(".Grid");
      let gridWidth = grid ? grid.offsetWidth : window.innerWidth * 0.7;
      const cardWidth = 180;
      const N = Math.max(1, Math.floor(gridWidth / cardWidth));
      const options = [N, 2 * N, 3 * N, 4 * N, 5 * N].filter(
        (v, i, arr) => arr.indexOf(v) === i,
      );
      setRowOptions(options);
      // If current elements is not in new options, update it
      if (!options.includes(props.elements)) {
        props.setElements(options[0]);
      }
    }
    updateOptions();
    window.addEventListener("resize", updateOptions);
    return () => window.removeEventListener("resize", updateOptions);
  }, [props.elements, props.setElements]);

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
            props.setElements(Number(e.target.value));
          }}
        >
          {rowOptions.map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      )}
    </>
  );
}

export default Buttons;
