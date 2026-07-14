import { useEffect, useState, useCallback } from "react";
import { obtenerProductos } from "../api/productos";

/**
 * Encapsula la carga de productos: recibe los filtros/paginación
 * actuales y expone productos, total, estado de carga y error.
 * También expone setProductos para que la página pueda reflejar
 * ahí mismo los cambios de las acciones CRUD (agregar/editar/eliminar).
 */
export function useProductos({ q, categoria, page, limit }) {
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const cargar = useCallback(async () => {
    setCargando(true);
    setError("");
    try {
      const skip = (page - 1) * limit;
      const { productos, total } = await obtenerProductos({ q, categoria, limit, skip });
      setProductos(productos);
      setTotal(total);
    } catch (err) {
      setError(err.message || "Ocurrió un error al cargar los productos.");
    } finally {
      setCargando(false);
    }
  }, [q, categoria, page, limit]);

  useEffect(() => {
    cargar();
  }, [cargar]);

  return { productos, setProductos, total, cargando, error, recargar: cargar };
}
