

const pWidth = 50;
const pHeight = 15;


function BreakablePaddle() {
    this.posX = 0;
    this.posY = 0;
    this.visible = false;
}

BreakablePaddle.prototype.setPosition = function (x, y) {
    this.posX = x;
    this.posY = y;
}

BreakablePaddle.prototype.draw = function (ctx) {
    if (this.visible) {
        ctx.beginPath();
        ctx.fillStyle = "lightgray";
        ctx.rect(this.posX, this.posY, pWidth, pHeight);
        ctx.stroke();
        ctx.fill();
    }
}

BreakablePaddle.prototype.update = function (ball) {
    if (this.visible) {
        //Interaction with ball
        if (ball.posY + ball.rad >= this.posY && ball.posY + ball.rad <= this.posY + 8) {
            if (ball.posX + ball.rad + 5 >= this.posX && ball.posX - 5 <= this.posX + pWidth) {
                ball.curveMax = 0;
                ball.dy = -4;
                this.visible = false;
                ball.takenOut++;
            }
            if (ball.posX + ball.rad + 5 >= this.posX && ball.posX + ball.rad <= this.posX)
                ball.dx = -4;

            if (ball.posX >= this.posX + pWidth && ball.posX - 5 <= this.posX + pWidth)
                ball.dx = 4;


        }
        if (ball.posY <= this.posY + 17 && ball.posY >= this.posY + 8) {
            if (ball.posX + ball.rad + 5 >= this.posX && ball.posX - 5 <= this.posX + pWidth) {
                if (ball.dy < -4) ball.dy += 1;
                else
                    ball.dy = 4;
                this.visible = false;
                ball.takenOut++;
            }
            if (ball.posX + ball.rad + 5 >= this.posX && ball.posX + ball.rad <= this.posX) ball.dx = -4;
            if (ball.posX >= this.posX + pWidth && ball.posX - 5 <= this.posX + pWidth) ball.dx = 4;
        }
    }
}


export default BreakablePaddle