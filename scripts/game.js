function resetGameStatus() {
    activePlayer = 0;
    currentRound = 1;
    gameOver.firstElementChild.innerHTML = 'You won, <span id="winner-name">PLAYER NAME</span>!'
    gameOver.style.display = 'none';

    
    let gameBoardIndex = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++){
            gameData[i][j] = 0;
            gameBoard.children[gameBoardIndex].textContent = '';
            gameBoard.children[gameBoardIndex].classList.remove('disabled');
            gameBoardIndex++;
        }
    }
    
}

function startNewGame() {
    if (players[0].name ==='' || players[1].name === ''){
        alert('Please set custom player names for both players!');
        return;
    }

    resetGameStatus();

    activePlayerName.textContent = players[activePlayer].name;
    gameArea.style.display = 'block';
}

function checkForGameOver() {
    for (let i = 0; i < 3; i++) {
        if (gameData[i][0] > 0 && gameData[i][0] === gameData[i][1] && gameData[i][1] === gameData[i][2]){
            return gameData[i][0];
        }
    }
    
    for (let i = 0; i < 3; i++) {
        if (gameData[0][i] > 0 && gameData[0][i] === gameData[1][i] && gameData[1][i] === gameData[2][i]){
            return gameData[0][i];
        }
    }
    if (gameData[0][0] > 0 && gameData[0][0] === gameData[1][1] && gameData[1][1] === gameData[2][2]) {
        return gameData[0][0];
    }
    if (gameData[2][0] > 0 && gameData[2][0] === gameData[1][1] && gameData[1][1] === gameData[0][2]) {
        return gameData[2][0];
    }
    
    if (currentRound === 9) {
        return -1;
    }
    return 0;
}

function switchPlayer() {
    activePlayer = activePlayer === 0 ? 1 : 0;
    activePlayerName.textContent = players[activePlayer].name;
    currentRound++;
}

function selectGameField(event) {
    if (gameIsOver) {
        return;
    }
    const selectedColumn = event.target.dataset.col - 1;
    const selectedRow = event.target.dataset.row - 1;

    if(gameData[selectedRow][selectedColumn] > 0) {
        alert('Please select an empty field.')
        return;
    }

    event.target.textContent = players[activePlayer].symbol;
    event.target.classList.add('disabled');

    gameData[selectedRow][selectedColumn] = activePlayer + 1;
    const winnerId = checkForGameOver();
    if (winnerId !== 0) {
        gameIsOver = true;
        endGame(winnerId);
    }
    switchPlayer();
}

function endGame(winnerId) {
    gameOver.style.display = 'block';
    if (winnerId > 0) {
        gameOver.firstElementChild.firstElementChild.textContent = players[winnerId - 1].name;
    } else {
        gameOver.firstElementChild.textContent = 'It\'s a draw';
    }
}