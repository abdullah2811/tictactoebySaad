let boxes = document.querySelectorAll('.box');
let resetbtn = document.querySelector('#reset');
let turn = false;
let ntf = document.querySelector('.notification');
let msg = document.querySelector('#msg');
let okbtn = document.querySelector('#ok'); 
let sounds = document.querySelectorAll('.soundeffect');
let game = document.querySelector('.game');
let counter = 0;
let gameOver = false;

const MARK_X = 'X';
const MARK_O = 'O';

// Backdrop for modal; created once and toggled via JS
const backdrop = document.createElement('div');
backdrop.className = 'backdrop';
backdrop.style.display = 'none';
document.body.appendChild(backdrop);

const triggerPulse = () => {
    if (!game) return;
    game.classList.remove('pulse');
    void game.offsetWidth; // force reflow to restart animation
    game.classList.add('pulse');
};

const showNotification = (text) => {
    msg.innerText = text;
    ntf.style.display = 'flex';
    ntf.style.opacity = '1';
    ntf.style.animation = 'none';
    void ntf.offsetWidth;
    ntf.style.animation = '';
    backdrop.style.display = 'block';
};

const hideNotification = () => {
    ntf.style.display = 'none';
    backdrop.style.display = 'none';
};

const resetGame = () => {
    boxes.forEach((box) => {
        box.innerText = '';
        box.disabled = false;
        box.classList.remove('x', 'o');
        box.dataset.mark = '';
    });
    counter = 0;
    turn = false;
    gameOver = false;
    hideNotification();
    triggerPulse();
}

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (box.dataset.mark === '' || box.dataset.mark === undefined) {
            const mark = turn ? MARK_X : MARK_O;
            box.innerText = '';
            box.dataset.mark = mark;
            box.classList.remove('x', 'o');
            box.classList.add(mark.toLowerCase());
            turn = !turn;
            counter++;
            checkWinner();
            // If it is draw or win, no sound on click
            if(!gameOver) {
                sounds[turn ? 0 : 1].currentTime = 0;
                sounds[turn ? 0 : 1].play();
            }
        }
    });
});

const checkWinner = () => {

    if (gameOver) return;

    winPatterns.forEach((pattern) => {

        let pos1val = boxes[pattern[0]].dataset.mark;
        let pos2val = boxes[pattern[1]].dataset.mark;
        let pos3val = boxes[pattern[2]].dataset.mark;

        if (pos1val && pos1val === pos2val && pos2val === pos3val) {
            
            boxes.forEach((box)  =>  {
                box.disabled = true;
            })

            sounds[2].currentTime = 0;
            sounds[2].play();

            if(pos1val === MARK_X){
                showNotification(`Sada Hadi Wins!`);
            }
            else{
                showNotification(`Kala Hadi Wins!`);
            }
            gameOver = true;

        }
    });

    if (!gameOver && counter === 9 ){

        showNotification(`It's a Draw!`);
        gameOver = true;

        sounds[3].currentTime = 0;
        sounds[3].play();

        boxes.forEach((box)  =>  {
                box.disabled = true;
        })
        
    }
        
};

resetbtn.addEventListener('click', () => {
    
    sounds[4].currentTime = 0;
    sounds[4].play();
    
    resetGame();
});

okbtn.addEventListener('click', () => {

    sounds[5].currentTime = 0;
    sounds[5].play();

    resetGame();
});

// Kick off a welcoming pulse on first paint
triggerPulse();


