import { NavLink } from "react-router-dom";

export const NavBar = () => {
  return (
    <nav className="col-md-2 d-none d-md-block bg-dark sidebar min-vh-100 p-4">
      
      <h4 className="text-white text-center mb-4 fw-bold">
        🎫 System Tickets
      </h4>

      <ul className="nav flex-column gap-2">

        <li className="nav-item">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `nav-link rounded px-3 py-2 ${
                isActive ? "bg-primary text-white fw-semibold" : "text-light"
              }`
            }
          >
            <i className="bi bi-speedometer2 me-2"></i>
            Dashboard
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/tickets"
            className={({ isActive }) =>
              `nav-link rounded px-3 py-2 ${
                isActive ? "bg-primary text-white fw-semibold" : "text-light"
              }`
            }
          >
            <i className="bi bi-ticket me-2"></i>
            Tickets
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/agents"
            className={({ isActive }) =>
              `nav-link rounded px-3 py-2 ${
                isActive ? "bg-primary text-white fw-semibold" : "text-light"
              }`
            }
          >
            <i className="bi bi-person me-2"></i>
            Agents
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/clients"
            className={({ isActive }) =>
              `nav-link rounded px-3 py-2 ${
                isActive ? "bg-primary text-white fw-semibold" : "text-light"
              }`
            }
          >
            <i className="bi bi-people me-2"></i>
            Clients
          </NavLink>
        </li>

      </ul>
    </nav>
  );
};