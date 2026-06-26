const formulario = document.querySelector(".form-container");

formulario.addEventListener("submit", function (event) {
  const nombre = document.getElementById("nombre-curiosidad").value;
  const email = document.getElementById("email-curiosidad").value;
  const mensaje = document.getElementById("curiosidad").value;

  if (nombre === "" || email === "" || mensaje === "") {
    event.preventDefault();
    alert("Todos los campos son obligatorios.");
  }
});
