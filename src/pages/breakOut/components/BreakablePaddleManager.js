import BreakablePaddle from "./BreakablePaddle";

var newLevel = true;
var previousLevel = 0;
var currentLevel = 0;
const xSpace = 16.25, ySpace = 40;
const noOfLevels =16;
const noOfBreakables = 105;
const breakableWidth = 50;


const level = [];
level[0] = 0;
for (var i = 1; i < noOfLevels; i++) {
	level[i] = (i) * 7;
};

const breakables = [];
for (var j = 0; j < noOfBreakables; j++) {
	breakables[j] = new BreakablePaddle();
};

function BreakablePaddleManager() {
	console.log("BreakablePaddleManager")
}

BreakablePaddleManager.prototype.setPosition = function () {
	for (var k = 0; k < 7; k++) {
		breakables[k].setPosition(xSpace + k * (xSpace + breakableWidth), ySpace);
		breakables[k+7].setPosition(xSpace + k * (xSpace + breakableWidth), ySpace*2);
		breakables[k+14].setPosition(xSpace + k * (xSpace + breakableWidth), ySpace*3);
		breakables[k+21].setPosition(xSpace + k * (xSpace + breakableWidth), ySpace*4);
		breakables[k+28].setPosition(xSpace + k * (xSpace + breakableWidth), ySpace*5);
		breakables[k+35].setPosition(xSpace + k * (xSpace + breakableWidth), ySpace*6);
		breakables[k+42].setPosition(xSpace + k * (xSpace + breakableWidth), ySpace*7);
		breakables[k+49].setPosition(xSpace + k * (xSpace + breakableWidth), ySpace*8);
		breakables[k+56].setPosition(xSpace + k * (xSpace + breakableWidth), ySpace*9);
		breakables[k+63].setPosition(xSpace + k * (xSpace + breakableWidth), ySpace*10);
		breakables[k+70].setPosition(xSpace + k * (xSpace + breakableWidth), ySpace*11);
		breakables[k+77].setPosition(xSpace + k * (xSpace + breakableWidth), ySpace*12);
		breakables[k+84].setPosition(xSpace + k * (xSpace + breakableWidth), ySpace*13);
		breakables[k+91].setPosition(xSpace + k * (xSpace + breakableWidth), ySpace*14);
		breakables[k+98].setPosition(xSpace + k * (xSpace + breakableWidth), ySpace*15);
	};
	
}

BreakablePaddleManager.prototype.update = function (ctx, ball, paddle) {
	if (newLevel) {
		for (var l = 0; l < noOfLevels; l++) {
			currentLevel = level[l];
			if (currentLevel > previousLevel) {
				previousLevel = currentLevel;
				for (var m = 0; m < currentLevel; m++) {
					if (!breakables[m].visible) breakables[m].visible = true;
				}
				newLevel = false;
				break;
			}
		}
	}

	if (ball.takenOut === currentLevel) {
		newLevel = true;
		ball.setPosition(240, ball.initialHeight);
		ball.takenOut = 0;
		paddle.setInitialPosition();
	}


	for (var n = 0; n < noOfBreakables; n++) {
		if (breakables[n].visible) {
			breakables[n].draw(ctx);
			breakables[n].update(ball);
		}
	};
}

export default BreakablePaddleManager