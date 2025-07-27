const gameBoard = document.getElementById('game');
const statusText = document.getElementById('status');
const playerSpan = document.getElementById('player');
let currentPlayer = 'X';
let board = Array(9).fill(null);
let gameOver = false;

function drawBoard() {
  gameBoard.innerHTML = '';
  board.forEach((cell, index) => {
    const div = document.createElement('div');
    div.classList.add('cell');
    if (cell) {
      div.textContent = cell;
      div.classList.add(cell);
    }
    div.addEventListener('click', () => handleClick(index));
    gameBoard.appendChild(div);
  });
}

function handleClick(index) {
  if (board[index] || gameOver) return;

  board[index] = currentPlayer;
  drawBoard();

  if (checkWin(currentPlayer)) {
    statusText.innerHTML = `🎉 Joueur <span id="player">${currentPlayer}</span> a gagné !`;
    gameOver = true;
    return;
  }

  if (board.every(cell => cell)) {
    statusText.textContent = "Match nul ! 🤝";
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  playerSpan.textContent = currentPlayer;
  playerSpan.style.color = currentPlayer === 'X' ? '#007bff' : '#e91e63';
}

function checkWin(player) {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  return winPatterns.some(pattern =>
    pattern.every(index => board[index] === player)
  );
}

function resetGame() {
  board = Array(9).fill(null);
  currentPlayer = 'X';
  gameOver = false;
  playerSpan.textContent = currentPlayer;
  playerSpan.style.color = '#007bff';
  statusText.innerHTML = `✨ Joueur <span id="player">${currentPlayer}</span> commence`;
  drawBoard();
}

drawBoard();
