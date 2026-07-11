(function () {
  ("use strict");

  // ===== MENÚ HAMBURGUESA =====
  function initMenu() {
    const toggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("nav-menu");

    if (!toggle || !menu) return;

    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      this.classList.toggle("active");
      menu.classList.toggle("active");
      const expanded = menu.classList.contains("active");
      this.setAttribute("aria-expanded", expanded);
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        toggle.classList.remove("active");
        menu.classList.remove("active");
        toggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", function (e) {
      if (!menu.contains(e.target) && !toggle.contains(e.target)) {
        menu.classList.remove("active");
        toggle.classList.remove("active");
        toggle.setAttribute("aria-expanded", "false");
      }
    });

    let lastScrollTop = 0;
    window.addEventListener(
      "scroll",
      function () {
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        if (Math.abs(scrollTop - lastScrollTop) > 50) {
          menu.classList.remove("active");
          toggle.classList.remove("active");
          toggle.setAttribute("aria-expanded", "false");
        }
        lastScrollTop = scrollTop;
      },
      { passive: true }
    );

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("active")) {
        menu.classList.remove("active");
        toggle.classList.remove("active");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  // ===== OBSERVER DE SECCIONES =====
  function initObserver() {
    const sections = document.querySelectorAll("section");
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  // ===== PREFETCH =====
  function initPrefetch() {
    document
      .querySelectorAll('a[href^="/pages/"], a[href$=".html"]')
      .forEach(function (link) {
        link.addEventListener("mouseenter", function () {
          const href = this.getAttribute("href");
          if (href && !href.startsWith("http")) {
            const prefetchLink = document.createElement("link");
            prefetchLink.rel = "prefetch";
            prefetchLink.href = href;
            document.head.appendChild(prefetchLink);
          }
        });
      });
  }

  // ===== VALIDACIÓN FORMULARIO =====
  function initForm() {
    const form = document.querySelector(".form-container");
    if (!form) return;

    const inputs = form.querySelectorAll("input, textarea");

    inputs.forEach(function (input) {
      input.addEventListener("blur", function () {
        if (this.hasAttribute("required") && !this.value.trim()) {
          this.classList.add("error");
        } else {
          this.classList.remove("error");
        }
      });

      input.addEventListener("input", function () {
        if (this.classList.contains("error") && this.value.trim()) {
          this.classList.remove("error");
        }
      });
    });

    form.addEventListener("submit", function (event) {
      const nombre = document.getElementById("nombre-curiosidad");
      const email = document.getElementById("email-curiosidad");
      const mensaje = document.getElementById("curiosidad");

      let hasError = false;

      if (!nombre || !nombre.value.trim()) {
        if (nombre) nombre.classList.add("error");
        hasError = true;
      }

      if (!email || !email.value.trim()) {
        if (email) email.classList.add("error");
        hasError = true;
      }

      if (!mensaje || !mensaje.value.trim()) {
        if (mensaje) mensaje.classList.add("error");
        hasError = true;
      }

      if (hasError) {
        event.preventDefault();
        alert("Todos los campos son obligatorios.");
      } else {
        const btn = form.querySelector(".form-submit-btn");
        if (btn) {
          btn.classList.add("loading");
          btn.disabled = true;
        }
      }
    });
  }

  // ===== INICIALIZACIÓN =====
  document.addEventListener("DOMContentLoaded", function () {
    initMenu();
    initObserver();
    initPrefetch();
    initForm();
  });
})();

// ===== FUNCIÓN GLOBAL =====
window.toggleText = function (id, btn) {
  const el = document.getElementById(id);
  if (!el) return;
  const isExpanded = el.classList.toggle("expanded");
  btn.textContent = isExpanded ? "Ver menos" : "Ver más";
  btn.setAttribute("aria-expanded", isExpanded);
};
// ===== TEXT TRUNCATE AUTOMÁTICO =====
function initTextTruncate() {
  // Solo en mobile y tablet
  if (window.innerWidth > 1023) return;

  const paragraphs = document.querySelectorAll(
    ".season-section ul li a .text-container p.text"
  );

  paragraphs.forEach(function (p, index) {
    // Guardar texto original
    const originalText = p.textContent;
    p.textContent = originalText;
    p.classList.add("text-truncate");
    p.id = "desc-" + index;

    // Crear botón
    const btn = document.createElement("button");
    btn.className = "toggle-btn";
    btn.textContent = "Ver más";
    btn.setAttribute("onclick", 'toggleText("desc-' + index + '", this)');
    btn.setAttribute("aria-expanded", "false");

    // Insertar después del párrafo
    p.parentNode.insertBefore(btn, p.nextSibling);
  });
}

// Llamar en DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
  initMenu();
  initObserver();
  initPrefetch();
  initForm();
  initTextTruncate(); // Agregar esta línea
});
