
//Touch inputs
var startTouchX;
var startTouchY;
const swipeLimit = 50;

const pWidth = 100;
var pPosX = 0;
var vx = 0, vy = 0;


function Paddle() {
    this.posY = 0;
    console.log("Paddle")

}

Paddle.prototype.setInitialPosition = function(){
    pPosX = 190;
    this.posY = 760;
    vx = 0;
    vy = 0;
}

Paddle.prototype.setPosition = function (canvas, canvasWidth, canvasHeight) {
    pPosX = canvasWidth / 2 - 50;
    this.posY = canvasHeight - canvasHeight / 20;
    canvas.addEventListener("touchmove", e => {
        e.preventDefault();
    });
    canvas.addEventListener("touchstart", e => {
        e.preventDefault();
        startTouchX = e.changedTouches[0].clientX;
        startTouchY = e.changedTouches[0].clientY;
        canvas.addEventListener("touchend", swipes);

    });
    const swipes = e => {
        var endTouchX = e.changedTouches[0].clientX;
        var endTouchY = e.changedTouches[0].clientY;

        if (Math.abs(startTouchX - endTouchX) >= Math.abs(startTouchY - endTouchY)) {
            //Swipe right
            if (startTouchX < endTouchX - swipeLimit) {
                if(vx<=0)vx=2;
                else vx+=2;
            }

            //Swipe left
            if (startTouchX > endTouchX + swipeLimit) {
                if(vx>=0)vx=-2;
                else vx-=2;
            }
        } else {

            //Swipe Down
            if (startTouchY < endTouchY - swipeLimit) {
                if(vy<=0)vy=2;
                else vy+=2;
            }

            //Swipe Up
            if (startTouchY > endTouchY + swipeLimit) {
                if(vy>=0)vy=-2;
                else vy-=2;
            }
        }

        //Handle clicks
        if (Math.abs(startTouchX - endTouchX) < swipeLimit && Math.abs(startTouchY - endTouchY) < swipeLimit) {
           vx=0;
           vy=0;
        }
        canvas.removeEventListener("touchend", swipes);
    }
}

Paddle.prototype.draw = function (ctx) {
    ctx.beginPath();
    ctx.fillStyle = "orange";
    ctx.rect(pPosX, this.posY, pWidth, 15);
    ctx.stroke();
    ctx.fill();
}

Paddle.prototype.update = function (canvasWidth, canvasHeight, ball) {
    //Position the paddle
    if (pPosX >= 0 && pPosX + pWidth <= canvasWidth)
        pPosX += vx;
    if (pPosX < 0){
        pPosX = 0;
        vx=0;
    } 
    if (pPosX + pWidth > canvasWidth){
        pPosX = canvasWidth - pWidth;
        vx=0;
    } 
    if (this.posY >= canvasHeight - 100 && this.posY <= canvasHeight - 40)
        this.posY += vy;
    if (this.posY < canvasHeight - 100){
        this.posY = canvasHeight - 100;
        vy=0;
    } 
    if (this.posY > canvasHeight - 40) this.posY = canvasHeight - 40;

    //Interaction with ball
    if (ball.posY + ball.rad >= this.posY && ball.posY + ball.rad <= this.posY + 8) {
        if (ball.posX + ball.rad + 5 >= pPosX && ball.posX - 5 <= pPosX + pWidth){
            if(vy>=0)ball.dy = -4;
            else ball.dy = -4-Math.abs(vy);
            ball.dx = ball.dx + vx;
            if(ball.dx !== 0)ball.curveMax=vx*5;
        } 
    
        if (ball.posX + ball.rad + 5 >= pPosX && ball.posX + ball.rad <= pPosX) ball.dx = -4;
        if (ball.posX >= pPosX + pWidth && ball.posX - 5 <= pPosX + pWidth) ball.dx = 4;

    }
    if (ball.posY <= this.posY + 15 && ball.posY >= this.posY + 8) {
        if (ball.posX + ball.rad + 5 >= pPosX && ball.posX - 5 <= pPosX + pWidth) ball.dy = 4;
    }
}


export default Paddle