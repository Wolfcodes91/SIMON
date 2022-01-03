/*----- constants -----*/

/*----- app's state (variables) -----*/
let playerOrder; //array to hold players guesses
let computerOrder;//array to hold computers moves
let correct; // false when player guesses incorrectly
let on; // true when game is powered on 
let computerTurn; // true if computer is playing sequence

/*----- cached element references -----*/
const buttons = Array.from(document.querySelectorAll('#board > div')); 
scoreboard = document.getElementById("scoreboard");
onButton = document.querySelector(".onbutton");
start = document.getElementById("start");

const lightUp = function() {
    buttons[0].classList.add('light')
    buttons[1].classList.add('light')
    buttons[2].classList.add('light')
    buttons[3].classList.add('light')
}
const normal = function() {
    buttons[0].classList.remove('light')
    buttons[1].classList.remove('light')
    buttons[2].classList.remove('light')
    buttons[3].classList.remove('light')
}

/*----- event listeners -----*/
onButton.addEventListener('click', (event) => {
    if (onButton.checked === true) {
        gameOn();
    } else {
        init();
    }
});

start.addEventListener('click',(event) => {
    if (!on) return;
    computerOrder = [];
    playerOrder = [];
    normal();
    computerPlay();
})

document.getElementById('board').addEventListener('click', (event) => {
    if (!on || computerTurn) return;
    const btn = event.target; 
    const btnIdx = buttons.indexOf(btn);
    if (btnIdx === -1) return; 
    // play sound 
    buttons[btnIdx].classList.add('light')
    playerOrder.push(btnIdx);
    if (checkComplete()) { 
        computerPlay();
    } else if (!checkCurrent()) {
        
    }
 });

/*----- functions -----*/
// initialize all state, then call render()
function init() {
    scoreboard.innerText = "";
    normal();
    turn = 0;
    on = false;
    onButton.checked = false;
}
function gameOn() {
    on = true;
    onButton.checked = true;
    scoreboard.innerText = "ʘ‿ʘ";
    normal(); 
}
function lose() {
    // on = false;
    lightUp();
    scoreboard.innerText = "FAIL LOL"
}
function computerPlay() {
    computerTurn = true; 
    playerOrder = [];
    computerOrder.push(Math.floor(Math.random() * 4))
    scoreboard.innerText = computerOrder.length;
   
    renderComputerOrder()

}
function playerPlay() {
    playerOrder = [];
    on = true;  
    computerTurn = false;
}
function checkComplete() {
    return JSON.stringify(playerOrder) === JSON.stringify(computerOrder);
}  

function checkCurrent() {
    
}

function renderComputerOrder() {

}

//update all impacted state, then call render()
