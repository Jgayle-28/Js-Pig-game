/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
// Declare variables
let scores, roundScore, activePlayer, gameActive;

// Initialize game
gameInit();

// Event listener for dice roll
document.querySelector('.btn-roll').addEventListener('click', () => {
  // Checking for active game
  if (gameActive) {
    // Random rumber / Dice roll
    let dice = Math.floor(Math.random() * 6) + 1;
    // Display the dice resutlt
    const diceDom = document.querySelector('.dice');
    diceDom.style.display = 'block';
    diceDom.src = `dice-${dice}.png`;
    // Update round score if the rolled number not 1
    if (dice !== 1) {
      roundScore += dice;
      document.getElementById(`current-${activePlayer}`).innerHTML = roundScore;
    } else {
      // Change players
      nextPlayer();
    }
  }
});

// Event listener for hold button
document.querySelector('.btn-hold').addEventListener('click', () => {
  // Checking for active game
  if (gameActive) {
    // Add current score to global score
    scores[activePlayer] += roundScore;
    // Update UI
    document.querySelector(`#score-${activePlayer}`).textContent =
      scores[activePlayer];
    // Check if player won the game
    if (scores[activePlayer] >= 100) {
      document.getElementById(`name-${activePlayer}`).textContent = 'WINNER';
      // Hide the dice for the beginning of other players turn
      document.querySelector('.dice').style.display = 'none';
      document
        .querySelector(`.player-${activePlayer}-panel`)
        .classList.add('winner');
      document
        .querySelector(`.player-${activePlayer}-panel`)
        .classList.remove('active');
      // Change game state
      gameActive = false;
    } else {
      // Change players
      nextPlayer();
    }
  }
});

// Event listener for new game button
document.querySelector('.btn-new').addEventListener('click', gameInit);

// Helper functions
function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  // Reset the current round score to 0
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  // Add and remove active class from player panel
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  // Hide the dice for the beginning of other players turn
  document.querySelector('.dice').style.display = 'none';
}

function gameInit() {
  // Initialize variables
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gameActive = true;

  // Reset Game UI elements to 0 or hidden
  document.querySelector('.dice').style.display = 'none';
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  // Reset names
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';

  document.querySelector(`.player-0-panel`).classList.remove('winner');
  document.querySelector(`.player-1-panel`).classList.remove('winner');
  document.querySelector(`.player-0-panel`).classList.remove('active');
  document.querySelector(`.player-0-panel`).classList.add('active');
  document.querySelector(`.player-1-panel`).classList.remove('active');
}
