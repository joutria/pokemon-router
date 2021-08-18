import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Pokemon from "./components/Pokemon";
import PokemonCard from "./components/PokemonCard";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/NotFound";
import { useContextInfo, ContextProvider } from "./context/Context";

export default () => (
  <ContextProvider>
    <App />
  </ContextProvider>
);

function App() {
  const {isAuth} = useContextInfo();

  return (
    <div className="App">
      <div className="sky"></div>
      <Router>
        <NavBar />
        <Switch>
          <Route path="/Home">
            <Home/>
          </Route>
          <ProtectedRoute isAuth={isAuth} path="/Pokemon/:pokeID" component={PokemonCard} />
          <ProtectedRoute isAuth={isAuth} exact path="/Pokemon" component={Pokemon} />
          <Route exact path="/">
            <Redirect to="/Home" />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
