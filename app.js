// canvas element 

const cvs = document.querySelector('#snake');
const ctx = cvs.getContext('2d');

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

// create food and random position food

let food = {
    x = Math.floor(Math.random() * 17 + 1) * box,
    y = Math.floor(Math.random() * 15 + 3) * box
};

// controle the snake
let d;

// event listener to controle snake WSAD or ARROWS

document.addEventListener("keydown", (e) => {
    let key = e.keyCode;
    if (key == 37 || key == 65 &&  d != "RIGHT") {
        d = "LEFT";
    }else if(key == 38 || key == 87 && d != "DOWN") {
        d = "UP";
    }else if(key == 39 || key == 68 && d != "LEFT") {
        d = "RIGHT";
    }else if(key == 40 || key == 83 && d != "UP") {
        d = "DOWN";
    }
});

// Draw snake and food in canvas

function draw() {
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
    if(d == "Right") snakeX += box;
    if(d == "DOWN") snakeY += box;

    // if snake eats food

    if (snakeX == food.x && snakeY == food.y) {
        score++
        // eat.paly();
        food = {
            x = Math.floor(Math.random() * 17 + 1) * box,
            y = Math.floor(Math.random() * 15 + 3) * box
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

    snake.unshift(newHead);
};

// call draw function every 500ms 
// this is option mode the game (low, medium, hard)
let lvl = 500;
let game = setInterval(draw, lvl);

