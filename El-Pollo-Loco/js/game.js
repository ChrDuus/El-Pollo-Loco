let canvas;
let world;
let keyboard = new Keyboard();
let playMusic1 = new Audio('audio/music1.mp3');
let musicOn = false;
let soundIsMuted = false;
let soundManager = new SoundManager();
let currentlyIngame = false


/**
 * Checks the device orientation and adjusts canvas height accordingly.
 */
function checkOrientation() {      
    if (window.matchMedia("(orientation: landscape)").matches) {
        if (window.innerHeight < 480) {
            newHeight = window.innerHeight;
            document.getElementById('canvas').style.height = `${newHeight}px`;
            document.getElementById('canvas').classList.remove('d-none')
        }
    } else {
        if(world && this.currentlyIngame === true){        
        document.getElementById('canvas').classList.add('d-none')    }
        document.getElementById('canvas').style.height = `100%`;
    }
}

window.addEventListener('orientationchange', () => {
    checkOrientation();
    checkMobileScreen()    
});

window.addEventListener('resize', () => {
    checkOrientation();
    checkMobileScreen()
    handleMobileScreen();
});


/**
 * Initializes the game by setting up canvas, level and world.
 */
function init() {
    canvas = document.getElementById('canvas');
    initlevel();
    world = new World(canvas, keyboard, true);
    start();
}

/**
 * Adjusts the screen size based on user selection and screen width and safe it to local Storage.
 */
function screensize() {
    let rd1 = document.getElementById('rd1');
    let rd2 = document.getElementById('rd2');

    if (rd1.checked || window.innerWidth <= 1366) {
        localStorage.setItem('screenMode', 'FULL');
        document.getElementById('canvas').classList.add('fullscreen');
        document.getElementById('mobilescreen').classList.add('d-none');
        document.getElementById('bg').classList.remove('bg-game');
    } else if (rd2.checked && window.innerWidth > 1366) {
        localStorage.setItem('screenMode', 'SMALL');
        document.getElementById('canvas').classList.remove('fullscreen');
        document.getElementById('mobilescreen').classList.add('d-none');
         document.getElementById('bg').classList.add('bg-game');
    }
}

/**
 * Enables or disables Fullscreen mode
 */
function toggleFullscreen() {    
    let mode = localStorage.getItem('screenMode');
    const btn = document.getElementById('fullscreenBtn');
    let rd1 = document.getElementById('rd1');
    let rd2 = document.getElementById('rd2');
    if (mode === 'FULL') {        
        localStorage.setItem('screenMode', 'SMALL');
        btn.innerText = 'Enter Fullscreen';
        rd2.checked = true
    } else if (mode === 'SMALL') {
        localStorage.setItem('screenMode', 'FULL');
        btn.innerText = 'Exit Fullscreen';
        rd1.checked = true
    }
    screensize();
}


/**
 * Starts the game by hiding start screen and showing game elements.
 */
function start() {
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('btn').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('left').classList.remove('d-none');
    document.getElementById('right').classList.remove('d-none');
    document.getElementById('jump').classList.remove('d-none');
    document.getElementById('throw').classList.remove('d-none');
    document.getElementById('fullscreenBtn').classList.remove('d-none');    
    checkFullScreenButton()
    this.currentlyIngame = true    
}

/**
 * Toggles the info box visibility.
 */
function info() {
    document.getElementById('infoBox').classList.toggle('d-none');
}

/**
 * Toggles all sounds on/off.
 */
function toggleSound() {
    if (!window.soundManager) return;
    if(localStorage.getItem('volume') == null){
        localStorage.setItem('volume', 0)
    } if (localStorage.getItem('volume') == 1) {
        localStorage.setItem('volume', 0)
        window.soundManager.muteAll();
        document.getElementById("inGameSounds").textContent = "🔇 Unmute";
    }      
    else   {
        localStorage.setItem('volume', 1)
        window.soundManager.unmuteAll();
        document.getElementById("inGameSounds").textContent = "🔊 Mute Sounds";
}
}

/**
 * Checks the apperance of the Fullscreenbutton in game
 */
function checkFullScreenButton(){
 if(localStorage.getItem('screenMode') == 'FULL'){
     let btn =document.getElementById('fullscreenBtn');
     btn.innerText= 'Exit Fullscreen'
}if(localStorage.getItem('screenMode') == 'SMALL'){
    let btn = document.getElementById('fullscreenBtn');
    btn.innerText= 'Enter Fullscreen'
}
}

document.getElementById('btn').addEventListener('click', () => {
    window.soundManager.allowAudio = true;
    const silent = new Audio();
    silent.play().catch(() => {});
});

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

/**
 * Handles left touch button press.
 */
function touchDownLeft() {
    keyboard.A = true;
}

/**
 * Handles left touch button release.
 */
function touchUpLeft() {
    keyboard.A = false;
}

/**
 * Handles right touch button press.
 */
function touchDownRight() {
    keyboard.D = true;
}

/**
 * Handles right touch button release.
 */
function touchUpRight() {
    keyboard.D = false;
}

/**
 * Handles throw button press.
 */
function touchDownThrow() {
    keyboard.E = true;
}

/**
 * Handles throw button release.
 */
function touchUpThrow() {
    keyboard.E = false;
}

/**
 * Handles jump button press.
 */
function touchDownJump() {
    keyboard.SPACE = true;
}

/**
 * Handles jump button release.
 */
function touchUpJump() {
    keyboard.SPACE = false;
}

/**
 * Toggles background music on/off.
 */
function music1() {
    musicOn = !musicOn;
    playMusicFunction1();
}

/**
 * Plays or pauses background music based on current state.
 */
function playMusicFunction1() {
    if (musicOn == true) {
        playMusic1.play();
    }
    if (musicOn == false) {
        playMusic1.pause();
    }
}

/**
 * Updates the music button text based on current state.
 */
function setMusicButton() {
    let button = document.getElementById('music1');
    if (musicOn == false) {
        button.innerText = 'Music On';
    } else {
        button.innerText = 'Music Off';
    }
}



window.addEventListener('load', () => {
    const savedMode = localStorage.getItem('screenMode');
    if (savedMode === 'FULL') {
        document.getElementById('rd1').checked = true;
    } else if (savedMode === 'SMALL') {
        document.getElementById('rd2').checked = true;
    }

    screensize(); 
    handleMobileScreen(); 
});

/**
 * Check's if the Mobilescreen needs to be shown, or not
 */
function checkMobileScreen() {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isPortrait = window.innerHeight > window.innerWidth;

    const mobileScreen = document.getElementById('mobilescreen');

    if (isTouchDevice && isPortrait) {
        mobileScreen.classList.remove('d-none');
        document.getElementById('canvas').classList.add('d-none')

    } else {
        mobileScreen.classList.add('d-none');
        document.getElementById('canvas').classList.remove('d-none')

    }
}

/**
 * Handles display of mobile Screen
 */
function handleMobileScreen() {
    const isPortrait = window.innerHeight > window.innerWidth;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    const mobileScreen = document.getElementById('mobilescreen');

    if (isPortrait && isTouch) {
        mobileScreen.classList.remove('d-none');
    } else {
        mobileScreen.classList.add('d-none');
    }
}

/**
 * Makes Buttons unfocusable
 */
document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('mouseup', () => btn.blur());
});
