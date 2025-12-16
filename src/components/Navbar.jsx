import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: 16, display: "flex", gap: 16, borderBottom: "1px solid #333" }}>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/games">Games</NavLink>
      <NavLink to="/extra">Extra</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/register">Register</NavLink>
    </nav>
  );
}
