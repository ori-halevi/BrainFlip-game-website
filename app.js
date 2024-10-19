// This script responsible for login and sign up forms logic

const notification = document.getElementById('notification');
const formLogin = document.getElementById('formLogin');
const formSignUp = document.getElementById('formSignUp');
const formSettings = document.getElementById('formSettings');
const signUpBtn = document.getElementById('signUpBtn');
const loginBtn = document.getElementById('loginBtn');
const allFormsDiv = document.getElementById('allFormsDiv');


let invalidLoginAlert = null;

// in case the user is logged in
let user = localStorage.getItem('user');



window.onload = function() {
    allFormsDiv.style.display = 'none';  
    setTimeout(() => {
        allFormsDiv.style.display = 'flex';

        if (user) {
            formLogin.style.display = 'none';
            formSettings.style.display = 'flex';
            updateUserNameDisplayOnForm();
        } else {
            formLogin.style.display = 'flex';
            formSignUp.style.display = 'none';
            formSettings.style.display = 'none';
        }
        document.getElementById('logoDiv').style.display = 'flex';
        document.getElementById('welcomLogoDiv').style.display = 'none';
        
    }, 3000);
}







// Login form logic
loginBtn.addEventListener('click', function(event) {
    event.preventDefault();
    if (!validateLoginForm()) return;
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    CheckLoginDetails(username, password).then(exists => {
        if (exists) {
            console.log("Login successful.");
            const userInfo = exists;
            // Save user info in local storage
            localStorage.setItem('user', JSON.stringify(userInfo));
            formLogin.style.display = 'none';
            formSettings.style.display = 'flex';
            updateUserNameDisplayOnForm();

        } else {
            console.log(invalidLoginAlert);

            console.log("Login failed.");
            if (!invalidLoginAlert) {
                invalidLoginAlert = document.createElement("p");
                invalidLoginAlert.id = "invalidLoginAlert";
                invalidLoginAlert.textContent = "Invalid login details. Please try again.";
                invalidLoginAlert.style.color = "red";
                console.log(invalidLoginAlert);
                invalidLoginAlert.style.fontSize = "15px";
                formLogin.appendChild(invalidLoginAlert);

                setTimeout(() => {
                    invalidLoginAlert.remove();
                    invalidLoginAlert = null;
                }, 3000);
            }
        }
    });
});


// Display sign up form
document.getElementById('createAccount').addEventListener('click', function(event) {
    event.preventDefault(); // למנוע מעבר על הקישור
    formLogin.style.display = 'none'; // להסתיר את טופס ההתחברות
    formSignUp.style.display = 'flex'; // להציג את טופס ההרשמה
});



// Display login form again
document.getElementById('backToLogin').addEventListener('click', function(event) {
    event.preventDefault(); // למנוע מעבר על הקישור
    formSignUp.style.display = 'none'; // להסתיר את טופס ההרשמה
    formLogin.style.display = 'flex'; // להציג את טופס ההתחברות
});



// Sign up form logic
signUpBtn.addEventListener('click', function(event) {
    if (!validateSignUpForm()) return;
    event.preventDefault();
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



function alertUser(message) {
    notification.textContent = message;

    notification.style.display = 'block';

    // waits 3 seconds and then hides the message
    setTimeout(() => {
        notification.style.display = 'none';
    }, 5000);
}