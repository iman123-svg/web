document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const status = document.getElementById("status");
    const resetBtn = document.getElementById("resetBtn");
    const year = document.getElementById("year");
    year.textContent = new Date().getFullYear();

    let currentPlayer = "X";
    let gameActive = true;
    let cells = Array(9).fill("");

    const winCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8], // rows
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8], // cols
        [0, 4, 8],
        [2, 4, 6] // diagonals
    ];

    function renderBoard() {
        board.innerHTML = "";
        cells.forEach((val, i) => {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.textContent = val;
            cell.addEventListener("click", () => handleClick(i));
            board.appendChild(cell);
        });
    }

    function handleClick(i) {
        if (cells[i] || !gameActive) return;
        cells[i] = currentPlayer;
        renderBoard();
        if (checkWinner(currentPlayer)) {
            status.textContent = `Player ${currentPlayer} wins! 🎉`;
            gameActive = false;
        } else if (cells.every(cell => cell)) {
            status.textContent = "It's a draw 😬";
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            status.textContent = `Player ${currentPlayer}'s turn`;
        }
    }

    function checkWinner(player) {
        return winCombos.some(combo =>
            combo.every(index => cells[index] === player)
        );
    }

    resetBtn.addEventListener("click", () => {
        currentPlayer = "X";
        gameActive = true;
        cells = Array(9).fill("");
        status.textContent = "Player X's turn";
        renderBoard();
    });

    renderBoard();
});
const width = 20;
const height = 20;
const game = document.getElementById('game');
const scoreboard = document.getElementById('scoreboard');
let score = 0;

// 0 - empty
// 1 - wall
// 2 - dot
// 3 - ghost start position
// 4 - pacman start position

// Simple maze layout (20x20)
const layout = [
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
  1,2,2,2,2,2,2,2,1,2,2,2,2,2,1,2,2,2,2,1,
  1,2,1,1,1,2,1,2,1,2,1,1,1,2,1,2,1,1,2,1,
  1,2,1,0,1,2,1,2,1,2,1,0,1,2,1,2,1,0,2,1,
  1,2,1,0,1,2,1,2,1,2,1,0,1,2,1,2,1,0,2,1,
  1,2,1,0,1,2,1,2,1,2,1,0,1,2,1,2,1,0,2,1,
  1,2,1,0,0,2,1,2,0,0,1,0,0,2,1,2,1,0,2,1,
  1,2,1,1,1,2,1,2,1,1,1,1,1,2,1,2,1,1,2,1,
  1,2,2,2,1,2,2,2,1,2,2,2,2,2,1,2,2,2,2,1,
  1,1,1,2,1,1,1,0,1,2,1,1,1,1,1,0,1,1,1,1,
  1,2,2,2,2,2,2,0,2,2,2,2,2,2,2,0,2,2,2,1,
  1,2,1,1,1,1,2,0,1,1,1,1,1,1,2,0,1,1,2,1,
  1,2,2,2,2,1,2,0,2,2,2,2,2,1,2,0,2,2,2,1,
  1,1,1,1,2,1,2,1,1,1,1,1,2,1,2,1,1,1,1,1,
  1,2,2,1,2,1,2,2,2,0,2,2,2,1,2,1,2,2,2,1,
  1,2,1,1,2,1,1,1,2,0,2,1,1,1,2,1,2,1,2,1,
  1,2,2,2,2,2,2,1,2,2,2,1,2,2,2,1,2,2,2,1,
  1,1,1,1,1,1,2,1,1,1,2,1,1,1,1,1,1,1,1,1,
  1,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,1,
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
];

let cells = [];
let pacmanIndex = layout.indexOf(4);
let ghostIndexes = [];

function createBoard() {
  game.innerHTML = '';
  cells = [];
  ghostIndexes = [];
  for(let i=0; i<layout.length; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    if(layout[i] === 1) cell.classList.add('wall');
    else if(layout[i] === 2) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      cell.appendChild(dot);
    } else if(layout[i] === 3) {
      cell.classList.add('ghost');
      ghostIndexes.push(i);
    } else if(layout[i] === 4) {
      cell.classList.add('pacman');
    }
    game.appendChild(cell);
    cells.push(cell);
  }
}

function movePacman(e) {
  const directions = {
    'ArrowUp': -width,
    'ArrowDown': width,
    'ArrowLeft': -1,
    'ArrowRight': 1,
  };
  if(!directions[e.key]) return;

  let nextIndex = pacmanIndex + directions[e.key];

  // Check boundaries and walls
  if(nextIndex < 0 || nextIndex >= width * height) return;
  if(directions[e.key] === -1 && pacmanIndex % width === 0) return;
  if(directions[e.key] === 1 && pacmanIndex % width === width-1) return;
  if(layout[nextIndex] === 1) return; // wall

  // Move Pacman
  cells[pacmanIndex].classList.remove('pacman');

  // Remove dot if present
  if(layout[nextIndex] === 2) {
    score++;
    scoreboard.textContent = `Score: ${score}`;
    layout[nextIndex] = 0;
    if(cells[nextIndex].firstChild) cells[nextIndex].removeChild(cells[nextIndex].firstChild);
  }
  pacmanIndex = nextIndex;
  cells[pacmanIndex].classList.add('pacman');

  // Check collision with ghosts
  if(ghostIndexes.includes(pacmanIndex)) {
    alert('Game Over! Your score: ' + score);
    resetGame();
  }
}

function moveGhosts() {
  ghostIndexes.forEach((ghostIndex, idx) => {
    const possibleMoves = [];
    const directions = [-1,1,-width,width];
    directions.forEach(dir => {
      const next = ghostIndex + dir;
      if(next < 0 || next >= width*height) return;
      if(layout[next] === 1) return;
      if(ghostIndexes.includes(next)) return;
      if(next === pacmanIndex) {
        alert('Game Over! Your score: ' + score);
        resetGame();
        return;
      }
      possibleMoves.push(next);
    });

    if(possibleMoves.length) {
      cells[ghostIndex].classList.remove('ghost');
      ghostIndexes[idx] = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
      cells[ghostIndexes[idx]].classList.add('ghost');

      if(ghostIndexes[idx] === pacmanIndex) {
        alert('Game Over! Your score: ' + score);
        resetGame();
      }
    }
  });
}

function resetGame() {
  score = 0;
  scoreboard.textContent = `Score: ${score}`;
  createBoard();
  pacmanIndex = layout.indexOf(4);
}

createBoard();

window.addEventListener('keydown', movePacman);

setInterval(moveGhosts, 700);