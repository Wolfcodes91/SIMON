/*----- constants -----*/
const buttons = ["topLeft", "topRight", "bottomLeft", "bottomRight"];
let turn = ["computerTurn", "playerTurn"];

/*----- app's state (variables) -----*/
let score = 0
let playerOrder = [];
let computerOrder = [];
let correct = (playerOrder === computerOrder);
let intervalId;
let on = false;
let start;
let scoreboard;

/*----- cached element references -----*/
scoreboard = document.getElementById("scoreboard");
onButton = document.querySelector(".onbutton");
start = document.getElementById("start");
buttons[0] = document.querySelector(".topleft");
buttons[1] = document.querySelector(".topright");
buttons[2] = document.querySelector(".bottomleft");
buttons[3] = document.querySelector(".bottomright");

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
    if(on === true) {
    computerPlay();
    } 
})

buttons[0].addEventListener('click',(event) => {
   if (on ===true) topLeftClick();
})
buttons[1].addEventListener('click',(event) => {
    if (on ===true) topRightClick();
})
buttons[2].addEventListener('click',(event) => {
    if (on ===true) bottomLeftClick();
})
buttons[3].addEventListener('click',(event) => {
    if (on ===true) bottomRightClick();
})

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
    scoreboard.innerText = "ʘ‿ʘ";
    normal(); 
}
function lose() {
    on = true;
    lightUp();
    scoreboard.innerText = "FAIL LOL"
}
function computerPlay() {
    on = false;
    playerOrder = []
    computerOrder = []
    score = playerOrder+1;
    scoreboard.innerText = score;
    normal();
    for (i = 0; i < 20; i++) {
        computerOrder.push(Math.floor(Math.random() *4 ) + 1);
    }
    turn = turn[0];
    // buttons[i].classList.add('light'); 
    
    // check(); 
}
function playerPlay() {
    on = true;  
}
function check() {
    if(correct === true) {
        computerPlay();
    } else {
        lose();
    }
}
function topLeftClick() {
    buttons[0].classList.add('light')
    playerOrder.push(0)
}
function topRightClick() {
    buttons[1].classList.add('light')
    playerOrder.push(1)
}
function bottomLeftClick() {
    buttons[2].classList.add('light')
    playerOrder.push(2)
}
function bottomRightClick() {
    buttons[3].classList.add('light')
    playerOrder.push(3)
}


//update all impacted state, then call render()