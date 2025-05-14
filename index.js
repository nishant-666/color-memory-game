const boxInput = document.getElementById("box-input");
const startButton = document.getElementById("start-btn");
const gameContainer = document.getElementById("game-container");

let rows = 0;
let gameBoardArray = [];

let selectedCells = [];

gameContainer.innerHTML = "";

boxInput.addEventListener("input", (event) => {
  rows = Number(event.target.value);
});

startButton.addEventListener("click", () => {
  const columns = 4;
  const totalCells = rows * columns;

  // Step 1: Create list of positions
  const positions = [];
  for (let i = 0; i < totalCells; i++) {
    positions.push(i);
  }

  // Step 2: Generate unique colors (in hex format)
  const uniqueColors = totalCells / 2;
  const colorPairs = [];

  for (let i = 0; i < uniqueColors; i++) {
    const color = getRandomColor();
    colorPairs.push(color, color); // Add the same color twice
  }

  // Step 3: Shuffle the color pairs
  shuffleArray(colorPairs);

  // Step 4: Fill the flat grid with shuffled colors
  const flatGrid = colorPairs;

  // Step 5: Convert flat grid into 2D grid
  gameBoardArray = [];
  for (let i = 0; i < rows; i++) {
    const row = flatGrid.slice(i * columns, (i + 1) * columns);
    gameBoardArray.push(row);
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const boardCell = document.createElement("div");
      boardCell.classList.add("board-element");
      boardCell.style.backgroundColor = "grey";
      boardCell.dataset.row = i;
      boardCell.dataset.col = j;
      boardCell.dataset.revealed = "false";

      boardCell.addEventListener("click", () => {
        const row = boardCell.dataset.row;
        const col = boardCell.dataset.col;

        // Ignore clicks on already matched cells
        if (boardCell.dataset.revealed === "true" || selectedCells.length === 2)
          return;

        boardCell.style.backgroundColor = gameBoardArray[row][col];

        selectedCells.push({
          cell: boardCell,
          color: gameBoardArray[row][col],
        });

        console.log(selectedCells);

        if (selectedCells.length === 2) {
          const [first, second] = selectedCells;

          if (first.color === second.color) {
            first.cell.dataset.revealed = "true";
            second.cell.dataset.revealed = "true";
          } else {
            // Delay hiding unmatched cells
            setTimeout(() => {
              first.cell.style.backgroundColor = "grey";
              second.cell.style.backgroundColor = "grey";
            }, 500);
          }

          // Reset selection regardless
          setTimeout(() => {
            selectedCells = [];
          }, 500);
        }
      });

      gameContainer.appendChild(boardCell);
    }
  }
});

// Utility to generate random hex color
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Fisher–Yates shuffle
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
