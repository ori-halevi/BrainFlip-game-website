function validateLoginForm() {
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    
    if (username === "") {
        alertUser("Please enter your username.");
        return false;
    }
    
    if (password === "") {
        alertUser("Please enter your password.");
        return false;
    } 
    return true;
}



function validateSignUpForm() {
    const username = document.getElementById('signUpUsername').value.trim();
    const email = document.getElementById('signUpEmail').value.trim();
    const password = document.getElementById('signUpPassword').value.trim();

    if (username === "") {
        alertUser("Please enter your username.");
        return false;
    }

    if (email === "") {
        alertUser("Please enter your email.");
        return false;
    } else {
        // אימות פורמט האימייל (בצורה בסיסית)
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alertUser("Please enter a valid email address.");
            return false;
        }
    }

    if (password === "") {
        alertUser("Please enter your password.");
        return false;
    }

    return true;
}