`use strict`;


window.onload = function () {
  // I am leaving this here even though it's not currently in use since I might do something with it later
  // your code here
};

// Variables for handling game logic
let guessRange = 100; // In the current version this never changes, but I want to later make a version where the user can pick the range
let numToGuess = Math.trunc(Math.random() * guessRange) + 1;
let guessesCounter = 0;
let bestScore = Number.MAX_VALUE;
let gameOverBool = false;

// Variables for changing appearance
const flashState = false;
const myPurple = `#95257d`;
const myRed = `#e02e2e`;
const myGray = `#222`;
const myGreen = `#60b347`;

// Stuff for handling text displayed
let guessesList = document.querySelector(`.guesses-list`);
let guessesArray = [];
document.querySelector(`.number`).textContent = `?`;
document.querySelector(`.between`).textContent = `Range 1 to ${guessRange}`;

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

// Event Handlers
document.querySelector(`.check`).addEventListener(`click`, function () {
  checkGuess();
});
document.querySelector(`.guess`).addEventListener(`keypress`, function (event) {
  if (event.key === `Enter`) {
    checkGuess();
  }
});
document.querySelector(`.again`).addEventListener(`click`, function () {
  reset();
});

// Main game logic method for handling user input
function checkGuess() {
  const userGuess = Number(document.querySelector(`.guess`).value);

  // The button click will start a new game if the game is over
  if (gameOverBool) {
    reset();
    return;
  }

  // Invalid Input Handler
  if (!userGuess) {
    document.querySelector(`.message`).textContent =
      invalidMessages[invalidCounter % invalidMessages.length];
    invalidCounter++;
    handleFlash(myPurple);
    document.querySelector(`.guess`).select();
    return;
  }
  if (userGuess > guessRange || userGuess < 0) {
    document.querySelector(
      `.message`
    ).textContent = `You must enter a number between 1 and ${guessRange}! 😠`;
    handleFlash(myPurple);
    document.querySelector(`.guess`).select();
    return;
  }

  // User attempts duplicate guess
  if (guessesArray.includes(userGuess)) {
    handleFlash(myPurple);
    document.querySelector(`.message`).textContent =
      duplicateMessages[duplicateCounter % duplicateMessages.length];
    duplicateCounter++;
    return;
  }

  // User has guessed correctly
  else if (userGuess === numToGuess) {
    gameOver();
    document.querySelector(`.guess`).setAttribute(`disabled`, ``);
    document.querySelector(`body`).style.backgroundColor = myGreen;
    document.querySelector(`.btn`).style.color = myGreen;
    document.querySelector(`.check`).style.color = myGreen;
    document.querySelector(`.number`).style.color = myGreen;
    document.querySelector(`.number`).style.width = `30rem`;
    document.querySelector(`.number`).textContent = numToGuess;
    document.querySelector(
      `.message`
    ).textContent = `🎉 You have guessed correctly!`;
    guessesCounter++;
    bestScore = Math.min(bestScore, guessesCounter);
    document.querySelector(`.highscore`).textContent = bestScore;
    document.querySelector(`.score`).textContent = guessesCounter;
    return;
  }

  // Incorrect Guesses
  else if (userGuess > numToGuess) {
    document.querySelector(`.message`).textContent =
      highMessages[highCounter % highMessages.length];
    highCounter++;
  } else if (userGuess < numToGuess) {
    document.querySelector(`.message`).textContent =
      lowMessages[lowCounter % lowMessages.length];
    lowCounter++;
  }
  guessesCounter++;
  document.querySelector(`.score`).textContent = guessesCounter;
  guessesArray.push(userGuess);
  guessesList.textContent = guessesArray.join(`, `);
  document.querySelector(`.guess`).select();

  // Flash the screen red when user gets the answer incorrect
  handleFlash(myRed);

  // User has guessed too many times and loses
  if (guessesCounter >= Math.round(guessRange / 4)) {
    gameOver();
    document.querySelector(`.guess`).setAttribute(`disabled`, ``);
    document.querySelector(
      `.message`
    ).textContent = `You have guessed too many times! You lose... 😥 (Try Googling "binary search")`;
    document.querySelector(`.number`).textContent = `☠️`;
    document.querySelector(`body`).style.backgroundColor = myRed;
    document.querySelector(`.btn`).style.color = myRed;
    document.querySelector(`.check`).style.color = myRed;
    // document.querySelector(`.label-score`).textContent = `⚠️ Guesses:`;  <-- Figure out why this line of code doesn't work
    document.querySelector(`.score`).textContent =
      guessesCounter + ` (Max allowed)`;
  }
}

// Sets up a new game by resetting the game to original state
function reset() {
  document.querySelector(`.guess`).disabled = false;
  document.querySelector(`.guess`).value = "";
  document.querySelector(`.guess`).select();
  flashState = false;
  console.log(`entered reset method`);
  gameOverBool = false;
  document.querySelector(`.check`).textContent = `Guess!`;
  document.querySelector(`.again`).style.display = `block`;
  guessRange = 100; // this should be changeable by user input
  numToGuess = Math.trunc(Math.random() * guessRange) + 1;
  guessesCounter = 0;
  bestScore = Number.MAX_VALUE;
  document.querySelector(`.number`).textContent = `?`;
  document.querySelector(`.between`).textContent = `Range 1 to ${guessRange}`;
  document.querySelector(`body`).style.backgroundColor = myGray;
  document.querySelector(`.number`).style.width = `15rem`;
  document.querySelector(`.btn`).style.color = myGray;
  document.querySelector(`.check`).style.color = myGray;
  document.querySelector(`.number`).style.color = myGray;
  document.querySelector(`.message`).textContent = `Guess a number!`;
  document.querySelector(`.score`).textContent = guessesCounter;
  guessesArray = [];
  guessesList.textContent = "";
}

// When user wins or loses
function gameOver() {
  document.querySelector(`.check`).textContent = `Play again!`;
  document.querySelector(`.again`).style.display = `none`;
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
    }, 300);
  }
}
