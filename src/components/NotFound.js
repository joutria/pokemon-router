
import { Link } from "react-router-dom";
import "../App.css";

export default function NotFound() {
  return (
    <div className="not-found">
      <Link to="/Home" className="notfound-home-link">Home</Link>
      <h2>404 - Page not Found</h2>
    </div>
  );
}
