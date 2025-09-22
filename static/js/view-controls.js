const fullscreenBtn = document.querySelector(".fullscreen-toggle");
const pauseBtn = document.querySelector(".pause-toggle");
const closeBtn = document.querySelector(".close-slide");

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
// function togglePause() {
//   isPaused = !isPaused;
//   const icon = pauseBtn.querySelector("img");
//   const playIcon = pauseBtn.getAttribute("data-play");
//   const pauseIcon = pauseBtn.getAttribute("data-pause");

//   if (isPaused) {
//     clearInterval(autoSlideInterval);
//     icon.src = playIcon;
//   } else {
//     startAutoSlide();
//     icon.src = pauseIcon;
//   }
// }

pauseBtn.addEventListener("click", togglePause);

closeBtn.addEventListener("click", () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  }
  // Redirect back to core page
  window.location.href = closeBtn.dataset.url;
});