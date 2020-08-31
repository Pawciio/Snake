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

