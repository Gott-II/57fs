const links = document.querySelectorAll("ul li a");
let current = 0;

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    current = (current + 1) % links.length;
    window.location.href = links[current].href;
  }
});
