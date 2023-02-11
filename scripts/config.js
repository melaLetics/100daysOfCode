function openPlayerConfig(event){
    editedPlayer= +event.target.dataset.playerid;
    playerConfigOverlay.style.display = 'block';
    backDrop.style.display = 'block';
}

function closePlayerConfig() {
    playerConfigOverlay.style.display = 'none';
    backDrop.style.display = 'none';
    form.firstElementChild.classList.remove('error');
    errorsOutput.textContent = '';
    form.firstElementChild.children[1].value = '';
}

function savePlayerConfig(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const playerName = formData.get('username').trim();
    
    if (!playerName){
        event.target.firstElementChild.classList.add('error');
        errorsOutput.textContent = 'Please enter a valid name!'
        return;
    }

    const updatedPlayerData = document.getElementById('player-' + editedPlayer + '-data');
    updatedPlayerData.children[1].textContent = playerName;
    players[editedPlayer-1].name = playerName;

    closePlayerConfig();
}