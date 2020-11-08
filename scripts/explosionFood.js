const canvasE = document.getElementById("canvas1");
const ctxE = canvasE.getContext("2d");

const squareLength = 10;
const amountS = 50;

const checkBox = document.getElementById("animInput");

class Rect {
    constructor(x, y, dx, dy, color) {
        this.x = x;
        this.y = y;
        this.dx = dx * 5;
        this.dy = dy * 5;
        this.color = color;
        this.size = squareLength;
        this.isOver = false;
    }

    draw() {
        console.log(this.color);
        if (!this.isOver) {
            ctxE.beginPath();
            ctxE.rect(this.x, this.y, this.size, this.size);
            ctxE.fillStyle = this.color;
            ctxE.fill();
        }
    }

    update() {
        if (!this.isOver) {
            if (
                this.x < -squareLength ||
                this.x > canvasE.width + squareLength
            ) {
                this.isOver = true;
            } else this.x += this.dx;
            if (
                this.y < -squareLength ||
                this.y > canvasE.height + squareLength
            ) {
                this.isOver = true;
            } else this.y += this.dy;
            this.size -= 0.08;
            if (this.size <= 0) this.isOver = true;
        }
    }
}

let rect = [];

for (let i = 0; i < amountS; i++) {
    rect[i] = new Rect(
        canvasE.width / 2 - squareLength / 2,
        canvasE.height / 2 - squareLength / 2,
        Math.random() - 0.5,
        Math.random() - 0.5,
        "orange"
    );
    rect[i].draw();
}



function animateExpl() {
    //ctxE.clearRect(0, 0, canvasE.width, canvasE.height);
    if(checkBox.checked){
        let counter = 0;
        for (let i = 0; i < amountS; i++) {
            rect[i].update();
            rect[i].draw();
            if (rect[i].isOver) counter += 1;
        }
    
        if (counter < amountS) {
            requestAnimationFrame(animateExpl);
        } else {
            console.log("over");
            ctxE.clearRect(0, 0, canvasE.width, canvasE.height);
            createGrid();
        }
    }
}

function explodeFood(color, x, y) {
    for (let i = 0; i < amountS; i++) {
        rect[i] = new Rect(
            x,
            y,
            Math.random() - 0.5,
            Math.random() - 0.5,
            color
        );
        rect[i].draw();
    }
    animateExpl();
}
