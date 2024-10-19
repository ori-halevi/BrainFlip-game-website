






/**
 * Handles the game winning logic and updates the score.
 */
function handleGameWon() {
    score += 5 * (5 - difficultyLevel);
    let userHighestScore = localStorage.getItem('userHighestScore');

    if (userHighestScore < score) {
        localStorage.setItem('userHighestScore', score);
    }
    console.log("You won!");

    // Stop the game timer
    stopGameTimer();
    createEndScreen("You won!");

}





function handleGameLost(params) {
    // Stop the game timer
    stopGameTimer();
    gameAudio.pause();
    createEndScreen("Game Over");
}




function createEndScreen(titleOnScreen) {
    const darkScreen = document.createElement('div');
    darkScreen.classList.add('dark-screen');
    document.body.appendChild(darkScreen);

    const gameOverWindow = document.createElement('div');
    gameOverWindow.classList.add('game-over-window');
    darkScreen.appendChild(gameOverWindow);

    const title = document.createElement('h1');
    title.textContent = titleOnScreen;
    gameOverWindow.appendChild(title);

    const scoreText = document.createElement('p');
    scoreText.textContent = `Your score: ${score}`;
    gameOverWindow.appendChild(scoreText);

    const navBtnsDiv = document.createElement('div');
    navBtnsDiv.classList.add('nav-btns-div');
    gameOverWindow.appendChild(navBtnsDiv);
    
    const playAgainBtn = document.createElement('button');
    playAgainBtn.classList.add('play-again-btn');
    playAgainBtn.textContent = 'Play Again';
    playAgainBtn.addEventListener('click', () => {
        window.location.reload();
    });
    navBtnsDiv.appendChild(playAgainBtn);
    
    const backToMenuBtn = document.createElement('button');
    backToMenuBtn.classList.add('back-to-menu-btn');
    backToMenuBtn.textContent = 'Back To Menu';
    backToMenuBtn.addEventListener('click', () => {
        window.history.back();
    });
    navBtnsDiv.appendChild(backToMenuBtn);
}



function removePointsFromUserScore(number) {
    if (score - number < 0) {
        score = 0;
    } else {
        score -= number;
    }
}