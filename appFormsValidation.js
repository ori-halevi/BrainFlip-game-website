function validateLoginForm(username, password) {
    // trim is used to remove any leading or trailing spaces
    if (username.trim() === "") {
        alertUser("Please enter your username.");
        return false;
    }
    
    if (password.trim() === "") {
        alertUser("Please enter your password.");
        return false;
    } 
    return true;
}



function validateSignUpForm(username, email, password) {
    if (username.trim() === "") {
        alertUser("Please enter your username.");
        return false;
    }

    if (email.trim() === "") {
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

    if (password.trim() === "") {
        alertUser("Please enter your password.");
        return false;
    }

    return true;
}