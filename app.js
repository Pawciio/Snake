// canvas element 
const cvs = document.querySelector('#snake');
const ctx = cvs.getContext('2d');

// load image
const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

// button lvl, restart and information about actual lvl
const low = document.querySelector('.low');
const middle = document.querySelector('.middle');
const high = document.querySelector('.high');
const actualLvl = document.querySelector('.actual-lvl');

const restart = document.querySelector('.restart');

// create the score
let score = 0;

// create box how is unit in board (32px)
const box = 32;

// create snake
let snake = [];

snake[0] = {
    x: 9 * box,
    y: 10 * box
};

// load audio files
let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";

// create food and random position food
let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
};

// controle the snake
let d;

// event listener to controle snake WSAD or ARROWS
document.addEventListener("keydown", function clickKey(e) {
    let key = e.keyCode;
    if( key == 37 || key == 65 && d != "RIGHT"){
        left.play();
        d = "LEFT";
    }else if(key == 38 || key == 87 && d != "DOWN"){
        d = "UP";
        up.play();
    }else if(key == 39 || key == 68 && d != "LEFT"){
        d = "RIGHT";
        right.play();
    }else if(key == 40 || key == 83 && d != "UP"){
        d = "DOWN";
        down.play();
    }
});

// colision snake
function collision(head, array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
};

// const test = document.querySelector('#myBtn');

const closeModal = document.querySelector('.close');
const modal = document.querySelector('.modal');

funModal = () => {
    modal.style.display = "block";
    closeModal.addEventListener('click', () => {
        modal.style.display = "none";
    });
    window.addEventListener('click', (e) => {
        if (e.target == modal) {
          modal.style.display = "none";
        }
    });
};

let timeSpan = document.querySelector('.time-in-game');
let scoreSpan = document.querySelector('.score-in-game');

gameTime = () => {
    let times = 0;
    setInterval( timeGo = () => {
        times++;
        timeSpan.innerHTML = times;
    }, 1000);
    clearInterval(timeGo)
};



// Draw snake, food, ground in canvas
function draw() {
    ctx.drawImage(ground, 0, 0);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (1 == 0 ) ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // with direction
    if(d == "LEFT") snakeX -= box;
    if(d == "UP") snakeY -= box;
    if(d == "RIGHT") snakeX += box;
    if(d == "DOWN") snakeY += box;

    // if snake eats food
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        eat.play();
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }
    }else{
        //remove tail
        snake.pop();
    }
    
    //add new head
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    //end game
    if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead, snake) ) {
        clearInterval(game);
        dead.play();
        funModal();
        document.removeEventListener('keydown', clickKey(e))
    };

    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 2 * box, 1.6 * box);
};

// draw only board
drawBoard = () => {
    ctx.drawImage(ground, 0, 0);
};

// ***************************** //

let game;

restartGame = () => {
    clearInterval(game);
};

restart.addEventListener("click", () => {
    draw();
});

low.addEventListener('click', () => {
    restartGame();
    lvl = 500;
    actualLvl.innerHTML = "Low";
    game = setInterval(draw, lvl);
});

middle.addEventListener('click', () => {
    restartGame();
    lvl = 300;
    actualLvl.innerHTML = "Middle";
    game = setInterval(draw, lvl);
});

high.addEventListener('click', () => {
    restartGame();
    lvl = 100;
    actualLvl.innerHTML = "High";
    game = setInterval(draw, lvl);
});

