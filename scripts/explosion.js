const canvasB = document.getElementById("canvasBackground");
const ctxB = canvasB.getContext("2d");

canvasB.width = window.innerWidth;
canvasB.height = window.innerHeight;

const squareLength = 5;
const amount = 400;

const colorS = ["#c63347", "f28e63", "#fc7f81", "#faefc4", "#f9ae9b"];

class Rect{
    constructor(x, y, dx, dy, color){
        this.x = x;
        this.y = y;
        this.dx = dx*10;
        this.dy = dy*10;
        this.color = colorS[Math.floor(Math.random()*colorS.length)];
        this.radius = squareLength;
        this.isOver = false;
    }

    draw(){
        console.log(this.color);
        if(!this.isOver){
            ctxB.beginPath();
            ctxB.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            ctxB.fillStyle = this.color;
            ctxB.fill();
        }
    }

    update(){
        if(!this.isOver){
            if(this.x  < -squareLength || this.x > canvasB.width+squareLength){
                this.isOver = true;
            }
            else this.x += this.dx;
            if(this.y  < -squareLength || this.y > canvasB.height+squareLength){
                this.isOver = true;
            }
            else this.y += this.dy;
            this.radius -= 0.002;
            if(this.radius <= 0) this.isOver = true;
        }
    }
}


let rect = [];

for(let i = 0; i < amount; i++){
    rect[i] = new Rect(canvasB.width/2-squareLength/2, canvasB.height/2-squareLength/2, Math.random()-0.5, Math.random()-0.5, "orange");
    rect[i].draw();
}

function animateB(){
    ctxB.beginPath();
    ctxB.fillStyle = "rgba(0,0,0,0.05)";
    ctxB.rect(0,0,canvasB.width, canvasB.height);
    ctxB.fill();

    let counter = 0;
    for(let i = 0; i < amount; i++){
        rect[i].update();
        rect[i].draw();
        if(rect[i].isOver) counter+=1;
    }

    if(counter < amount){
        requestAnimationFrame(animateB);
    } else{
        console.log("over");
        ctxB.clearRect(0, 0, canvasB.width, canvasB.height);
    }
}


function explosion(){
    for(let i = 0; i < amount; i++){
        rect[i] = new Rect(canvasB.width/2-squareLength/2, canvasB.height/2-squareLength/2, Math.random()-0.5, Math.random()-0.5, "orange");
        rect[i].draw();
    }
    animateB();
}
