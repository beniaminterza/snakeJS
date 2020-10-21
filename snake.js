class Snake{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.directionX = speed;
        this.directionY = 0;
        this.width = size;
        this.height = size;
        this.tailLength = 0;
        this.route = [];
        this.tailCoordinates = [];
    }

    update(){
        if(this.x >= canvas.width){
            this.x = 0-speed;
        } else if(this.x < 0){
            this.x = canvas.width;
        } else if(this.y >= canvas.height){
            this.y = 0-speed;
        } else if(this.y < 0){
            this.y = canvas.height;
        }
        
        this.x += this.directionX;
        this.y += this.directionY;
    }

    draw(){   
        if(this.route.length > this.tailLength){
            this.route.shift();
        }
        this.route.push(new Coordinate(this.x, this.y));
        for(let i = 0; i < this.route.length; i++){
            let coordinate = this.route[this.route.length-i-1];
            this.tailCoordinates[i] = this.route[this.route.length-i-1];
            ctx.beginPath();
            ctx.fillStyle = "hsla(" + hue + ",100%,50% ,0.8)";
            ctx.rect(coordinate.x, coordinate.y, this.width, this.height);
            ctx.fill();
            hue += 0.1*this.tailLength;
        }
    }

    changeDirection(key){
        if(key == "ArrowUp" && this.x < canvas.width && this.x >= 0){
            this.directionX = 0;
            this.directionY = -speed;
        } else if(key == "ArrowDown" && this.x < canvas.width && this.x >= 0){
            this.directionX = 0;
            this.directionY = speed;
        } else if(key == "ArrowLeft" && this.y < canvas.height && this.y >= 0){
            this.directionX = -speed;
            this.directionY = 0;
        } else if(key == "ArrowRight" && this.y < canvas.height && this.y >= 0){
            this.directionX = speed;
            this.directionY = 0;
        }
    }
}
