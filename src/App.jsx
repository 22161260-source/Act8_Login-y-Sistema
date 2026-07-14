import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import Reportes from "./pages/Reportes";

function App() {
  // Mientras usuario sea null, el sistema NO es visible (Fase 2).
  let [usuario, setUsuario] = useState(null);

  function handleLoginExitoso(datosUsuario) {
    setUsuario(datosUsuario);
  }

  function handleLogout() {
    setUsuario(null);
  }

  // basename = import.meta.env.BASE_URL para que las rutas funcionen tanto
  // en local (/) como desplegadas en el VPS (/t3_act8_eqXX/), tomando el
  // valor que se configure en "base" dentro de vite.config.js (Fase 4).
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        {!usuario ? (
          // Sin sesión: solo existe la pantalla de login. Cualquier otra
          // ruta redirige ahí (protección de la vista del sistema).
          <>
            <Route path="/login" element={<Login onLoginExitoso={handleLoginExitoso} />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          // Con sesión: Layout (Sidebar + Navbar) envuelve las rutas del sistema.
          <>
            <Route path="/" element={<Layout usuario={usuario} onLogout={handleLogout} />}>
              <Route index element={<Navigate to="/inicio" replace />} />
              <Route path="inicio" element={<Inicio />} />
              <Route path="productos" element={<Productos />} />
              <Route path="reportes" element={<Reportes />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
