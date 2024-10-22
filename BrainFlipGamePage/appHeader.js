const movesLeftDiv = document.getElementById('movesLeftDiv');
const scoreDiv = document.getElementById('scoreDiv');
const pauseDiv = document.getElementById('pauseDiv');

const scoreH1 = document.createElement('scoreH1');
const scoreP = document.createElement('scoreP');

const movesLeftH1 = document.createElement('movesLeftH1');
const movesLeftP = document.createElement('movesLeftP');

let numberOfTurns = difficultyLevel * cardsAmount;

function updateMovesLeftDisplay() {
    movesLeftH1.textContent = `Moves:`;
    movesLeftDiv.appendChild(movesLeftH1);
    movesLeftP.textContent = `${numberOfTurns}`;
    movesLeftDiv.appendChild(movesLeftP);
}

function updateScoreDisplay() {
    scoreH1.textContent = `Score:`;
    scoreDiv.appendChild(scoreH1);
    scoreP.textContent = `${score} ⭐`;
    scoreDiv.appendChild(scoreP);
}

pauseDiv.addEventListener('click', () => {
    createScreenOnTheGame("yellow", "Game paused", "Need to pee, do we?", false, "Your score so far: " + score + " ⭐", "Remaining moves: " + numberOfTurns, timerDiv.textContent);
    pauseGameTimer();
    gameAudio.pause();
})







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
            window.location.reload();
        });
    } else {

        const continueBtn = document.createElement('button');
        continueBtn.classList.add('continue-game-btn');
        continueBtn.classList.add('continueGameBtn-' + bgColor);
        continueBtn.textContent = 'Continue the game';
        navBtnsDiv.appendChild(continueBtn);
    
        continueBtn.addEventListener('click', () => {
            darkScreenDiv.remove();
            resumeGameTimer();
            gameAudio.play();
            gameAudio.volume = 0.4;
        });
    }
}

