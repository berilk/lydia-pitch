const slides = Array.from(document.querySelectorAll(".slide"));
const links = Array.from(document.querySelectorAll(".nav a"));
const currentSlide = document.querySelector("#currentSlide");
const progressBar = document.querySelector("#progressBar");

function activeIndex() {
  const viewportCenter = window.scrollY + window.innerHeight * 0.45;
  let index = 0;

  slides.forEach((slide, i) => {
    if (slide.offsetTop <= viewportCenter) index = i;
  });

  return index;
}

function updateUi() {
  const index = activeIndex();
  const slide = slides[index];
  currentSlide.textContent = String(index + 1).padStart(2, "0");
  progressBar.style.width = `${((index + 1) / slides.length) * 100}%`;

  links.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${slide.id}`);
  });
}

function goTo(index) {
  const next = Math.max(0, Math.min(slides.length - 1, index));
  slides[next].scrollIntoView({ behavior: "smooth", block: "start" });
}

document.addEventListener("keydown", (event) => {
  const index = activeIndex();
  const keys = ["ArrowRight", "ArrowDown", "PageDown", " "];
  const backKeys = ["ArrowLeft", "ArrowUp", "PageUp"];

  if (keys.includes(event.key)) {
    event.preventDefault();
    goTo(index + 1);
  }

  if (backKeys.includes(event.key)) {
    event.preventDefault();
    goTo(index - 1);
  }

  if (event.key === "Home") {
    event.preventDefault();
    goTo(0);
  }

  if (event.key === "End") {
    event.preventDefault();
    goTo(slides.length - 1);
  }
});

window.addEventListener("scroll", updateUi, { passive: true });
window.addEventListener("resize", updateUi);
window.addEventListener("load", updateUi);
updateUi();
