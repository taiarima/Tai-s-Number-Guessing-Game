'use strict';

const numToGuess = Math.trunc(Math.random() * 20) + 1;
let guessesCounter = 0;
let bestScore = Number.MAX_VALUE;
document.querySelector(`.number`).textContent = numToGuess;

document.querySelector(`.check`).addEventListener(`click`, function () {
  const userGuess = Number(document.querySelector(`.guess`).value);
  if (!userGuess) {
    document.querySelector(
      `.message`
    ).textContent = `You have not entered a valid number 🫤`;
    return;
  } else if (userGuess === numToGuess) {
    document.querySelector(
      `.message`
    ).textContent = `🎉 You have guessed correctly!`;
    guessesCounter++;
    bestScore = Math.min(bestScore, guessesCounter);
    document.querySelector(`.highscore`).textContent = bestScore;
    document.querySelector(`.score`).textContent = guessesCounter;
    return;
  } else if (userGuess > numToGuess) {
    document.querySelector(`.message`).textContent =
      'You have guessed too high...';
  } else if (userGuess < numToGuess) {
    document.querySelector(`.message`).textContent =
      'You have guessed too low...';
  }
  guessesCounter++;
  document.querySelector(`.score`).textContent = guessesCounter;

  if (guessesCounter >= 10) {
    document.querySelector(
      `.message`
    ).textContent = `You have guessed too many times! You lose... 😥 (Try Googling "binary search")`;
    document.querySelector(`.number`).textContent = `☠️`;
  }
});
