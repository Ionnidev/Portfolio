document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const navbarNav = document.querySelector(".navbar-nav");
  const dropdowns = document.querySelectorAll(".dropdown");

  // Hamburger-Menü (mobil)
  if (menuToggle && navbarNav) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.addEventListener("click", function () {
      const isOpen = navbarNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // Dropdown "Projekte" (mobil per Klick, Desktop per Hover via CSS)
  dropdowns.forEach(function (dropdown) {
    const link = dropdown.querySelector(".nav-link");
    link.addEventListener("click", function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        dropdown.classList.toggle("open");
      }
    });
  });

  // Außerhalb-Klick schließt Menü & Dropdowns
  document.addEventListener("click", function (e) {
    dropdowns.forEach(function (dropdown) {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("open");
      }
    });

    if (
      navbarNav &&
      menuToggle &&
      !navbarNav.contains(e.target) &&
      !menuToggle.contains(e.target)
    ) {
      navbarNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });

  // Aktiven Nav-Link anhand der aktuellen Seite markieren
  const current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-item").forEach(function (item) {
    const link = item.querySelector(":scope > .nav-link");
    if (link && link.getAttribute("href") === current) {
      item.classList.add("active");
    }
    item.querySelectorAll(".dropdown-menu a").forEach(function (subLink) {
      if (subLink.getAttribute("href") === current) {
        item.classList.add("active");
      }
    });
  });
});