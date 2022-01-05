/*----- constants -----*/
const BASE_LIT_TIME = 900;
let LIT_TIME;
let GAP_TIME = 300;
const LEVEL_JUMP = 5;
const LEVEL_DEC_TIME = 300;

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
    new Audio ("sound/tetraExcerpt.wav")
]

/*----- event listeners -----*/
onButton.addEventListener('click', (event) => {
    if (onButton.checked === true) {
        gameOn();
    } else {
        init();
        audio[4].pause();
        audio[4].currentTime = 0.0;
        normal();   
    }
});

start.addEventListener('click',(event) => {
    gameOver = false;
    if (!on) return;
    computerOrder = [];
    playerOrder = [];
    normal();
    audio[4].play();
    audio[4].loop = true;
    audio[4].volume = 0.3;
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

function handlePlay() {
    LIT_TIME = BASE_LIT_TIME - Math.floor(computerOrder.length / LEVEL_JUMP) * LEVEL_DEC_TIME;
    renderSequence();
}

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
    handlePlay();    
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
