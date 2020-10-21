/*Todo
    -button->play, reset
    -highscore
*/

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const score = document.getElementById("scoreH2");
const highscore = document.getElementById("highscore");
const button = document.getElementById("playButton");
ctx.fill()

let size = 20;
let speed = size;
let frame = 0;
let hue = 0;
let isOver = false;
let highscoreValue = 0;
let snake;
let food;

function startGame(){
    snake = new Snake();
    snake.update();
    snake.draw();
    
    food = new Food();
    food.newFood();
    food.drawFood();
    animate();
    button.style.display = "none";
}

window.addEventListener("keydown", function(event){
    snake.changeDirection(event.key);
})

function animate(){
    if(frame % 10 === 0){
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        createGrid();
        checkIfEat();
        food.drawFood();
        snake.update();
        snake.draw();
        checkCollision();



        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.moveTo(food.x+speed/2,food.y+speed/2);
        ctx.lineTo(snake.x+speed/2, snake.y+speed/2);
        ctx.stroke();
    }
    if(!isOver){
        requestAnimationFrame(animate);
    } else{
        restart();
    }
    frame++;
}

function checkIfEat(){
    if(snake.x === food.x && snake.y === food.y){
        snake.tailLength += 1;
        food.newFood();
        food.hue += 5;
        score.innerHTML= "Score: " + (snake.tailLength);
        setHighscore();
    }
}

function checkCollision(){
    for(let i = 1; i < snake.tailCoordinates.length; i++){
        if(snake.x == snake.tailCoordinates[i].x && snake.y == snake.tailCoordinates[i].y){
            console.log("collision");
            isOver = true;
            return;
        }
    }
}

function createGrid(){
    for(let i = 0; i < canvas.width/speed; i++){
        for(let j = 0; j < canvas.height/speed; j++){
            ctx.beginPath();
            ctx.rect(i*speed, j*speed, speed, speed);
            if((i+j)%2 == 0){
                ctx.fillStyle = "black";
            } else{
                ctx.fillStyle = "#111111";
            }
            ctx.fill();
        }
    }
}

function setHighscore(){
    if(snake.tailLength >= highscoreValue){
        console.log("neww highscore")
        highscoreValue = snake.tailLength;
        highscore.innerHTML = "Highscore: " + highscoreValue;
    }
}

function restart(){
    isOver = false;
    button.style.display = "block";
    score.innerHTML = "Score: 0";
}