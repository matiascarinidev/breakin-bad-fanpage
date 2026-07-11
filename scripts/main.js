const formulario = document.querySelector(".form-container");

if (formulario) {
  formulario.addEventListener("submit", function (event) {
    const nombre = document.getElementById("nombre-curiosidad");
    const email = document.getElementById("email-curiosidad");
    const mensaje = document.getElementById("curiosidad");

    let hasError = false;

    if (!nombre.value.trim()) {
      nombre.classList.add("error");
      hasError = true;
    }

    if (!email.value.trim()) {
      email.classList.add("error");
      hasError = true;
    }

    if (!mensaje.value.trim()) {
      mensaje.classList.add("error");
      hasError = true;
    }

    if (hasError) {
      event.preventDefault();
      alert("Todos los campos son obligatorios.");
    } else {
      // Feedback visual de envío
      const btn = formulario.querySelector(".form-submit-btn");
      btn.classList.add("loading");
      btn.disabled = true;
    }
  });
}
