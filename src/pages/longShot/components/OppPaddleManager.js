import OppPaddle from "./OppPaddle";

class OppPaddleManager {
	constructor(canvasWidth, canvasHeight) {
		this.noOfLevels = 10;
		this.cw = canvasWidth;
		this.ch = canvasHeight;
		this.cwHalf = canvasWidth/2;
		this.ch20 = canvasHeight / 40;
		this.ch40 = canvasHeight / 20;
		this.ch60 = canvasHeight / 13.3;
		this.scorePositionX = canvasWidth - canvasWidth/10;
		
		this.ch80 = canvasHeight / 10;
		this.ch100 = canvasHeight / 8;
		this.serveH = this.ch60 + this.ch / 8;
		this.ch120 = canvasHeight / 6.67;
		this.ch140 = canvasHeight / 5.7;
		this.ch160 = canvasHeight / 5;
		this.ch200 = canvasHeight / 4;
		this.chHalf = canvasHeight / 2;
		this.ch500 = canvasHeight / 1.6;
		this.ch600 = canvasHeight / 1.33;
		this.ch700 = canvasHeight / 1.14;
		this.rad = this.cw/4.8;
		this.pitchHHalf = canvasHeight/2 - this.ch60/2 + this.ch60

		this.level = [];
		for (var i = 0; i < this.noOfLevels; i++) {
			this.level[i] = false;
		};

		this.oppPaddle = [];
		this.oppPaddle[0] = new OppPaddle(canvasWidth, canvasHeight, "lightgray", this.ch60, 1, 1, 2, this.ch700, this.ch80);
		this.oppPaddle[1] = new OppPaddle(canvasWidth, canvasHeight, "purple", this.ch60, 1, 1, 4, this.ch700, this.ch80);
		this.oppPaddle[2] = new OppPaddle(canvasWidth, canvasHeight, "blue", this.ch60, 2, 1, 4, this.ch700, this.ch80);
		this.oppPaddle[3] = new OppPaddle(canvasWidth, canvasHeight, "green", this.ch60, 2, 2, 4, this.ch700, this.ch80);
		this.oppPaddle[4] = new OppPaddle(canvasWidth, canvasHeight, "yellow", this.ch60, 2, 2, 6, this.ch700, this.ch80);
		this.oppPaddle[5] = new OppPaddle(canvasWidth, canvasHeight, "white", this.ch60, 3, 2, 6, this.ch600, this.ch80);
		this.oppPaddle[6] = new OppPaddle(canvasWidth, canvasHeight, "cyan", this.ch60, 3, 3, 6, this.ch500, this.ch80);
		this.oppPaddle[7] = new OppPaddle(canvasWidth, canvasHeight, "orange", this.ch60, 3, 3, 6, this.ch500, this.ch100);
		this.oppPaddle[8] = new OppPaddle(canvasWidth, canvasHeight, "pink", this.ch60, 4, 4, 8, this.ch500, this.ch120);
		this.oppPaddle[9] = new OppPaddle(canvasWidth, canvasHeight, "red", this.ch60, 9, 9, 9, this.chHalf, this.ch100);

	}

	replay(){
		for (var i = 0; i < this.noOfLevels; i++) {
			if(this.level[i])this.oppPaddle[i].restart();
		};
	}

	restart() {
		for (var i = 0; i < this.noOfLevels; i++) {
			this.level[i] = false;
			this.oppPaddle[i].restart();
		};
	}
	setPosition() {
		for (var k = 0; k < 7; k++) {

		};

	}

	drawScore(ctx, ball){
		ctx.font = "20px verdana";
		ctx.fillStyle = "white";
		ctx.fillText(ball.opponentScore, this.scorePositionX, this.ch100);
		ctx.fillText(ball.playerScore, this.scorePositionX, this.ch - this.ch40);
	}

	draw(ctx) {	
		ctx.strokeStyle = 'gray';
		//Top arc
		ctx.beginPath();
		ctx.arc(this.cwHalf, this.ch60, this.rad, 0, Math.PI);
		ctx.stroke();
		//mid circle
		ctx.beginPath();
        ctx.arc(this.cwHalf, this.pitchHHalf, this.rad, 0, 2 * Math.PI);
		ctx.stroke();
		//Down circle
		ctx.beginPath();
        ctx.arc(this.cwHalf, this.ch - this.ch20, this.rad, Math.PI, 2 * Math.PI);
		ctx.stroke();
		ctx.fillStyle = 'gray';
		// ctx.fillRect(0, this.pitchHHalf - this.ch20, this.cw, 1);

		//mid line
		ctx.fillRect(0, this.pitchHHalf, this.cw, 1);
		// ctx.fillStyle = 'white';
		ctx.fillRect(0, this.ch40, this.cw, this.ch20);
		for (var n = 0; n < this.noOfLevels; n++) {
			if (this.level[n]) {
				this.oppPaddle[n].draw(ctx);
			}
		};
	}
	update(ball, paddle, Game) {

		for (var n = 0; n < this.noOfLevels; n++) {
			if (this.level[n]) {
				this.oppPaddle[n].update(ball, paddle, Game);
			}
		};
	}
}





export default OppPaddleManager