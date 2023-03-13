


function Paddle() {
    this.posY = 0;
    console.log("Paddle");

    //Touch inputs
    this.startTouchX=0;
    this.startTouchY=0;
    this.swipeLimit = 50;

    this.pWidth = 100;
    this.pPosX = 0;
    this.vx = 0;
    this.vy = 0;

}

Paddle.prototype.restart = function(){
    this.startTouchX=0;
    this.startTouchY=0;
    this.pWidth = 100;
    this.pPosX = 190;
    this.posY = 760;
    this.vx = 0;
    this.vy = 0;
}

Paddle.prototype.setInitialPosition = function(){
    this.pPosX = 190;
    this.posY = 760;
     this.vx = 0;
    this.vy = 0;
}

Paddle.prototype.setPosition = function (canvas, canvasWidth, canvasHeight) {
    this.pPosX = canvasWidth / 2 - 50;
    this.posY = canvasHeight - canvasHeight / 20;
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
                if( this.vx<=0) this.vx=2;
                else  this.vx+=2;
            }

            //Swipe left
            if (this.startTouchX > endTouchX + this.swipeLimit) {
                if( this.vx>=0) this.vx=-2;
                else  this.vx-=2;
            }
        } else {

            //Swipe Down
            if (this.startTouchY < endTouchY - this.swipeLimit) {
                if(this.vy<=0)this.vy=2;
                else this.vy+=2;
            }

            //Swipe Up
            if (this.startTouchY > endTouchY + this.swipeLimit) {
                if(this.vy>=0)this.vy=-2;
                else this.vy-=2;
            }
        }

        //Handle clicks
        if (Math.abs(this.startTouchX - endTouchX) < this.swipeLimit && Math.abs(this.startTouchY - endTouchY) < this.swipeLimit) {
            this.vx=0;
           this.vy=0;
        }
        canvas.removeEventListener("touchend", swipes);
    }
}

Paddle.prototype.draw = function (ctx) {
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.rect(this.pPosX, this.posY, this.pWidth, 15);
    ctx.stroke();
    ctx.fill();
}

Paddle.prototype.update = function (canvasWidth, canvasHeight, ball, Game) {
    //Position the paddle
    if (this.pPosX >= 0 && this.pPosX + this.pWidth <= canvasWidth)
        this.pPosX +=  this.vx;
    if (this.pPosX < 0){
        this.pPosX = 0;
         this.vx=0;
    } 
    if (this.pPosX + this.pWidth > canvasWidth){
        this.pPosX = canvasWidth - this.pWidth;
         this.vx=0;
    } 
    if (this.posY >= canvasHeight - 120 && this.posY <= canvasHeight - 40)
        this.posY += this.vy;
    if (this.posY < canvasHeight - 120){
        this.posY = canvasHeight - 120;
        this.vy=0;
    } 
    if (this.posY > canvasHeight - 40) this.posY = canvasHeight - 40;

    //Interaction with ball
    if (ball.posY + ball.rad >= this.posY && ball.posY + ball.rad <= this.posY + 8) {
        if (ball.posX + ball.rad + 5 >= this.pPosX && ball.posX - 5 <= this.pPosX + this.pWidth){
            if(this.vy>=0)ball.dy = -4;
            else ball.dy = -4-Math.abs(this.vy);
            ball.dx = ball.dx +  this.vx;
            if(ball.dx !== 0)ball.curveMax= this.vx*5;
            if( this.vx===-2 ||  this.vx===2)ball.curveIntensity=0.05;
            if( this.vx===-4 ||  this.vx===4)ball.curveIntensity=0.06;
            if( this.vx===-6 ||  this.vx===6)ball.curveIntensity=0.07;
            if( this.vx<=-8 ||  this.vx>=8)ball.curveIntensity=0.09;
        } 
    
        if (ball.posX + ball.rad + 5 >= this.pPosX && ball.posX + ball.rad <= this.pPosX) ball.dx = -4;
        if (ball.posX >= this.pPosX + this.pWidth && ball.posX - 5 <= this.pPosX + this.pWidth) ball.dx = 4;
    }
    if (ball.posY <= this.posY + 16 && ball.posY >= this.posY + 8) {
        if (ball.posX + ball.rad + 5 >= this.pPosX && ball.posX - 5 <= this.pPosX + this.pWidth){
            ball.dy = 4;
        } 
    }
    if(Game.bonusScore >= 0.1)Game.bonusScore-=0.1;
}


export default Paddle