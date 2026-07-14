import { useState } from "react";
import { loginUsuario } from "../api/auth";
import "./Login.css";

function Login({ onLoginExitoso }) {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [error, setError] = useState("");
  let [cargando, setCargando] = useState(false);

  async function handleSubmit(evento) {
    evento.preventDefault();
    setError("");

    // Validación de campos vacíos ANTES de hacer la petición
    if (!username.trim() || !password.trim()) {
      setError("Usuario y contraseña son obligatorios.");
      return;
    }

    setCargando(true);
    try {
      let usuario = await loginUsuario(username, password);
      onLoginExitoso(usuario);
    } catch (err) {
      setError("Usuario o contraseña incorrectos.");
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="login-contenedor">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Iniciar sesión</h2>

        <label htmlFor="username">Usuario</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="emilys"
        />

        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="emilyspass"
        />

        {error && <p id="error">{error}</p>}

        <button type="submit" disabled={cargando}>
          {cargando ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
}

export default Login;
