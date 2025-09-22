const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".nav-left");
const nextBtn = document.querySelector(".nav-right");
const dotsContainer = document.querySelector(".dots");
const fullscreenBtn = document.querySelector(".fullscreen-toggle");
const pauseBtn = document.querySelector(".pause-toggle");
const closeBtn = document.querySelector(".close-slide");

let currentIndex = 0;
let autoSlideInterval;
let isPaused = false;

// Create dots dynamically
slides.forEach((_, i) => {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => {
    showSlide(i);
    resetAutoSlide();
  });
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

function showSlide(index) {
  slides[currentIndex].classList.remove("active");
  dots[currentIndex].classList.remove("active");
  currentIndex = (index + slides.length) % slides.length;
  slides[currentIndex].classList.add("active");
  dots[currentIndex].classList.add("active");
}

function nextSlide() {
  showSlide(currentIndex + 1);
}

function prevSlide() {
  showSlide(currentIndex - 1);
}

prevBtn.addEventListener("click", () => {
  prevSlide();
  resetAutoSlide();
});

nextBtn.addEventListener("click", () => {
  nextSlide();
  resetAutoSlide();
});

// Keyboard controls
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    prevSlide();
    resetAutoSlide();
  }
  if (e.key === "ArrowRight" || e.key === " " || e.code === "Space") {
    e.preventDefault();
    nextSlide();
    resetAutoSlide();
  }
  if (e.key.toLowerCase() === "f") toggleFullscreen();
  if (e.key === "Escape" && document.fullscreenElement) {
    document.exitFullscreen();
  }
});

// Fullscreen toggle
function toggleFullscreen() {
  const icon = fullscreenBtn.querySelector("img");
  const fullScreenIcon = fullscreenBtn.getAttribute("data-fullscreen");
  const fullScreenExitIcon = fullscreenBtn.getAttribute("data-exitfullscreen");
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
    icon.src = fullScreenExitIcon;
  } else {
    document.exitFullscreen();
    icon.src = fullScreenIcon;
  }
}

fullscreenBtn.addEventListener("click", toggleFullscreen);

// Pause/Resume auto slide
function togglePause() {
  isPaused = !isPaused;
  const icon = pauseBtn.querySelector("img");
  const playIcon = pauseBtn.getAttribute("data-play");
  const pauseIcon = pauseBtn.getAttribute("data-pause");

  if (isPaused) {
    clearInterval(autoSlideInterval);
    icon.src = playIcon;
  } else {
    startAutoSlide();
    icon.src = pauseIcon;
  }
}

pauseBtn.addEventListener("click", togglePause);

closeBtn.addEventListener("click", () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  }
  // Redirect back to core page
  window.location.href = closeBtn.dataset.url;
});

// Auto slide
function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    if (!isPaused) nextSlide();
  }, 4000);
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  if (!isPaused) startAutoSlide();
}

startAutoSlide();
