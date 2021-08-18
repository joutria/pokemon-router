import createReactContext from "create-react-context";
import { useState, useMemo, useContext } from "react";


const Context = createReactContext();

export function ContextProvider(props) {
  //auth toggler
  const [isAuth, setIsAuth] = useState(false);
  //username from form
  const [user, setUser] = useState("");
  //names and urls from pokemon api
  const [info, setInfo] = useState([]);
  
  //dictionary with type as keys and equivalent colors as values
  const types = {
    normal: "grey",
    fire: "orange",
    water: "steelblue",
    grass: "palegreen",
    electric: "yellow",
    ice: "lightblue",
    fighting: "red",
    poison: "rebeccapurple",
    ground: "peru",
    flying: "skyblue",
    psychic: "plum",
    bug: "olive",
    rock: "darkgoldenrod",
    ghost: "slateblue",
    dark: "rgba(0, 0, 0, 0.8)",
    dragon: "cornflowerblue",
    steel: "silver",
    fairy: "pink",
  };

  const value = useMemo(() => {
    return { user, setUser, isAuth, setIsAuth, info, setInfo, types };
  }, [user, isAuth, info]);

  return <Context.Provider value={value} {...props} />;
}

export function useContextInfo() {
  const contextInfo = useContext(Context);
  if (!contextInfo) {
    throw new Error("useInfo should be inside the provider *ContextProvider*");
  }
  return contextInfo;
}
