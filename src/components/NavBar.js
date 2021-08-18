import { NavLink } from "react-router-dom";
import { useContextInfo } from "../context/Context";

function NavBar() {
  const { user } = useContextInfo();

  return (
    <div className="NavBar">
      <nav>
        <h1>{user ? `Pokedex of ${user.user}` : "Pokedex"}</h1>
        <ul>
          {user && (
            <>
              <li>
                <NavLink to="/Pokemon">Pokemon</NavLink>
              </li>
              <li>
                <NavLink to="/Home">Log out</NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
