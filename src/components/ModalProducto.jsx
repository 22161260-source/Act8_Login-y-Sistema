import { useState } from "react";
import "./Modal.css";

const VACIO = { title: "", category: "", price: "", stock: "" };

/**
 * Modal con formulario para agregar o editar un producto.
 * Si recibe `productoInicial`, funciona en modo edición.
 */
function ModalProducto({ productoInicial, categorias, onGuardar, onCancelar, guardando }) {
  const [form, setForm] = useState(
    productoInicial
      ? {
          title: productoInicial.title || "",
          category: productoInicial.category || "",
          price: productoInicial.price ?? "",
          stock: productoInicial.stock ?? "",
        }
      : VACIO
  );
  const [error, setError] = useState("");

  function handleChange(campo, valor) {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  }

  function handleSubmit(evento) {
    evento.preventDefault();

    if (!form.title.trim() || !form.category.trim() || form.price === "" || form.stock === "") {
      setError("Todos los campos son obligatorios.");
      return;
    }
    if (Number(form.price) < 0 || Number(form.stock) < 0) {
      setError("El precio y el stock no pueden ser negativos.");
      return;
    }

    setError("");
    onGuardar({
      title: form.title.trim(),
      category: form.category.trim(),
      price: Number(form.price),
      stock: Number(form.stock),
    });
  }

  return (
    <div className="modal-fondo" onClick={onCancelar}>
      <div className="modal-caja" onClick={(e) => e.stopPropagation()}>
        <h3>{productoInicial ? "Editar producto" : "Agregar producto"}</h3>

        <form onSubmit={handleSubmit}>
          <div className="modal-campo">
            <label htmlFor="title">Nombre</label>
            <input
              id="title"
              type="text"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>

          <div className="modal-campo">
            <label htmlFor="category">Categoría</label>
            <input
              id="category"
              type="text"
              list="lista-categorias"
              value={form.category}
              onChange={(e) => handleChange("category", e.target.value)}
              placeholder="ej. smartphones"
            />
            <datalist id="lista-categorias">
              {categorias.map((c) => (
                <option key={c.slug} value={c.slug} />
              ))}
            </datalist>
          </div>

          <div className="modal-campo">
            <label htmlFor="price">Precio (USD)</label>
            <input
              id="price"
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={(e) => handleChange("price", e.target.value)}
            />
          </div>

          <div className="modal-campo">
            <label htmlFor="stock">Stock</label>
            <input
              id="stock"
              type="number"
              min="0"
              value={form.stock}
              onChange={(e) => handleChange("stock", e.target.value)}
            />
          </div>

          {error && <p className="modal-error">{error}</p>}

          <div className="modal-acciones">
            <button type="button" className="btn-secundario" onClick={onCancelar} disabled={guardando}>
              Cancelar
            </button>
            <button type="submit" className="btn-primario" disabled={guardando}>
              {guardando ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalProducto;
