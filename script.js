'use strict';
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const rollBtnEl = document.querySelector('.btn--roll');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const btnHoldEl = document.querySelector('.btn--hold');
const btnNewEl = document.querySelector('.btn--new');
let totalScore, activePlayer, currentScore, isGameOver;

//Set Initial state of the game
const init = function () {
  activePlayer = 0;
  currentScore = 0;
  isGameOver = false;
  totalScore = [0, 0];
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  diceEl.classList.add('hidden');
};
init();

//Switch the active player
const changeActivePlayer = function () {
  currentScore = 0;
  document.querySelector(
    `#current--${activePlayer}`
  ).textContent = currentScore;
  activePlayer = activePlayer == 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//roll the dice and update the current score of the active player
rollBtnEl.addEventListener('click', function () {
  if (!isGameOver) {
    let dice = Math.trunc(Math.random() * 6 + 1);
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');
    if (dice !== 1) {
      currentScore += dice;
      console.log(`.score--${activePlayer}`);
      document.querySelector(
        `#current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      changeActivePlayer();
    }
    console.log(dice);
  }
});

//update total score of the active player
btnHoldEl.addEventListener('click', function () {
  if (!isGameOver) {
    totalScore[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      totalScore[activePlayer];
    if (totalScore[activePlayer] >= 20) {
      isGameOver = true;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    }
    changeActivePlayer();
  }
});

btnNewEl.addEventListener('click', init);
