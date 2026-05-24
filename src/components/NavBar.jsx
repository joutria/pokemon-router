import { NavLink, useHistory } from "react-router-dom";
import { useContextInfo } from "../context/Context";

function NavBar() {
  const { user, setUser, setIsAuth } = useContextInfo();
  const history = useHistory();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('trainerName');
    setUser("");
    setIsAuth(false);
    history.push("/Home");
  };

  return (
    <header className="NavBar" role="banner">
      <nav aria-label="Main navigation">
        <h1 tabIndex={0}>{user ? `Pokedex of ${user.user}` : "Pokedex"}</h1>
        <ul>
          {user && (
            <>
              <li>
                <NavLink to="/Pokemon" aria-label="View Pokémon list" tabIndex={0}>Pokemon</NavLink>
              </li>
              <li>
                <a href="#logout" onClick={handleLogout} aria-label="Log out" tabIndex={0}>Log out</a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;
