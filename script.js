document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("theme-toggle");

  // Standardmäßig 'light-mode' setzen
  document.body.classList.add("light-mode");

  toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    document.body.classList.toggle("dark-mode");

    // Optional: Button-Text ändern je nach Modus
    if (document.body.classList.contains("dark-mode")) {
      toggleButton.textContent = "🌞 Hell";
    } else {
      toggleButton.textContent = "🌙 Dunkel";
    }
  });
});


function showPage(pageId) {
  const sections = document.querySelectorAll("#content > section");
  sections.forEach(section => section.style.display = "none");

  const active = document.getElementById(pageId);
  if (active) active.style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
  // Standardmäßig die erste Seite anzeigen
  showPage("home");

  // Event-Listener für die Navigation
  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const pageId = link.getAttribute("href").substring(1);
      showPage(pageId);
    });
  });
});



