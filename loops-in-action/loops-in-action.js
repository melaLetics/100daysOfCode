// fist example: sum numbers
const calculateSumBtnElement = document.querySelector('#calculator button');

function calculateSum() {
    const userNumberInput = document.getElementById('user-number').value;
    let sumUpTo = 0;
    for (let i = 1; i <= userNumberInput; i++){
        sumUpTo += i;
    }
    const outputElement = document.getElementById('calculated-sum');
    outputElement.textContent = sumUpTo;
    outputElement.style.display = 'block';
}

calculateSumBtnElement.addEventListener('click', calculateSum);


// second example: Highlight links
const highlightLinksBtnElement = document.querySelector('#highlight-links button');

function highlightLinks() {
    const anchorElements = document.querySelectorAll('#highlight-links a');

    for (const anchor of anchorElements) {
        anchor.classList.add('highlight');
    }
}

highlightLinksBtnElement.addEventListener('click', highlightLinks);

// third example: display user data

const dummyUserData = {
    firstName: 'mela',
    lastName: 'Letics', 
    age: 40
}

const displayUserDataElementButton = document.querySelector('#user-data button');

function displayUserData() {
    const outputElement = document.getElementById('output-user-data');
    
    outputElement.innerHTML = '';
    
    for (const key in dummyUserData){
        const newUserDataListItemElement = document.createElement('li');
        const outputText = key.toUpperCase() + ": " + dummyUserData[key];
        newUserDataListItemElement.textContent = outputText;
        outputElement.append(newUserDataListItemElement);
    }
}

displayUserDataElementButton.addEventListener('click', displayUserData);

// fourth example: roll the dice

const rollDiceBtnElement = document.querySelector('#statistics button');

function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

function deriveNumberOfDiceRolls() {
    const targetNumber = document.getElementById('user-target-number').value;
    const diceRollsListElement = document.getElementById('dice-rolls');

    diceRollsListElement.innerHTML = '';

    let hasRolledTargetNumber = false;
    let numberOfRolls = 0;
    while (!hasRolledTargetNumber){
        const rolledNumber = rollDice();
        numberOfRolls++;
        const newRollListElement = document.createElement('li');
        newRollListElement.textContent = 'Roll ' + numberOfRolls + ': ' + rolledNumber;
        diceRollsListElement.append(newRollListElement);
        hasRolledTargetNumber = rolledNumber == targetNumber;
    }

    const outputTotalRollsElement = document.getElementById('output-total-rolls');
    const outputTargetNumberElement = documnet.getElementById('output-target-number');
    outputTargetNumberElement.textContent = targetNumber;
    outputTotalRollsElement.textContent = numberOfRolls;
}

rollDiceBtnElement.addEventListener('click', deriveNumberOfDiceRolls);