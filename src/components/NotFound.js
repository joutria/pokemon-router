import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="not-found">
      <Link to="/Home">Home</Link>
      <h2>404 - Page not Found</h2>
    </div>
  );
}
