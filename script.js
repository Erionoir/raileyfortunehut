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
      resetBall();
    }
  }

  if (ballX >= canvas.width - paddleWidth) {
    if (ballY > player2Y && ballY < player2Y + paddleHeight) {
      ballSpeedX = -ballSpeedX;
    } else {
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

canvas.addEventListener('mousemove', movePaddle);

function draw() {
  drawRect(0, 0, canvas.width, canvas.height, '#fff');
  drawNet();
  drawRect(0, player1Y, paddleWidth, paddleHeight, '#000');
  drawRect(canvas.width - paddleWidth, player2Y, paddleWidth, paddleHeight, '#000');
  drawCircle(ballX, ballY, ballSize, '#000');
}

function gameLoop() {
  moveBall();
  draw();
}

setInterval(gameLoop, 1000 / 60);
