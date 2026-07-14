import "./Navbar.css";

function Navbar({ usuario, onLogout }) {
  return (
    <header className="navbar">
      <div className="navbar-titulo">Panel</div>

      <div className="navbar-usuario">
        <img
          src={usuario.image}
          alt={`Foto de perfil de ${usuario.username}`}
          className="navbar-avatar"
        />
        <span className="navbar-nombre">
          {usuario.firstName} {usuario.lastName}
        </span>
        <button className="navbar-logout" onClick={onLogout}>
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}

export default Navbar;
