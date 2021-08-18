import { searchInfo } from "../services/searchInfo";
import { useState, useEffect } from "react";
import Buttons from "./Buttons";
import Grid from "./Grid";
import { useContextInfo } from "../context/Context";
import SearchBar from "./SearchBar";

function Pokemon() {
  const {info, setInfo} = useContextInfo();
  // number of the page shown
  const [page, setPage] = useState(1);
  const [elements, setElements] = useState(12);
  // list with suggestions
  const [suggestions, setSuggestions] = useState([]);

  async function getPoke(url) {
    searchInfo(url).then((response) => {
      setInfo(response.results);
    });
  }

  useEffect(() => {
    getPoke("https://pokeapi.co/api/v2/pokemon?limit=1118");
  }, []);

  return (
    <div className="Pokemon flex-center">
      <div className="buttons">
        <Buttons page={page} setPage={setPage} infolen={suggestions.length!=0?suggestions.length:info.length} elements={elements} setElements={setElements}/>
      </div>
      <SearchBar suggestions={suggestions} setSuggestions={setSuggestions} setPage={setPage}/>
      <Grid page={page} elements={elements} suggestions={suggestions}/>
    </div>
  );
}

export default Pokemon;
