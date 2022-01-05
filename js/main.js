/*----- constants -----*/
const LIT_TIME = 1000;
const GAP_TIME = 400;


/*----- app's state (variables) -----*/
let playerOrder; //array to hold players guesses
let computerOrder;//array to hold computers moves
let gameOver; // true when player guesses incorrectly
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
/*----- cached sounds -----*/

const audio = [
    new Audio ("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"), 
    new Audio ("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
    new Audio ("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
    new Audio ("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"),
]

/*----- event listeners -----*/
onButton.addEventListener('click', (event) => {
    if (onButton.checked === true) {
        gameOn();
    } else {
        init();
    }
});

start.addEventListener('click',(event) => {
    gameOver = false;
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
    audio[btnIdx].play(); 
    playerOrder.push(btnIdx);
    buttons[btnIdx].classList.add('light');  
    setTimeout(function() {
        if (!gameOver) buttons[btnIdx].classList.remove('light');
    }, 200);
    if (checkComplete()) { 
        computerPlay();
    } else {
        checkCurrent();
    }
});

/*----- functions -----*/
// initialize all state, then call render()

function renderSequence() {
    computerTurn = true;
    let idx = 0;
    const timerId = setInterval(function() {
        const btn = buttons[computerOrder[idx]];
        btn.classList.add('light') 
        audio[computerOrder[idx]].play();     
        setTimeout(function() {
            btn.classList.remove('light')
        
        }, LIT_TIME);
        idx++;
        if (idx === computerOrder.length) {
            clearInterval(timerId);
            computerTurn = false;
        }
    }, LIT_TIME + GAP_TIME);
}

function init() {
    gameOver = true;
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
    gameOver = true;
    lightUp();
    scoreboard.innerText = "FAIL LOL"
    
}
function computerPlay() {
    computerTurn = true; 
    playerOrder = [];
    computerOrder.push(Math.floor(Math.random() * 4))
    scoreboard.innerText = computerOrder.length;
    renderSequence(); 
    
}

function playerPlay() {
    playerOrder = [];
    on = true;  
    computerTurn = false;
}

function checkComplete() {
    return JSON.stringify(playerOrder) === JSON.stringify(computerOrder);
    normal()
}  

function checkCurrent() {
    for (i = 0; i < playerOrder.length; i++) {
        playerOrder[i] === computerOrder[i] ? true : lose();
    }
};
