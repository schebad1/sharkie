let canvas;
let world;
let keyboard = new Keyboard();
let soundManager = new SoundManager();

/**
 * Initializes the canvas element.
 */
function init() {
  canvas = document.getElementById("canvas");
}

/**
 * Starts the game and resets screens and sound.
 */
function startGame() {
  document.getElementById("startScreen")?.classList.add("d-none");
  document.getElementById("gameOverScreen")?.classList.add("d-none");
  document.getElementById("winScreen")?.classList.add("d-none");
  document.getElementById("gameScreen")?.classList.remove("d-none");
  canvas = document.getElementById("canvas");
  if (world) {
    world.stopGame();
    world = null;
  }
  soundManager.stopEndbossMusic();
  document.getElementById("volumeIcon").src = soundManager.isMuted
  ? "img/volume-xmark-solid.svg"
  : "img/volume-high-solid.svg";
  world = new World(canvas, keyboard, soundManager);
}

/**
 * Toggles sound on/off and updates the icon.
 */
function toggleSound() {
  let volumeIcon = document.getElementById("volumeIcon");
  soundManager.toggleMute();
  volumeIcon.src = soundManager.isMuted
    ? "img/volume-xmark-solid.svg"
    : "img/volume-high-solid.svg";
}

/**
 * Displays the start screen and hides others.
 */
function openStartScreen() {
  soundManager?.stopEndbossMusic();
  document.getElementById("gameScreen")?.classList.add("d-none");
  document.getElementById("winScreen")?.classList.add("d-none");
  document.getElementById("gameOverScreen")?.classList.add("d-none");
  document.getElementById("startScreen")?.classList.remove("d-none");
}

/**
 * Shows or hides the info overlay and pauses game.
 */
function showInfo() {
  const infoOverlay = document.getElementById("infoOverlay");
  const isHidden = infoOverlay.classList.contains("d-none");
  infoOverlay.classList.toggle("d-none");
  if (world) world.paused = isHidden;
}

/**
 * Keyboard down handler.
 */
window.addEventListener("keydown", (event) => {
  if (event.keyCode === 39) keyboard.RIGHT = true;
  if (event.keyCode === 37) keyboard.LEFT = true;
  if (event.keyCode === 38) keyboard.UP = true;
  if (event.keyCode === 40) keyboard.DOWN = true;
  if (event.keyCode === 32) keyboard.SPACE = true;
  if (event.keyCode === 68) keyboard.D = true;
  if (event.keyCode === 70) keyboard.F = true;
});

/**
 * Keyboard up handler.
 */
window.addEventListener("keyup", (event) => {
  if (event.keyCode === 39) keyboard.RIGHT = false;
  if (event.keyCode === 37) keyboard.LEFT = false;
  if (event.keyCode === 38) keyboard.UP = false;
  if (event.keyCode === 40) keyboard.DOWN = false;
  if (event.keyCode === 32) keyboard.SPACE = false;
  if (event.keyCode === 68) keyboard.D = false;
  if (event.keyCode === 70) keyboard.F = false;
});

/**
 * Displays touch controls on mobile landscape.
 */
function showTouchControlsIfMobileLandscape() {
  const isMobile = window.innerWidth <= 1400;
  const isLandscape = window.innerWidth > window.innerHeight;
  const controls = document.getElementById("touch-controls");
  controls.classList.toggle("d-none", !(isMobile && isLandscape));
}

/**
 * Shows rotate warning on portrait mobile mode.
 */
function checkOrientationWarning() {
  const maxDim = Math.max(window.innerWidth, window.innerHeight);
  const isSmallDevice = maxDim <= 1400;
  const isPortrait = window.innerHeight > window.innerWidth;
  const rotateWarning = document.getElementById("rotateWarning");
  const contentWrapper = document.querySelector(".content-wrapper");
  rotateWarning.classList.toggle("d-none", !(isSmallDevice && isPortrait));
  contentWrapper.classList.toggle("d-none", isSmallDevice && isPortrait);
}

/**
 * Shows imprint screen.
 */
function showImprint() {
  document.getElementById("startScreen").classList.add("d-none");
  document.getElementById("imprintScreen").classList.remove("d-none");
}

/**
 * Hides imprint and shows start screen.
 */
function closeImprint() {
  document.getElementById("imprintScreen").classList.add("d-none");
  document.getElementById("startScreen").classList.remove("d-none");
}

/**
 * Adds touch listeners for mobile input.
 * @param {HTMLElement} btn - The button element
 * @param {string} key - Key name to control
 */
function addTouchListeners(btn, key) {
  const toggleKey = (val) => (keyboard[key] = val);
  btn.addEventListener("touchstart", () => toggleKey(true));
  btn.addEventListener("touchend", () => toggleKey(false));
  btn.addEventListener("touchcancel", () => toggleKey(false));
  btn.addEventListener("touchleave", () => toggleKey(false));
}

/**
 * On window load, setup mobile controls and warnings.
 */
window.addEventListener("load", () => {
  showTouchControlsIfMobileLandscape();
  checkOrientationWarning();
  addTouchListeners(document.getElementById("leftArrow"), "LEFT");
  addTouchListeners(document.getElementById("rightArrow"), "RIGHT");
  addTouchListeners(document.getElementById("upArrow"), "UP");
  addTouchListeners(document.getElementById("downArrow"), "DOWN");
  addTouchListeners(document.getElementById("spaceButton"), "SPACE");
  addTouchListeners(document.getElementById("dButton"), "D");
  addTouchListeners(document.getElementById("fButton"), "F");
  setCanvasHeight();
  // window.addEventListener("contextmenu", (e) => e.preventDefault());
});

/**
 * Responds to window resize.
 */
window.addEventListener("resize", () => {
  showTouchControlsIfMobileLandscape();
  checkOrientationWarning();
  setCanvasHeight();
});

/**
 * Responds to orientation changes.
 */
window.addEventListener("orientationchange", () => {
  showTouchControlsIfMobileLandscape();
  checkOrientationWarning();
  setCanvasHeight();
});

/**
 * Sets canvas height to full window height.
 */
function setCanvasHeight() {
  const height = window.innerHeight;
  const contentWrapper = document.querySelector('.content-wrapper');
  contentWrapper.style.height = height + 'px';
}