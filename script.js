const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const paddleWidth = 10;
const paddleHeight = 100;
const ballSize = 10;

let player1Y = (canvas.height - paddleHeight) / 2;
let player2Y = (canvas.height - paddleHeight) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;

let player1Score = 0;
let player2Score = 0;

function drawRect(x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, true);
  ctx.fill();
}

function drawNet() {
  for (let i = 0; i < canvas.height; i += 20) {
    drawRect(canvas.width / 2 - 1, i, 2, 10, '#000');
  }
}

function moveBall() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballY <= 0 || ballY >= canvas.height) {
    ballSpeedY = -ballSpeedY;
  }

  if (ballX <= paddleWidth) {
    if (ballY > player1Y && ballY < player1Y + paddleHeight) {
      ballSpeedX = -ballSpeedX;
    } else {
      player2Score++;
      updateScore();
      resetBall();
    }
  }

  if (ballX >= canvas.width - paddleWidth) {
    if (ballY > player2Y && ballY < player2Y + paddleHeight) {
      ballSpeedX = -ballSpeedX;
    } else {
      player1Score++;
      updateScore();
      resetBall();
    }
  }
}

function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = -ballSpeedX;
}

function movePaddle(event) {
  const rect = canvas.getBoundingClientRect();
  const root = document.documentElement;
  const mouseY = event.clientY - rect.top - root.scrollTop;
  player1Y = mouseY - paddleHeight / 2;
}

function movePaddleTouch(event) {
  const rect = canvas.getBoundingClientRect();
  const root = document.documentElement;
  const touchY = event.touches[0].clientY - rect.top - root.scrollTop;
  player1Y = touchY - paddleHeight / 2;
}

canvas.addEventListener('mousemove', movePaddle);
canvas.addEventListener('touchstart', movePaddleTouch);
canvas.addEventListener('touchmove', movePaddleTouch);

document.getElementById('upButton').addEventListener('click', () => {
  player1Y -= 20;
});

document.getElementById('downButton').addEventListener('click', () => {
  player1Y += 20;
});

function updateScore() {
  document.getElementById('player1Score').innerText = player1Score;
  document.getElementById('player2Score').innerText = player2Score;
}

function moveAIPaddle() {
  const paddleCenter = player2Y + paddleHeight / 2;
  if (paddleCenter < ballY - 35) {
    player2Y += 6;
  } else if (paddleCenter > ballY + 35) {
    player2Y -= 6;
  }
}

function draw() {
  drawRect(0, 0, canvas.width, canvas.height, '#fff');
  drawNet();
  drawRect(0, player1Y, paddleWidth, paddleHeight, '#000');
  drawRect(canvas.width - paddleWidth, player2Y, paddleWidth, paddleHeight, '#000');
  drawCircle(ballX, ballY, ballSize, '#000');
}

function gameLoop() {
  moveBall();
  moveAIPaddle();
  draw();
}

setInterval(gameLoop, 1000 / 60);
