const params = new URLSearchParams(window.location.search);
const nombre = params.get("nombre") || "usuario";
const nombreElement = document.getElementById("nombreUsuario");

if (nombreElement) {
  nombreElement.textContent = nombre;
}
