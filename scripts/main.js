document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("#menu-toggle");
  const menu = document.getElementById("#nav-menu");

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      this.classList.toggle("active");
      menu.classList.toggle("active");
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        toggle.classList.remove("active");
        menu.classList.remove("active");
      });
    });
  }

  const sections = document.querySelectorAll("section");

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });
});
window.toggleText = function (id, btn) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.toggle("expanded");
  btn.textContent = el.classList.contains("expanded") ? "Ver menos" : "Ver más";
};
