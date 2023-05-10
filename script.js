`use strict`;

// <<Selecting elements>>
// Buttons
const againButton = document.querySelector(".again");
const checkGuessButton = document.querySelector(".check");
// Inputs
const guessInput = document.querySelector(".guess-input");
// Labels
const guessesListLabel = document.querySelector(".guesses-list");
const highscoreLabel = document.querySelector(".highscore");
const messageLabel = document.querySelector(".message");
const numberLabel = document.querySelector(".number");
const rangeLabel = document.querySelector(".range");
const scoreLabel = document.querySelector(".score");

// Variables for handling game logic
let guessRange = 100; // In the current version this never changes, but I want to later make a version where the user can pick the range
let numToGuess = Math.trunc(Math.random() * guessRange) + 1;
let guessesCounter = 0;
let bestScore = Number.MAX_VALUE;
let gameOverBool = false;

// Variables for changing appearance
let flashState = false;
const myPurple = `#95257d`;
const myRed = `#e02e2e`;
const myGray = `#222`;
const myGreen = `#60b347`;

// Variables for showing user feedback messages
const lowMessages = [
  `Too low! Try again!`,
  `You have guessed too low. Try a higher number!`,
  `You're still too low, guess a greater number!`,
];

const highMessages = [
  `Too high! Try again!`,
  `You have guessed too high. Keep on trying!`,
  `Not quite there, go even lower!`,
];

const duplicateMessages = [
  `You already tried that number! Try a different one!`,
  `Did you think it would work this time? You already tried that!`,
  `Come on, be original! You already tried that number.`,
];

const invalidMessages = [
  `You have not entered a valid number 🫤`,
  `Dude, you gotta enter an actual number 🫤`,
  `You're just clicking that without entering a number, aren't you... 🫤`,
];

let lowCounter = 0;
let highCounter = 0;
let duplicateCounter = 0;
let invalidCounter = 0;

// Initiate game TODO : Refactor into a method
let guessesArray = [];
numberLabel.textContent = `?`;
rangeLabel.textContent = `Range 1 to ${guessRange}`;

// Main game logic method for handling user input
function checkGuess() {
  const userGuess = Number(guessInput.value); // is it necessary to cast here?

  // The button click will start a new game if the game is over
  if (gameOverBool) {
    reset();
    return;
  }

  // Invalid Input Handler
  if (!userGuess) {
    messageLabel.textContent =
      invalidMessages[invalidCounter % invalidMessages.length];
    invalidCounter++;
    handleFlash(myPurple);
    guessInput.select();
    return;
  }
  if (userGuess > guessRange || userGuess < 0) {
    messageLabel.textContent = `You must enter a number between 1 and ${guessRange}! 😠`;
    handleFlash(myPurple);
    guessInput.select();
    return;
  }

  // User attempts duplicate guess
  if (guessesArray.includes(userGuess)) {
    handleFlash(myPurple);
    messageLabel.textContent =
      duplicateMessages[duplicateCounter % duplicateMessages.length];
    duplicateCounter++;
    return;
  }

  // User has guessed correctly
  else if (userGuess === numToGuess) {
    gameOver();
    guessInput.setAttribute(`disabled`, ``);
    document.querySelector(`body`).style.backgroundColor = myGreen; // not sure what this is doing... seems wrong TODO
    // document.querySelector(`.btn`).style.color = myGreen;
    checkGuessButton.style.color = myGreen;
    numberLabel.style.color = myGreen;
    numberLabel.style.width = `30rem`;
    numberLabel.textContent = numToGuess;
    messageLabel.textContent = `🎉 You have guessed correctly!`;
    guessesCounter++;
    bestScore = Math.min(bestScore, guessesCounter);
    highscoreLabel.textContent = bestScore;
    scoreLabel.textContent = guessesCounter;
    return;
  }

  // Incorrect Guesses
  else if (userGuess > numToGuess) {
    messageLabel.textContent = highMessages[highCounter % highMessages.length];
    highCounter++;
  } else if (userGuess < numToGuess) {
    messageLabel.textContent = lowMessages[lowCounter % lowMessages.length];
    lowCounter++;
  }
  guessesCounter++;
  scoreLabel.textContent = guessesCounter;
  guessesArray.push(userGuess);
  guessesListLabel.textContent = guessesArray.join(`, `);
  guessInput.select();

  // Flash the screen red when user gets the answer incorrect
  handleFlash(myRed);

  // User has guessed too many times and loses
  if (guessesCounter >= Math.round(guessRange / 4)) {
    gameOver();
    guessInput.setAttribute(`disabled`, ``);
    messageLabel.textContent = `You have guessed too many times! You lose... 😥 (Try Googling "binary search")`;
    numberLabel.textContent = `☠️`;
    document.querySelector(`body`).style.backgroundColor = myRed;
    document.querySelector(`.btn`).style.color = myRed; // investigate this TODO
    checkGuessButton.style.color = myRed;
    // document.querySelector(`.label-score`).textContent = `⚠️ Guesses:`;  <-- Figure out why this line of code doesn't work
    scoreLabel.textContent = guessesCounter + ` (Max allowed)`;
  }
}

// Sets up a new game by resetting the game to original state
function reset() {
  guessInput.disabled = false;
  guessInput.value = "";
  guessInput.select();
  flashState = false;
  console.log(`entered reset method`);
  gameOverBool = false;
  checkGuessButton.textContent = `Guess!`;
  againButton.style.display = `block`;
  guessRange = 100; // this should be changeable by user input
  numToGuess = Math.trunc(Math.random() * guessRange) + 1;
  guessesCounter = 0;
  bestScore = Number.MAX_VALUE;
  numberLabel.textContent = `?`;
  rangeLabel.textContent = `Range 1 to ${guessRange}`;
  document.querySelector(`body`).style.backgroundColor = myGray;
  numberLabel.style.width = `15rem`;
  document.querySelector(`.btn`).style.color = myGray;
  checkGuessButton.style.color = myGray;
  numberLabel.style.color = myGray;
  messageLabel.textContent = `Guess a number!`;
  scoreLabel.textContent = guessesCounter;
  guessesArray = [];
  guessesListLabel.textContent = "";
}

// When user wins or loses
function gameOver() {
  checkGuessButton.textContent = `Play again!`;
  againButton.style.display = `none`;
  gameOverBool = true;
}

// Flashes the background of the screen when user enters invalid number or incorrect response
function handleFlash(color) {
  if (!flashState) {
    document.querySelector(`body`).style.backgroundColor = color;
    flashState = true;
    setTimeout(() => {
      document.querySelector(`body`).style.backgroundColor = myGray;
      flashState = false;
    }, 400);
  }
}

// Event Handlers
checkGuessButton.addEventListener(`click`, function () {
  checkGuess();
});
guessInput.addEventListener(`keypress`, function (event) {
  if (event.key === `Enter`) {
    checkGuess();
  }
});
againButton.addEventListener(`click`, function () {
  reset();
});
// q: The flash feature of this code isn't working anymore... why?
// A: not sure, but I think it has something to do with the fact that the flashState variable is being set to true and then immediately set to false again.  I think the setTimeout function is being called before the flashState variable is set to true, so it's not working.  I think I need to use a callback function to make sure the flashState variable is set to true before the setTimeout function is called.
