import Option from "./Option"


function Knowthis(y, canvas) {
    this.visible = false;
    this.posY = y;
    this.initialY = this.posY;
    this.vy = 0;
    this.question = '';
    this.width = canvas.width;
    this.height = canvas.height;
    this.halfWidth = canvas.width / 2;
    this.optionWidth = canvas.width / 3;
    this.halfOptionWidth = this.optionWidth / 2;
    this.twiceOptionWidth = this.optionWidth * 2;
    this.optionHeight = canvas.height / 4;
    this.questionPosY = y + 5*canvas.height / 8;

    this.option = [];
    for (var j = 0; j < 3; j++) {
        this.option[j] = new Option(y);
    };
}

Knowthis.prototype.restart = function(){
    this.visible = false;
    this.posY = this.initialY;
    this.vy = 0;
    for (var j = 0; j < 3; j++) {
        this.option[j].restart();
    };
    this.setRandomOptionPosition();
}

Knowthis.prototype.setQuestionAndOptions = function (question, ans_1, ans_2, ans_3) {
    this.question = question;
    this.option[0].text = ans_1;
    this.option[0].correct = true;
    this.option[1].text = ans_2;
    this.option[2].text = ans_3;
}

Knowthis.prototype.setRandomOptionPosition = function () {
    const pos = getRand(10);
    if (pos <= 3) {
        this.option[0].setPositionX(this.optionWidth);
        this.option[1].setPositionX(0);
        this.option[2].setPositionX(this.twiceOptionWidth);
    } else if (pos > 3 && pos < 7) {
        this.option[0].setPositionX(0);
        this.option[1].setPositionX(this.twiceOptionWidth);
        this.option[2].setPositionX(this.optionWidth);
    } else {
        this.option[0].setPositionX(this.twiceOptionWidth);
        this.option[1].setPositionX(this.optionWidth);
        this.option[2].setPositionX(0);
    }
}

Knowthis.prototype.draw = function (canvas, ctx, bgColor, textColor) {
    if (this.visible) {
        ctx.beginPath();
        ctx.fillStyle = bgColor;
        ctx.rect(0, this.posY + this.vy, this.width, this.height);
        ctx.font = "22px Arial";
        ctx.fillStyle = textColor;
        wrapText(ctx, this.question, this.halfWidth, this.questionPosY-11 + this.vy, canvas.width-50, 22);
        for (var j = 0; j < 3; j++) {
            this.option[j].draw(ctx, this.optionWidth, this.optionHeight);
        };
    }
}

Knowthis.prototype.update = function (player, Game) {
    this.vy += player.velY;
    for (var j = 0; j < 3; j++) {
        this.option[j].update(player, Game, this.optionWidth, this.optionHeight);
    };
    if (!this.visible) {
        if (this.posY + this.vy <= this.height && this.posY + this.vy + this.height >= -10) this.visible = true;
    }
    if (this.visible) {
        if (this.posY + this.vy > this.height) this.visible = false;
    }
}

var getRand = function (x) {
    return Math.floor(Math.random() * x);
};


  var wrapText = function wrapText2(context, text, x, y, maxWidth, lineHeight) {

    //To centralize text vertically
    var wordLength = context.measureText(text);
    var noOfLines = parseInt(wordLength.width/maxWidth);
    var yAdjust = noOfLines*lineHeight/2;
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

  export default Knowthis