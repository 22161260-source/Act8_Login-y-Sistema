import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "./Layout.css";

function Layout({ usuario, onLogout }) {
  return (
    <div className="layout">
      <Sidebar />
      <div className="layout-contenido">
        <Navbar usuario={usuario} onLogout={onLogout} />
        <main className="layout-main">
          <Outlet context={{ usuario }} />
        </main>
      </div>
    </div>
  );
}

export default Layout;
