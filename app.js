const inputElement = document.getElementById('product-name');
const remainingChars = document.getElementById('remaining-chars');

function calcChars() {
    remainingChars.innerText = inputElement.maxLength- inputElement.value.length;

    if (inputElement.value.length >= inputElement.maxLength - 10){
        remainingChars.classList.add('warning');
        inputElement.classList.add('warning');
    } else {
        remainingChars.classList.remove('warning');
        inputElement.classList.remove('warning');
    }
}

inputElement.addEventListener('input', calcChars);