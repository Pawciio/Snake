// canvas element 
const cvs = document.querySelector('#snake');
const ctx = cvs.getContext('2d');

// load image
const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

// button lvl and restart
const low = document.querySelector('.low');
const middle = document.querySelector('.middle');
const high = document.querySelector('.high');

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
document.addEventListener("keydown", (e) => {
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
    if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17*box || collision(newHead, snake) ) {
        clearInterval(game)
        dead.play();
    }

    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 2 * box, 1.6 * box);
};

// call draw function every 300ms 
// this is option mode the game (low, medium, hard)

let lvl = 300;
let game = setInterval(draw, lvl);