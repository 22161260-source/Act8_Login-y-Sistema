import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useProductos } from "../hooks/useProductos";
import { obtenerCategorias, crearProducto, actualizarProducto, eliminarProducto } from "../api/productos";
import TablaProductos from "../components/TablaProductos";
import Paginacion from "../components/Paginacion";
import ModalProducto from "../components/ModalProducto";
import ModalConfirmacion from "../components/ModalConfirmacion";
import "./Productos.css";

function Productos() {
  const [searchParams, setSearchParams] = useSearchParams();


  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);
  const q = searchParams.get("q") || "";
  const categoria = searchParams.get("categoria") || "";
  const [textoBusqueda, setTextoBusqueda] = useState(q);
  const [categorias, setCategorias] = useState([]);

  const { productos, setProductos, total, cargando, error } = useProductos({
    q,
    categoria,
    page,
    limit,
  });

  const [modalForm, setModalForm] = useState(null); // null | "crear" | producto a editar
  const [productoAEliminar, setProductoAEliminar] = useState(null);
  const [productoAEditar, setProductoAEditar] = useState(null);
  const [guardando, setGuardando] = useState(false);
  const [avisoAccion, setAvisoAccion] = useState("");

  useEffect(() => {
    obtenerCategorias()
      .then(setCategorias)
      .catch(() => setCategorias([]));
  }, []);

  function actualizarParametros(cambios) {
    const nuevos = new URLSearchParams(searchParams);
    Object.entries(cambios).forEach(([clave, valor]) => {
      if (valor === "" || valor === null || valor === undefined) {
        nuevos.delete(clave);
      } else {
        nuevos.set(clave, valor);
      }
    });
    setSearchParams(nuevos);
  }

  function handleBuscar(evento) {
    evento.preventDefault();
    actualizarParametros({ q: textoBusqueda.trim(), page: 1 });
  }

  function handleCambiarCategoria(nuevaCategoria) {
    actualizarParametros({ categoria: nuevaCategoria, page: 1 });
  }

  function handleCambiarPage(nuevaPage) {
    actualizarParametros({ page: nuevaPage });
  }

  function handleCambiarLimit(nuevoLimit) {
    actualizarParametros({ limit: nuevoLimit, page: 1 });
  }



  async function handleGuardarNuevo(datos) {
    setGuardando(true);
    try {
      const creado = await crearProducto(datos);
     
      setProductos((prev) => [
        {
          ...creado,
          id: Date.now(),
          thumbnail: creado.thumbnail || "https://placehold.co/60x60?text=Nuevo",
          esLocal: true,
        },
        ...prev,
      ]);
      setModalForm(null);
      setAvisoAccion("Producto agregado correctamente.");
    } catch (err) {
      setAvisoAccion(err.message || "No se pudo contactar la API, pero se agregará localmente.");
      setProductos((prev) => [
        {
          ...datos,
          id: Date.now(),
          thumbnail: "https://placehold.co/60x60?text=Nuevo",
          esLocal: true,
        },
        ...prev,
      ]);
      setModalForm(null);
    } finally {
      setGuardando(false);
    }
  }

  async function handleConfirmarEdicion(datos) {
    setGuardando(true);
    try {
      const actualizado = await actualizarProducto(productoAEditar.id, datos);
      setProductos((prev) =>
        prev.map((p) => (p.id === productoAEditar.id ? { ...p, ...actualizado, ...datos } : p))
      );
      setAvisoAccion("Producto editado correctamente.");
    } catch (err) {
      setProductos((prev) =>
        prev.map((p) => (p.id === productoAEditar.id ? { ...p, ...datos } : p))
      );
      setAvisoAccion("La API no confirmó el cambio, pero se aplicó localmente.");
    } finally {
      setProductoAEditar(null);
      setGuardando(false);
    }
  }

  async function handleConfirmarEliminar() {
    setGuardando(true);
    try {
      await eliminarProducto(productoAEliminar.id);
      setAvisoAccion("Producto eliminado correctamente.");
    } catch (err) {
      setAvisoAccion("La API no confirmó el borrado, pero se eliminó localmente.");
    } finally {
      setProductos((prev) => prev.filter((p) => p.id !== productoAEliminar.id));
      setProductoAEliminar(null);
      setGuardando(false);
    }
  }

  return (
    <div>
      <div className="productos-encabezado">
        <h2>Productos</h2>
        <button className="btn-primario" onClick={() => setModalForm("crear")}>
          + Agregar producto
        </button>
      </div>

      <form className="productos-filtros" onSubmit={handleBuscar}>
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={textoBusqueda}
          onChange={(e) => setTextoBusqueda(e.target.value)}
        />
        <select value={categoria} onChange={(e) => handleCambiarCategoria(e.target.value)}>
          <option value="">Todas las categorías</option>
          {categorias.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name || c.slug}
            </option>
          ))}
        </select>
        <button type="submit" className="btn-secundario">
          Buscar
        </button>
      </form>

      {avisoAccion && <p className="productos-aviso">{avisoAccion}</p>}

      {cargando && <p className="productos-estado">Cargando...</p>}
      {!cargando && error && <p className="productos-estado productos-error">{error}</p>}

      {!cargando && !error && (
        <>
          <TablaProductos
            productos={productos}
            onEditar={setProductoAEditar}
            onEliminar={setProductoAEliminar}
          />
          <Paginacion
            page={page}
            limit={limit}
            total={total}
            onCambiarPage={handleCambiarPage}
            onCambiarLimit={handleCambiarLimit}
          />
        </>
      )}

      {modalForm === "crear" && (
        <ModalProducto
          categorias={categorias}
          guardando={guardando}
          onGuardar={handleGuardarNuevo}
          onCancelar={() => setModalForm(null)}
        />
      )}

      {productoAEditar && (
        <ModalConfirmacionEdicion
          producto={productoAEditar}
          categorias={categorias}
          guardando={guardando}
          onConfirmar={handleConfirmarEdicion}
          onCancelar={() => setProductoAEditar(null)}
        />
      )}

      {productoAEliminar && (
        <ModalConfirmacion
          titulo="Eliminar producto"
          mensaje={`¿Seguro que quieres eliminar "${productoAEliminar.title}"? Esta acción no se puede deshacer.`}
          onConfirmar={handleConfirmarEliminar}
          onCancelar={() => setProductoAEliminar(null)}
        />
      )}
    </div>
  );
}

/**
 * Antes de editar se pide una confirmación explícita y, solo si el
 * usuario acepta, se abre el formulario con los datos precargados.
 */
function ModalConfirmacionEdicion({ producto, categorias, guardando, onConfirmar, onCancelar }) {
  const [confirmado, setConfirmado] = useState(false);

  if (!confirmado) {
    return (
      <ModalConfirmacion
        titulo="Editar producto"
        mensaje={`¿Quieres editar "${producto.title}"?`}
        onConfirmar={() => setConfirmado(true)}
        onCancelar={onCancelar}
      />
    );
  }

  return (
    <ModalProducto
      productoInicial={producto}
      categorias={categorias}
      guardando={guardando}
      onGuardar={onConfirmar}
      onCancelar={onCancelar}
    />
  );
}

export default Productos;
