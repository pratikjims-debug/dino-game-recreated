const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const scoreDisplay = document.getElementById("score");
const gameOver = document.getElementById("gameOver");

let isJumping = false;
let score = 0;
let gameRunning = true;

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    if (!isJumping && gameRunning) jump();
    else if (!gameRunning) restartGame();
  }
});

function jump() {
  if (isJumping) return;
  isJumping = true;
  dino.classList.add("jump");
  setTimeout(() => {
    dino.classList.remove("jump");
    isJumping = false;
  }, 600);
}

const checkCollision = setInterval(() => {
  if (!gameRunning) return;

  const dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));
  const cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("right"));
  
  if (cactusLeft > window.innerWidth - 130 && cactusLeft < window.innerWidth - 70 && dinoBottom < 40) {
    gameOver.style.display = "block";
    cactus.style.animationPlayState = "paused";
    gameRunning = false;
  } else if (gameRunning) {
    score++;
    scoreDisplay.textContent = "Score: " + score;
  }
}, 100);

function restartGame() {
  score = 0;
  scoreDisplay.textContent = "Score: 0";
  gameRunning = true;
  cactus.style.animationPlayState = "running";
  gameOver.style.display = "none";
}
