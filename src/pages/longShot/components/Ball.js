

class Ball {
    constructor(canvasWidth, canvasHeight) {
        this.cw = canvasWidth;
        this.ch = canvasHeight;
        this.ch60 = canvasHeight / 13.3;
        this.g = canvasHeight - canvasHeight / 40;
        this.initialHeight = this.ch - this.ch / 6.67;
        this.posX = this.cw / 2;
        this.posY = this.ch - this.ch / 6.67;
        this.dx = 0;
        this.curve = 0;
        this.curveIntensity = 0.05;
        this.curveMax = 0;
        this.dy = 0;
        this.rad = this.cw / 48;
        this.takenOut = 0;
        this.landed = false;
        this.playerScore = 0;
        this.opponentScore = 0;

    }

    restartNewLevel(){
        this.restart();
        this.playerScore = 0;
        this.opponentScore = 0;
    }

    restart() {
        this.posX = this.cw / 2;
        if (this.posY <= this.ch60)
            this.posY = this.ch60 + this.ch / 8;
        else this.posY = this.ch - this.ch / 6.67;
        this.dx = 0;
        this.curve = 0;
        this.curveIntensity = 0.05;
        this.curveMax = 0;
        this.dy = 0;
        this.takenOut = 0;
        this.landed = false;
    }
    setPosition(x, y) {
        this.posX = x;
        this.posY = y;
        this.dx = 0;
        this.dy = 4;
        this.curve = 0;
        this.curveMax = 0;
        this.curveIntensity = 0.05;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = "orange";
        ctx.arc(this.posX, this.posY, this.rad, 0, 2 * Math.PI);
        ctx.fill();
    }
    update(Game) {
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

        if (this.posX >= this.cw) {
            this.curveMax = 0;
            this.curve = 0;
            this.dx = -2;
        }


        this.posY += this.dy;
        if (this.posY <= this.ch60 || this.posY >= this.g) {
            this.dy = 0;
            this.landed = true;
            if (this.posY <= this.ch60)this.playerScore++;
            else this.opponentScore++;

           
        }

        // if(this.dy <-10)this.dy = -10;

    }
}





export default Ball