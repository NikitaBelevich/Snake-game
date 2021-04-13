'use strict';

let scoreBlock = document.querySelector('.snake-game__score');
let score = 0;

const config = {
    step: 0,
    maxStep: 6,
    sizeCell: 16,
    sizeBerry: 16 / 4,
};

const snake = {
    // Coordinates our snake
    x: 16,
    y: 16,
    // Snake's speed by x and y coordinates
    speedX: config.sizeCell,
    speedY: 0,
    // Cells of a snake tail
    snakeTail: [],
    maxTail: 3,
};

const berry = {
    // Coordinates of a berry
    x: 0,
    y: 0,
};

const snakeCanvas = document.querySelector('#game-canvas');
const ctx = snakeCanvas.getContext('2d');

function gameLoop() {
    requestAnimationFrame(gameLoop);
    
    if (++config.step < config.maxStep) {
        return;
    }
    config.step = 0;
    // Clearing the canvas
    ctx.clearRect(0, 0, snakeCanvas.clientWidth, snakeCanvas.clientHeight);
    // Painting a snake and a berry again
    paintBerry();
    createSnake();
}
requestAnimationFrame(gameLoop);


// This function paint a snake
function createSnake() {
    snake.x += snake.speedX;
    snake.y += snake.speedY;

    collisionBorder();

    snake.snakeTail.unshift({x: snake.x, y: snake.y});
    if (snake.snakeTail.length > snake.maxTail) {
        snake.snakeTail.pop();
    }

    snake.snakeTail.forEach((el, elIndex) => {
        if (elIndex == 0) {
            // Coloring snake's head
            ctx.fillStyle = '#c04ec0';
        } else {
            // Coloring snake's tail
            ctx.fillStyle = '#963e96';
        }
        ctx.fillRect(el.x, el.y, config.sizeCell, config.sizeCell);
        // Checking a position of a berry and a snake
        // If the position of a berry and a snake the same, then, a berry was eat
        if (el.x == berry.x && el.y == berry.y) {
            // The code increase the tail, the game score and create a new berry at a random position
            snake.maxTail++;
            incScore();
            createRandomBerry();
        }
        // A check of contacting our snake with its tail
        for (let i = elIndex + 1; i < snake.snakeTail.length; i++) {
            // If the snake cross its tail, then the game will be reboot
            if (el.x == snake.snakeTail[i].x && el.y == snake.snakeTail[i].y) {
                rebootGame();
            }
        }

    });
}

function collisionBorder() {
	if (snake.x < 0) {
	    snake.x = snakeCanvas.clientWidth - config.sizeCell;
	} else if (snake.x >= snakeCanvas.clientWidth) {
	    snake.x = 0;
	}

	if (snake.y < 0) {
	    snake.y = snakeCanvas.clientHeight - config.sizeCell;
	} else if (snake.y >= snakeCanvas.clientHeight) {
	    snake.y = 0;
	}
}

function rebootGame() {
    score = 0;
	writeDraw();

	snake.x = 208;
	snake.y = 208;
	snake.snakeTail.length = 0;
	snake.maxTail = 3;
	snake.speedX = config.sizeCell;
	snake.speedY = 0;

	createRandomBerry();
}

function paintBerry() {
    ctx.beginPath();
    ctx.fillStyle = "#ff276d";
    ctx.arc(berry.x + (config.sizeCell / 2), berry.y + (config.sizeCell / 2), config.sizeBerry, 0, 2 * Math.PI);
    ctx.fill();
}

function createRandomBerry() {
    berry.x = randomInteger(0, snakeCanvas.clientWidth / config.sizeCell - 2) * config.sizeCell;
    berry.y = randomInteger(0, snakeCanvas.clientHeight / config.sizeCell - 2) * config.sizeCell;
}

function incScore() {
    score++;
    writeDraw();
}
function writeDraw() {
    scoreBlock.textContent = score;
}
function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}


document.addEventListener('keydown', e => {
    if (e.code == 'KeyW' || e.code == 'ArrowUp') {
        snake.speedY = -config.sizeCell;
        snake.speedX = 0;
    }
    if (e.code == 'KeyS' || e.code == 'ArrowDown') {
        snake.speedY = config.sizeCell;
        snake.speedX = 0;
    }
    if (e.code == 'KeyA' || e.code == 'ArrowLeft') {
        snake.speedX = -config.sizeCell;
        snake.speedY = 0;
    }
    if (e.code == 'KeyD' || e.code == 'ArrowRight') {
        snake.speedX = config.sizeCell;
        snake.speedY = 0;
    }
});
