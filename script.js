// Game elements
const colorBox = document.querySelector('[data-testid="colorBox"]');
const colorOptions = document.querySelectorAll('[data-testid="colorOption"]');
const gameStatus = document.querySelector('[data-testid="gameStatus"]');
const scoreElement = document.querySelector('[data-testid="score"]');
const newGameButton = document.querySelector('[data-testid="newGameButton"]');

// Game state
let score = 0;
let correctColor = "";
let attempts = 0;

// Function to generate a random color
function generateRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Function to generate different colors for options
function generateColorOptions(correctColor) {
  const colors = [correctColor];
  while (colors.length < 6) {
    const newColor = generateRandomColor();
    if (!colors.includes(newColor)) {
      colors.push(newColor);
    }
  }
  return shuffleArray(colors);
}

// Function to shuffle array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Function to update game status
function updateGameStatus(isCorrect) {
  if (isCorrect) {
    gameStatus.textContent = "Correct!";
    gameStatus.className = "game-status correct";
    score++;
    scoreElement.textContent = score;
    attempts = 0; // Reset attempts for next round
    setTimeout(startNewGame, 1000);
  } else {
    attempts++;
    if (attempts === 1) {
      gameStatus.textContent = "Incorrect! One more try!";
      gameStatus.className = "game-status wrong";
    } else {
      gameStatus.textContent = "Game Over! The game will restart...";
      gameStatus.className = "game-status wrong";
      attempts = 0; // Reset attempts
      score = 0; // Reset score
      scoreElement.textContent = score;
      setTimeout(startNewGame, 1500);
    }
  }
}

// Function to start a new game
function startNewGame() {
  // Generate new correct color
  correctColor = generateRandomColor();
  colorBox.style.backgroundColor = correctColor;

  // Generate and assign color options
  const colors = generateColorOptions(correctColor);
  colorOptions.forEach((button, index) => {
    button.style.backgroundColor = colors[index];
  });

  // Reset game status
  gameStatus.textContent = "";
  gameStatus.className = "game-status";

  // Reset attempts for new round
  attempts = 0;
}

// Event listeners for color options
colorOptions.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedColor = button.style.backgroundColor;
    const correctColorRGB = colorBox.style.backgroundColor;

    // Compare selected color with correct color
    const isCorrect = selectedColor === correctColorRGB;
    updateGameStatus(isCorrect);
  });
});

// Event listener for new game button
newGameButton.addEventListener("click", () => {
  score = 0;
  attempts = 0;
  scoreElement.textContent = score;
  startNewGame();
});

// Start the game when the page loads
startNewGame();
