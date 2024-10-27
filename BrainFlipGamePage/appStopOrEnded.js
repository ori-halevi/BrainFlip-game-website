/**
 * Handles the game winning logic and updates the score.
 */
function handleGameWon() {
    addPointsToUserScore(Math.round((5 * (5 - difficultyLevel)) * 1) / 1);
    handleUpdateScoreInLocalStorage()
    let userHighestScore = localStorage.getItem('userHighestScore');

    if (userHighestScore < score) {
        localStorage.setItem('userHighestScore', score);
    }
    console.log("You won!");

    // Stop the game timer
    stopGameTimer();
    setTimeout(() => {
        gameAudio.pause();
        createScreenOnTheGame("green", "Game won", "You won!", true, "Your score: " + score + " ⭐", "Remaining moves: " + numberOfTurns, "Time: " + timerP.textContent + "/" + timeLimitInMinutes + "s", "Avrege time: " + avregeTime);
    }, 1300);
}



function handleGameLost(subTitle = "You lost!") {
    // Stop the game timer
    stopGameTimer();
    gameAudio.pause();
    removePointsFromUserScore(score / 2);
    createScreenOnTheGame("red", "Game lost", subTitle, true, "Your score: " + score + " ⭐", "Matches: " + matchs, "Avrege time: " + avregeTime);
}



function removePointsFromUserScore(number) {
    let numberOfPointsToSubtract = number;
    // Check if the reduction will cause the score to drop below zero
    if (score < number) {
        numberOfPointsToSubtract = score;
    }
    score -= numberOfPointsToSubtract;
    updateScoreDisplay();
    // צור הודעת הפסד ניקוד
    showScoreLossMessage("-" + numberOfPointsToSubtract);
}

function addPointsToUserScore(number) {
    let numberOfPointsToAdd = number;
    score += numberOfPointsToAdd;
    updateScoreDisplay();
    // צור הודעת הפסד ניקוד
    showScoreLossMessage("+" + numberOfPointsToAdd);
}


function showScoreLossMessage(pointsLostOrAdded) {
    if (pointsLostOrAdded <= 0) return;
    // צור אלמנט חדש
    const messageElement = document.createElement('div');
    
    // הוסף טקסט להודעה
    messageElement.textContent = `${pointsLostOrAdded}⭐`;
    
    // הוסף מחלקה CSS לאלמנט
    messageElement.classList.add('score-loss-message');

    // הוסף את האלמנט לגוף הדף
    document.body.appendChild(messageElement);
    
    // אנימציה להופעה
    requestAnimationFrame(() => {
        messageElement.classList.add('fade-in'); // הוספת אנימציה של הופעה
    });

    // הסר את האלמנט לאחר 3 שניות
    setTimeout(() => {
        messageElement.classList.remove('fade-in'); // הסרת אנימציה של הופעה
        messageElement.classList.add('fade-out'); // הוספת אנימציה של העלמה
        setTimeout(() => {
            messageElement.remove();
        }, 500); // המתנה עד שהאנימציה תסתיים לפני ההסרה
    }, 2000);
}

function handleUpdateScoreInLocalStorage() {
    const localUsers = JSON.parse(localStorage.getItem('localUsers'));
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    
    if (localUsers) {
        for (const email of Object.keys(localUsers)) {
            const user = Object.keys(localUsers);
            console.log(user);
            
            if (email === currentUser.email) {
                console.log(localStorage.getItem('learnEnglish'));
                
                if (localStorage.getItem('learnEnglish') == 'true') {
                    localUsers[email]['total-english-accumulated-score'] += score;
                    if (parseFloat(localUsers[email]['best-english-average-time-score'].slice(0, -1)) > parseFloat(avregeTime.slice(0, -1))) {
                        localUsers[email]['best-english-average-time-score'] = avregeTime;
                    }
                    if (localUsers[email]['highest-english-score'] < score) {
                        localUsers[email]['highest-english-score'] = score;
                    }
                } else {
                    console.log(parseFloat(localUsers[email]['best-card-memory-average-time-score'].slice(0, -1)));
                    console.log(parseFloat(avregeTime.slice(0, -1)));
                    localUsers[email]['total-card-memory-accumulated-score'] += score;
                    if (parseFloat(localUsers[email]['best-card-memory-average-time-score'].slice(0, -1)) > parseFloat(avregeTime.slice(0, -1))) {
                        localUsers[email]['best-card-memory-average-time-score'] = avregeTime;
                    }
                    if (localUsers[email]['highest-card-memory-score'] < score) {
                        localUsers[email]['highest-card-memory-score'] = score;
                    }
                }
                localStorage.setItem('localUsers', JSON.stringify(localUsers));
                break;
            }
        }
    } else {
        console.error('Error: localUsers is null');
    }

}







function createScreenOnTheGame(bgColor, title, subTitle, isPlayAgainBtn, ...args) {

    const darkScreenDiv = document.createElement('div');
    darkScreenDiv.classList.add('dark-screen');
    document.body.appendChild(darkScreenDiv);

    const popupScreenDiv = document.createElement('div');
    popupScreenDiv.classList.add('popup-screen');
    popupScreenDiv.classList.add("popupScreenDiv-" + bgColor);
    darkScreenDiv.appendChild(popupScreenDiv);


    const TitlesDiv = document.createElement('div');
    TitlesDiv.classList.add('titles-div');
    popupScreenDiv.appendChild(TitlesDiv);

    const titleH1 = document.createElement('h1');
    titleH1.textContent = title;
    TitlesDiv.appendChild(titleH1);

    const subTitleH2 = document.createElement('h2');    
    subTitleH2.textContent = subTitle;
    TitlesDiv.appendChild(subTitleH2);



    if (args.length > 0) {

        const popupArgsDiv = document.createElement('div');
        popupArgsDiv.classList.add('popup-args-div');
        popupScreenDiv.appendChild(popupArgsDiv);

        args.forEach(arg => {
            const p = document.createElement('p');
            p.classList.add('popup-args-p');
            p.textContent = arg;
            popupArgsDiv.appendChild(p);
        });
    }
    

    const navBtnsDiv = document.createElement('div');
    navBtnsDiv.classList.add('nav-btns-div');
    popupScreenDiv.appendChild(navBtnsDiv);
    
    const backToMenuBtn = document.createElement('button');
    backToMenuBtn.classList.add('back-to-menu-btn');
    backToMenuBtn.classList.add('backToMenuBtn-' + bgColor);
    backToMenuBtn.textContent = 'Back to Menu';
    navBtnsDiv.appendChild(backToMenuBtn);

    backToMenuBtn.addEventListener('click', () => {
        window.history.back();
    });


    if (isPlayAgainBtn) {
        const playAgainBtn = document.createElement('button');
        playAgainBtn.classList.add('play-again-btn');
        playAgainBtn.classList.add('playAgainBtn-' + bgColor);
        playAgainBtn.textContent = 'Play Again';
        navBtnsDiv.appendChild(playAgainBtn);

        playAgainBtn.addEventListener('click', () => {
            popupScreenDiv.classList.add('closing');
            darkScreenDiv.classList.add('closing');
    
            setTimeout(() => {
                window.location.reload();
            }, 500);
        });
    } else {

        const continueBtn = document.createElement('button');
        continueBtn.classList.add('continue-game-btn');
        continueBtn.classList.add('continueGameBtn-' + bgColor);
        continueBtn.textContent = 'Continue the game';
        navBtnsDiv.appendChild(continueBtn);
    
        continueBtn.addEventListener('click', () => {
            popupScreenDiv.classList.add('closing');
            darkScreenDiv.classList.add('closing');
            setTimeout(() => {
                darkScreenDiv.remove();
                resumeGameTimer();
                gameAudio.play();
                gameAudio.volume = 0.4;
            }, 500);
        });
    }
    setTimeout(() => {
        darkScreenDiv.classList.add('active');
        popupScreenDiv.classList.add('active');
    }, 10);
}

