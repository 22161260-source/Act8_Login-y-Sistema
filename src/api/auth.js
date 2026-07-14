

const AUTH_URL = "https://dummyjson.com/auth/login";

export async function loginUsuario(username, password) {
  const respuesta = await fetch(AUTH_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!respuesta.ok) {
    throw new Error("Usuario o contraseña incorrectos");
  }

  const datosUsuario = await respuesta.json();
  return datosUsuario;
}
