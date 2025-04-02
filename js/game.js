let canvas;
let world;
let keyboard = new Keyboard();
let soundManager = new SoundManager();

function init() {
  canvas = document.getElementById("canvas");
}

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

  if (soundManager.isMuted) {
    soundManager.toggleMute(); 
  }
  document.getElementById("volumeIcon").src = "img/volume-high-solid.svg";

  world = new World(canvas, keyboard, soundManager);
}

function toggleSound() {
  let volumeIcon = document.getElementById("volumeIcon");
  soundManager.toggleMute();

  if (soundManager.isMuted) {
    volumeIcon.src = "img/volume-xmark-solid.svg";
  } else {
    volumeIcon.src = "img/volume-high-solid.svg";
  }
}

function openStartScreen() {
  document.getElementById("gameScreen")?.classList.add("d-none");
  document.getElementById("winScreen")?.classList.add("d-none");
  document.getElementById("gameOverScreen")?.classList.add("d-none");
  document.getElementById("startScreen")?.classList.remove("d-none");
}

function showInfo() {
  const infoOverlay = document.getElementById("infoOverlay");
  if (infoOverlay.classList.contains("d-none")) {
    infoOverlay.classList.remove("d-none");
    if (world) {
      world.paused = true;
    }
  } else {
    infoOverlay.classList.add("d-none");
    if (world) {
      world.paused = false;
    }
  }
}

window.addEventListener("keydown", (event) => {
  if (event.keyCode == 39) keyboard.RIGHT = true;
  if (event.keyCode == 37) keyboard.LEFT = true;
  if (event.keyCode == 38) keyboard.UP = true;
  if (event.keyCode == 40) keyboard.DOWN = true;
  if (event.keyCode == 32) keyboard.SPACE = true;
  if (event.keyCode == 68) keyboard.D = true;
  if (event.keyCode == 70) keyboard.F = true;
});

window.addEventListener("keyup", (event) => {
  if (event.keyCode == 39) keyboard.RIGHT = false;
  if (event.keyCode == 37) keyboard.LEFT = false;
  if (event.keyCode == 38) keyboard.UP = false;
  if (event.keyCode == 40) keyboard.DOWN = false;
  if (event.keyCode == 32) keyboard.SPACE = false;
  if (event.keyCode == 68) keyboard.D = false;
  if (event.keyCode == 70) keyboard.F = false;
});

function pressKey(keyName) {
  keyboard[keyName] = true;
  setTimeout(() => {
    keyboard[keyName] = false;
  }, 200);
}

function showTouchControlsIfMobileLandscape() {
  const isMobile = window.innerWidth <= 1200;
  const isLandscape = window.innerWidth > window.innerHeight;

  const controls = document.getElementById("touch-controls");
  if (isMobile && isLandscape) {
    controls.classList.remove("d-none");
  } else {
    controls.classList.add("d-none");
  }
}

function checkOrientationWarning() {
  const maxDim = Math.max(window.innerWidth, window.innerHeight);
  const isSmallDevice = maxDim <= 1400; 
  
  const isPortrait = window.innerHeight > window.innerWidth;

  const rotateWarning = document.getElementById('rotateWarning');
  const contentWrapper = document.querySelector('.content-wrapper');

  if (isSmallDevice && isPortrait) {
    rotateWarning.classList.remove('d-none');
    contentWrapper.classList.add('d-none');
  } else {
    rotateWarning.classList.add('d-none');
    contentWrapper.classList.remove('d-none');
  }
}

function showImprint() {
  document.getElementById('startScreen').classList.add('d-none');
  document.getElementById('imprintScreen').classList.remove('d-none');
}

function closeImprint() {
  document.getElementById('imprintScreen').classList.add('d-none');
  document.getElementById('startScreen').classList.remove('d-none');
}


window.addEventListener('load', () => {
  showTouchControlsIfMobileLandscape();
  checkOrientationWarning();
});

window.addEventListener('resize', () => {
  showTouchControlsIfMobileLandscape();
  checkOrientationWarning();
});

window.addEventListener('orientationchange', () => {
  showTouchControlsIfMobileLandscape();
  checkOrientationWarning();
});