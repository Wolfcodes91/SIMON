/*----- constants -----*/
const LIT_TIME = 1000;
const GAP_TIME = 400;


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
    playerOrder.push(btnIdx);
    buttons[btnIdx].classList.add('light')
    
    if (checkComplete()) { 
        computerPlay();
    } else {
        checkCurrent();
    }
 });

/*----- functions -----*/
// initialize all state, then call render()

function renderSequence(cb) {
    computerTurn = true;
    let idx = 0;
    const timerId = setInterval(function() {
      const btn = buttons[idx];
      for (i = 0; i < computerOrder.length; i++) {
        buttons[computerOrder[i]].classList.add('light')
        }
      setTimeout(function() {
        for (i = 0; i < computerOrder.length; i++) {
            buttons[computerOrder[i]].classList.remove('light')
            }
      }, LIT_TIME);
      idx++;
      if (idx === computerOrder.length) {
        clearInterval(timerId);
        computerTurn = false;
        setTimeout(cb, LIT_TIME);
      }
    }, LIT_TIME + GAP_TIME);
  }


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
    lightUp();
    scoreboard.innerText = "FAIL LOL"
}
function computerPlay() {
    computerTurn = true; 
    playerOrder = [];
    computerOrder.push(Math.floor(Math.random() * 4))
    scoreboard.innerText = computerOrder.length;
    
    renderSequence(); 
    // renderComputerOrder()
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

function renderComputerOrder() {

}


  

//update all impacted state, then call render()
