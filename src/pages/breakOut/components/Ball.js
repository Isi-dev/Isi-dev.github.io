

function Ball() {
    this.initialHeight = 620;
    this.posX = 240;
    this.posY = 620;
    this.dx = 0;
    this.curve = 0;
    this.curveIntensity=0.04;
    this.curveMax = 0;
    this.dy = 4;
    this.rad = 10;
    this.takenOut = 0;
    console.log("ball")

}

Ball.prototype.setPosition = function (x, y) {
    this.posX = x;
    this.posY = y;
    this.dx = 0;
    this.dy = 4;
    this.curve = 0;
    this.curveMax = 0;
    this.curveIntensity=0.04;
}

Ball.prototype.draw = function (ctx) {
    ctx.beginPath();
    ctx.fillStyle = "orange";
    ctx.arc(this.posX, this.posY, this.rad, 0, 2 * Math.PI);
    ctx.fill();
}

Ball.prototype.update = function (canvasWidth, canvasHeight) {
    this.posX += this.dx;
    this.posX -= this.curve;
    if (this.curveMax !== 0) {
        if (this.curveMax > 0) this.curve += this.curveIntensity;
        else this.curve -= this.curveIntensity;
    }
  
    if (this.posX <= 0) {
        this.curveMax = 0;
        this.curve = 0;
        this.dx = 2;
    }

    if (this.posX >= canvasWidth) {
        this.curveMax = 0;
        this.curve = 0;
        this.dx = -2;
    }


    this.posY += this.dy;
    if (this.posY <= 0 || this.posY >= canvasHeight) {
        this.dy = -this.dy;
    }


}

export default Ball