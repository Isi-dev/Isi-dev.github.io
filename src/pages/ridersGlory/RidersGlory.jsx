import React, { useRef, useEffect, useState } from 'react';
import './ridersGlory.css';
import { HashLink as Link } from 'react-router-hash-link';
import { isMobile } from "react-device-detect";

const RidersGlory = () => {
    const [loadingAssets, setLoadingAssets] = useState(true);
    const [dots, setDots] = useState('.');
    const [startG, setStart] = useState(false);
    const [pause, setPause] = useState(false);
    const [restart, setRestart] = useState(false);
    const [goToSelect, setGoToSelect] = useState(false);
    const [screen, setScreen] = useState("selectPlayerScreen");
    const [playerSelected, setPlayerSelected] = useState("");
    const [selectTime, setSelectTime] = useState("");
    const [lowJump, setLowJump] = useState(false);
    const [highJump, setHighJump] = useState(false);
    const jessRef = useRef("null");
    const hitoRef = useRef("null");
    const yosiRef = useRef("null");
    const lightRef = useRef("null");
    const nightRef = useRef("null");
    const lowJumpRef = useRef("null");
    const highJumpRef = useRef("null");
    const restartRef = useRef("null");
    const startRef = useRef("null");
    const pauseRef = useRef("null");
    const goToSelectRef = useRef("null");
    const canvasRef = useRef(null);


    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        var light = '';
        var night = '';
        ctx.strokeStyle = "white";
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        var changeToLandscape;
        var img = '/assets/appImages/images.png';
        var allImages = new Image();
        allImages.src = img;

        const intervalId = setInterval(() => {
            setDots((prevDots) => {
                if (prevDots.length === 3) {
                    return '.';
                } else {
                    return prevDots + '.';
                }
            });
        }, 500);

        allImages.onload = function () {
            // console.log("Texture Ready!");
            clearInterval(intervalId);
            setLoadingAssets(false);
        };
        var r = 0, s = 0, starRand = 0;
        var countSplash = 0;
        var selectPlayerScreen = true, playingScreen = false, endScreen = false, timeScreen = false;
        var move = false;
        var start = false;
        var jumpS = false, jumpH = false, goDown = false, itsOver = false, splashW = false;
        var jessamine = false, hito = false;
        var day = false;
        var audio = new Audio('/assets/sounds/fftf.mp3');
        var nightAudio = new Audio('/assets/sounds/aoh.mp3');
        var splashAudio = new Audio('/assets/sounds/explode.wav');
        var gallop = new Audio('/assets/sounds/g.wav');

        var Game = {};
        Game.score = 0;
        var showHighScores, newHighScore = false;
        var highScores = [0, 0, 0];

        if (typeof (Storage) !== "undefined") {
            showHighScores = true;
            highScores = JSON.parse(localStorage.getItem('RidersHighScores')) || highScores;
        }

        var thisIsMobile = isMobile;

        var widthFactor = 0;
        // var heightFactor = 0;

        var updateScreenCoords = function () {
            widthFactor = window.innerWidth / 800;
            // heightFactor = window.innerHeight / 480;
        }


        var horse1 = new Horse();
        var horse2 = new Horse();
        var horse3 = new Horse();

        var river1 = new Texture(0, 420);
        var river2 = new Texture(0, 420);
        var splash = new Texture(200, 385);

        var sky = new Texture(0, 420);

        var blockLocX = [];
        var block = [];
        for (var i = 0; i < 6; i++) {
            blockLocX[i] = 150 * i + 10 * i;
            block[i] = new Texture(blockLocX[i], 360);
        };

        var restartBlocks = function () {
            for (var i = 0; i < 6; i++) {
                block[i].restart();
            };
        }


        var starX = [];
        var starY = [];
        var star = [];
        var setStar = function () {
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
            for (var i = 0; i < 5; i++) {
                star[i] = new Texture(starX[i], starY[i]);
            };
        }
        setStar();

        //function to draw star
        var showStar = function () {
            for (var i = 0; i < 5; i++) {
                star[i].draw(1000, 0, 10, 10);
            };
        }

        //function to move star
        var moveStar = function () {
            for (var i = 0; i < 5; i++) {
                if (move) {
                    if (jessamine) star[i].locX -= 1;
                    else if (hito) star[i].locX -= 2;
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

        var cloudX = [];
        var cloudY = [];
        var cloud = [];
        cloudX[0] = -470;
        cloudY[0] = 20;
        cloudX[1] = 70;
        cloudY[1] = 80;
        cloudX[2] = 470;
        cloudY[2] = 150;
        cloudX[3] = 870;
        cloudY[3] = 40;
        for (var k = 0; k < 4; k++) {
            cloud[k] = new Texture(cloudX[k], cloudY[k]);
        };

        //function to draw cloud
        var showCloud = function () {
            cloud[0].draw(170, 400, 150, 30);
            cloud[1].draw(330, 400, 200, 50);
            cloud[2].draw(540, 400, 150, 35);
            cloud[3].draw(700, 400, 125, 30);
        };

        //function to move cloud
        var moveCloud = function () {
            for (var k = 0; k < 4; k++) {
                if (move) {
                    if (jessamine) cloud[k].locX -= 1;
                    else if (hito) cloud[k].locX -= 2;
                    else cloud[k].locX -= 3;
                    if (cloud[k].locX <= -500) {
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
        var showSky = function () {
            for (var i = 0; i < 4; i++) {
                sky.locX = i * 200;
                for (var j = 0; j < 7; j++) {
                    sky.locY = j * 60;
                    sky.draw(0, 600, 200, 60);
                }
            }
        };

        //function to draw the dark-colored River (river1)
        var showRiver1 = function () {
            for (var i = 0; i < 4; i++) {
                river1.locX = i * 200;
                river1.draw(0, 470, 200, 60);
            }
        };

        //function to draw the light-colored River (river2)
        var showRiver2 = function () {
            for (var i = 0; i < 4; i++) {
                river2.locX = i * 200;
                river2.draw(0, 535, 200, 60);
            }
        };

        //function to draw splash
        var showSplash = function () {
            if (splashW) {
                splashAudio.play();
                splash.animate(5, 6, 0, 700, 140, 50);
                if (++countSplash >= 25) {
                    splashAudio.pause();
                    splashW = false;
                };
            };
        };


        function Texture(posX, posY) {
            this.image = allImages;
            this.locX = posX;
            this.locY = posY;
            this.restartPosX = posX;
            this.restartPosY = posY;
            this.animationDelay = 0;
            this.currentSprite = 0;
            this.visible = true;
        };

        Texture.prototype.restart = function () {
            this.locX = this.restartPosX;
            this.locY = this.restartPosY;
            this.animationDelay = 0;
            this.currentSprite = 0;
            this.visible = true;
        }


        Texture.prototype.draw = function (startX, startY, sWidth, sHeight) {
            ctx.drawImage(this.image, startX, startY, sWidth, sHeight, this.locX, this.locY, sWidth, sHeight);
        };

        Texture.prototype.animate = function (delay, frameNo, startX, startY, frameWidth, frameHeight) {
            ctx.drawImage(this.image, frameWidth * this.currentSprite + startX, startY, frameWidth, frameHeight, this.locX, this.locY, frameWidth, frameHeight);
            if (move && this.animationDelay++ % delay === 0) this.currentSprite = ++this.currentSprite % frameNo;
        };


        function Horse() {
            this.posX = 170;
            this.posY = 255;
            this.horseStand = new Texture(this.posX, this.posY);
            this.horseAnimation = new Texture(this.posX, this.posY);
            this.horseGoUp = new Texture(this.posX, this.posY);
            this.horseGoDown = new Texture(this.posX, this.posY);
        };

        Horse.prototype.restart = function () {
            this.posX = 170;
            this.posY = 255;
            this.horseStand.locY = this.horseAnimation.locY = this.horseGoUp.locY = this.horseGoDown.locY = this.posY;
        }

        Horse.prototype.draw = function (upX, upY, upW, upH, downX, downY, downW, downH, standX, standY, standW, standH, delay, frameNo, startX, startY, frameWidth, frameHeight) {
            if (jumpS && !goDown) this.horseGoUp.draw(upX, upY, upW, upH);
            else if (jumpS && goDown) this.horseGoDown.draw(downX, downY, downW, downH);
            else if (jumpH && !goDown) this.horseGoUp.draw(upX, upY, upW, upH);
            else if (jumpH && goDown) this.horseGoDown.draw(downX, downY, downW, downH);
            else if (!start || (endScreen && !move)) this.horseStand.draw(standX, standY, standW, standH);
            else if (!jumpS && !jumpH && !goDown && !itsOver) this.horseAnimation.animate(delay, frameNo, startX, startY, frameWidth, frameHeight);
            else if (!jumpS && !jumpH && !goDown && itsOver) this.horseGoDown.draw(downX, downY, downW, downH);
            if (move && !jumpS && !jumpH && !goDown && !itsOver) gallop.play();
            if (!move || jumpS || jumpH || goDown || itsOver) gallop.pause();
        };

        Horse.prototype.move = function (jumpSMax, jumpHMax) {
            if (move) {
                this.horseStand.locY = this.horseAnimation.locY = this.horseGoUp.locY = this.horseGoDown.locY = this.posY;
                if (jumpS && !itsOver) {
                    if (!goDown) this.posY -= 5;
                    if (this.posY <= jumpSMax)
                        goDown = true;
                };

                if (jumpH && !itsOver) {
                    if (!goDown) this.posY -= 5;
                    if (this.posY <= jumpHMax)
                        goDown = true;
                };

                for (var i = 0; i < 6; i++) {
                    if (!itsOver && !block[i].visible && block[i].locX === 160) Game.score++;
                    if (!block[i].visible && block[i].locX <= 240 && block[i].locX + 160 >= 305 && this.posY >= 255) itsOver = true;
                    else if (!itsOver && block[i].visible && block[i].locX <= 305 && block[i].locX + 150 >= 240 && this.posY >= 255) {
                        goDown = false;
                        this.posY = 255;
                        if (jumpS) jumpS = false;
                        if (jumpH) jumpH = false;
                    };
                };

                if (goDown) {
                    this.posY += 5;
                };

                if (itsOver) {
                    if (this.posY < 380) this.posY += 5;
                    if (this.posY >= 300 && this.posY <= 310) splashW = true;
                    if (goDown) goDown = false;
                    if (jumpS) jumpS = false;
                    if (jumpH) jumpH = false;
                    playingScreen = false;
                    endScreen = true;
                    if (this.posY >= 380) move = false;
                };
            }
        };

        //function to move the blocks
        var moveBlocks = function () {
            for (var i = 0; i < 6; i++) {
                if (move) {
                    if (jessamine) block[i].locX -= 5;
                    else if (hito) block[i].locX -= 10;
                    else block[i].locX -= 16;
                };
                if (block[i].locX <= -160) {
                    block[i].locX = 800;
                    if (i === 0) r = getRand(10);
                    if (r === 0) {
                        if (i === 0 && block[i].visible === true)
                            block[i].visible = false;
                        if (i === 1 && block[i].visible === false)
                            block[i].visible = true;
                        if (i === 2 && block[i].visible === true)
                            block[i].visible = false;
                        if (i === 3 && block[i].visible === false)
                            block[i].visible = true;
                        if (i === 4 && block[i].visible === true)
                            block[i].visible = false;
                    }
                    else if (r === 1) {
                        if (i === 0 && block[i].visible === true)
                            block[i].visible = false;
                        if (i === 1 && block[i].visible === true)
                            block[i].visible = false;
                        if (i === 2 && block[i].visible === false)
                            block[i].visible = true;
                        if (i === 3 && block[i].visible === false)
                            block[i].visible = true;
                        if (i === 4 && block[i].visible === false)
                            block[i].visible = true;
                    }
                    else if (r === 2) {
                        if (i === 0 && block[i].visible === true)
                            block[i].visible = false;
                        if (i === 1 && block[i].visible === true)
                            block[i].visible = false;
                        if (i === 2 && block[i].visible === false)
                            block[i].visible = true;
                        if (i === 3 && block[i].visible === true)
                            block[i].visible = false;
                        if (i === 4 && block[i].visible === true)
                            block[i].visible = false;
                    }
                    else if (r === 3) {
                        if (i === 0 && block[i].visible === true)
                            block[i].visible = false;
                        if (i === 1 && block[i].visible === true)
                            block[i].visible = false;
                        if (i === 2 && block[i].visible === false)
                            block[i].visible = true;
                        if (i === 3 && block[i].visible === false)
                            block[i].visible = true;
                        if (i === 4 && block[i].visible === true)
                            block[i].visible = false;
                    }
                    else if (r === 4) {
                        if (i === 0 && block[i].visible === false)
                            block[i].visible = true;
                        if (i === 1 && block[i].visible === false)
                            block[i].visible = true;
                        if (i === 2 && block[i].visible === true)
                            block[i].visible = false;
                        if (i === 3 && block[i].visible === true)
                            block[i].visible = false;
                        if (i === 4 && block[i].visible === false)
                            block[i].visible = true;
                    }
                    else if (r === 5) {
                        if (i === 0 && block[i].visible === false)
                            block[i].visible = true;
                        if (i === 1 && block[i].visible === true)
                            block[i].visible = false;
                        if (i === 2 && block[i].visible === true)
                            block[i].visible = false;
                        if (i === 3 && block[i].visible === false)
                            block[i].visible = true;
                        if (i === 4 && block[i].visible === true)
                            block[i].visible = false;
                    }
                    else if (r === 6) {
                        if (i === 0 && block[i].visible === false)
                            block[i].visible = true;
                        if (i === 1 && block[i].visible === false)
                            block[i].visible = true;
                        if (i === 2 && block[i].visible === false)
                            block[i].visible = true;
                        if (i === 3 && block[i].visible === true)
                            block[i].visible = false;
                        if (i === 4 && block[i].visible === true)
                            block[i].visible = false;
                    }
                    else if (r === 7) {
                        if (i === 0 && block[i].visible === false)
                            block[i].visible = true;
                        if (i === 1 && block[i].visible === false)
                            block[i].visible = true;
                        if (i === 2 && block[i].visible === false)
                            block[i].visible = true;
                        if (i === 3 && block[i].visible === false)
                            block[i].visible = true;
                        if (i === 4 && block[i].visible === false)
                            block[i].visible = true;
                    }
                    else if (r === 8) {
                        if (i === 0 && block[i].visible === true)
                            block[i].visible = false;
                        if (i === 1 && block[i].visible === false)
                            block[i].visible = true;
                        if (i === 2 && block[i].visible === false)
                            block[i].visible = true;
                        if (i === 3 && block[i].visible === false)
                            block[i].visible = true;
                        if (i === 4 && block[i].visible === false)
                            block[i].visible = true;
                    }
                    else {
                        if (i === 0 && block[i].visible === false)
                            block[i].visible = true;
                        if (i === 1 && block[i].visible === false)
                            block[i].visible = true;
                        if (i === 2 && block[i].visible === true)
                            block[i].visible = false;
                        if (i === 3 && block[i].visible === false)
                            block[i].visible = true;
                        if (i === 4 && block[i].visible === true)
                            block[i].visible = false;
                    }
                };
            };
        };

        Game.draw = function () {

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (selectPlayerScreen) {
                //Show start screen
                ctx.drawImage(allImages, 205, 754, 195, 150, 50, 20, 200, 150);
                ctx.drawImage(allImages, 0, 756, 200, 140, canvas.width - 250, 20, 200, 140);
                ctx.drawImage(allImages, 420, 754, 200, 150, canvas.width / 2 - 100, canvas.height / 2 - 40, 200, 150);
                ctx.font = "30px Arial";

                ctx.fillText("The Rider's Glory", canvas.width / 2 - 10, canvas.height / 2 - 80);
                ctx.font = "20px Arial";
            } else if (timeScreen) {
                ctx.drawImage(allImages, 0, 600, 200, 60, 0, 0, canvas.width / 2, canvas.height);
                if (jessamine) ctx.drawImage(allImages, 205, 754, 195, 150, canvas.width / 2 - 97, canvas.height / 2 - 105, 200, 150);
                else if (hito) ctx.drawImage(allImages, 0, 756, 200, 140, canvas.width / 2 - 100, canvas.height / 2 - 100, 200, 140);
                else ctx.drawImage(allImages, 420, 754, 200, 150, canvas.width / 2 - 100, canvas.height / 2 - 105, 200, 150);

            } else {

                if (day) {
                    //Execute function to draw the sky
                    showSky();

                    //Execute function to draw the cloud
                    showCloud();
                }
                else showStar();


                //Draw the blocks
                for (var i = 0; i < 6; i++) {
                    if (block[i].visible) block[i].draw(10, 400, 150, 60);
                };

                if (jessamine) horse1.draw(145, 270, 145, 110, 870, 260, 145, 110, 0, 270, 145, 110, 5, 6, 0, 148, 145, 112);
                else if (hito) horse2.draw(435, 270, 145, 110, 725, 270, 145, 110, 290, 270, 145, 110, 4, 6, 0, 0, 150, 108);
                else horse3.draw(880, 560, 140, 110, 700, 540, 146, 112, 896, 910, 126, 112, 3, 6, 0, 910, 150, 110);

                //Execute function to draw river
                if (day) showRiver2();
                else showRiver1();

                //Execute function to show splash animation
                if (!move) showSplash();

                //Show score on the screen
                if (!endScreen) ctx.fillText("" + Game.score, 390, 50);
                if (endScreen) {
                    ctx.font = "30px Arial";
                    ctx.fillText("Your Score : " + Game.score, 390, 50);
                    if (showHighScores) {
                        if (jessamine) {
                            if (Game.score > highScores[0]) {
                                newHighScore = true;
                                highScores[0] = Game.score;
                                localStorage.setItem('RidersHighScores', JSON.stringify(highScores));
                            }
                        } else if (hito) {
                            if (Game.score > highScores[1]) {
                                newHighScore = true;
                                highScores[1] = Game.score;
                                localStorage.setItem('RidersHighScores', JSON.stringify(highScores));
                            }
                        } else {
                            if (Game.score > highScores[2]) {
                                newHighScore = true;
                                highScores[2] = Game.score;
                                localStorage.setItem('RidersHighScores', JSON.stringify(highScores));
                            }

                        }
                        if (newHighScore) {
                            ctx.fillText("NEW HIGH SCORE!", 390, 100);
                            ctx.fillText("CONGRATS!!!", 390, 150);
                        }
                        else {
                            if (jessamine) ctx.fillText("Highest Score : " + highScores[0], 390, 100);
                            else if (hito) ctx.fillText("Highest Score : " + highScores[1], 390, 100);
                            else ctx.fillText("Highest Score : " + highScores[2], 390, 100);
                        }
                    }
                    if (!move) {
                        ctx.font = "40px Arial";
                        ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
                        ctx.font = "20px Arial";
                        setScreen('endScreen');
                    }
                }
                if (!start && thisIsMobile) ctx.fillText("Tap the left half of your screen for low jumps and the right half for high jumps.", canvas.width / 2, 80);
            }
            if (changeToLandscape) {
                ctx.fillText("Please rotate your device to Landscape orientation", canvas.width / 2 - 10, 30);
            }
        };

        Game.update = function () {
            if (!selectPlayerScreen) {
                if (!timeScreen) {
                    if (day) moveCloud();
                    else moveStar();

                    //Execute function to move horses
                    if (jessamine) horse1.move(140, 50);
                    else if (hito) horse2.move(200, 150);
                    else horse3.move(220, 195);

                    //Execute function to move blocks
                    moveBlocks();
                }
            }
        };

        var changeToTimeScreen = function () {
            setScreen('selectTimeScreen');
            timeScreen = true;
            setPlayerSelected('');
            selectPlayerScreen = false;
        }

        Game.run = function () {

            //Take note of this in the future
            //Controlling game from html divs
            if (selectPlayerScreen) {
                if (jessRef.current.textContent === 'selected') {
                    if (hito) hito = false;
                    if (!jessamine) jessamine = true;
                    changeToTimeScreen();
                }
                if (hitoRef.current.textContent === 'selected') {
                    if (jessamine) jessamine = false;
                    if (!hito) hito = true;
                    changeToTimeScreen();
                }
                if (yosiRef.current.textContent === 'selected') {
                    if (jessamine) jessamine = false;
                    if (hito) hito = false;
                    changeToTimeScreen();
                }
            }
            if (timeScreen) {
                if (lightRef.current != null) light = lightRef.current.textContent;
                if (nightRef.current != null) night = nightRef.current.textContent;

                if (light === 'selected') {
                    setSelectTime("");
                    setScreen('playScreen');
                    if (!day) day = true;
                    playingScreen = true;
                    timeScreen = false;
                    light = '';
                }
                if (night === 'selected') {
                    setSelectTime("");
                    setScreen('playScreen');
                    if (day) day = false;
                    playingScreen = true;
                    timeScreen = false;
                    night = '';
                }
            }
            if (playingScreen) {
                if (startRef.current != null && !start) {
                    if (startRef.current.className === 'hideStart') {
                        start = true;
                        move = true;
                        if (day) audio.play();
                        else nightAudio.play();
                    }
                }
                if (lowJumpRef.current != null) {
                    if (lowJumpRef.current.className === 'lowJumpPressed') {
                        if (!jumpS && !jumpH)
                            jumpS = true;
                        // setLowJump(false);
                    }
                }
                if (highJumpRef.current != null) {
                    if (highJumpRef.current.className === 'highJumpPressed') {
                        if (!jumpS && !jumpH)
                            jumpH = true;
                        // setHighJump(false);
                    }
                }

                if (!move && start && pauseRef.current.textContent === "||") {
                    move = true;
                    if (day) audio.play();
                    else nightAudio.play();
                }
            }
            if (endScreen) {
                if (goToSelectRef.current != null) {
                    if (goToSelectRef.current.textContent === 'selected') {
                        Game.restart();
                        move = false;
                        if (day) {
                            audio.pause();
                            audio.currentTime = 0;
                        }
                        else {
                            nightAudio.pause();
                            nightAudio.currentTime = 0;
                        }
                        setRestart(false);
                        setScreen("selectPlayerScreen");
                        selectPlayerScreen = true;
                        setStart(false);
                        start = false;
                        setPause(false);
                        // setLowJump(false);
                        // setHighJump(false);
                        setSelectTime("");
                        setGoToSelect(false);
                        endScreen = false;
                    }
                }
            }

            if (restartRef.current.className === 'restart1R') {
                Game.restart();
                setScreen('playScreen');
                playingScreen = true;
                setPause(false);
                setRestart(false);
                if (endScreen) endScreen = false;
            }

            if (pauseRef.current.textContent === "||") {
                Game.update();
            } else {
                if (move) move = false;
                if (day) audio.pause();
                else nightAudio.pause();
            }


            Game.draw();
            if (!changeToLandscape && window.matchMedia("(orientation: portrait)").matches) {
                console.log(canvas.width, canvas.height);
                console.log(window.innerWidth, window.innerHeight);
                changeToLandscape = true;
            } else if (changeToLandscape && window.matchMedia("(orientation: landscape)").matches) {
                updateScreenCoords();
                console.log(canvas.width, canvas.height);
                console.log(window.innerWidth, window.innerHeight);
                changeToLandscape = false;
            }
        };

        Game.restart = function () {

            r = 0; s = 0; starRand = 0;
            countSplash = 0;
            move = true;
            newHighScore = false;
            jumpS = false; jumpH = false; goDown = false; itsOver = false; splashW = false;
            Game.score = 0;
            horse1.restart();
            horse2.restart();
            horse3.restart();
            restartBlocks();
        }

        Game.jumpS = function () {
            if (selectPlayerScreen) {
                if (hito) hito = false;
                if (!jessamine) jessamine = true;
                selectPlayerScreen = false;
                timeScreen = true;
            } else if (playingScreen) {
                if (!start) {
                    start = true;
                    move = true;
                    if (day) audio.play();
                    else nightAudio.play();
                }
                if (!jumpS && !jumpH)
                    jumpS = true;
            } else if (timeScreen) {
                if (!day) day = true;
                playingScreen = true;
                timeScreen = false;
            }
        };

        Game.jumpH = function () {
            if (selectPlayerScreen) {
                if (jessamine) jessamine = false;
                if (!hito) hito = true;
                selectPlayerScreen = false;
                timeScreen = true;
            } else if (playingScreen) {
                if (!jumpS && !jumpH)
                    jumpH = true;
            } else if (timeScreen) {
                if (day) day = false;
                playingScreen = true;
                timeScreen = false;
            }
        };

        Game.startScreen = function () {
            if (endScreen) {
                endScreen = false;
                Game.restart();
                selectPlayerScreen = true;
            } else if (selectPlayerScreen) {
                if (jessamine) jessamine = false;
                if (hito) hito = false;
                selectPlayerScreen = false;
                timeScreen = true;
            }
        };


        var getRand = function (x) {
            return Math.floor(Math.random() * x);
        };


        canvas.addEventListener("touchstart", e => {
            if (!changeToLandscape) {
                if (playingScreen) {
                    if (move) {
                        if (e.changedTouches[0].clientX <= 400 * widthFactor) {
                            Game.jumpS();
                            console.log(window.innerWidth/2, 400 * widthFactor);
                        }
                        else {
                            Game.jumpH();
                            console.log(window.innerWidth/2, 400 * widthFactor);
                        }
                    }
                }
            }
        });

        canvas.addEventListener("touchmove", e => {
            e.preventDefault();
        });


        //Keyboard inputs
        window.addEventListener('keydown', function (event) {
            switch (event.keyCode) {
                case 13:
                    Game.startScreen();
                    break;
                case 37:
                    Game.jumpS();
                    break;
                case 39:
                    Game.jumpH();
                    break;
                default:
                    return;
            }
        }, false);



        let requestID;

        const render = () => {

            Game.run();

            requestID = requestAnimationFrame(render);
        };

        render();

        return () => {

            clearInterval(intervalId);
            cancelAnimationFrame(requestID);
            if (!audio.paused || audio.currentTime) {
                audio.pause();
                audio.currentTime = 0;
            }
            if (!nightAudio.paused || nightAudio.currentTime) {
                nightAudio.pause();
                nightAudio.currentTime = 0;
            }

            
        }

    }, []);


    return (
        <div className="aroundCanvasR" id='home'>
            <div className="samePosR">
                <div className='infoR'>i
                    <span className='tooltip-textR'>
                        *While playing,
                        Tap the left half of the screen for low jumps and the right half for high jumps.<br />
                        *Tap 'O' to restart game.<br />
                        *Tap '||' to pause game.<br />
                        *Tap '►' to resume game.<br />
                        *Tap 'X' to exit game.<br />
                        *Tap this instruction screen to return to game<br />
                    </span>
                    <span className='tooltip-text-desktopR'>
                        *On the play screen, press the 'Left Arrow' key for low jumps and the 'Right Arrow' key for high jumps.<br />
                        *Click 'O' to restart game.<br />
                        *Click '||' to pause game.<br />
                        *Click '►' to resume game.<br />
                        *Click 'X' to exit game.<br />
                        *Click the game screen to use the keys on your keyboard.<br />
                    </span>
                </div>
                <div ref={restartRef} onClick={() => { if (screen === 'endScreen' || (screen === 'playScreen' && startG === true)) setRestart(true) }} className={restart ? 'restart1R' : 'restart2R'}>
                    O
                </div>
                <p ref={pauseRef} onClick={() => { if (screen === 'playScreen') setPause(!pause) }} className="pauseR">
                    {!pause ? "||" : "►"}
                </p>
                <Link to="/isiapps#home">
                    <div className='exitR'>X</div>
                </Link>
            </div>

            <canvas ref={canvasRef} width="800" height="480" className='canvasO' />
            {loadingAssets && <div className='loading'>Loading{dots}</div>}
            {!loadingAssets && screen === 'selectPlayerScreen' && <div className='selectPlayers'><div ref={jessRef} onClick={() => setPlayerSelected('jess')} className='jess'>{playerSelected === 'jess' ? "selected" : "Jess"}</div><div ref={hitoRef} onClick={() => setPlayerSelected('hito')} className='hito'>{playerSelected === 'hito' ? "selected" : "Hito"}</div><div ref={yosiRef} onClick={() => setPlayerSelected('yosi')} className='yosi'>{playerSelected === 'yosi' ? "selected" : "Yosi"}</div></div>}
            {screen === 'selectTimeScreen' && <div className='selectTime'><div ref={lightRef} onClick={() => setSelectTime('day')} className='day'>{selectTime === 'day' ? "selected" : "Day"}</div><div ref={nightRef} onClick={() => setSelectTime('night')} className='night'>{selectTime === 'night' ? "selected" : "Night"}</div></div>}
            {screen === 'playScreen' && <div><div ref={startRef} onClick={() => setStart(true)} className={startG === true ? "hideStart" : "displayStart"}>Start</div><div ref={lowJumpRef} onClick={() => setLowJump(true)} className={lowJump === true ? "lowJumpPressed" : "lowJumpReleased"}>LJ</div><div ref={highJumpRef} onClick={() => setHighJump(true)} className={highJump === true ? "highJumpPressed" : "highJumpReleased"}>HJ</div></div>}
            {screen === 'endScreen' && <div ref={goToSelectRef} onClick={() => setGoToSelect(true)} className='goToSelect'>{goToSelect === true ? "selected" : "Change Player"}</div>}

        </div>
    )
}

export default RidersGlory