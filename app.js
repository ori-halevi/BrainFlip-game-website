document.getElementById('createAccount').addEventListener('click', function(event) {
    event.preventDefault(); // למנוע מעבר על הקישור
    document.getElementById('formLoginDiv').style.display = 'none'; // להסתיר את טופס ההתחברות
    document.getElementById('formSignUpDiv').style.display = 'flex'; // להציג את טופס ההרשמה
});

document.getElementById('backToLogin').addEventListener('click', function(event) {
    event.preventDefault(); // למנוע מעבר על הקישור
    document.getElementById('formSignUpDiv').style.display = 'none'; // להסתיר את טופס ההרשמה
    document.getElementById('formLoginDiv').style.display = 'flex'; // להציג את טופס ההתחברות
});

const formLogin = document.getElementById('formLogin');
let invalidLoginAlert

const loginBtn = document.getElementById('loginBtn');
const signUpBtn = document.getElementById('signUpBtn');

loginBtn.addEventListener('click', function() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    CheckLoginDetails(username, password).then(exists => {
        if (exists) {
            console.log("Login successful.");
            const userInfo = exists;
            // Enter GameSettingsPage/index.html
            localStorage.setItem('user', JSON.stringify(userInfo));
            window.location.href = "GameSettingsPage/index.html";
            


        } else {
            console.log("Login failed.");
            if (!invalidLoginAlert) {
                invalidLoginAlert = document.createElement("p");
                invalidLoginAlert.id = "invalidLoginAlert";
                invalidLoginAlert.textContent = "Invalid login details. Please try again.";
                invalidLoginAlert.style.color = "red";
                invalidLoginAlert.style.fontSize = "15px";
                formLogin.appendChild(invalidLoginAlert);
            }
        }
    });
});


signUpBtn.addEventListener('click', function() {
    const username = document.getElementById('signUpUsername').value;
    const password = document.getElementById('signUpPassword').value;
    const email = document.getElementById('signUpEmail').value;

    const user = { username, password, email };

    fetch('./usersDB.json')
        .then(response => response.json())
        .then(data => {
            data.push(user);
            localStorage.setItem('users', JSON.stringify(data));
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


