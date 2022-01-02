/*----- constants -----*/
const buttons = ["topLeft", "topRight", "bottomLeft", "bottomRight"];

/*----- app's state (variables) -----*/
let turn = 0
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

// start.addeventlistener('click',() => {

// })

// buttons[0].addeventlistener('click',() => {

// })
// buttons[1].addeventlistener('click',() => {

// })
// buttons[2].addeventlistener('click',() => {

// })
// buttons[3].addeventlistener('click',() => {

// })


/*----- functions -----*/
// initialize all state, then call render()
function init() {
    scoreboard.innerText = "";
    normal();
    turn = 0;
    on = false;

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

//update all impacted state, then call render()