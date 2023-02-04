let paragraphElement = document.querySelector('p');
let inputField = document.querySelector('input');

function changeParagraphText() {
    paragraphElement.textContent = 'Clicked';
}

function retrieveUserInput(event) {
    console.log(event);
    console.log(event.target.value);
}

paragraphElement.addEventListener('click', changeParagraphText);
inputField.addEventListener('input', retrieveUserInput);


/*
console.dir(document)

document.body.children[1].children[0].href="https:\\www.google.de";

let anchorElement = document.getElementById('external-link');
anchorElement.href = "https:\\www.google.de";

anchorElement = document.querySelector('#external-link');

// Add an element
let newAnchor = document.createElement('a');
newAnchor.href = "https:\\www.google.de";
newAnchor.textContent = 'This also leads to google';
let paragraph = document.querySelector('p');
paragraph.appendChild(newAnchor);

//remove an element
let firstH1Element = document.querySelector('h1');
firstH1Element.remove();

// move elements
paragraph.parentElement.append(paragraph);

//innerHTML
console.log(paragraph.innerHTML);
paragraph.innerHTML= 'Hi! This is <strong> important!</strong>';
*/