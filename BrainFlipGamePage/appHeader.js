const movesLeftDiv = document.getElementById('movesLeftDiv');
const scoreDiv = document.getElementById('scoreDiv');
const pauseDiv = document.getElementById('pauseDiv');

const scoreH1 = document.createElement('scoreH1');
const scoreP = document.createElement('scoreP');

const movesLeftH1 = document.createElement('movesLeftH1');
const movesLeftP = document.createElement('movesLeftP');

function updateMovesLeftDisplay() {
    movesLeftH1.textContent = `Moves:`;
    movesLeftDiv.appendChild(movesLeftH1);
    movesLeftP.textContent = `${numberOfTurns}`;
    movesLeftDiv.appendChild(movesLeftP);
}

function updateScoreDisplay() {
    scoreH1.textContent = `Score:`;
    scoreDiv.appendChild(scoreH1);
    scoreP.textContent = `${score} ⭐`;
    scoreDiv.appendChild(scoreP);
}

pauseDiv.addEventListener('click', () => {
    removePointsFromUserScore(2);
    pauseGameTimer();
    gameAudio.pause();
    createScreenOnTheGame("yellow", "Game paused", "Gotta pee, huh?", false, "Your score so far: " + score + " ⭐", "Remaining moves: " + numberOfTurns, "Time: " + timerP.textContent + "/" + (timeLimit / 60) + "m");
})
