"use strict";
let correctHexCode;
let allHexCodes;
let currentNumOfColors = 6;

// generates the correct hexcode, then adds it in a random
// spot into the "allHexCodes" array which is also random ones
setup(currentNumOfColors);

/*
    your job: create a div for each element in the
    "allHexCodes" array and set its color to the
    hexCode. this means that only one div will have
    the correct hexcode and the others will be random
    colors.
    as you create them, add an event listener to each
    div which will call "incorrectAnswer" if the color
    is not the correct one, and "correctAnswer" if it is.
    ALSO, make sure to append each div to the "guesses"
    div that is in the HTML.
*/

function createDivs() {
    let guessesDiv = document.getElementById("guesses");
    let numOfHexCodes = allHexCodes.length;
    for (let i = 0; i < numOfHexCodes; i++) {
        let div = document.createElement("div");
        div.id = "hexId-" + i;
        div.className = "hexClass";
        
        let hexCode = allHexCodes[i];
        div.style = "background-color:" + hexCode;
        div.style.width = "100px";
        div.style.height = "100px";
        div.style.borderRadius = "65px";
        div.addEventListener('click', (e) => {
            if (hexCode == correctHexCode) {
                correctAnswer();
            } else {
                incorrectAnswer();
            }
            e.stopPropagation();
        });
        guessesDiv.appendChild(div);
    }
}

function setup(numOfColors) {
    let generatedHexCode = document.getElementById('generated-hexcode');
    correctHexCode = generateNewHexCode();
    generatedHexCode.innerText = correctHexCode;

    allHexCodes = [];
    let correctIndex = Math.floor(Math.random() * 5);
    allHexCodes[correctIndex] = correctHexCode;
    for (let i=0; i < numOfColors; i++) {
        if (i !== correctIndex) {
            allHexCodes[i] = generateNewHexCode();
        }
    }
    createDivs();
}

function generateNewHexCode() {
    let hexcode = '#';
    for (let i = 0; i < 6; i++) {
        let letterOrNumber = Math.floor(Math.random() * 2);
        if (letterOrNumber === 0)
            hexcode += '' + Math.floor(Math.random() * 10);
        else {
            hexcode += '' + String.fromCharCode(Math.floor(Math.random() * 6) + 65);
        }
    }
    return hexcode;
}

function incorrectAnswer() {
    alert('Sorry, that\'s not the right one! Try again.');
}

function correctAnswer() {
    alert('You got it! Nice job!');
    // Clear guesses div
    document.getElementById("guesses").innerHTML = "";
    currentNumOfColors += 1;
    setup(currentNumOfColors);
}
