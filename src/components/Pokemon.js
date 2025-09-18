import { searchInfo } from "../services/searchInfo";
import { useState, useEffect, useCallback, useMemo } from "react";
import './PokemonSkeleton.css';
import Buttons from "./Buttons";
import Grid from "./Grid";
import { useContextInfo } from "../context/Context";
import SearchBar from "./SearchBar";

function Pokemon() {
  const { info, setInfo } = useContextInfo();
  const [page, setPage] = useState(1);
  const [elements, setElements] = useState(10);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoize getPoke to avoid recreation on every render
  const getPoke = useCallback(async (url) => {
    setLoading(true);
    setError(null);
    try {
      const response = await searchInfo(url);
      if (response && response.results) {
        setInfo(response.results);
      } else {
        setInfo([]);
        setError("No results found in API response.");
      }
    } catch (err) {
      setError("Failed to fetch Pokémon list.");
      setInfo([]);
    } finally {
      setLoading(false);
    }
  }, [setInfo]);

  useEffect(() => {
    getPoke("https://pokeapi.co/api/v2/pokemon?limit=1118");
  }, [getPoke]);


  const infolen = useMemo(() => (suggestions.length !== 0 ? suggestions.length : info.length), [suggestions, info]);

  if (loading) return (
    <div className="Pokemon flex-center">
      <div className="pokemon-skeleton-grid">
        {Array.from({ length: 10 }).map((_, i) => (
          <div className="pokemon-skeleton-card" key={i} />
        ))}
      </div>
    </div>
  );
  if (error) return <div className="Pokemon flex-center"><p style={{color:'red'}}>{error}</p></div>;

  return (
    <div className="Pokemon flex-center">
      <div className="buttons">
        <Buttons
          page={page}
          setPage={setPage}
          infolen={infolen}
          elements={elements}
          setElements={setElements}
        />
      </div>
      <SearchBar
        suggestions={suggestions}
        setSuggestions={setSuggestions}
        setPage={setPage}
      />
      <Grid page={page} elements={elements} suggestions={suggestions} />
    </div>
  );
}

export default Pokemon;
