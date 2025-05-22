let canvas;
let world;
let keyboard = new Keyboard();
let playMusic1 = new Audio('audio/music1.mp3');
let playMusic2 = new Audio('audio/music2.mp3');
let musicOn = false;



function checkOrientation() {
    if (window.matchMedia("(orientation: landscape)").matches) {
        if (window.innerHeight < 480) {
            newHeight = window.innerHeight;
            document.getElementById('canvas').style.height = `${newHeight}px`;
        }
    } else {
        document.getElementById('canvas').style.height = `100%`;
    }
}



function init() {
    canvas = document.getElementById('canvas');
    initlevel();
    world = new World(canvas, keyboard);
    start();
}

function screensize() {
    let rd1 = document.getElementById('rd1');
    let rd2 = document.getElementById('rd2');

    if (rd1.checked == true) {
        document.getElementById('canvas').classList.add('fullscreen');
        document.getElementById('mobilescreen').classList.add('d-none');
        document.getElementById('bg').classList.remove('bg-game');

    } else if (rd2.checked == true) {
        document.getElementById('canvas').classList.remove('fullscreen');
        document.getElementById('mobilescreen').classList.add('d-none');

    }

}



function start() {
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('btn').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('left').classList.remove('d-none');
    document.getElementById('right').classList.remove('d-none');
    document.getElementById('jump').classList.remove('d-none');
    document.getElementById('throw').classList.remove('d-none');
}



function info() {
    document.getElementById('infoBox').classList.toggle('d-none');
}



window.addEventListener("keydown", (e) => {
    if (e.keyCode == 68) {
        keyboard.D = true;
    }
    if (e.keyCode == 65) {
        keyboard.A = true;
    }   
    if (e.keyCode == 69) {
        keyboard.E = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
   
});



window.addEventListener("keyup", (e) => {

    if (e.keyCode == 68) {
        keyboard.D = false;
    }
    if (e.keyCode == 65) {
        keyboard.A = false;
    }
    if (e.keyCode == 69) {
        keyboard.E = false;
    }    
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    
});


function touchDownLeft() {
    keyboard.A = true;
}

function touchUpLeft() {
    keyboard.A = false;
}

function touchDownRight() {
    keyboard.D = true;
}

function touchUpRight() {
    keyboard.D = false;
}

function touchDownThrow() {
    keyboard.E = true;
}

function touchUpThrow() {
    keyboard.E = false;
}

function touchDownJump(){
    keyboard.SPACE = true;
}
function touchUpJump(){
    keyboard.SPACE = false
}

function music1() {
    if (musicOn == false) {
        musicOn = true;
    } else {
        musicOn = false;
        playMusicFunction2();
    }
    playMusicFunction1();
}

function music2() {
    if (musicOn == false) {
        musicOn = true;
    } else {
        musicOn = false;
        playMusicFunction1();
    }
    playMusicFunction2();
}

function playMusicFunction1() {
    if (musicOn == true) {
        playMusic1.play();
    }
    if (musicOn == false) {
        playMusic1.pause();
    }
}

function playMusicFunction2() {
    if (musicOn == true) {
        playMusic2.play();
    }
    if (musicOn == false) {
        playMusic2.pause();
    }
}

function setMusicButton(){
    let button = document.getElementById('music1');
    if(musicOn== false){
        button.innerText = 'Music On'
    }else{
        button.innerText= 'Music Off'
    }
}