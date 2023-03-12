import BreakablePaddle from "./BreakablePaddle";

function BreakablePaddleManager() {
	console.log("BreakablePaddleManager")
	this.newLevel = true;
	this.previousLevel = 0;
	this.currentLevel = 0;
	this.ballHeightControl = 0;
	this.xSpace = 7.5;
	this.ySpace = 40;
	this.noOfLevels = 16;
	this.noOfBreakables = 105;
	this.breakableWidth = 60;


	this.level = [];
	this.level[0] = 0;
	for (var i = 1; i < this.noOfLevels; i++) {
		this.level[i] = (i) * 7;
	};

	this.breakables = [];
	for (var j = 0; j < this.noOfBreakables; j++) {
		this.breakables[j] = new BreakablePaddle();
	};
}

BreakablePaddleManager.prototype.restart = function () {
	this.newLevel = true;
	this.previousLevel = 0;
	this.currentLevel = 0;
	this.ballHeightControl = 0;
	this.level[0] = 0;
	for (var i = 1; i < this.noOfLevels; i++) {
		this.level[i] = (i) * 7;
	};
	for (var n = 0; n < this.noOfBreakables; n++) {
		if (this.breakables[n].visible) {
			this.breakables[n].visible = false;
		}
	};
}

BreakablePaddleManager.prototype.setPosition = function () {
	for (var k = 0; k < 7; k++) {
		this.breakables[k].setPosition(this.xSpace + k * (this.xSpace + this.breakableWidth), this.ySpace);
		this.breakables[k + 7].setPosition(this.xSpace + k * (this.xSpace + this.breakableWidth), this.ySpace * 2);
		this.breakables[k + 14].setPosition(this.xSpace + k * (this.xSpace + this.breakableWidth), this.ySpace * 3);
		this.breakables[k + 21].setPosition(this.xSpace + k * (this.xSpace + this.breakableWidth), this.ySpace * 4);
		this.breakables[k + 28].setPosition(this.xSpace + k * (this.xSpace + this.breakableWidth), this.ySpace * 5);
		this.breakables[k + 35].setPosition(this.xSpace + k * (this.xSpace + this.breakableWidth), this.ySpace * 6);
		this.breakables[k + 42].setPosition(this.xSpace + k * (this.xSpace + this.breakableWidth), this.ySpace * 7);
		this.breakables[k + 49].setPosition(this.xSpace + k * (this.xSpace + this.breakableWidth), this.ySpace * 8);
		this.breakables[k + 56].setPosition(this.xSpace + k * (this.xSpace + this.breakableWidth), this.ySpace * 9);
		this.breakables[k + 63].setPosition(this.xSpace + k * (this.xSpace + this.breakableWidth), this.ySpace * 10);
		this.breakables[k + 70].setPosition(this.xSpace + k * (this.xSpace + this.breakableWidth), this.ySpace * 11);
		this.breakables[k + 77].setPosition(this.xSpace + k * (this.xSpace + this.breakableWidth), this.ySpace * 12);
		this.breakables[k + 84].setPosition(this.xSpace + k * (this.xSpace + this.breakableWidth), this.ySpace * 13);
		this.breakables[k + 91].setPosition(this.xSpace + k * (this.xSpace + this.breakableWidth), this.ySpace * 14);
		this.breakables[k + 98].setPosition(this.xSpace + k * (this.xSpace + this.breakableWidth), this.ySpace * 15);
	};

}

BreakablePaddleManager.prototype.draw = function (ctx){
	for (var n = 0; n < this.noOfBreakables; n++) {
		if (this.breakables[n].visible) {
			this.breakables[n].draw(ctx);
		}
	};
}

BreakablePaddleManager.prototype.update = function (ball, paddle, Game) {
	if (this.newLevel) {
		for (var l = 0; l < this.noOfLevels; l++) {
			this.currentLevel = this.level[l];
			if (this.currentLevel > this.previousLevel) {
				this.previousLevel = this.currentLevel;
				for (var m = 0; m < this.currentLevel; m++) {
					if (!this.breakables[m].visible) this.breakables[m].visible = true;
				}
				this.newLevel = false;
				break;
			}
		}
	}

	if (ball.takenOut === this.currentLevel) {
		this.newLevel = true;
		Game.score = Game.score + Math.round(Game.bonusScore);
		Game.bonusScore = Game.bonusScoreMax;
		this.ballHeightControl++;
		ball.setPosition(240, ball.initialHeight + this.ballHeightControl * 40);
		ball.takenOut = 0;
		paddle.setInitialPosition();
	}


	for (var n = 0; n < this.noOfBreakables; n++) {
		if (this.breakables[n].visible) {
			this.breakables[n].update(ball, Game);
		}
	};
}

export default BreakablePaddleManager