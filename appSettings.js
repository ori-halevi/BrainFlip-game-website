// This script responsible for settings page logic

const cardsAmount = document.getElementById("cardsAmountSelect");
const timeLimit = document.getElementById("timeLimitSelect");

const scoreboardDiv = document.getElementById("scoreboardDiv");

const startGameBtn = document.getElementById("startGameBtn");
const showScoreboardBtn = document.getElementById("showScoreboardBtn");
const scoreboardBackBtn = document.getElementById("scoreboardBackBtn");

const learnEnglishToggleSwitch = document.getElementById('learnEnglishToggleSwitch');


const gameAudioTggleButtonOn = document.getElementById('gameAudioTggleButtonOn');
const gameAudioTggleButtonOff = document.getElementById('gameAudioTggleButtonOff');





// Show the scoreboard when the scoreboard button is clicked
showScoreboardBtn.addEventListener("click", function(event) {
    event.preventDefault();
    formSettings.style.display = "none";
    scoreboardDiv.style.display = "flex";
    loadTopTen(); 
});

// Go back to the settings page when the back button is clicked
scoreboardBackBtn.addEventListener("click", function(event) {
    event.preventDefault();
    scoreboardDiv.style.display = "none";
    formSettings.style.display = "flex";
});

// Start the game when the start button is clicked
startGameBtn.addEventListener("click", async function (event) {
    event.preventDefault();
    // Update the local storage with the selected values for cards amount and time limit
    await updateLocalStorage();
    // Enters GameSettingsPage/index.html
    window.location.href = "./BrainFlipGamePage/index.html";
});












async function loadTopTen() {
    const users = await loadUsers();
    const topTenUsers = users.sort((a, b) => b["highest-score"] - a["highest-score"]).slice(0, 10);

    // Display the names and scores of the ten users with the highest scores
    document.getElementById("scoreboardList").innerHTML = ''; // Clear the previous list of users
    topTenUsers.forEach(user => {
        const li = document.createElement("li");
        li.textContent = `${user["highest-score"]}⭐: ${user.username}`;
        document.getElementById("scoreboardList").appendChild(li);
    });
}

async function loadUsers() {
    try {
        const response = await fetch('./usersDB.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading users:', error);
        return null;  // Return null in case of error
    }
}

async function updateLocalStorage() {
    localStorage.setItem("cardsAmount", cardsAmount.value);
    localStorage.setItem("timeLimit", timeLimit.value);
    localStorage.setItem("learnEnglish", learnEnglishToggleSwitch.checked);
    if (localStorage.getItem("learnEnglish") === "true") {
        await loadLearnEnglishDictionaryToLocalStotrage();
    }
};


function updateUserNameDisplayOnGameSettingsForm() {
    const userData = localStorage.getItem('user');
    const currentUser = userData ? JSON.parse(userData) : { username: 'Guest' };
    document.getElementById('usernameDisplay').textContent = currentUser.username;
}



// Not in use!!!
// Load the all users to localStorage
async function insertUsersToLocalStorage() {
    const users = await loadUsers();
    localStorage.setItem("users", JSON.stringify(users));
}


learnEnglishToggleSwitch.addEventListener('change', async function() {
    if (this.checked) {
        gameAudioTggleButtonOn.currentTime = 0;
        gameAudioTggleButtonOn.play();
    } else {
        gameAudioTggleButtonOff.currentTime = 0;
        gameAudioTggleButtonOff.play();
    }
});