var head_img = new Image;
var body_img = new Image;
var apple_img = new Image;
head_img.src = "./img/head.png";
body_img.src = "./img/bodyy.png";
apple_img.src = "./img/apple.png";
let background = document.getElementById("grass");
let canvas = document.getElementById("snake"); //criar elemento que irá rodar o jogo
let context = canvas.getContext("2d"); //....
let box = 32;
let snake = []; //criar cobrinha como lista, já que ela vai ser uma série de coordenadas, que quando pintadas, criam os quadradinhos
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG() {
    background_v = context.createPattern(background, "repeat");
    context.fillStyle = background_v;
    context.fillRect(0, 0, 16 * box, 16 * box); //desenha o retângulo usando x e y e a largura e altura setadas
}

function criarCobrinha() {
    for (i = 0; i < snake.length; i++) {
        if (i == 0 ) {
        snake_head = context.createPattern(head_img,"repeat");
        context.fillStyle = snake_head;
        context.fillRect(snake[i].x, snake[i].y, box, box);
        }
        if (i != 0) {
        snake_body = context.createPattern(body_img, "repeat");
        context.fillStyle = snake_body;
        context.fillRect(snake[i].x, snake[i].y, box, box);
        }
    }
}

function drawFood() {
    apple = context.createPattern(apple_img, "repeat");
    context.fillStyle = apple;
    context.fillRect(food.x, food.y, box, box);
}

//quando um evento acontece, detecta e chama uma função
document.addEventListener('keydown', update);

function update(event) {
    if (event.keyCode == 37 && direction != 'right'){ 
        direction = 'left';
        head_img.src = "./img/headleft.png";
        body_img.src = "./img/bodyyleft.png";
    }
    if (event.keyCode == 38 && direction != 'down'){ 
        direction = 'up';
        head_img.src = "./img/headup.png";
        body_img.src = "./img/bodyyup.png";
    }
    if (event.keyCode == 39 && direction != 'left'){
        direction = 'right';
        head_img.src = "./img/head.png";
        body_img.src = "./img/bodyy.png";
    }
    if (event.keyCode == 40 && direction != 'up'){ 
        direction = 'down';
        head_img.src = "./img/headown.png";
        body_img.src = "./img/bodyydown.png";
    }
}

function iniciarJogo() {

    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo);
            alert('Game Over :(');
            location.reload();
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    if (snakeX != food.x || snakeY != food.y) {
        snake.pop(); //pop tira o último elemento da lista
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead); //método unshift adiciona como primeiro quadradinho da cobrinha
}

let jogo = setInterval(iniciarJogo, 100);