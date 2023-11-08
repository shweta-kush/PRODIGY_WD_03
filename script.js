const board = document.getElementById("board");
const cells = [];
const message = document.getElementById("message");
let currentPlayer = "X";
let isGameOver = false;
let humanVsAI = false;

// Initialize the game board
for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleCellClick);
    cells.push(cell);
    board.appendChild(cell);
}

// Event listener for the opponent selection
document.getElementById("human").addEventListener("click", () => {
    humanVsAI = false;
    startNewGame();
});

document.getElementById("ai").addEventListener("click", () => {
    humanVsAI = true;
    startNewGame();
});

// Event handler for cell clicks
function handleCellClick(event) {
    const cell = event.target;

    if (cell.innerText || isGameOver) return;

    cell.innerText = currentPlayer;

    if (checkWin(currentPlayer)) {
        message.innerText = `${currentPlayer} wins!`;
        isGameOver = true;
        buttonContainer.style.display = "flex";
    } else if (isBoardFull()) {
        message.innerText = "It's a draw!";
        isGameOver = true;
        buttonContainer.style.display = "flex";
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        if (humanVsAI && currentPlayer === "O" && !isGameOver) {
            setTimeout(makeAIMove, 1000);
        }
    }
}

// Start a new game
function startNewGame() {
    buttonContainer.style.display = "flex";
    for (const cell of cells) {
        cell.innerText = "";
    }
    message.innerText = "";
    currentPlayer = "X";
    isGameOver = false;
    if (humanVsAI && currentPlayer === "O") {
        setTimeout(makeAIMove, 1000);
    }
}

// Check if the current player has won
function checkWin(player) {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (cells[a].innerText === player && cells[b].innerText === player && cells[c].innerText === player) {
            return true;
        }
    }

    return false;
}

// Check if the board is full
function isBoardFull() {
    return cells.every(cell => cell.innerText !== "");
}

// AI's move (random)
function makeAIMove() {
    if (isGameOver || !humanVsAI) return;

    const emptyCells = cells.filter(cell => cell.innerText === "");
    if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        emptyCells[randomIndex].click();
    }
}


// Add Play Again and Exit buttons
const buttonContainer = document.getElementById("button-container");
const playAgainButton = document.createElement("button");
playAgainButton.classList.add("button");
playAgainButton.innerText = "Play Again";
playAgainButton.addEventListener("click", startNewGame);

const exitButton = document.createElement("button");
exitButton.classList.add("button");
exitButton.innerText = "Exit";
exitButton.addEventListener("click", () => {
    buttonContainer.style.display = "none";
    message.innerText = "Thanks for playing!";
});

buttonContainer.appendChild(playAgainButton);
buttonContainer.appendChild(exitButton);

// Function to start a new game
function startNewGame() {
    buttonContainer.style.display = "none"; // Hide the buttons
    for (const cell of cells) {
        cell.innerText = "";
    }
    message.innerText = "";
    currentPlayer = "X";
    isGameOver = false;
    if (humanVsAI && currentPlayer === "O") {
        setTimeout(makeAIMove, 1000);
    }
}
