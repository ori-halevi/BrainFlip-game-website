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


window.onload = function() {
    showLogoBigScreen();
    setTimeout(() => {
        showHomePageScreen();
    }, 3000);
}



logoDiv.addEventListener('click', function(event) {
    event.preventDefault();
    window.location.reload();
})

logOutDiv.addEventListener('click', () => {
    localStorage.clear();
    window.location.reload();
})

welcomLogoDiv.addEventListener('click', function(event) {
    event.preventDefault();
    showHomePageScreen();
})

// Login form logic
loginBtn.addEventListener('click', function(event) {
    event.preventDefault();
    if (!validateLoginForm()) return;
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    CheckLoginDetails(username, password).then(exists => {
        if (exists) {
            const userInfo = exists;
            console.log("Login successful.");
            // Save user info in local storage
            localStorage.setItem('user', JSON.stringify(userInfo));
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
    if (!validateSignUpForm()) return;
    const username = document.getElementById('signUpUsername').value;
    const password = document.getElementById('signUpPassword').value;
    const email = document.getElementById('signUpEmail').value;

    const user = { username, password, email };

    fetch('./usersDB.json')
        .then(response => response.json())
        .then(data => {
            data.push(user);
            localStorage.setItem('users', JSON.stringify(data));
            localStorage.setItem('user', JSON.stringify(user));
            alertUser("The site is under maintenance, so your details have not been saved in the database, but you can play.");
            // Reload the page
            setTimeout(() => {
                location.reload();
            }, 5000);
        })
        .then(() => {
            console.log('User added successfully');
        })
        .catch(error => console.error('Error adding user:', error));
});












function showHomePageScreen() {
    // in case the user is logged in
    const user = localStorage.getItem('user');
    
    allFormsDiv.style.display = 'flex';

    logoDiv.style.display = 'flex';
    welcomLogoDiv.style.display = 'none';
    if (user) {
        showGameSettingsForm();
    } else {
        showLoginForm();
    }
}


function showLogoBigScreen() {
    allFormsDiv.style.display = 'none';
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
    try {
        const response = await fetch('./usersDB.json');
        const usersInfo = await response.json();

        // חיפוש המשתמש ברשימה
        const user = usersInfo.find(user => user.username === username && user.password === password);

        // החזרת אובייקט המשתמש אם נמצא, אחרת החזרת null
        return user || false;
    } catch (error) {
        console.error('Error checking login details:', error);
        return null;
    }
}