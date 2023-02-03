//console.dir(document)

//document.body.children[1].children[0].href="https:\\www.google.de";

let anchorElement = document.getElementById('external-link');
anchorElement.href = "https:\\www.google.de";

anchorElement = document.querySelector('#external-link');

// Add an element
let newAnchor = document.createElement('a');
newAnchor.href = "https:\\www.google.de";
newAnchor.textContent = 'This also leads to google';
let paragraph = document.querySelector('p');
paragraph.appendChild(newAnchor);