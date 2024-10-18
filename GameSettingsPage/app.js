const cardsAmount = document.getElementById("cardsAmountSelect");
const timeLimit = document.getElementById("timeLimitSelect");

const startGameBtn = document.getElementById("startGameBtn");


insertUsersToLocalStorage();
insertTopTen();

startGameBtn.addEventListener("click", function (event) {
    event.preventDefault();
    updateLocalStorage();
    // Enters GameSettingsPage/index.html
    window.location.href = "../BrainFlipGamePage/index.html";
});

async function loadUsers() {
    try {
        const response = await fetch('../usersDB.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading users:', error);
        return null;  // Return null in case of error
    }
}

async function insertUsersToLocalStorage() {
    const users = await loadUsers();
    localStorage.setItem("users", JSON.stringify(users));
}


function updateLocalStorage() {
    localStorage.setItem("cardsAmount", cardsAmount.value);
    localStorage.setItem("timeLimit", timeLimit.value);
};


async function insertTopTen() {
    const users = await loadUsers();
    getTopTen(users)
}

function getTopTen(users) {
        // ממיינים את המשתמשים לפי הציון בסדר יורד
    const topTenUsers = users.sort((a, b) => b["highest-score"] - a["highest-score"]).slice(0, 10);

    // מדפיסים את השמות והציונים של עשרת המשתמשים עם הציונים הכי גבוהים
    topTenUsers.forEach(user => {
        const li = document.createElement("li");
        li.textContent = `${user["highest-score"]}⭐: ${user.username}`;
        document.getElementById("topTenList").appendChild(li);
    });
}