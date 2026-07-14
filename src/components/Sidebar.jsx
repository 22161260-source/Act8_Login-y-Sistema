import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const OPCIONES = [
  { to: "/inicio", etiqueta: "Inicio", icono: "🏠" },
  { to: "/productos", etiqueta: "Productos", icono: "📦" },
  { to: "/reportes", etiqueta: "Reportes", icono: "📊" },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">Mi Sistema</div>
      <nav className="sidebar-nav">
        {OPCIONES.map((opcion) => (
          <NavLink
            key={opcion.to}
            to={opcion.to}
            className={({ isActive }) => "sidebar-link" + (isActive ? " activo" : "")}
          >
            <span className="sidebar-icono">{opcion.icono}</span>
            {opcion.etiqueta}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
