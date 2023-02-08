"use strict";

// Setting up a new game
function reset() {
  guessRange = 18; // this should be changeable by user input
  numToGuess = Math.trunc(Math.random() * guessRange) + 1;
  guessesCounter = 0;
  bestScore = Number.MAX_VALUE;
  document.querySelector(`.number`).textContent = numToGuess; // This should be changed to a question mark in the final version
  document.querySelector(`.between`).textContent = `Range 1 to ${guessRange}`;
  document.querySelector(`body`).style.backgroundColor = `#222`;
  document.querySelector(`.number`).style.width = `15rem`;
  document.querySelector(`.btn`).style.color = `#222`;
  document.querySelector(`.check`).style.color = `#222`;
  document.querySelector(`.number`).style.color = `#222`;
  document.querySelector(`.message`).textContent = `Guess a number!`;
  document.querySelector(`.score`).textContent = 0;
}

let guessRange = 19;
let numToGuess = Math.trunc(Math.random() * guessRange) + 1;
let guessesCounter = 0;
let bestScore = Number.MAX_VALUE;
document.querySelector(`.number`).textContent = numToGuess;
document.querySelector(`.between`).textContent = `Range 1 to ${guessRange}`;

// Play again button
document.querySelector(`.again`).addEventListener(`click`, function () {
  reset();
});

// Handling user input
document.querySelector(`.check`).addEventListener(`click`, function () {
  const userGuess = Number(document.querySelector(`.guess`).value);

  // Invalid Input Handler
  if (!userGuess) {
    document.querySelector(
      `.message`
    ).textContent = `You have not entered a valid number 🫤`;
    return;
  }

  if (userGuess > guessRange || userGuess < 0) {
    document.querySelector(
      `.message`
    ).textContent = `You must enter a number between 1 and ${guessRange}! 😠`;
    return;
  }

  // User has guessed correctly
  else if (userGuess === numToGuess) {
    document.querySelector(`body`).style.backgroundColor = `#60b347`;
    document.querySelector(`.btn`).style.color = `#60b347`;
    document.querySelector(`.check`).style.color = `#60b347`;
    document.querySelector(`.number`).style.color = `#60b347`;
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
      "You have guessed too high...";
  } else if (userGuess < numToGuess) {
    document.querySelector(`.message`).textContent =
      "You have guessed too low...";
  }
  guessesCounter++;
  document.querySelector(`.score`).textContent = guessesCounter;

  // User has guessed too many times and loses
  if (guessesCounter >= Math.round(guessRange / 4)) {
    document.querySelector(
      `.message`
    ).textContent = `You have guessed too many times! You lose... 😥 (Try Googling "binary search")`;
    document.querySelector(`.number`).textContent = `☠️`;
    document.querySelector(`body`).style.backgroundColor = `#e02e2e`;
    document.querySelector(`.btn`).style.color = `#e02e2e`;
    document.querySelector(`.check`).style.color = `#e02e2e`;
    // document.querySelector(`.label-score`).textContent = `⚠️ Guesses:`;  <-- Figure out why this line of code doesn't work
    document.querySelector(`.score`).textContent =
      guessesCounter + ` (Max allowed)`;
  }
});
