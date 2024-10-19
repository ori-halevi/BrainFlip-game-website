const movesLeftDiv = document.getElementById('movesLeftDiv');
const scoreDiv = document.getElementById('scoreDiv');
const pauseDiv = document.getElementById('pauseDiv');


let numberOfTurns = difficultyLevel * cardsAmount;

function updateMovesLeftDisplay() {
    movesLeftDiv.innerHTML = `Remaining moves:<br>${numberOfTurns}`;
}

function updateScoreDisplay() {
    scoreDiv.innerHTML = `Your score so far:<br>${score} ⭐`;
}

pauseDiv.addEventListener('click', () => {
    createGamePauseScreen();
    pauseGameTimer();
    gameAudio.pause();
})












function createGamePauseScreen() {
    const darkScreen = document.createElement('div');
    darkScreen.classList.add('dark-screen');
    document.body.appendChild(darkScreen);

    const gameOverWindow = document.createElement('div');
    gameOverWindow.classList.add('game-pause-window');
    darkScreen.appendChild(gameOverWindow);

    const title = document.createElement('h1');
    title.textContent = "Game Paused";
    gameOverWindow.appendChild(title);

    const scoreText = document.createElement('p');
    scoreText.textContent = `Your score so far: ${score} ⭐`;
    gameOverWindow.appendChild(scoreText);

    const timeText = document.createElement('p');
    timeText.textContent = timerDiv.textContent;
    gameOverWindow.appendChild(timeText);

    const navBtnsDiv = document.createElement('div');
    navBtnsDiv.classList.add('nav-btns-div');
    gameOverWindow.appendChild(navBtnsDiv);
    
    const continueBtn = document.createElement('button');
    continueBtn.classList.add('continue-game-btn');
    continueBtn.textContent = 'Continue the game';
    continueBtn.addEventListener('click', () => {
        darkScreen.remove();
        resumeGameTimer();
        gameAudio.play();
        gameAudio.volume = 0.4;
    });
    navBtnsDiv.appendChild(continueBtn);
    
    const EndGameBtn = document.createElement('button');
    EndGameBtn.classList.add('end-game-btn');
    EndGameBtn.textContent = 'End the game';
    EndGameBtn.addEventListener('click', () => {
        window.history.back();
    });
    navBtnsDiv.appendChild(EndGameBtn);
}
