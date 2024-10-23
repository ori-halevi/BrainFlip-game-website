const movesLeftDiv = document.getElementById('movesLeftDiv');
const scoreDiv = document.getElementById('scoreDiv');
const pauseDiv = document.getElementById('pauseDiv');

const movesLeftIconDiv = document.createElement('div');
movesLeftIconDiv.classList.add('moves-left-icon-div');


const scoreIconDiv = document.createElement('div');
scoreIconDiv.classList.add('score-icon-div');
const scoreP = document.createElement('p');

// const movesLeftH1 = document.createElement('movesLeftH1');
const movesLeftP = document.createElement('movesLeftP');

function updateMovesLeftDisplay() {
    movesLeftDiv.appendChild(movesLeftIconDiv);
    movesLeftP.textContent = `${numberOfTurns}`;
    movesLeftP.classList.add('moves-left-p');
    movesLeftDiv.appendChild(movesLeftP);
}

function updateScoreDisplay() {
    scoreDiv.appendChild(scoreIconDiv);
    scoreP.textContent = `${score} ⭐`;
    scoreP.classList.add('score-p');
    scoreDiv.appendChild(scoreP);
}

pauseDiv.addEventListener('click', () => {
    removePointsFromUserScore(2);
    pauseGameTimer();
    gameAudio.pause();
    createScreenOnTheGame("yellow", "Game paused", "Gotta pee, huh?", false, "Your score so far: " + score + " ⭐", "Remaining moves: " + numberOfTurns, "Time: " + timerP.textContent + "/" + (timeLimit / 60) + "m");
})
