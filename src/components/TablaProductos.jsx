import "./TablaProductos.css";

function TablaProductos({ productos, onEditar, onEliminar }) {
  if (productos.length === 0) {
    return <p className="tabla-vacia">No hay productos que coincidan con tu búsqueda.</p>;
  }

  return (
    <div className="tabla-contenedor">
      <table className="tabla-productos">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>
                <img
                  src={producto.thumbnail}
                  alt={producto.title}
                  className="tabla-thumb"
                  loading="lazy"
                />
              </td>
              <td>{producto.title}</td>
              <td>{producto.category}</td>
              <td>${Number(producto.price).toFixed(2)}</td>
              <td>{producto.stock}</td>
              <td className="tabla-acciones">
                <button className="btn-editar" onClick={() => onEditar(producto)}>
                  Editar
                </button>
                <button className="btn-eliminar" onClick={() => onEliminar(producto)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaProductos;
