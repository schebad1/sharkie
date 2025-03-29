let canvas;
let world;
let keyboard = new Keyboard();
let isMuted = true;
let soundManager = new SoundManager();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

function startGame() {
  document.getElementById("startScreen").classList.add("d-none");
  document.getElementById("gameScreen").classList.remove("d-none");

  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard, soundManager);

  if (isMuted) {
    toggleSound();
  }
}

function toggleSound() {
  let volumeIcon = document.getElementById("volumeIcon");

  if (isMuted) {
    soundManager.playBackgroundMusic();
    volumeIcon.src = "img/volume-high-solid.svg";
    isMuted = false;
  } else {
    soundManager.stopBackgroundMusic();
    volumeIcon.src = "img/volume-xmark-solid.svg";
    isMuted = true;
  }
}

soundManager.stopBackgroundMusic();

window.addEventListener("keydown", (event) => {
  if (event.keyCode == 39) {
    keyboard.RIGHT = true;
  }

  if (event.keyCode == 37) {
    keyboard.LEFT = true;
  }

  if (event.keyCode == 38) {
    keyboard.UP = true;
  }

  if (event.keyCode == 40) {
    keyboard.DOWN = true;
  }

  if (event.keyCode == 32) {
    keyboard.SPACE = true;
  }

  if (event.keyCode == 68) {
    keyboard.D = true;
  }

  if (event.keyCode == 70) {
    keyboard.F = true;
  }
});

window.addEventListener("keyup", (event) => {
  if (event.keyCode == 39) {
    keyboard.RIGHT = false;
  }

  if (event.keyCode == 37) {
    keyboard.LEFT = false;
  }

  if (event.keyCode == 38) {
    keyboard.UP = false;
  }

  if (event.keyCode == 40) {
    keyboard.DOWN = false;
  }

  if (event.keyCode == 32) {
    keyboard.SPACE = false;
  }

  if (event.keyCode == 68) {
    keyboard.D = false;
  }

  if (event.keyCode == 70) {
    keyboard.F = false;
  }
});
