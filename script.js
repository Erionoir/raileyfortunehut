const player1 = {
  health: 100,
  element: document.getElementById('player1')
};

const player2 = {
  health: 100,
  element: document.getElementById('player2')
};

const timerElement = document.getElementById('timer');
const actionLogElement = document.querySelector('.action-log');
const gameOverElement = document.querySelector('.game-over');
let timer = 60;
let currentPlayer = player1;

function drawSquare(player) {
  player.element.style.width = '50px';
  player.element.style.height = '50px';
  player.element.style.backgroundColor = '#000';
}

function updateHealth() {
  document.getElementById('player1Health').innerText = player1.health;
  document.getElementById('player2Health').innerText = player2.health;
}

function logAction(action) {
  const actionMessage = `${currentPlayer === player1 ? 'Player 1' : 'Player 2'} ${action}`;
  const actionElement = document.createElement('div');
  actionElement.innerText = actionMessage;
  actionLogElement.appendChild(actionElement);
  actionLogElement.scrollTop = actionLogElement.scrollHeight;
}

function handleAction(action) {
  switch (action) {
    case 'attack':
      if (currentPlayer === player1) {
        player2.health -= 10;
        logAction('attacked Player 2 for 10 damage');
      } else {
        player1.health -= 10;
        logAction('attacked Player 1 for 10 damage');
      }
      break;
    case 'defend':
      logAction('defended');
      break;
    case 'heal':
      currentPlayer.health += 10;
      logAction('healed for 10 health');
      break;
  }
  updateHealth();
  checkGameOver();
  switchPlayer();
}

function switchPlayer() {
  currentPlayer = currentPlayer === player1 ? player2 : player1;
}

function checkGameOver() {
  if (player1.health <= 0 || player2.health <= 0) {
    const winner = player1.health > 0 ? 'Player 1' : 'Player 2';
    gameOverElement.innerText = `${winner} wins!`;
    gameOverElement.style.display = 'flex';
    const retryButton = document.createElement('button');
    retryButton.innerText = 'Retry';
    retryButton.addEventListener('click', resetGame);
    gameOverElement.appendChild(retryButton);
  }
}

function resetGame() {
  player1.health = 100;
  player2.health = 100;
  updateHealth();
  actionLogElement.innerHTML = '';
  gameOverElement.style.display = 'none';
  timer = 60;
  startTimer();
}

function startTimer() {
  const timerInterval = setInterval(() => {
    timer--;
    timerElement.innerText = timer;
    if (timer <= 0) {
      clearInterval(timerInterval);
      checkGameOver();
    }
  }, 1000);
}

document.getElementById('attackButton').addEventListener('click', () => handleAction('attack'));
document.getElementById('defendButton').addEventListener('click', () => handleAction('defend'));
document.getElementById('healButton').addEventListener('click', () => handleAction('heal'));

drawSquare(player1);
drawSquare(player2);
updateHealth();
startTimer();
