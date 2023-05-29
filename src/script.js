const letter = document.getElementById("letter");
const options = document.getElementById("options");
const userInput = document.getElementById("user-input");
const newGame  = document.getElementById("new-game");
const newGameButton = document.getElementById("new-game button");
const canvas = document.getElementById("canvas");
const resultText  = document.getElementById("result-text");

let Options = {
    Cars: [
        "Mercedes",
        "Fiat",
        "Lamborghini",
        "Ferrari",
        "Volkswagen",
        "Rimac",
        "Porsche",
        "Audi",
    ],
    Movies: [
        "Batman",
        "Parasite",
        "Gladiator",
        "Interstellar",
        "Joker",
        "Tenet",
        "Inception",
    ],
    Countries: [
        "India",
        "Hungary",
        "Kyrgyzstan",
        "Switzerland",
        "Zimbabwe",
        "Germany",
        "France",
    ],
};

let winCount = 0;
let count = 0;
let chosenWord = "";

const displayOptions = () => {
    options.innerHTML += `<h3>Choose The Category</h3>`;
    let buttonCon = document.createElement("div");
    for (let value in Options)  {
        buttonCon.innerHTML += `<button class="Options" onclick="generateWord('${value}')">${value}</button>`;
        }
        options.appendChild(buttonCon);
};

const blocker = () => {
    let OptionsButtons = document.querySelectorAll(".Options");
    let letterButtons = document.querySelectorAll(".letter");
    OptionsButtons.forEach((button) => {
        button.disabled = true;
    });
    letterButtons.forEach((button) => {
        button.disabled = true;
    });
    newGame.classList.remove("hide");
};

 const generateWord = (optionValue) => {
     let OptionsButtons = document.querySelectorAll(".Options");
     OptionsButtons.forEach((button) => {
         if (button.innerText.toLowerCase() === optionValue) {
             button.classList.add("active");
         }
         button.disabled = true;
     });

     letter.classList.remove("hide");
     userInput.innerText = "";

     let optionArray = Options[optionValue];
     chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
     chosenWord = chosenWord.toUpperCase();
     let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span> ');
     userInput.innerHTML = displayItem;
 };

 const initializer = () => {
     winCount = 0;
     count = 0;

     userInput.innerHTML = "";
     options.innerHTML = "";
     letter.classList.add("hide");
     newGame.classList.add("hide");
     letter.innerHTML = "";

     for (let i = 65; i < 91; i++) {
         let button = document.createElement("button");
         button.classList.add("letters");
         button.innerText = String.fromCharCode(i);
         button.addEventListener("click", () => {
             let charArray = chosenWord.split("");
             let dashes = document.querySelectorAll(".dashes");
             if (charArray.includes(button.innerText)) {
                 charArray.forEach((char , index) => {
                     if (char === button.innerText) {
                         dashes[index].innerText = char;
                         winCount += 1;
                         if (winCount == charArray.length) {
                             resultText.innerHTML = `<h2 class='win-msg'>You Won!</h2><p>The word was <span>${chosenWord}</span></p>`;
                             blocker();
                         }
                     }
                 });
             } else {
                 count += 1;
                 drawMan(count);
                 if (count == 6) {
                     resultText.innerHTML = `<h2 class='lose-msg'>You Lost!</h2><p>The word was <span>${chosenWord}</span></p>`;
                     blocker();
                 }
             }
             button.disabled = true;
         });
         letter.append(button);
     }

     displayOptions();
     let { initialDrawing } = canvasCreator();
     initialDrawing();
 };

 const canvasCreator = () => {
     let context = canvas.getContext("2d");
     context.beginPath();
     context.strokeStyle = "#000";
     context.lineWidth = 2;

     const drawLine = (fromX, fromY, toX, toY) => {
         context.moveTo(fromX, fromY);
         context.lineTo(toX, toY);
         context.stroke();
     };

     const head = () => {
         context.beginPath();
         context.arc(70, 30, 10, 0, Math.PI * 2, true);
         context.stroke();
     };

     const body = () => {
         drawLine(70, 40, 70, 80);
     };

     const leftArm = () => {
         drawLine(70, 50, 50, 70);
     };

     const rightArm = () => {
         drawLine(70, 50, 90, 70);
     };

     const leftLeg = () => {
         drawLine(70, 80, 50, 110);
     };

     const rightLeg = () => {
         drawLine(70, 80, 90, 110);
     };

     const initialDrawing = () => {
         context.clearRect(0, 0, context.canvas.width, context.canvas.height);
         drawLine(10, 130, 130, 130);
         drawLine(10, 10, 10, 131);
         drawLine(10, 10, 70, 10);
         drawLine(70, 10, 70, 20);
     };
     return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
 };

 const drawMan = (count) => {
     let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
     switch (count) {
         case 1:
             head();
             break;
         case 2:
             body();
             break;
         case 3:
             leftArm();
             break;
         case 4:
             rightArm();
             break;
         case 5:
             leftLeg();
             break;
         case 6:
             rightLeg();
             break;
         default:
             break;
     }
 };

 newGameButton.addEventListener("click", initializer);
 window.onload = initializer;