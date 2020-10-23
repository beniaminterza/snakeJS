/*Todo
    -button->play, reset
    -highscore
*/

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const score = document.getElementById("scoreH2");
const highscore = document.getElementById("highscore");
const button = document.getElementById("playButton");
const timem = document.getElementById("time");
ctx.fill()

let size = 20;
let speed = size;
let frame = 0;
let hue = 0;
let isOver = false;
let highscoreValue = getCookie("highscore");
if(highscoreValue == null){
    highscoreValue = 0;
}
highscore.innerHTML = "Highscore: " + highscoreValue;
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
    if(frame % divisor === 0){
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        createGrid();
        checkIfEat();
        food.drawFood();
        snake.update();
        snake.draw();
        checkCollision();
    }
    if(!isOver){
        requestAnimationFrame(animate);
    } else{
        restart();
    }
    frame++;
    if(frame > 10000) frame = 0;
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
        highscoreValue = snake.tailLength;
        highscore.innerHTML = "Highscore: " + highscoreValue;
        setCookie("highscore", highscoreValue, 100);
    }
}

function restart(){
    isOver = false;
    button.style.display = "block";
    score.innerHTML = "Score: 0";
}

function startTime() {
    let today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    timem.innerHTML = h + ":" + m + ":" + s;
    setTimeout(startTime, 1000);
  }

function setCookie(name,value,days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    console.log("cookie: " + document.cookie);
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        let c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
