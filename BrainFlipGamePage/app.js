const themeStylesheetLink = document.getElementById('CSSTheme');

const cardsAmount = localStorage.getItem('cardsAmount');
const cardsContainer = document.getElementById('cardsContainer');

const gameAudio = document.getElementById('gameAudio');
const gameAudioMatch = document.getElementById('gameAudioMatch');
const gameAudioBonus = document.getElementById('gameAudioBonus');
const gameAudioWrong = document.getElementById('gameAudioWrong');



let userMidTurn = false;

const easyMode = 2;
const mediumMode = 1.5;
const hardMode = 1.25;

const baseTimePerCard = 10;
let difficultyLevel, timeLimit, timeLimitInMinutes, numberOfTurns;

let previousCardInfo = [null, null];
let currentCardInfo = [null, null];

let score = 0;
let matchs = 0;
let movesCounter = 0;

let waitForAnimation = false;



window.onload = () => {
    initialGame();

};
async function initialGame() {
    
    loadTheme();
    gameAudio.play();
    gameAudio.volume = 0.4;
    setDifficulty();
    if (localStorage.getItem("learnEnglish") === "true") {
        await loadLearnEnglishDictionaryToLocalStotrage().then(() => {
            MainSpreadCards();
            
        })
    } else {
        MainSpreadCards();
    }

    defineGridAndCardsSize();
    updateMovesLeftDisplay();
    updateScoreDisplay();
    displayTimer();

    // setTimeout(function() {
    //     window.scrollBy({ top: 100, behavior: 'smooth' }); // גולל את העמוד 20 פיקסלים למטה
    // }, 500); // 500 מילישניות
    // setTimeout(function() {
    //     window.scrollBy({ top: -100, behavior: 'smooth' }); // גולל את העמוד 20 פיקסלים למטה
    // }, 1000); // 500 מילישניות

};



function setDifficulty() {
    if (localStorage.getItem('difficulty') === 'easy') {
        difficultyLevel = easyMode;
    } else if (localStorage.getItem('difficulty') === 'medium') {
        difficultyLevel = mediumMode;
    } else if (localStorage.getItem('difficulty') === 'hard') {
        difficultyLevel = hardMode;
    } else {
        difficultyLevel = mediumMode;
    }

    // חישוב כמות התורות המותרת
    numberOfTurns = difficultyLevel * (cardsAmount * 2);
    
    // חישוב זמן מוקצב
    timeLimit = difficultyLevel * (cardsAmount * baseTimePerCard);
    timeLimitInMinutes = timeLimit;
    if (timeLimit > 60) {
        timeLimitInMinutes = (timeLimit / 60).toFixed(2);
    }
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
        const wordsP = document.createElement('p');
        wordsP.classList.add('words-p');
        wordsDiv.appendChild(wordsP);


        if (card.dataset.id % 2 === 0) {
            wordsP.textContent = `${engHebWordsKeyValue.key}`;
        } else {
            wordsP.textContent = `${engHebWordsKeyValue.value}`;
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

    // First card was clicked
    if (movesCounter === 1) {
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

        flipCard(card);

        handleSecondCardClick();  
        
        userMidTurn = !userMidTurn;
    }
    
    // Check if the game is won
    if (matchs == cardsAmount) {
        handleGameWon();
        return;
    }
}


function HendelSubtractTurnAndUpdateDisplay() {
    numberOfTurns--;
    updateMovesLeftDisplay();
    // Check if out of moves
    if (numberOfTurns < 1) {
        handleGameLost("Uh-oh, no moves left!");
        return;
    }
}


function flipCard(card) {
    card.dataset.flipMode = "true";
    card.classList.toggle('flip');
}


function handleSecondCardClick() {
    // תפיסת כל האלמנטים עם המחלקה 'card'
    const cards = document.querySelectorAll('.cardAreaFlip');

    if (previousCardInfo[0] === currentCardInfo[0]) {
        cards.forEach(card => {
            if (card.dataset.couple == previousCardInfo[0]) {
                setTimeout(() => {
                    card.classList.add('green-border');
                    gameAudioMatch.currentTime = 0;
                    gameAudioMatch.play();
                }, 300);
                // setTimeout(() => {
                //     card.classList.remove('green-border');
                // }, 1000);
            }
        })
        score += 21 - (timeLimit / 60) + (cardsAmount - 10);
        score = Math.round(score * 1) / 1;
        updateScoreDisplay();
        matchs++;
        
        waitForAnimation = false;

    } else {
        setTimeout(() => {
            gameAudioWrong.currentTime = 0;
            gameAudioWrong.play();
            // red color border for all cards
            cards.forEach(card => {
                card.classList.add('red-border');
            });
            // subtract 1 turn
            HendelSubtractTurnAndUpdateDisplay();
        }, 300);

        setTimeout(() => {
            hideCardByDataId(previousCardInfo[1]);
            hideCardByDataId(currentCardInfo[1]);
            waitForAnimation = false;
            // white color diabled cards
            cards.forEach(card => {
                card.classList.remove('red-border');
            });
        } , 1000);
        }
}



function loadTheme() {
    const themeStylesheetLink = document.getElementById('CSSTheme');
    
    const theme = localStorage.getItem('theme');
    themeStylesheetLink.setAttribute("href", "../style-theme-" + theme + ".css");
}

function defineGridAndCardsSize() {
    const cardsAmount = localStorage.getItem('cardsAmount');
    // גישה ל-styles של root
    document.documentElement.style.setProperty('--number-of-cards', cardsAmount * 2);

    let fontSizeForWords = '1rem';
    if (cardsAmount == 4) {
        document.documentElement.style.setProperty('--number-of-cards', 8);
        document.documentElement.style.setProperty('--number-of-columns', 4);
        document.documentElement.style.setProperty('--number-of-rows', 2);
        document.documentElement.style.setProperty('--card-height-and-width', 11);
        fontSizeForWords = '1.7rem';
    } else if (cardsAmount == 6) {
        document.documentElement.style.setProperty('--number-of-cards', 12);
        document.documentElement.style.setProperty('--number-of-columns', 6);
        document.documentElement.style.setProperty('--number-of-rows', 2);
        document.documentElement.style.setProperty('--card-height-and-width', 13);
        fontSizeForWords = '1.6rem';
    } else if (cardsAmount == 15) {
        document.documentElement.style.setProperty('--number-of-cards', 30);
        document.documentElement.style.setProperty('--number-of-columns', 10);
        document.documentElement.style.setProperty('--number-of-rows', 3);
        document.documentElement.style.setProperty('--card-height-and-width', 17);
        fontSizeForWords = '1.1rem';
    } else if (cardsAmount == 26) {
        document.documentElement.style.setProperty('--number-of-cards', 52);
        document.documentElement.style.setProperty('--number-of-columns', 13);
        document.documentElement.style.setProperty('--number-of-rows', 4);
        document.documentElement.style.setProperty('--card-height-and-width', 19);
        fontSizeForWords = '0.8rem';
    } else if (cardsAmount == 57) {
        document.documentElement.style.setProperty('--number-of-cards', 114);
        document.documentElement.style.setProperty('--number-of-columns', 19);
        document.documentElement.style.setProperty('--number-of-rows', 6);
        document.documentElement.style.setProperty('--card-height-and-width', 23);
        fontSizeForWords = '0.5rem';

    }
    const allWordsP = document.querySelectorAll('.words-p');
    allWordsP.forEach(wordP => {
        wordP.style.fontSize = fontSizeForWords;
    });
}