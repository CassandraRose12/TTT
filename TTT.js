

const canvas = document.getElementById("board");
const ctx = canvas.getContext("2D");


const GiantsObjects = document.createElement("img");
GiantsObjects.src = "assets/GiantsHelmet.png";
const GiantsArray = new Array(5);
for(var i =0; i < 5; i++){
const Giants = document.createElement("img");
Giants.src = "assets/GiantsHelmet.png";
GiantsArray[i]= Giants}

//let clonedGiants = Giants.cloneNode(true);
const PatriotsObjects = document.createElement("img");
PatriotsObjects.src = "assets/PatriotsHelmet.png";
const PatriotsArray = new Array(5);
for(var i=0; i < 5; i++){
const Patriots = document.createElement("img");
Patriots.src= "assets/PatriotsHelmet.png"
PatriotsArray[i]=Patriots}

const helmets = document.querySelectorAll(".helmet");
const alert = document.getElementById("alert");
const restartBtn = document.querySelector("#restartBtn");
const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let GiantsIndex = 0;
let PatriotsIndex = 0;
let currentPlayer = GiantsArray[GiantsIndex];
let running = false;

initGame();

function initGame(){
    helmets.forEach(helmet => helmet.addEventListener("click", helmetClicked));
    restartBtn.addEventListener("click", restartGame);
    running = true;
}
function helmetClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] != "" || !running){
        return;
    }

    updateHelmet(this, cellIndex);
    checkWinner();
}
function updateHelmet(helmet, index){
    options[index] = currentPlayer;
    helmet.appendChild(currentPlayer);
}
function changePlayer(){
    console.log(currentPlayer, GiantsArray[GiantsIndex]);
    if (currentPlayer == GiantsArray[GiantsIndex]){
        currentPlayer = PatriotsArray[PatriotsIndex]
        alert.textContent = `Patriots Turn!`
        GiantsIndex ++}
    else{
        currentPlayer = GiantsArray[GiantsIndex]
        alert.textContent = `Giants Turn!`
        PatriotsIndex++
    }
}
function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winCombinations.length; i++){
        const combination = winCombinations[i];
        const helmetA = options[combination[0]];
        const helmetB = options[combination[1]];
        const helmetC = options[combination[2]];

        if(helmetA == "" || helmetB == "" || helmetC == ""){
            continue;
        }
        if(helmetA == helmetB && helmetB == helmetC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        alert.textContent =  `{currentPlayer} Wins!`;
        running = false;
    }
    else if(!options.includes("")){
        alert.textContent = `Draw!`;
        running = false;
    }
    else{
        changePlayer();
    }
}
function restartGame(){
    currentPlayer = Giants;
    options = ["", "", "", "", "", "", "", "", ""];
    helmets.forEach(helmet => helmet.textContent = "");
    running = true;
}


 