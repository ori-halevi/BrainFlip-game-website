const cardsAmount = localStorage.getItem('cardsAmount');
const timeLimit = localStorage.getItem('timeLimit');
const cardsContainer = document.getElementById('cardsContainer');

const scoreElement = document.getElementById('scoreDiv');
scoreElement.textContent = `Your score: 0`;

let userMidTurn = false;

const easyMode = 3;
const mediumMode = 2;
const hardMode = 1.5;
let difficultyLevel = easyMode;
let numberOfTurns = difficultyLevel * cardsAmount;

let previousCardInfo = [null, null];
let currentCardInfo = [null, null];

let score = 0;
let matchs = 0;
let movesCounter = 0;

let waitForAnimation = false;

scoreElement.textContent = `Your score: 0`;


function generateUniqueRandomNumbers(count) {
    const numbers = [];
    while (numbers.length < count) {
        const randomNum = Math.floor(Math.random() * 90) + 10; // מייצר מספר דו ספרתי (10-99)
        if (!numbers.includes(randomNum)) {
            numbers.push(randomNum); // מוסיף רק אם המספר לא קיים במערך
        }
    }
    return numbers;
}


function createCard(cardID, cardCoupleName) {
    
    let card = document.createElement('div');
    card.classList.add('cardAreaFlip');
    card.dataset.couple = cardCoupleName;
    card.dataset.id = cardID;
    card.dataset.flipMode = false;

    card.addEventListener('click', () => onUserClickCard(card));

    let cardBack = document.createElement('div');
    cardBack.classList.add('card', 'back');
    card.appendChild(cardBack);

    let cardFront = document.createElement('div');
    cardFront.classList.add('card', 'front');

    let cardFrontText = document.createTextNode(card.dataset.couple);
    cardFront.appendChild(cardFrontText);

    // let cardBackText = document.createTextNode(card.dataset.couple + " " + card.dataset.id);
    // cardBack.appendChild(cardBackText); // למחוקקקקק

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
    cardsCouples = generateUniqueRandomNumbers(cardsAmount);
    
    const cardsArray = [];  // מערך לאחסון הקלפים לפני הוספה ל-DOM
    let j = 0; // משתנה שיגדל ב-1
    let i = 0; // משתנה שיגדל ב-2
    
    for (let count = 0; count < cardsAmount; count++) {
        
     // create first card
        let firstCard = createCard(i, j);
        cardsArray.push(firstCard); // Add card into the array
        
        // create first card
        let secondCard = createCard(i + 1, j);
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

    console.log("current turn:", numberOfTurns);

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
    }

    console.log("matchs", matchs);
    
    
    // Check if the game is won
    if (matchs == cardsAmount) {
        handleGameWon();
        return;
    }
    // Check if the game is over
    if (numberOfTurns < 0) {
        console.log("Game Over");
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
        console.log("match");
        score += 21 - timeLimit + (cardsAmount - 10);
        scoreElement.textContent = `Your score: ${score}`;
        matchs++;
        console.log(matchs);
        
        waitForAnimation = false;

        // white color diabled cards
        cards.forEach(card => {
            card.style.border = "0px solid white";
        });

    } else {
        console.log("no match");
        setTimeout(() => {

            hideCardByDataId(previousCardInfo[1]);
            hideCardByDataId(currentCardInfo[1]);
            
                waitForAnimation = false;


            // white color diabled cards
            cards.forEach(card => {
                card.style.border = "0px solid white";
            });

        } , 1000);
        }
}






MainSpreadCards();