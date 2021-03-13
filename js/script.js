var head_img = new Image;
var body_img = new Image;
head_img.src = "./img/head.png";
body_img.src = "./img/bodyy.png";


let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let grass = document.getElementById("grass");

let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 16 + 1) * box,
    y: Math.floor(Math.random() * 16 + 1) * box

} 

function criarBG(){
    background = context.createPattern(grass, "repeat")
    context.fillStyle = background;
    context.fillRect(0 , 0 , 16 * box, 16 * box);
}

function criandoCobrinha() {
    for(i=0; i < snake.length; i++){
        if (i == 0) {
            let snake_head = context.createPattern(head_img, "repeat");
            context.fillStyle = snake_head;
            context.fillRect(snake[i].x, snake[i].y, box, box);
        }
        if (i != 0) {
            let snake_body = context.createPattern(body_img, "repeat");
            context.fillStyle = snake_body;
            context.fillRect(snake[i].x, snake[i].y, box, box);

        }
    }
}

function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

function update (event){
    if (event.keyCode == 37 && direction != 'right') direction = 'left', head_img.src = "./img/head.png", body_img.src = "./img/bodyy.png";
    
    if (event.keyCode == 38 && direction != 'down') direction = 'up', head_img.src = "./img/head.png", body_img.src = "./img/bodyy.png";
    
    if (event.keyCode == 39 && direction != 'left') direction = 'right', head_img.src = "./img/head.png", body_img.src = "./img/bodyy.png";

    if (event.keyCode == 40 && direction != 'up') direction = 'down', head_img.src = "./img/head.png", body_img.src = "./img/bodyy.png";

}


function iniciarJogo() {
    
    if(snake[0].x > 15*box && direction == 'right') snake[0].x = 0;
    if(snake[0].x < 0 && direction == 'left') snake[0].x = 15 * box;
    if(snake[0].y > 15*box && direction == 'down') snake[0].y = 0;
    if(snake[0].y < 0 && direction == 'up') snake[0].y = 15* box;

    for(i = 1; i < snake.length; i++){
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo);
            alert('GAME OVER :('); 
            location.reload();
        }
    }

    criarBG();
    criandoCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == 'right') snakeX += box;
    if(direction == 'left') snakeX -= box;
    if(direction == 'up') snakeY -= box;
    if(direction == 'down') snakeY += box;

    if (snakeX != food.x || snakeY != food.y) {
        snake.pop();
    }
    else{
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

iniciarJogo();


let jogo = setInterval(iniciarJogo, 100);