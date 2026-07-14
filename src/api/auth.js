const AUTH_URL = "https://dummyjson.com/auth/login";

/**
 * Llama al endpoint de login de DummyJSON.
 * Si las credenciales son correctas, la API responde con los datos
 * del usuario (incluyendo su imagen en el campo "image").
 * Si son incorrectas, DummyJSON responde con un error (status 400).
 */
export async function loginUsuario(username, password) {
  const respuesta = await fetch(AUTH_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!respuesta.ok) {
    // DummyJSON devuelve un mensaje de error en el body cuando falla
    throw new Error("Usuario o contraseña incorrectos");
  }

  const datosUsuario = await respuesta.json();
  return datosUsuario;
}
