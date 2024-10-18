let timerInterval;
let secondsElapsed = 0;
const timeLimit = localStorage.getItem('timeLimit') * 60;

/**
 * Starts the game timer when the game page is loaded.
 */
function startGameTimer() {
    if (isNaN(timeLimit)) {
        timeLimit = 300; // Default to 5 minutes if timeLimit is not set or invalid
    }

    timerInterval = setInterval(() => {
        secondsElapsed++;
        displayTimer();
        checkIfTimeUp();
    }, 1000); // Every 1 second
}

/**
 * Displays the remaining time on the screen.
 */
function displayTimer() {
    const remainingTime = timeLimit - secondsElapsed;
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    
    const timerElement = document.getElementById('timerDiv');
    if (timerElement) {
        timerElement.textContent = `Time Remaining: ${minutes}m ${seconds}s`;
    }
}

/**
 * Stops the game timer when the game is over.
 */
function stopGameTimer() {
    clearInterval(timerInterval);
}

/**
 * Resets the timer when the game restarts.
 */
function resetGameTimer() {
    secondsElapsed = 0;
    displayTimer();
}

/**
 * Checks if the time is up.
 */
function checkIfTimeUp() {
    if (secondsElapsed >= timeLimit) {
        stopGameTimer();
        console.log("Time's up!");
        handleGameLost();
    }
}
