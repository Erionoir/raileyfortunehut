const player1 = {
  health: 100,
  element: document.getElementById('player1')
};

const player2 = {
  health: 100,
  element: document.getElementById('player2')
};

const timerElement = document.getElementById('timer');
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

function handleAction(action) {
  switch (action) {
    case 'attack':
      if (currentPlayer === player1) {
        player2.health -= 10;
      } else {
        player1.health -= 10;
      }
      break;
    case 'defend':
      // Implement defend logic
      break;
    case 'heal':
      currentPlayer.health += 10;
      break;
  }
  updateHealth();
  switchPlayer();
}

function switchPlayer() {
  currentPlayer = currentPlayer === player1 ? player2 : player1;
}

function startTimer() {
  const timerInterval = setInterval(() => {
    timer--;
    timerElement.innerText = timer;
    if (timer <= 0) {
      clearInterval(timerInterval);
      // Implement end game logic
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
