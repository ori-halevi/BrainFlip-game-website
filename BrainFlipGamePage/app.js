
const themeStylesheetLink = document.getElementById('CSSTheme');

const cardsAmount = localStorage.getItem('cardsAmount');
const cardsContainer = document.getElementById('cardsContainer');

const gameAudio = document.getElementById('gameAudio');
const gameAudioMatch = document.getElementById('gameAudioMatch');
const gameAudioBonus = document.getElementById('gameAudioBonus');



let userMidTurn = false;

const easyMode = 3;
const mediumMode = 2;
const hardMode = 1.5;
let difficultyLevel = easyMode;

let previousCardInfo = [null, null];
let currentCardInfo = [null, null];

let score = 0;
let matchs = 0;
let movesCounter = 0;

let waitForAnimation = false;



window.onload = () => {
    loadTheme();
    gameAudio.play();
    gameAudio.volume = 0.4;
    MainSpreadCards();
    updateMovesLeftDisplay();
    updateScoreDisplay();
    displayTimer();
}





function createCard(cardID, cardCoupleName, engHebWordsKeyValue = null) {
    
    let card = document.createElement('div');
    card.classList.add('cardAreaFlip');
    card.dataset.couple = cardCoupleName;
    card.dataset.id = cardID;
    card.dataset.flipMode = false;

    card.addEventListener('click', () => onUserClickCard(card));

    let cardBack = document.createElement('div');
    cardBack.classList.add('card', 'back');
    card.appendChild(cardBack);
    let cardBackSecondLayer = document.createElement('div');
    cardBackSecondLayer.classList.add('cardBackSecondLayer');
    cardBack.appendChild(cardBackSecondLayer);

    let cardFront = document.createElement('div');
    cardFront.classList.add('card', 'front');
    let cardFrontImg = document.createElement('img');
    const theme = localStorage.getItem('theme');
    cardFrontImg.src = `../dep/${theme}-Theme/cardsFronts/${cardCoupleName}.png`;

    cardFrontImg.classList.add('cardImg');
    cardFront.appendChild(cardFrontImg);

    // let cardFrontText = document.createTextNode(card.dataset.couple);
    // cardFront.appendChild(cardFrontText);

    if (localStorage.getItem('learnEnglish') === 'true') {
        const wordsDiv = document.createElement('div');
        wordsDiv.classList.add('words-div');
        cardBackSecondLayer.appendChild(wordsDiv);

        if (card.dataset.id % 2 === 0) {
            let cardBackText = document.createTextNode(`${engHebWordsKeyValue.key}` );
            wordsDiv.appendChild(cardBackText);
        } else {
            let cardBackText = document.createTextNode(`${engHebWordsKeyValue.value}`);
            wordsDiv.appendChild(cardBackText);
        }
    }

    card.appendChild(cardFront);

    return card;
}


// פונקציית ערבוב בעזרת Fisher-Yates
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


function MainSpreadCards() {

    const cardsArray = [];  // מערך לאחסון הקלפים לפני הוספה ל-DOM
    let j = 0; // משתנה שיגדל ב-1
    let i = 0; // משתנה שיגדל ב-2
    
    for (let count = 0; count < cardsAmount; count++) {
        // get random word in english and hebrew     
        const engHebWordsKeyValue = getRandomKeyAndRemoveFromStorage();
        
     // create first card
        let firstCard = createCard(i, j, engHebWordsKeyValue);
        cardsArray.push(firstCard); // Add card into the array
        
        // create first card
        let secondCard = createCard(i + 1, j, engHebWordsKeyValue);
        cardsArray.push(secondCard); // Add card into the array

        j++; // הגדלה ב-1
        i += 2; // הגדלה ב-2
    }

    // ערבוב המערך עם הקלפים
    shuffleArray(cardsArray);

    // הוספת הקלפים המעורבבים ל-DOM
    cardsArray.forEach(card => cardsContainer.appendChild(card));
}

function hideCardByDataId(cardId) {
    
    const card = document.querySelector(`[data-id="${cardId}"]`);
    card.classList.remove('flip');
    card.dataset.flipMode = false;  
      

}




function cardRevealValidate(card) {
    if (waitForAnimation) return false;

    // Check if the card is already flipped
    if (card.dataset.flipMode === "true") return;

    return true;
}

function onUserClickCard(card) {
    // Check if the user can reveal the card (validation)
    if (!cardRevealValidate(card)) return;

    // Count open cards
    movesCounter++;
    console.log(movesCounter);

    if (movesCounter === 1) {
        // First card was clicked
        startGameTimer();
    }


    if (!userMidTurn) {
        // First card was clicked
        flipCard(card);
        userMidTurn = !userMidTurn;
        previousCardInfo = [card.dataset.couple, card.dataset.id];
    } else {
        // Second card was clicked
        waitForAnimation = true;
        currentCardInfo = [card.dataset.couple, card.dataset.id];

        // red color diabled cards
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.style.border = "2px solid red";
        });

        flipCard(card);

        handleSecondCardClick();  
        
        userMidTurn = !userMidTurn;
        numberOfTurns--;
        updateMovesLeftDisplay();
    }

    
    
    // Check if the game is won
    if (matchs == cardsAmount) {
        handleGameWon();
        return;
    }
    // Check if the game is over
    if (numberOfTurns < 1) {
        handleGameLost();
        return;
    }
}


function flipCard(card) {
    card.dataset.flipMode = "true";
    card.classList.toggle('flip');
}


function handleSecondCardClick() {
    // תפיסת כל האלמנטים עם המחלקה 'card'
    const cards = document.querySelectorAll('.card');

    if (previousCardInfo[0] === currentCardInfo[0]) {
        score += 21 - (timeLimit / 60) + (cardsAmount - 10);
        updateScoreDisplay();
        matchs++;
        gameAudioMatch.currentTime = 0;
        gameAudioMatch.play();
        
        waitForAnimation = false;

        // white color diabled cards
        cards.forEach(card => {
            card.style.border = "2px solid transparent";
        });

    } else {
        setTimeout(() => {

            hideCardByDataId(previousCardInfo[1]);
            hideCardByDataId(currentCardInfo[1]);
            
                waitForAnimation = false;


            // white color diabled cards
            cards.forEach(card => {
                card.style.border = "2px solid transparent";
            });

        } , 1000);
        }
}



function loadTheme() {
    const themeStylesheetLink = document.getElementById('CSSTheme');
    
    const theme = localStorage.getItem('theme');
    themeStylesheetLink.setAttribute("href", "../style-theme-" + theme + ".css");
}

