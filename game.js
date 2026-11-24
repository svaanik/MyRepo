const MIN_NUMBER = 1;
const MAX_NUMBER = 100;

const form = document.querySelector("#guess-form");
const guessInput = document.querySelector("#guess-input");
const guessButton = document.querySelector("#guess-button");
const feedback = document.querySelector("#feedback");
const attemptsText = document.querySelector("#attempts");
const resetButton = document.querySelector("#reset-button");
const currentRange = document.querySelector("#current-range");
const suggestion = document.querySelector("#suggestion");
const guessHistory = document.querySelector("#guess-history");

let secretNumber = createSecretNumber();
let attempts = 0;
let gameOver = false;
let lowestPossible = MIN_NUMBER;
let highestPossible = MAX_NUMBER;
const guessedNumbers = new Set();

function createSecretNumber() {
  return (
    Math.floor(Math.random() * (MAX_NUMBER - MIN_NUMBER + 1)) + MIN_NUMBER
  );
}

function resetGame() {
  secretNumber = createSecretNumber();
  attempts = 0;
  gameOver = false;
  lowestPossible = MIN_NUMBER;
  highestPossible = MAX_NUMBER;
  guessedNumbers.clear();

  guessInput.value = "";
  guessInput.disabled = false;
  guessButton.disabled = false;
  resetButton.hidden = true;
  feedback.textContent = "Enter a number to begin.";
  attemptsText.textContent = "Attempts: 0";
  currentRange.textContent = "Possible range: 1–100";
  suggestion.textContent = "Fastest starting guess: 50";
  guessHistory.textContent = "Guesses: none";
  guessInput.focus();
}

function getSuggestedGuess() {
  return Math.floor((lowestPossible + highestPossible) / 2);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (gameOver) {
    return;
  }

  const guess = Number(guessInput.value);

  if (
    guessInput.value.trim() === "" ||
    !Number.isInteger(guess) ||
    guess < MIN_NUMBER ||
    guess > MAX_NUMBER
  ) {
    feedback.textContent = "Please enter a whole number from 1 to 100.";
    return;
  }

  if (guess < lowestPossible || guess > highestPossible) {
    feedback.textContent =
      `That guess is outside the remaining range: ${lowestPossible}–${highestPossible}.`;
    guessInput.select();
    return;
  }

  if (guessedNumbers.has(guess)) {
    feedback.textContent = `You already guessed ${guess}. Try a different number.`;
    guessInput.select();
    return;
  }

  guessedNumbers.add(guess);
  attempts += 1;
  attemptsText.textContent = `Attempts: ${attempts}`;
  guessHistory.textContent = `Guesses: ${Array.from(guessedNumbers).join(", ")}`;

  if (guess === secretNumber) {
    feedback.textContent = `You got it! The number was ${secretNumber}.`;
    gameOver = true;
    guessInput.disabled = true;
    guessButton.disabled = true;
    resetButton.hidden = false;
    currentRange.textContent = `Found it: ${secretNumber}`;
    suggestion.textContent = "Great game!";
  } else if (guess < secretNumber) {
    lowestPossible = guess + 1;
    const nextGuess = getSuggestedGuess();
    feedback.textContent = "Too low. Try a higher number.";
    currentRange.textContent =
      `Possible range: ${lowestPossible}–${highestPossible}`;
    suggestion.textContent = `Fastest next guess: ${nextGuess}`;
  } else {
    highestPossible = guess - 1;
    const nextGuess = getSuggestedGuess();
    feedback.textContent = "Too high. Try a lower number.";
    currentRange.textContent =
      `Possible range: ${lowestPossible}–${highestPossible}`;
    suggestion.textContent = `Fastest next guess: ${nextGuess}`;
  }

  guessInput.select();
});

resetButton.addEventListener("click", resetGame);
