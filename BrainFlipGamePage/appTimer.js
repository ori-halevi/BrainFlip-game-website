let timerInterval;
let secondsElapsed = 0;
// const timeLimit = localStorage.getItem('timeLimit') * 60;

let remainingTime = timeLimit - secondsElapsed;
let secondsPassed = 0;
const timerDiv = document.getElementById('timerDiv');
let avregeTime = (((secondsElapsed % 60) / cardsAmount).toFixed(2)) + "s";
console.log(difficultyLevel);

// const timerH1 = document.createElement('timerH1');
const timerIconDiv = document.createElement('div');
timerIconDiv.classList.add('timer-icon-div');
const timerP = document.createElement('timerP');
timerP.classList.add('timer-p');

/**
 * Starts the game timer when the game page is loaded.
 */
function startGameTimer() {
    if (isNaN(timeLimit)) {
        timeLimit = 300; // Default to 5 minutes if timeLimit is not set or invalid
    }

    timerInterval = setInterval(() => {
        secondsElapsed++;
        displayTimer(); // Added to update the display each second
        checkIfTimeUp();
    }, 1000); // Every 1 second
}

/**
 * Displays the remaining time on the screen.
 */
function displayTimer() {
    remainingTime = timeLimit - secondsElapsed;
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    avregeTime = (((secondsElapsed % 60) / cardsAmount).toFixed(2)) + "s";
    
    // timerH1.textContent = "time:"
    // timerDiv.appendChild(timerH1);
    timerDiv.appendChild(timerIconDiv);
    timerP.textContent = `${minutes}m ${seconds}s`;
    timerDiv.appendChild(timerP);
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
