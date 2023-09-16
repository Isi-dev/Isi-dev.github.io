function Option(y) {
    this.posX = 0;
    this.posY = y;
    this.initialY = this.posY;
    this.text = '';
    this.vy = 0;
    this.correct = false;
    this.playerTouched = false;
}

Option.prototype.restart = function(){
    this.posY = this.initialY;
    this.vy = 0;
    this.playerTouched = false;
}


Option.prototype.setPositionX = function (x) {
    this.posX = x;
}

Option.prototype.draw = function (ctx, width, height) {
    ctx.beginPath();
    ctx.strokeStyle = "black";
    if (!this.playerTouched)
        ctx.fillStyle = "white";
    if (this.playerTouched) {
        ctx.fillStyle = "red";
        if (this.correct) ctx.fillStyle = "green";      
    }
    ctx.rect(this.posX, this.posY + this.vy, width, height);
    ctx.stroke();
    ctx.fill();
    ctx.font = "18px Arial";
    ctx.fillStyle = "black";
    wrapText(ctx, this.text, this.posX + width / 2, this.posY + this.vy + height / 2, width-10, height/8);
}

Option.prototype.update = function (player, Game, width, height) {
    this.vy += player.velY;

    if (!this.playerTouched) {

        if (player.y <= this.posY + this.vy + height && player.y + player.height >= this.posY + this.vy && ((player.x <= this.posX && player.x + player.width >= this.posX) || (player.x <= this.posX + width && player.x + player.width >= this.posX + width))) {
            player.velY = 0;
        }

        if (player.x > this.posX && player.x + player.width < this.posX + width && player.y < this.posY + this.vy + height && player.y+player.height > this.posY + this.vy) {
            this.playerTouched = true;
            if (this.correct) Game.score += 10;
            else Game.life--;
        }
    } else {
        if (player.y <= this.posY + this.vy + height && player.y + player.height >= this.posY + this.vy) {
            if(player.x <= this.posX){
                player.velX = 0;
                player.x = this.posX+1;
            }
            if(player.x+player.width >= this.posX + width){
                player.velX = 0;
                player.x = this.posX + width - player.width - 1;
            }
            player.velX = 0;
        }
    }
}

var wrapText = function wrapText(context, text, x, y, maxWidth, lineHeight) {

    //To centralize text vertically
    var wordLength = context.measureText(text);
    var noOfLines = parseInt(wordLength.width/maxWidth);
    // var yAdjust = noOfLines > 2 ? (noOfLines-2)*lineHeight:0;
    var yAdjust = noOfLines *lineHeight/2;
    y-=yAdjust;

    //Wrap text: To send part of the text to the next line when it exceeds 
    //a certain width
    var words = text.split(' ');
    var line = '';

    for(var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + ' ';
      var metrics = context.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      }
      else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
  }


export default Option