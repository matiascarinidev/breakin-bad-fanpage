const params = new URLSearchParams(window.location.search);
const nombre = params.get("nombre") || "usuario";
document.getElementById("nombreUsuario").textContent = nombre;
