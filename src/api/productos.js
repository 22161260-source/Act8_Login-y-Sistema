const BASE_URL = "https://dummyjson.com/products";
export async function obtenerProductos({ q = "", categoria = "", limit = 10, skip = 0 }) {
  let url;

  if (categoria) {
    url = `${BASE_URL}/category/${encodeURIComponent(categoria)}?limit=${limit}&skip=${skip}`;
  } else if (q) {
    url = `${BASE_URL}/search?q=${encodeURIComponent(q)}&limit=${limit}&skip=${skip}`;
  } else {
    url = `${BASE_URL}?limit=${limit}&skip=${skip}`;
  }

  const respuesta = await fetch(url);

  if (!respuesta.ok) {
    throw new Error("No se pudieron cargar los productos.");
  }

  const datos = await respuesta.json();

  let productos = datos.products;
  let total = datos.total;

  // Filtro adicional en el cliente cuando se combinan categoría + texto
  if (categoria && q) {
    const texto = q.toLowerCase();
    productos = productos.filter((p) => p.title.toLowerCase().includes(texto));
    total = productos.length;
  }

  return { productos, total };
}

/** Trae la lista de categorías disponibles para el filtro. */
export async function obtenerCategorias() {
  const respuesta = await fetch(`${BASE_URL}/categories`);

  if (!respuesta.ok) {
    throw new Error("No se pudieron cargar las categorías.");
  }

  const datos = await respuesta.json();

  // DummyJSON puede devolver strings simples o objetos {slug, name}
  return datos.map((c) => (typeof c === "string" ? { slug: c, name: c } : c));
}


export async function crearProducto(producto) {
  const respuesta = await fetch(`${BASE_URL}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });

  if (!respuesta.ok) {
    throw new Error("No se pudo crear el producto.");
  }

  return respuesta.json();
}

/** Edita un producto (simulado por la API, igual que crearProducto). */
export async function actualizarProducto(id, cambios) {
  const respuesta = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cambios),
  });

  if (!respuesta.ok) {
    throw new Error("No se pudo editar el producto.");
  }

  return respuesta.json();
}

/** Elimina un producto (simulado por la API, igual que las anteriores). */
export async function eliminarProducto(id) {
  const respuesta = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!respuesta.ok) {
    throw new Error("No se pudo eliminar el producto.");
  }

  return respuesta.json();
}
