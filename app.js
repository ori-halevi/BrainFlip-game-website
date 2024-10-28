// This script responsible for login and sign up forms logic

const notification = document.getElementById('notification');
const formLogin = document.getElementById('formLogin');
const formSignUp = document.getElementById('formSignUp');
const formSettings = document.getElementById('formSettings');
const signUpBtn = document.getElementById('signUpBtn');
const loginBtn = document.getElementById('loginBtn');
const allFormsDiv = document.getElementById('allFormsDiv');
const welcomLogoDiv = document.getElementById('welcomLogoDiv');
const logOutDiv = document.getElementById('log-out-div');
const createAccount = document.getElementById('createAccount');
const backToLogin = document.getElementById('backToLogin');
const logoDiv = document.getElementById('logoDiv')

const selectsElements = document.querySelectorAll('select');
const gameAudioMenuSelection = document.getElementById('gameAudioMenuSelection');


window.onload = function() {
    // in case the user is logged in
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        showHomePageScreen()
    } else {
        showLogoBigScreen();
        setTimeout(() => {
            showHomePageScreen();
        }, 3000);
    }
}



logoDiv.addEventListener('click', function(event) {
    event.preventDefault();
    window.location.reload();
})

logOutDiv.addEventListener('click', () => {
    const localUsers = localStorage.getItem('localUsers')
    localStorage.clear();
    localStorage.setItem('localUsers', localUsers);
    window.location.reload();
})

welcomLogoDiv.addEventListener('click', function(event) {
    event.preventDefault();
    showHomePageScreen();
})


// Login form logic
loginBtn.addEventListener('click', function(event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    if (!validateLoginForm(username, password)) return;

    CheckLoginDetails(username, password).then(exists => {
        if (exists) {
            const userInfo = exists;
            console.log("Login successful.");
            // Save user info in local storage
            localStorage.setItem('currentUser', JSON.stringify(userInfo));
            showHomePageScreen();
        } else {
            alertUser("Invalid login details. Please try again.");
        }
    });
});


// Display sign up form
createAccount.addEventListener('click', function(event) {
    event.preventDefault(); // למנוע מעבר על הקישור
    formLogin.style.display = 'none'; // להסתיר את טופס ההתחברות
    formSignUp.style.display = 'flex'; // להציג את טופס ההרשמה
});


// Display login form again
backToLogin.addEventListener('click', function(event) {
    event.preventDefault(); // למנוע מעבר על הקישור
    formSignUp.style.display = 'none'; // להסתיר את טופס ההרשמה
    formLogin.style.display = 'flex'; // להציג את טופס ההתחברות
    document.documentElement.style.setProperty('--forms-font-proportions', '0.5rem');
});


// Sign up form logic
signUpBtn.addEventListener('click', function(event) {
    event.preventDefault();
    const username = document.getElementById('signUpUsername').value;
    const password = document.getElementById('signUpPassword').value;
    const email = document.getElementById('signUpEmail').value;
    if (!validateSignUpForm(username, email, password)) return;

    const localUsers = JSON.parse(localStorage.getItem('localUsers') || '{}');


    if (Object.keys(localUsers).includes(email)) {
        alertUser("Email already exists, please try again.");
        return;
    }
    for (const user of Object.values(localUsers)) {
        if (user.username === username) {
            alertUser("Username already exists, please try again.");
            return;
        }
    }
    localUsers[email] = { username, password, 'highest-card-memory-score': 0, 'best-card-memory-average-time-score': "99999999.0s", 'total-card-memory-accumulated-score': 0, 'best-english-average-time-score': "99999999.0s", 'total-english-accumulated-score': 0, 'highest-english-score': 0 };
    localStorage.setItem('localUsers', JSON.stringify(localUsers));
    console.log('User added successfully');

    const currentUser = { username, password, email };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    alertUser("The site is under maintenance, so your details have not been saved in the database, but you can play.");
    // Reload the page
    setTimeout(() => {
        location.reload();
    }, 5000);
});












function showHomePageScreen() {
    // in case the user is logged in
    const currentUser = localStorage.getItem('currentUser');
    
    welcomLogoDiv.style.display = 'none';
    
    allFormsDiv.style.display = 'flex';
    logoDiv.style.display = 'flex';
    seasonImagesContainer.style.display = 'flex';
    if (currentUser) {
        showGameSettingsForm();
    } else {
        showLoginForm();
    }
}


function showLogoBigScreen() {
    allFormsDiv.style.display = 'none';
    seasonImagesContainer.style.display = 'none';
    logoDiv.style.display = 'none';
    welcomLogoDiv.style.display = 'flex';
}


function showGameSettingsForm() {
    formLogin.style.display = 'none';
    formSettings.style.display = 'flex';
    document.documentElement.style.setProperty('--forms-font-proportions', '0.7rem');
    updateUserNameDisplayOnGameSettingsForm();
    logOutDiv.style.display = 'flex';
}


function showLoginForm() {
    formLogin.style.display = 'flex';
    document.documentElement.style.setProperty('--forms-font-proportions', '0.5rem');
    formSignUp.style.display = 'none';
    formSettings.style.display = 'none';
}




function alertUser(message) {
    notification.textContent = message;

    notification.style.display = 'block';

    // waits 3 seconds and then hides the message
    setTimeout(() => {
        notification.style.display = 'none';
    }, 5000);
}




async function CheckLoginDetails(username, password) {
    const localUsers = JSON.parse(localStorage.getItem('localUsers'));
    if (localUsers) {
        for (const email of Object.keys(localUsers)) {
            const user = localUsers[email]
            if (user.username === username && user.password === password) {
                user.email = email;
                return user;
            };
        };
    };
};




selectsElements.forEach(select => {
    select.addEventListener('change', () => {
        gameAudioMenuSelection.currentTime = 0;
        gameAudioMenuSelection.play();
    });
});
