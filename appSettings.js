// This script responsible for settings page logic

const cardsAmount = document.getElementById("cardsAmountSelect");
const difficultySelect = document.getElementById("difficultySelect");

const scoreboardDiv = document.getElementById("scoreboardDiv");

const startGameBtn = document.getElementById("startGameBtn");
const showScoreboardBtn = document.getElementById("showScoreboardBtn");
const scoreboardBackBtn = document.getElementById("scoreboardBackBtn");

const learnEnglishToggleSwitch = document.getElementById('learnEnglishToggleSwitch');


const gameAudioTggleButtonOn = document.getElementById('gameAudioTggleButtonOn');
const gameAudioTggleButtonOff = document.getElementById('gameAudioTggleButtonOff');





// Upload the selected difficulty level to local storage
difficultySelect.addEventListener("change", function () {
    localStorage.setItem("difficulty", difficultySelect.value);
});




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
    
    console.log(users);
    // יצירת מערך משתמשים מהאובייקט
    const userArray = Object.values(users);
    
    // סינון המשתמשים לפי score גבוה
    const topTenUsers = userArray
        .sort((a, b) => b["highest-card-memory-score"] - a["highest-card-memory-score"])
        .slice(0, 10);

    // הצגת שמות וניקוד של עשרת המשתמשים עם הניקוד הגבוה ביותר
    document.getElementById("scoreboardList").innerHTML = ''; // ניקוי רשימה קיימת
    topTenUsers.forEach(user => {
        const li = document.createElement("li");
        li.textContent = `${user["highest-card-memory-score"]}⭐: ${user.username}`;
        document.getElementById("scoreboardList").appendChild(li);
    });
}


async function loadUsers() {
    try {
        const response = await fetch('./usersDB.json');
        const data = await response.json();

        // איסוף משתמשים מ-localStorage
        const localUsers = JSON.parse(localStorage.getItem('localUsers')) || {};

        // שילוב של משתמשים מהקובץ ומהאחסון המקומי
        const combinedUsers = Object.assign({}, data, localUsers);
        return combinedUsers;
    } catch (error) {
        console.error('Error loading users:', error);
        return null;  // Return null in case of error
    }
}



async function updateLocalStorage() {
    localStorage.setItem("cardsAmount", cardsAmount.value);
    localStorage.setItem("learnEnglish", learnEnglishToggleSwitch.checked);
};


function updateUserNameDisplayOnGameSettingsForm() {
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    
    const currentUser = userData.username || 'Guest';
    document.getElementById('usernameDisplay').textContent = currentUser;
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