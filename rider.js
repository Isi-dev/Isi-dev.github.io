var changeToLandscape;



var canvas = document.getElementById("canvas");
document.body.appendChild(canvas);
//canvas.width=window.innerWidth;
//canvas.height=window.innerHeight;
var ctx = canvas.getContext("2d");
ctx.strokeStyle="white";
ctx.font="30px Arial";
ctx.fillStyle="white";
ctx.textAlign="center";
var img='images.png';
var allImages=new Image();
	allImages.src=img;
var r=0,s=0,starRand=0;
var countSplash=0;
var selectPlayerScreen =true, playingScreen=false, endScreen=false, timeScreen=false;
var move=false;
var start = false;
var jumpS=false,jumpH=false, goDown=false, itsOver=false,splashW=false;
var jessamine=false,hito=false;
var day=false;
var audio=new Audio('fftf.mp3');
var nightAudio = new Audio('aoh.mp3');
var splashAudio=new Audio('explode.wav');
var gallop=new Audio('g.wav');

const widthFactor = screen.width/800;
const heightFactor = screen.height/480;

var Game={};
Game.score=0;
var showHighScores, newHighScore = false;
var highScores = [0,0,0]

if (typeof(Storage) !== "undefined") {
    showHighScores = true;
	highScores = JSON.parse(localStorage.getItem('highScores')) || highScores;
}



var horse1=new Horse(img);
var horse2=new Horse(img);
var horse3=new Horse(img);

var river1=new Texture(img,0,420);
var river2=new Texture(img,0,420);
var splash=new Texture(img,200,385);

var sky=new Texture(img,0,420);

var blockLocX=[];
var block=[];
for(var i=0;i<6;i++){
	blockLocX[i]=150 * i + 10 * i;
	block[i]=new Texture(img,blockLocX[i],360);
};

var restartBlocks = function(){
	for(var i=0;i<6;i++){
		block[i].restart();
	};
}

var pole=new Texture(img,canvas.width+45,270);
var ad = new Texture(img,canvas.width,195);
var toShowAd = [];
for(var i =0; i<5; i++){
	toShowAd[i] = false;
};

var restartAds = function(){
	pole.restart();
	ad.restart();
	for(var i=0;i<5;i++){
		if(toShowAd[i])toShowAd[i] = false;
	};
}

var drawAds = function(){
	if(!toShowAd[0] && Game.score >=25 && Game.score < 27){
		toShowAd[0] = true;
	}

	if(!toShowAd[1] && Game.score >=50 && Game.score < 52){
		toShowAd[1] = true;
	}

	if(!toShowAd[2] && Game.score >=100 && Game.score < 102){
		toShowAd[2] = true;
	}

	if(toShowAd[0]){
		ad.draw(220,460,100,75);
		pole.draw(1014,380,10,150);
	}

	if(toShowAd[1]){
		ad.draw(325,460,100,75);
		pole.draw(1014,380,10,150);
	}

	if(toShowAd[2]){
		ad.draw(430,460,100,75);
		pole.draw(1014,380,10,150);
	}

}

var moveAds = function(){
	if (move) {
		for(var i =0; i<5; i++){
			if(toShowAd[i]){
				
				if(jessamine){
					ad.locX -= 5;
					pole.locX -= 5;
				}
				else if(hito){
					ad.locX -= 10;
					pole.locX -= 10;
				}
				else {
					ad.locX -= 16;
					pole.locX -= 16;
				}
				if(ad.locX < -100){
					 toShowAd[i] = false;
					 pole.restart();
					 ad.restart();
				}
			}
		};
	}
}


var starX=[];
var starY=[];
var star=[];
starX[0] = 50;
starY[0] = 60;
starX[1] = 300;
starY[1] = 130;
starX[2] = 550;
starY[2] = 30;
starX[3] = 800;
starY[3] = 180;
starX[4] = 1050;
starY[4] = 80;
for(var i =0; i<5; i++){
	star[i]=new Texture(img,starX[i],starY[i]);
};

//function to draw star
var showStar=function(){
	for(var i =0; i<5; i++){
		star[i].draw(1000,0,10,10);
	};
}

//function to move star
var moveStar=function(){
	for (var i = 0; i < 5; i++) {
		if (move) {
				if(jessamine)star[i].locX -= 1;
				else if(hito)star[i].locX -= 2;
				else star[i].locX -= 3;
				if (star[i].locX <= -200) {
				star[i].locX = 1050;
				starRand = getRand(10);
				if (starRand <= 4 && star[i].locY < 190)
					star[i].locY += 5;
				else if (r >= 5 && star[i].locY > 25)
					star[i].locY -= 5;
			}
		}
	}
}

var cloudX=[];
var cloudY=[];
var cloud=[];
cloudX[0] = -470;
cloudY[0] = 20;
cloudX[1] = 70;
cloudY[1] = 80;
cloudX[2] = 470;
cloudY[2] = 150;
cloudX[3] = 870;
cloudY[3] = 40;
for(var k=0;k<4;k++){
	cloud[k]=new Texture(img,cloudX[k],cloudY[k]);
};

//function to draw cloud
var showCloud=function(){
	cloud[0].draw(170,400,150,30);
	cloud[1].draw(330,400,200,50);
	cloud[2].draw(540,400,150,35);
	cloud[3].draw(700,400,125,30);
};

//function to move cloud
var moveCloud=function(){
	for (var k = 0; k < 4; k++) {
			if (move) {
				if (jessamine)cloud[k].locX -= 1;
				else if(hito)cloud[k].locX -= 2;
				else cloud[k].locX -= 3;
				if (cloud[k].locX <= -500){
					cloud[k].locX = 1240;
					s = getRand(10);
					if (s <= 4 && cloud[k].locY < 150)
						cloud[k].locY += 10;
					else if (s >= 5 && cloud[k].locY > 20)
						cloud[k].locY -= 10;
				}
			}
	}
};

//function to draw the blue sky
var showSky=function(){
	for (var i = 0; i < 4; i++) {
		sky.locX=i*200;
		for (var j=0; j<7;j++){
			sky.locY=j*60;
			sky.draw(0,600,200,60);
		}
	}
};

//function to draw the dark-colored River (river1)
var showRiver1=function(){
	for (var i = 0; i < 4; i++) {
		river1.locX=i*200;
		river1.draw(0,470,200,60);
	}
};

//function to draw the light-colored River (river2)
var showRiver2=function(){
	for (var i = 0; i < 4; i++) {
		river2.locX=i*200;
		river2.draw(0,535,200,60);
	}
};

//function to draw splash
var showSplash=function(){
	if(splashW){
		splashAudio.play();
		splash.animate(5,6,0,700,140,50);
		if(++countSplash>=25){
			splashAudio.pause();
			splashW=false;
		};
	};
};


function Texture(img,posX,posY){
	this.image=new Image();
	this.image.src=img;
	this.image.onload=function(){
         console.log("Texture Ready!");
 	};
	this.locX=posX;
	this.locY=posY;
	this.restartPosX = posX;
	this.restartPosY = posY;
	this.animationDelay=0;
	this.currentSprite=0;
	this.visible=true;
};

Texture.prototype.restart= function(){
	this.locX = this.restartPosX;
	this.locY = this.restartPosY;
	this.animationDelay=0;
	this.currentSprite=0;
	this.visible=true;
}


Texture.prototype.draw= function(startX,startY,sWidth,sHeight){
	ctx.drawImage(this.image,startX,startY,sWidth,sHeight,this.locX,this.locY,sWidth,sHeight);
};


Texture.prototype.animate=function(delay,frameNo,startX,startY,frameWidth,frameHeight){
	ctx.drawImage(this.image,frameWidth*this.currentSprite+startX,startY,frameWidth,frameHeight,this.locX,this.locY,frameWidth,frameHeight);
	if(move && this.animationDelay++ % delay==0)this.currentSprite = ++this.currentSprite % frameNo;
};


function Horse(img){
	this.posX=170;
	this.posY=255;
	this.horseStand=new Texture(img,this.posX,this.posY);
	this.horseAnimation=new Texture(img,this.posX,this.posY);
	this.horseGoUp=new Texture(img,this.posX,this.posY);
	this.horseGoDown=new Texture(img,this.posX,this.posY);
};

Horse.prototype.restart= function(){
	this.posX=170;
	this.posY=255;
}

Horse.prototype.draw=function(upX,upY,upW,upH,downX,downY,downW,downH,standX,standY,standW,standH,delay,frameNo,startX,startY,frameWidth,frameHeight){
	if(jumpS && !goDown)this.horseGoUp.draw(upX,upY,upW,upH);
	else if(jumpS && goDown)this.horseGoDown.draw(downX,downY,downW,downH);
	else if(jumpH && !goDown)this.horseGoUp.draw(upX,upY,upW,upH);
	else if(jumpH && goDown)this.horseGoDown.draw(downX,downY,downW,downH);
	else if(!start || endScreen)this.horseStand.draw(standX,standY,standW,standH);
	else if(!jumpS && !jumpH && !goDown && !itsOver)this.horseAnimation.animate(delay,frameNo,startX,startY,frameWidth,frameHeight);
	else if(!jumpS && !jumpH && !goDown && itsOver)this.horseGoDown.draw(downX,downY,downW,downH);
	if(move && !jumpS && !jumpH && !goDown && !itsOver)gallop.play();
	if(!move || jumpS || jumpH || goDown || itsOver) gallop.pause();
};

Horse.prototype.move=function(jumpSMax,jumpHMax){
	if(move){
		this.horseStand.locY=this.horseAnimation.locY=this.horseGoUp.locY=this.horseGoDown.locY=this.posY;
		if(jumpS && !itsOver){
			if(!goDown)this.posY -= 5;
			if(this.posY<=jumpSMax)
				goDown=true;
		};

		if(jumpH && !itsOver){
			if(!goDown)this.posY -= 5;
			if(this.posY<=jumpHMax)
				goDown=true;
		};

		for(var i=0;i<6;i++){
			if (!itsOver && !block[i].visible && block[i].locX == 160) Game.score++;
			if(!block[i].visible && block[i].locX<=240 && block[i].locX+160>=305 && this.posY>=255) itsOver=true;
			else if(!itsOver && block[i].visible && block[i].locX<=305 && block[i].locX+150>=240 && this.posY>=255){
				goDown=false;
				this.posY=255;
				if(jumpS)jumpS=false;
				if(jumpH)jumpH=false;
			};
		};

		if(goDown){
				this.posY += 5;
		};

		if(itsOver){
				if(this.posY<380)this.posY += 5;
				if(this.posY>=300 && this.posY<=310)splashW=true;			    
				if(goDown)goDown=false;
				if(jumpS)jumpS=false;
				if(jumpH)jumpH=false;
				playingScreen =false;
				endScreen = true;
				if(this.posY>=380)move=false;
		};
	}
};

//function to move the blocks
var moveBlocks=function(){
	for (var i = 0; i < 6; i++) {
		if(move){
			if(jessamine)block[i].locX -= 5;
			else if(hito)block[i].locX -= 10;
			else block[i].locX -= 16;
		};
		if(block[i].locX<=-160){
			block[i].locX=800;
			if(i == 0)r = getRand(10);
				if (r == 0) {
					if (i == 0 && block[i].visible == true)
						block[i].visible=false;
					if (i == 1 && block[i].visible == false)
						block[i].visible=true;
					if (i == 2 && block[i].visible == true)
						block[i].visible=false;
					if (i == 3 && block[i].visible == false)
						block[i].visible=true;
					if (i == 4 && block[i].visible == true)
						block[i].visible=false;
				}
				else if (r == 1) {
					if (i == 0 && block[i].visible == true)
						block[i].visible=false;
					if (i == 1 && block[i].visible == true)
						block[i].visible=false;
					if (i == 2 && block[i].visible == false)
						block[i].visible=true;
					if (i == 3 && block[i].visible == false)
						block[i].visible=true;
					if (i == 4 && block[i].visible == false)
						block[i].visible=true;
				}
				else if (r == 2) {
					if (i == 0 && block[i].visible == true)
						block[i].visible=false;
					if (i == 1 && block[i].visible == true)
						block[i].visible=false;
					if (i == 2 && block[i].visible == false)
						block[i].visible=true;
					if (i == 3 && block[i].visible == true)
						block[i].visible=false;
					if (i == 4 && block[i].visible == true)
						block[i].visible=false;
				}
				else if (r == 3) {
					if (i == 0 && block[i].visible == true)
						block[i].visible=false;
					if (i == 1 && block[i].visible == true)
						block[i].visible=false;
					if (i == 2 && block[i].visible == false)
						block[i].visible=true;
					if (i == 3 && block[i].visible == false)
						block[i].visible=true;
					if (i == 4 && block[i].visible == true)
						block[i].visible=false;
				}
				else if (r == 4) {
					if (i == 0 && block[i].visible == false)
						block[i].visible=true;
					if (i == 1 && block[i].visible == false)
						block[i].visible=true;
					if (i == 2 && block[i].visible == true)
						block[i].visible=false;
					if (i == 3 && block[i].visible == true)
						block[i].visible=false;
					if (i == 4 && block[i].visible == false)
						block[i].visible=true;
				}
				else if (r >= 5) {
					if (i == 0 && block[i].visible == false)
						block[i].visible=true;
					if (i == 1 && block[i].visible == true)
						block[i].visible=false;
					if (i == 2 && block[i].visible == true)
						block[i].visible=false;
					if (i == 3 && block[i].visible == false)
						block[i].visible=true;
					if (i == 4 && block[i].visible == true)
						block[i].visible=false;
				}
				else if (r == 6) {
					if (i == 0 && block[i].visible == false)
						block[i].visible=true;
					if (i == 1 && block[i].visible == false)
						block[i].visible=true;
					if (i == 2 && block[i].visible == false)
						block[i].visible=true;
					if (i == 3 && block[i].visible == true)
						block[i].visible=false;
					if (i == 4 && block[i].visible == true)
						block[i].visible=false;
				}
				else if (r == 7) {
					if (i == 0 && block[i].visible == false)
						block[i].visible=true;
					if (i == 1 && block[i].visible == false)
						block[i].visible=true;
					if (i == 2 && block[i].visible == false)
						block[i].visible=true;
					if (i == 3 && block[i].visible == false)
						block[i].visible=true;
					if (i == 4 && block[i].visible == false)
						block[i].visible=true;
				}
				else if (r == 8) {
					if (i == 0 && block[i].visible == true)
						block[i].visible=false;
					if (i == 1 && block[i].visible == false)
						block[i].visible=true;
					if (i == 2 && block[i].visible == false)
						block[i].visible=true;
					if (i == 3 && block[i].visible == false)
						block[i].visible=true;
					if (i == 4 && block[i].visible == false)
						block[i].visible=true;
				}
				else {
					if (i == 0 && block[i].visible == false)
						block[i].visible=true;
					if (i == 1 && block[i].visible == false)
						block[i].visible=true;
					if (i == 2 && block[i].visible == true)
						block[i].visible=false;
					if (i == 3 && block[i].visible == false)
						block[i].visible=true;
					if (i == 4 && block[i].visible == true)
						block[i].visible=false;
				}
		};
	};
};


Game.draw=function(){
	
	ctx.clearRect(0,0,canvas.width, canvas.height);
	
	if(selectPlayerScreen){
		//Show start screen
		ctx.drawImage(allImages,205, 754, 195, 150,50,50,200,150);
		ctx.drawImage(allImages,0, 756, 200, 140,canvas.width-250,50,200,140);
		ctx.drawImage(allImages,420, 754, 200, 150,canvas.width/2 - 100,canvas.height/2 + 40,200,150);
		ctx.font="30px Arial";
		
		ctx.fillText("The Rider's Glory",canvas.width/2-10,canvas.height/2-10);
		ctx.font="20px Arial";
		if(!changeToLandscape)ctx.fillText("Touch a Rider to select him or her",canvas.width/2,canvas.height/2+20);
	}else if(timeScreen){
		ctx.drawImage(allImages,0,600,200,60,0,0,canvas.width/2,canvas.height);
		ctx.fillText("Tap the left or right half of the screen to choose day or night",canvas.width/2, 50);
		
		if(jessamine)ctx.drawImage(allImages,205, 754, 195, 150,canvas.width/2 - 97,canvas.height/2 - 75,200,150);
		else if(hito)ctx.drawImage(allImages,0, 756, 200, 140,canvas.width/2 - 100,canvas.height/2 - 70,200,140);
		else ctx.drawImage(allImages,420, 754, 200, 150,canvas.width/2 - 100,canvas.height/2 - 75,200,150);

	}else{
			
			if(day){
				//Execute function to draw the sky
				showSky();

				//Execute function to draw the cloud
				showCloud();
			}
			else showStar();

			//Draw the ads
			drawAds();

			//Draw the blocks
			for(var i=0;i<6;i++){
				if(block[i].visible)block[i].draw(10,400,150,60);
			};

			if(jessamine)horse1.draw(145,270,145,110,870,260,145,110,0,270,145,110,5,6,0,148,145,112);
			else if(hito)horse2.draw(435,270,145,110,725,270,145,110,290,270,145,110,4,6,0,0,150,108);
			else horse3.draw(880,560,140,110,700,540,146,112,896,910,126,112,3,6,0,910,150,110);

			//Execute function to draw river
			if(day) showRiver2();
			else showRiver1();
			if(!start){
				ctx.fillText("Tap the left half of your screen for low jumps and the right half for high jumps.",canvas.width/2, 80);
				ctx.drawImage(allImages,880, 500, 130, 50, 335, 215, 130, 50);
				ctx.drawImage(allImages,0, 668, 75, 30,363,225,74,30);
			}else{
				if(!endScreen){
					ctx.drawImage(allImages,880, 500, 130, 50,650,20,130,50);
					if(move)ctx.drawImage(allImages,70, 668, 74, 30,678,30,74,30);
					else ctx.drawImage(allImages,150, 668, 74, 30,678,30,74,30);
				}
			}

			//Execute function to show splash animation
			if(!move)showSplash();

			//Show score on the screen
			if(!endScreen)ctx.fillText(""+Game.score,390,50);
			if(endScreen){
				ctx.font="30px Arial";
				ctx.fillText("Your Score : "+Game.score,390,50);
				if(showHighScores){
					if(jessamine){
						if(Game.score > highScores[0]){
							newHighScore = true;
							highScores[0] = Game.score;
							localStorage.setItem('highScores', JSON.stringify(highScores));
						}
					}else if(hito){
						if(Game.score > highScores[1]){
							newHighScore = true;
							highScores[1] = Game.score;
							localStorage.setItem('highScores', JSON.stringify(highScores));
						}
					}else{
						if(Game.score > highScores[2]){
							newHighScore = true;
							highScores[2] = Game.score;
							localStorage.setItem('highScores', JSON.stringify(highScores));
						}
					
				}
					if(newHighScore){
						ctx.fillText("NEW HIGH SCORE!",390,100);
						ctx.fillText("CONGRATS!!!",390,150);
					}
					else{
						if(jessamine)ctx.fillText("Highest Score : "+highScores[0],390,100);
						else if(hito)ctx.fillText("Highest Score : "+highScores[1],390,100);
						else ctx.fillText("Highest Score : "+highScores[2],390,100);
					}
				}
				ctx.font="40px Arial";
				ctx.fillText("Game Over",canvas.width/2,canvas.height/2);
				ctx.font="20px Arial";
				ctx.drawImage(allImages,880, 500, 130, 50, 135,335,130,50);
				ctx.drawImage(allImages,230, 668, 74, 30, 163,345,74,30);
				ctx.drawImage(allImages,880, 500, 130, 50, 535,335,130,50);
				ctx.drawImage(allImages,305, 668, 125, 30, 538,345,125,30);
			}
	}
	if(changeToLandscape)ctx.fillText("Tap the screen for fullscreen and rotate your device to Landscape orientation",canvas.width/2-10,30);
};


Game.update=function(){
	if(!selectPlayerScreen){
		if(!timeScreen){
			if(move){
				if(day) audio.play();
				else nightAudio.play();
			}
			else {
				if(day) audio.pause();
				else nightAudio.pause();
			}

			if(day)	moveCloud();
			else moveStar();

			//Execute function to move horses
			if(jessamine)horse1.move(140,50);
			else if(hito)horse2.move(200,150);
			else horse3.move(220,195);

			//Execute function to move ads
			moveAds();

			//Execute function to move blocks
			moveBlocks();
		}
	}
	

};


Game.run=function(){
	Game.update();
	Game.draw();
	if ( window.matchMedia("(orientation: portrait)").matches ) {  
   		//alert("Please use Landscape!") 
   		if(!changeToLandscape){
			changeToLandscape=true;
		}
	}else if(changeToLandscape){
		changeToLandscape=false;
	}
};

Game.restart = function(){

	r=0,s=0,starRand=0;
 	countSplash=0;
 	//move=true;
	newHighScore = false;
 	jumpS=false,jumpH=false, goDown=false, itsOver=false,splashW=false;
	Game.score=0;
	restartAds();
	horse1.restart();
	horse2.restart();
	horse3.restart();
	restartBlocks();
}

Game.jumpS=function(){
	if(selectPlayerScreen){
		if(hito)hito=false;
		if(!jessamine)jessamine=true;
		selectPlayerScreen =false;
		timeScreen = true;
	}else if(playingScreen){
		if(!jumpS && !jumpH)
		jumpS=true;
	}else if(timeScreen){
		if(!day)day=true;
		playingScreen = true;
		timeScreen = false;
	}
};

Game.jumpH=function(){
	if(selectPlayerScreen){
		if(jessamine)jessamine=false;
		if(!hito)hito=true;
		selectPlayerScreen =false;
		timeScreen = true;
	}else if(playingScreen){
		if(!jumpS && !jumpH)
		jumpH=true;
	}else if(timeScreen){
		if(day)day=false;
		playingScreen = true;
		timeScreen = false;
	}
};

Game.startScreen = function(){
	if(endScreen){
		endScreen = false;
		Game.restart();
		selectPlayerScreen =true;
	}else if(selectPlayerScreen){
		if(jessamine)jessamine=false;
		if(hito)hito=false;
		selectPlayerScreen =false;
		timeScreen = true;
	}
};


var getRand = function(x) {
		return Math.floor(Math.random() * x);
};

//Keyboard inputs
window.addEventListener('keydown',function(event){
	switch(event.keyCode){
		case 13:
			Game.startScreen();
			break;
		case 37:
			Game.jumpS();
			break;
		case 39:
			Game.jumpH();
			break;
	}
},false);




//Touch inputs
var touchCanvas = document.getElementById("canvas");
touchCanvas.addEventListener("touchstart", e =>{
	if(!changeToLandscape){
		if(playingScreen){
			if(move){
				if(e.changedTouches[0].clientY >70*heightFactor){
					if(e.changedTouches[0].clientX <= 400*widthFactor)Game.jumpS();
					else Game.jumpH();
				}
			}
			if(!start){
				if(e.changedTouches[0].clientX >=335*widthFactor && e.changedTouches[0].clientX <=465*widthFactor && e.changedTouches[0].clientY >=215*heightFactor && e.changedTouches[0].clientY <=265*heightFactor){	
					start=true;
					move =true;
				}
			}else{
				if(e.changedTouches[0].clientX >=650*widthFactor && e.changedTouches[0].clientY <=70*heightFactor){
					move = !move;
				}
			}		
		}
		else if(selectPlayerScreen){
			if(e.changedTouches[0].clientX >=50*widthFactor && e.changedTouches[0].clientX <=250*widthFactor && e.changedTouches[0].clientY >=50*heightFactor && e.changedTouches[0].clientY <=200*heightFactor)Game.jumpS();		
			else if(e.changedTouches[0].clientX >=550*widthFactor && e.changedTouches[0].clientX <=750*widthFactor && e.changedTouches[0].clientY >=50*heightFactor && e.changedTouches[0].clientY <=190*heightFactor)Game.jumpH();
			else if(e.changedTouches[0].clientX >=300*widthFactor && e.changedTouches[0].clientX <=500*widthFactor && e.changedTouches[0].clientY >=280*heightFactor && e.changedTouches[0].clientY <=430*heightFactor)Game.startScreen();
		}else if(timeScreen){
			if(e.changedTouches[0].clientX <= 400*widthFactor)Game.jumpS();
			else Game.jumpH();
			
		}
		else if(endScreen && !move){
			if(e.changedTouches[0].clientX >=135*widthFactor && e.changedTouches[0].clientX <=265*widthFactor && e.changedTouches[0].clientY >=335*heightFactor && e.changedTouches[0].clientY <=385*heightFactor){	
				endScreen = false;
				Game.restart();
				move=true;
				playingScreen = true;
			}
			if(e.changedTouches[0].clientX >=535*widthFactor && e.changedTouches[0].clientX <=665*widthFactor && e.changedTouches[0].clientY >=335*heightFactor && e.changedTouches[0].clientY <=385*heightFactor){	
				Game.startScreen();
				start = false;
			}
		}
		
	}else{
		if(touchCanvas.webkitRequestFullScreen) {
			touchCanvas.webkitRequestFullScreen();
           }
          else {
			touchCanvas.mozRequestFullScreen();
          }  
	}
	if(playingScreen || endScreen){
		if(toShowAd[0]){
				if(e.changedTouches[0].clientX >=ad.locX*widthFactor && e.changedTouches[0].clientX <=ad.locX*widthFactor+100 && e.changedTouches[0].clientY >=195*heightFactor && e.changedTouches[0].clientY <=270*heightFactor){			
					//window.open("https://www.linkedin.com/in/isimemen-omoifo-22081a14b/", "_self");
					window.open("https://www.linkedin.com/in/isimemen-omoifo-22081a14b/", "_blank");
				}
			}
			if(toShowAd[1]){
				if(e.changedTouches[0].clientX >=ad.locX*widthFactor && e.changedTouches[0].clientX <=ad.locX*widthFactor+100 && e.changedTouches[0].clientY >=195*heightFactor && e.changedTouches[0].clientY <=270*heightFactor){				
					window.open("https://www.linkedin.com/in/isimemen-omoifo-22081a14b/", "_blank");
				}
			}
			if(toShowAd[2]){
				if(e.changedTouches[0].clientX >=ad.locX*widthFactor && e.changedTouches[0].clientX <=ad.locX*widthFactor+100 && e.changedTouches[0].clientY >=195*heightFactor && e.changedTouches[0].clientY <=270*heightFactor){				
					window.open("https://www.linkedin.com/in/isimemen-omoifo-22081a14b/", "_blank");
				}
			}
	}
	
});

touchCanvas.addEventListener("touchmove", e =>{		
				e.preventDefault();
			});



(function(){
var onEachFrame;
if(window.requestAnimationFrame){
onEachFrame=function(cb){
var _cb=function(){cb();requestAnimationFrame(_cb);}
_cb();
};
}else if (window.mozRequestAnimationFrame){
onEachFrame=function(cb){
var _cb=function(){cb();
mozRequestAnimationFrame(_cb);}
_cb();
};
}else{
onEachFrame=function(cb){
setInterval(cb,1000/60);
}
}

window.onEachFrame=onEachFrame;
})();
window.onEachFrame(Game.run);
