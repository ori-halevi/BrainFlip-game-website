const timerP = document.getElementById('timerP');

let timerInterval, remainingTimeAsString, avregeTime, avregeTimeAsString;
let secondsElapsed = 0;
let secondsElapsedAsString = 0;


/**
 * Starts the game timer when the game page is loaded.
 */
function startGameTimer() {
    if (isNaN(timeLimit)) {
        console.error('Invalid time limit');
        return;
    }

    timerInterval = setInterval(() => {
        secondsElapsed++;
        secondsElapsedAsString = convertTimeToString(secondsElapsed);
        console.log(secondsElapsed);
        console.log(secondsElapsedAsString);
        avregeTime = parseFloat(((secondsElapsed / cardsAmount) % 60).toFixed(2));
        avregeTimeAsString = ((secondsElapsed / cardsAmount) % 60).toFixed(2) + "s";
        remainingTime = timeLimit - secondsElapsed;
        remainingTimeAsString = convertTimeToString(remainingTime);
        displayTimer(); // Added to update the display each second
        checkIfTimeUp();
    }, 1000); // Every 1 second
}

/**
 * Displays the remaining time on the screen.
 */
function displayTimer() {
    remainingTimeAsString = convertTimeToString(remainingTime);
    timerP.textContent = remainingTimeAsString;
}

function convertTimeToString(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}m ${seconds}s`;
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

// Checks if the time is up.
function checkIfTimeUp() {
    if (secondsElapsed >= timeLimit) {
        stopGameTimer();
        handleGameLost("Time's up!");
    }
}

/**
 * Pauses the game timer.
 */
function pauseGameTimer() {
    stopGameTimer(); // Call the stop function to clear the interval
}

/**
 * Resumes the game timer.
 */
function resumeGameTimer() {
    timerInterval = setInterval(() => {
        secondsElapsed++;
        displayTimer(); // Update the display
        checkIfTimeUp();
    }, 1000); // Every 1 second
}
