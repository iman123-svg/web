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