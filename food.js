class Food{
    constructor(){
        this.x;
        this.y;
        this.width = size;
        this.height = size;
        this.hue = 0;
    }

    newFood(){
        this.x = Math.floor((Math.random() * (canvas.clientWidth/speed)))*speed;
        this.y =  Math.floor((Math.random() * (canvas.clientHeight/speed)))*speed;
    }

    drawFood(){
        ctx.beginPath();
        ctx.fillStyle = "hsla(" + this.hue+100 + ",100%,50% ,0.8)";
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();
    }
}