


class Paddle {
    constructor(canvasWidth, canvasHeight) {
        this.cw = canvasWidth;
        this.cw5 = this.cw / 96;
        this.ch = canvasHeight;
        this.chHalf = this.ch / 2;
        this.ch20 = this.ch / 40;
        this.ch30 = this.ch / 26.67;
        this.ch40 = canvasHeight / 20;
        this.ch60 = canvasHeight / 13.3;
        this.ch5 = canvasHeight / 160;
        this.pitchHHalf = canvasHeight/2 - this.ch60/2 + this.ch60
        this.posY = 0;
        this.driftX = 0;
        this.driftY = 0;

        //Touch inputs
        this.startTouchX = 0;
        this.startTouchY = 0;
        this.swipeLimit = this.cw / 9.6;

        this.pWidth = this.cw / 6;
        this.pHeight = this.ch / 40;
        this.pPosX = 0;
        this.vx = 0;
        this.vy = 0;

    }
    restart() {
        this.startTouchX = 0;
        this.startTouchY = 0;
        this.pPosX = this.cw / 2 - this.pWidth / 2;
        this.posY = this.ch - this.ch / 20;
        this.vx = 0;
        this.vy = 0;
        this.driftX = 0;
        this.driftY = 0;
    }
    setInitialPosition() {
        this.pPosX = this.cw / 2 - this.pWidth / 2;
        this.posY = this.ch - this.ch / 20;
        this.vx = 0;
        this.vy = 0;
    }
    setPosition(canvas) {
        this.pPosX = this.cw / 2 - this.pWidth / 2;
        this.posY = this.ch - this.ch / 20;
        canvas.addEventListener("touchmove", e => {
            e.preventDefault();
        });
        canvas.addEventListener("touchstart", e => {
            e.preventDefault();
            this.startTouchX = e.changedTouches[0].clientX;
            this.startTouchY = e.changedTouches[0].clientY;
            canvas.addEventListener("touchend", swipes);

        });
        const swipes = e => {
            var endTouchX = e.changedTouches[0].clientX;
            var endTouchY = e.changedTouches[0].clientY;

            if (Math.abs(this.startTouchX - endTouchX) >= Math.abs(this.startTouchY - endTouchY)) {
                //Swipe right
                if (this.startTouchX < endTouchX - this.swipeLimit) {
                    if (this.vx <= 0) {
                        this.driftX = this.vx * 10;
                        this.vx = 2;
                    }
                    else this.vx += 2;
                }

                //Swipe left
                if (this.startTouchX > endTouchX + this.swipeLimit) {
                    if (this.vx >= 0) {
                        this.driftX = this.vx * 10;
                        this.vx = -2;
                    }
                    else this.vx -= 2;
                }
            } else {

                //Swipe Down
                if (this.startTouchY < endTouchY - this.swipeLimit) {
                    if (this.vy <= 0) {
                        this.driftY = this.vy * 10;
                        this.vy = 2;
                    }
                    else this.vy += 2;
                }

                //Swipe Up
                if (this.startTouchY > endTouchY + this.swipeLimit) {
                    if (this.vy >= 0) {
                        this.driftY = this.vy * 10;
                        this.vy = -2;
                    }
                    else this.vy -= 2;
                }
            }

            //Handle clicks
            if (Math.abs(this.startTouchX - endTouchX) < this.swipeLimit && Math.abs(this.startTouchY - endTouchY) < this.swipeLimit) {
                this.vx = 0;
                this.vy = 0;
            }
            canvas.removeEventListener("touchend", swipes);
        };

    }
    draw(ctx) {
        ctx.fillStyle = 'gray';
        // ctx.fillRect(0, this.pitchHHalf + this.ch20, this.cw, 1);
        // ctx.fillStyle = 'white';
        ctx.fillRect(0,  this.ch - this.ch20, this.cw, this.ch20);
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.rect(this.pPosX, this.posY, this.pWidth, this.pHeight);
        ctx.stroke();
        ctx.fill();
    }
    update(ball, Game) {
        //Position the paddle

        if (this.pPosX >= 0 && this.pPosX + this.pWidth <= this.cw) {
            this.pPosX += (this.vx * 100 + this.driftX * 10)*.01;
        }
        if (this.pPosX < 0) {
            this.pPosX = 0;
            this.vx = 0;
        }
        if (this.pPosX + this.pWidth > this.cw) {
            this.pPosX = this.cw - this.pWidth;
            this.vx = 0;
        }
        if (this.posY >= this.chHalf + this.ch20 && this.posY + this.pHeight <= this.ch - this.ch20)
            this.posY += (this.vy * 100 + this.driftY * 10)*.01;
        if (this.posY < this.pitchHHalf + this.ch20) {
            this.posY = this.pitchHHalf + this.ch20;
            this.vy = 0;
        }
        if (this.posY + this.pHeight > this.ch - this.ch20) {

            this.posY = this.ch - this.ch20 - this.pHeight;
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
        if (ball.posY + ball.rad >= this.posY && ball.posY + ball.rad <= this.posY + this.ch40) {
            if (ball.posX + ball.rad + this.cw5 >= this.pPosX && ball.posX - this.cw5 <= this.pPosX + this.pWidth) {
                if (this.vy >= 0) ball.dy = -4;
                else ball.dy = -4 - Math.abs(this.vy);
                ball.dx = ball.dx + this.vx;
                if (ball.dx !== 0) ball.curveMax = this.vx * this.cw5;
                if (this.vx === -2 || this.vx === 2) ball.curveIntensity = 0.05;
                if (this.vx === -4 || this.vx === 4) ball.curveIntensity = 0.06;
                if (this.vx === -6 || this.vx === 6) ball.curveIntensity = 0.07;
                if (this.vx <= -8 || this.vx >= 8) ball.curveIntensity = 0.09;
            }

            if (ball.posX + ball.rad + this.cw5 >= this.pPosX && ball.posX + ball.rad <= this.pPosX) ball.dx = -4;
            if (ball.posX >= this.pPosX + this.pWidth && ball.posX - this.cw5 <= this.pPosX + this.pWidth) ball.dx = 4;
        }

        if (Game.bonusScore >= 0.1) Game.bonusScore -= 0.1;
    }
}







export default Paddle