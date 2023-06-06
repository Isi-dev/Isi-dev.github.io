function Player(canvas) {
    this.x = canvas.width / 2 - 15;
    this.y = canvas.height - canvas.height / 4;
    this.startingX = this.x;
    this.velX = 0;
    this.velY = 0;
    this.width = 30;
    this.height = 50;
    //Touch inputs
    this.startTouchX = 0;
    this.startTouchY = 0;
    this.swipeLimit = 50;
}

Player.prototype.restart = function () {
    this.x = this.startingX;
    this.velX = 0;
    this.velY = 0;
    this.startTouchX = 0;
    this.startTouchY = 0;
}

Player.prototype.setPosition = function (canvas, game) {
    this.x = this.startingX;
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

        if (game.playScreen) {
            if (Math.abs(this.startTouchX - endTouchX) >= Math.abs(this.startTouchY - endTouchY)) {
                //Swipe right
                if (this.startTouchX < endTouchX - this.swipeLimit) {
                    if (this.velX < 0) this.velX = 0;
                    else if (this.velX <= 2) this.velX += 1;
                }

                //Swipe left
                if (this.startTouchX > endTouchX + this.swipeLimit) {
                    if (this.velX > 0) this.velX = 0;
                    else if (this.velX >= -2) this.velX -= 1;
                }
            } else {

                //Swipe Down
                if (this.startTouchY < endTouchY - this.swipeLimit) {
                    if (this.velY > 0) this.velY -= 1;
                }

                //Swipe Up
                if (this.startTouchY > endTouchY + this.swipeLimit) {
                    if (this.velY <= 9) this.velY += 1;
                }
            }
        }
        //Handle clicks
        if (Math.abs(this.startTouchX - endTouchX) < this.swipeLimit && Math.abs(this.startTouchY - endTouchY) < this.swipeLimit) {

            if (game.playScreen) {
                this.velX = 0;
                this.velY = 0;
            } else {
                if (this.startTouchY > canvas.height / 6 && this.startTouchY < (canvas.height / 6 + canvas.height / 12)) {
                    game.historyGame = true;
                    game.playScreen = true;
                }else if(this.startTouchY > 2*canvas.height / 6 && this.startTouchY < (2*canvas.height / 6 + canvas.height / 12)){
                    game.generationGame = true;
                    game.playScreen = true;
                }else if(this.startTouchY > 3*canvas.height / 6 && this.startTouchY < (3*canvas.height / 6 + canvas.height / 12)){
                    game.transmissionGame = true;
                    game.playScreen = true;
                }else if(this.startTouchY > 4*canvas.height / 6 && this.startTouchY < (4*canvas.height / 6 + canvas.height / 12)){
                    game.distributionGame = true;
                    game.playScreen = true;
                }else if(this.startTouchY > 5*canvas.height / 6 && this.startTouchY < (5*canvas.height / 6 + canvas.height / 12)){
                    game.generalGame = true;
                    game.playScreen = true;
                }
            }
        }
        canvas.removeEventListener("touchend", swipes);
    }
}

Player.prototype.draw = function (ctx) {
    ctx.beginPath();
    ctx.fillStyle = "brown";
    ctx.rect(this.x += this.velX, this.y, this.width, this.height);
    ctx.fill();
}

Player.prototype.update = function (canvas) {
    if (this.x < 0) {
        this.velX = 0;
        this.x = 0;
    }
    if (this.x + this.width > canvas.width) {
        this.velX = 0;
        this.x = canvas.width - this.width;
    }

}

export default Player