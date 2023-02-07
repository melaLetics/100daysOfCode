// Practice what you learned!

// 1) Select the two <button> elements and store them in two different variables.
//    - Select the first button without adding or using any "id"
//    - Select the second button by using an "id"

const removeParagraphButton = document.querySelector('button');
const backgroundColorButton = document.getElementById('background-color-btn');

// 2) Add "click" event listener to both buttons (with two different functions).
//    The functions should "console.dir()" the clicked buttons.
//    - Output the first button by using the variable in which it's stored
//    - Output the second button WITHOUT using the variable in which it's stored

function removeParagraphButtonClicked() {
  console.dir(removeParagraphButton);
  paragraphThree.remove();
}

function backgroundColorButtonClicked(event) {
  console.dir(event.target);
  //paragraphOne.style.backgroundColor = "blue";
  paragraphOne.classList.add('background-blue');
}


removeParagraphButton.addEventListener('click', removeParagraphButtonClicked);
backgroundColorButton.addEventListener('click', backgroundColorButtonClicked);

// 3) Now select and store the paragraphs mentioned in the text you see on the page
//    (first and third paragraph)
//    - Select BOTH paragraphs by drilling into the document and "navigating" to the
//      mentioned elements
//    - If you struggle with DOM drilling, use "ids" instead but watch the solution!

let paragraphOne = document.body.childNodes[5].childNodes[3];
let paragraphThree = document.body.childNodes[5].childNodes[7];

// 4) Change the functions from (2) such that:
//    - The first button removes the third paragraph (i.e. the <p> prior to it)
//    - The second button changes the background color of the first paragraph to blue
// 5) Solve (4) both by changing the "inline styles" as well as by adding CSS classes
//    Note: You'll have to add those classes to the styles.css file first!
