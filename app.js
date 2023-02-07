const inputElement = document.getElementById('product-name');
const remainingChars = document.getElementById('remaining-chars');

function calcChars() {
    remainingChars.innerText = inputElement.maxLength- inputElement.value.length;

    if (inputElement.value.length === inputElement.maxLength){
        remainingChars.classList.add('error');
        inputElement.classList.add('error');
    } else if (inputElement.value.length >= inputElement.maxLength - 10){
        remainingChars.classList.remove('error');
        inputElement.classList.remove('error');
        remainingChars.classList.add('warning');
        inputElement.classList.add('warning');
    } else {
        remainingChars.classList.remove('warning');
        inputElement.classList.remove('warning');
    }
}

inputElement.addEventListener('input', calcChars);
