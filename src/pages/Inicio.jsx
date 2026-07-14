import { useOutletContext } from "react-router-dom";

function Inicio() {
  const { usuario } = useOutletContext();

  return (
    <div>
      <h2>¡Bienvenida/o, {usuario.firstName}!</h2>
      <p>
        Este es tu panel principal. Usa el menú de la izquierda para ir a{" "}
        <strong>Productos</strong> y administrar el catálogo, o revisa{" "}
        <strong>Reportes</strong> (sección de ejemplo).
      </p>
    </div>
  );
}

export default Inicio;
