document.addEventListener("DOMContentLoaded", () => {
  // ====== Navigation / Dropdowns ======
  const menuToggle = document.querySelector(".menu-toggle");
  const navbarNav = document.querySelector(".navbar-nav");
  const dropdowns = document.querySelectorAll(".dropdown");

  // Menü öffnen/schließen (mobil)
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      navbarNav.classList.toggle("active");
    });
  }

  // Dropdowns für Touch-Geräte
  dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector(".nav-link");
    link.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        dropdown.classList.toggle("open");
      }
    });
  });

  // Klick außerhalb schließt Dropdowns
  document.addEventListener("click", (e) => {
    dropdowns.forEach(dropdown => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("open");
      }
    });
  });

  // ====== Projektkarten sanft einblenden ======
  const cards = document.querySelectorAll(".projekt");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.2 });

  cards.forEach((card) => observer.observe(card));
});
