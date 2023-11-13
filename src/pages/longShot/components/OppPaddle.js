
class OppPaddle {
    constructor(canvasWidth, canvasHeight, color, startY, accX, accY, speedMax, reactY1, reactY2) {
        this.color = color;
        this.startY = startY;
        this.vx = 0;
        this.vy = 0;
        this.accX = accX;
        this.accY = accY;
        this.speedMax = speedMax;
        this.driftX = 0;
        this.driftY = 0;
        this.reactY1 = reactY1;
        this.reactY2 = reactY2;
        this.cw = canvasWidth;
        this.cwHalf = canvasWidth / 2;
        this.cw5 = this.cw / 96;
        this.ch = canvasHeight;
        this.chHalf = this.ch / 2;
        this.ch20 = this.ch / 40;
        this.ch40 = canvasHeight / 20;
        this.ch60 = canvasHeight / 13.3;
        this.ch5 = canvasHeight / 160;
        this.pWidthHalf = this.cw / 12;
        this.posX = this.chHalf - this.pWidthHalf;
        this.posY = startY;
        this.pWidth = this.cw / 6;
        this.pHeight = this.ch / 40;
        this.pitchHHalf = canvasHeight / 2 - this.ch60 / 2 + this.ch60
        this.hitBall = 100;
    }
}

OppPaddle.prototype.setPosition = function (x, y) {
    this.posX = x;
    this.posY = y;
}


OppPaddle.prototype.restart = function () {
    this.vx = 0;
    this.vy = 0;
    this.driftX = 0;
    this.driftY = 0;
    // this.posX = this.cwHalf - this.pWidthHalf;
    this.posY = this.startY;
    this.hitBall = 0;
}

OppPaddle.prototype.draw = function (ctx) {

    ctx.beginPath();
    // ctx.fillStyle = "lightgray";
    ctx.fillStyle = this.color;
    ctx.rect(this.posX, this.posY, this.pWidth, this.pHeight);
    ctx.stroke();
    ctx.fill();

}

OppPaddle.prototype.update = function (ball, paddle, Game) {
    //Position the paddle


    //serve
    if (ball.dy === 0 && ball.posY < this.chHalf && this.hitBall === 100) {
        if (this.vy < this.speedMax) this.vy += this.accY;
    }
    if (this.hitBall < 100) this.hitBall++;

    if (ball.dy > 0) {
        //Retreat
        if (this.posY > this.startY)
            if (this.vy > -this.speedMax) this.vy -= this.accY;
        if (this.posX < this.cwHalf - this.pWidth) if (this.vx < this.speedMax) this.vx += this.accX;
        if (this.posX > this.cwHalf) if (this.vx > -this.speedMax) this.vx -= this.accX;

    } else {
        //Attack
        if (ball.posY <= this.reactY1) {
            if (this.posX + this.pWidth - this.pWidthHalf / 2 < ball.posX) {
                if (this.vx <= 0) {
                    this.driftX = this.vx * 10;
                    this.vx = this.accX;
                }
                else if (this.vx < this.speedMax) this.vx += this.accX;
            }
            if (this.posX + this.pWidthHalf / 2 > ball.posX) {
                if (this.vx >= 0) {
                    this.driftX = this.vx * 10;
                    this.vx = -this.accX;
                }
                else if (this.vx > -this.speedMax) this.vx -= this.accX;
            }
            if (ball.posY <= this.reactY2) {
                if (this.vy <= 0) {
                    this.vy = this.accY;
                }
                else if (this.vy < this.speedMax) this.vy += this.accY;
            }
        }
    }

    if (this.posX >= 0 && this.posX + this.pWidth <= this.cw) {
        this.posX += (this.vx * 100 + this.driftX * 10) * .01;
    }
    if (this.posX < 0) {
        this.posX = 0;
        this.vx = 0;
    }
    if (this.posX + this.pWidth > this.cw) {
        this.posX = this.cw - this.pWidth;
        this.vx = 0;
    }
    if (this.posY + this.pHeight <= this.pitchHHalf - this.ch20 && this.posY >= this.ch60)
        this.posY += (this.vy * 100 + this.driftY * 10) * .01;
    if (this.posY < this.ch60) {
        this.posY = this.ch60;
        this.vy = 0;
    }
    if (this.posY + this.pHeight > this.pitchHHalf - this.ch20) {

        this.posY = this.pitchHHalf - this.ch20 - this.pHeight;
        this.vy = 0;
    }

    if (this.driftX < 0) {
        this.driftX++;
    }
    if (this.driftX > 0) {
        this.driftX--;
    }
    if (this.driftY < 0) {
        this.driftY++;
    }
    if (this.driftY > 0) {
        this.driftY--;
    }



    //Interaction with ball
    if (ball.posY <= this.posY + this.pHeight && ball.posY >= this.posY - this.ch20) {
        if (ball.posX + ball.rad + this.cw5 >= this.posX && ball.posX - this.cw5 <= this.posX + this.pWidth) {
            if (this.vy <= 0) ball.dy = 4;
            else ball.dy = 4 + Math.abs(this.vy);
            ball.dx = ball.dx + this.vx;
            if (ball.dx !== 0) ball.curveMax = this.vx * this.cw5;
            if (this.vx === -2 || this.vx === 2) ball.curveIntensity = 0.05;
            if (this.vx === -4 || this.vx === 4) ball.curveIntensity = 0.06;
            if (this.vx === -6 || this.vx === 6) ball.curveIntensity = 0.07;
            if (this.vx <= -8 || this.vx >= 8) ball.curveIntensity = 0.09;
        }
        if (ball.posX + ball.rad + this.cw5 >= this.posX && ball.posX + ball.rad <= this.posX) ball.dx = -4;
        if (ball.posX >= this.posX + this.pWidth && ball.posX - this.cw5 <= this.posX + this.pWidth) ball.dx = 4;
    }

    if (ball.landed) {
        
        paddle.restart();
        this.restart();
        ball.restart();
    }



}


export default OppPaddle