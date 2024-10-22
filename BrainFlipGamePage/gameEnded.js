






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
    gameAudio.pause();
    createScreenOnTheGame("green", "Game won", "You won!", true, "Your score so far: " + score + " ⭐", "Remaining moves: " + numberOfTurns, timerDiv.textContent);

}




function handleGameLost() {
    // Stop the game timer
    stopGameTimer();
    gameAudio.pause();
    createScreenOnTheGame("red", "Game lost", "time out! / Out of move!", true, "Your score so far: " + score + " ⭐", "Remaining moves: " + numberOfTurns, timerDiv.textContent);
}




function removePointsFromUserScore(number) {
    if (score - number < 0) {
        score = 0;
    } else {
        score -= number;
    }
}