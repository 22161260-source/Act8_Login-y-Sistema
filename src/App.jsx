
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import Reportes from "./pages/Reportes";

function App() {

  let [usuario, setUsuario] = useState(null);

  function handleLoginExitoso(datosUsuario) {
    setUsuario(datosUsuario);
  }

  function handleLogout() {
    setUsuario(null);
  }

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        {!usuario ? (
          <>
            <Route path="/login" element={<Login onLoginExitoso={handleLoginExitoso} />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
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
