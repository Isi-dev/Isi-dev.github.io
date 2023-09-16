import React, { useRef, useEffect, useState } from 'react'
import './whatsTheWord.css'
import WordSet from './components/wordSet';
import { HashLink as Link } from 'react-router-hash-link';

const WhatsTheWord = () => {
    const [pause, setPause] = useState(false);
    const [restart, setRestart] = useState("");
    const restartRef = useRef("null");
    const pauseRef = useRef("null");
    const canvasRef = useRef("null");

    useEffect(() => {
        const canvas = canvasRef.current;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const context = canvas.getContext("2d");
        context.textAlign = "center";

        const extension = canvas.height / 10;
        const wallWidth = canvas.width / 160;
        const squareSize = canvas.width / 8;
        const squareHeight = canvas.height / 13.3;
        const smallerSquareSize = canvas.width / 12;
        const smallerSquareHeight = canvas.height / 20;
        const spaceBtwLockAndKeyX = canvas.width / 48;
        const spaceBtwLockAndKeyY = canvas.height / 80;
        const textSize = canvas.width / 16;
        const textSize2 = canvas.width / 10;
        const spacing = canvas.width / 64;
        const hintStart = canvas.height / 2 + squareHeight;
        const hintTextSize = canvas.height / 30;

        class Lock {
            constructor(letter, pos) {
                this.size = squareSize;
                this.posX = pos.x;
                this.posY = pos.y;
                this.letter = letter;
                this.opened = false;
            }

            restart() {
                this.letter = "";
                this.opened = false;
            }

            setPosXAndNumber(x, n) {
                this.posX = x;
                this.lockNumber = n;
            }

            draw() {
                context.fillStyle = 'gray';
                context.fillRect(this.posX, this.posY, this.size, squareHeight);
            }
        }

        class Key {
            constructor(letter, pos) {
                this.size = smallerSquareSize;
                this.posX = pos.x;
                this.posY = pos.y;
                this.lastPosX = pos.x;
                this.lastPosY = pos.y;
                this.letter = letter;
                this.inLockNumber = null;
                this.active = false;
            }

            updateLastPos(x, y) {
                this.lastPosX = x;
                this.lastPosY = y;
            }

            draw() {
                context.fillStyle = 'black';
                context.fillRect(this.posX, this.posY, this.size, smallerSquareHeight);
                context.font = `${textSize}px Arial`;
                context.fillStyle = 'white';
                context.textAlign = "center";
                context.textBaseline = "middle";
                context.fillText(this.letter, this.posX + this.size / 2, this.posY + smallerSquareHeight / 2);
            }
        }

        class LockKeySet {
            constructor(wordSets) {
                this.wordSets = wordSets;
                this.currentWordSetIndex = 0;
                if (typeof (Storage) !== "undefined") {
                    this.currentWordSetIndex = JSON.parse(localStorage.getItem('startFromLast')) || this.currentWordSetIndex;
                }
                this.show = true;
                this.droppedInLock = false;
                this.hint = '';
                //this.audio = new Audio();
                this.setLocksAndKeys();
            }

            wrapText(context, text, x, y, maxWidth, lineHeight) {

                //To centralize text vertically
                var wordLength = context.measureText(text);
                var noOfLines = parseInt(wordLength.width / maxWidth);
                var yAdjust = noOfLines * lineHeight / 2;
                y -= yAdjust;

                //Wrap text: To send part of the text to the next line when it exceeds 
                //a certain width
                var words = text.split(' ');
                var line = '';

                for (var n = 0; n < words.length; n++) {
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

            draw() {
                if (this.show) {
                    context.textAlign = "center";
                    context.font = `bold ${hintTextSize}px sans-serif`;
                    context.fillStyle = "black";
                    this.wrapText(context, this.hint, canvas.width / 2, hintStart, canvas.width - squareSize, canvas.height / 30);

                    this.lock.forEach((lock) => lock.draw());
                    this.key.forEach((key) => {
                        key.draw();
                    });
                    this.key.forEach((key) => {
                        if (key.active) key.draw();
                    });
                }
            }

            handleTouchStart(event) {
                event.preventDefault();
                const touch = event.touches[0];
                const touchX = touch.clientX;
                const touchY = touch.clientY;
                for (var i = 0; i < this.noOfLocks; i++) {
                    const x = this.key[i].posX;
                    const y = this.key[i].posY;

                    if (
                        touchX >= x && touchX <= x + smallerSquareSize &&
                        touchY >= y && touchY <= y + smallerSquareHeight
                    ) {
                        this.key[i].active = true;
                        break;
                    }
                };
            }

            handleTouchMove(event) {
                event.preventDefault();
                const touch = event.touches[0];

                for (var i = 0; i < this.noOfLocks; i++) {
                    if (this.key[i].active) {
                        this.key[i].posX = touch.clientX - smallerSquareSize / 2 - canvas.offsetLeft;
                        this.key[i].posY = touch.clientY - squareHeight * 1.5 - canvas.offsetTop;
                    }
                }
            }

            handleTouchEnd() {
                for (var i = 0; i < this.noOfLocks; i++) {
                    if (this.key[i].active) {
                        for (var j = 0; j < this.noOfLocks; j++) {
                            const x = this.lock[j].posX;
                            const y = this.lock[j].posY;
                            if (
                                this.key[i].posX >= x && this.key[i].posX + smallerSquareSize <= x + squareSize &&
                                this.key[i].posY >= y && this.key[i].posY + smallerSquareHeight <= y + squareHeight
                            ) {
                                for (var k = 0; k < this.noOfLocks; k++) {
                                    if (!this.key[k].active && this.key[k].posX >= x && this.key[k].posX + smallerSquareSize <= x + squareSize &&
                                        this.key[k].posY >= y && this.key[k].posY + smallerSquareHeight <= y + squareHeight) {
                                        this.key[k].posX = this.key[i].lastPosX;
                                        this.key[k].posY = this.key[i].lastPosY;
                                        this.key[k].updateLastPos(this.key[k].posX, this.key[k].posY);
                                        break;
                                    }
                                }
                                this.key[i].posX = this.lock[j].posX + spaceBtwLockAndKeyX;
                                this.key[i].posY = this.lock[j].posY + spaceBtwLockAndKeyY;
                                this.key[i].updateLastPos(this.key[i].posX, this.key[i].posY);
                                this.droppedInLock = true;
                                break;
                            }
                        }
                        if (!this.droppedInLock) {
                            this.key[i].posX = this.key[i].lastPosX;
                            this.key[i].posY = this.key[i].lastPosY;
                        }
                        this.key[i].active = false;
                        if (this.droppedInLock) this.droppedInLock = false;

                        break;
                    }
                }

                this.noOfLocksOpened = 0;
                for (let cL = 0; cL < this.noOfLocks; cL++) {
                    for (var r = 0; r < this.noOfLocks; r++) {
                        const x = this.lock[r].posX;
                        const y = this.lock[r].posY;
                        if (
                            this.key[cL].posX >= x && this.key[cL].posX + smallerSquareSize <= x + squareSize &&
                            this.key[cL].posY >= y && this.key[cL].posY + smallerSquareHeight <= y + squareHeight
                        ) {
                            if (this.key[cL].letter === this.lock[r].letter) {
                                this.noOfLocksOpened++;
                                break;
                            }
                        }
                    }
                }
                if (this.noOfLocksOpened === this.noOfLocks) {
                    // this.changeWordSet();
                    gate.opening = true;
                    this.removeDragControl();
                }
            }

            handleMouseDown(event) {
                event.preventDefault();
                const mousePosX = event.clientX - canvas.getBoundingClientRect().left;
                const mousePosY = event.clientY - canvas.getBoundingClientRect().top;
                const x = this.posX;
                const y = this.posY;

                if (
                    mousePosX >= x && mousePosX <= x + this.size &&
                    mousePosY >= y && mousePosY <= y + this.size
                ) {
                    this.active = true;
                }
            }

            handleMouseMove(event) {
                if (this.active === false) return;
                event.preventDefault();
                const mousePosX = event.clientX - canvas.getBoundingClientRect().left;
                const mousePosY = event.clientY - canvas.getBoundingClientRect().top;
                this.posX = mousePosX - this.size / 2;
                this.posY = mousePosY - this.size / 2;
            }

            handleMouseUp() {
                if (this.active === false) return;
                this.active = false;
            }

            addDragControl(canvas) {
                this.touchStartHandler = this.handleTouchStart.bind(this);
                this.touchMoveHandler = this.handleTouchMove.bind(this);
                this.touchEndHandler = this.handleTouchEnd.bind(this);
                this.mouseDownHandler = this.handleMouseDown.bind(this);
                this.mouseMoveHandler = this.handleMouseMove.bind(this);
                this.mouseUpHandler = this.handleMouseUp.bind(this);

                canvas.addEventListener('touchstart', this.touchStartHandler, false);
                canvas.addEventListener('touchmove', this.touchMoveHandler, false);
                canvas.addEventListener('touchend', this.touchEndHandler, false);
                canvas.addEventListener('mousedown', this.mouseDownHandler, false);
                canvas.addEventListener('mousemove', this.mouseMoveHandler, false);
                canvas.addEventListener('mouseup', this.mouseUpHandler, false);
            }

            removeDragControl() {
                canvas.removeEventListener('touchstart', this.touchStartHandler, false);
                canvas.removeEventListener('touchmove', this.touchMoveHandler, false);
                canvas.removeEventListener('touchend', this.touchEndHandler, false);
                canvas.removeEventListener('mousedown', this.mouseDownHandler, false);
                canvas.removeEventListener('mousemove', this.mouseMoveHandler, false);
                canvas.removeEventListener('mouseup', this.mouseUpHandler, false);
            }

            setLocksAndKeys() {
                this.noOfLocks = this.wordSets[this.currentWordSetIndex].correctWord.length;
                this.letterSpace = this.noOfLocks < 8 ? squareSize * this.noOfLocks + spacing * (this.noOfLocks - 1) : squareSize * 7 + spacing * 6;
                this.firstLetterXPos = canvas.width / 2 - this.letterSpace / 2;
                this.hint = this.wordSets[this.currentWordSetIndex].hint;
                //this.audio.load('/assets/wordSound/avid.mp3');
                this.audio = new Audio(this.wordSets[this.currentWordSetIndex].audio);
                this.lockPositions = [];
                this.keyPositions = [];
                for (var p = 0; p < this.noOfLocks; p++) {
                    const lockX = this.firstLetterXPos + (squareSize + spacing) * (p % 7);
                    const lockY = p < 7 ? spaceBtwLockAndKeyY : p < 14 ? spaceBtwLockAndKeyY * 2 + squareHeight : p < 21 ? spaceBtwLockAndKeyY * 3 + squareHeight * 2 : p < 28 ? spaceBtwLockAndKeyY * 4 + squareHeight * 3 : spaceBtwLockAndKeyY * 5 + squareHeight * 4;
                    this.lockPositions[p] = { x: lockX, y: lockY + extension };
                    this.keyPositions[p] = { x: lockX + spaceBtwLockAndKeyX, y: lockY + spaceBtwLockAndKeyY + extension };
                }

                this.lock = [];
                this.key = [];
                for (var i = 0; i < this.noOfLocks; i++) {
                    this.lock[i] = new Lock(this.wordSets[this.currentWordSetIndex].correctWord[i], this.lockPositions[i]);
                    this.key[i] = new Key(this.wordSets[this.currentWordSetIndex].scrambledWord[i], this.keyPositions[i]);
                }

                this.addDragControl(canvas);
                // this.show = true;
            }

            changeWordSet() {
                this.currentWordSetIndex++;
                if (this.currentWordSetIndex >= this.wordSets.length) {
                    this.currentWordSetIndex = 0;
                }
                if (typeof (Storage) !== "undefined") {
                    localStorage.setItem('startFromLast', JSON.stringify(this.currentWordSetIndex));
                }
                this.setLocksAndKeys();
            }

        }

        var lockKey = new LockKeySet(WordSet);

        var gate = {
            posX1: 0,
            posX2: canvas.width / 2,
            halfSize: canvas.width / 2,
            gateHeight: extension + (lockKey.noOfLocks < 8 ? spaceBtwLockAndKeyY * 2 + squareHeight : lockKey.noOfLocks < 15 ? spaceBtwLockAndKeyY * 3 + squareHeight * 2 : lockKey.noOfLocks < 22 ? spaceBtwLockAndKeyY * 4 + squareHeight * 3 : lockKey.noOfLocks < 29 ? spaceBtwLockAndKeyY * 5 + squareHeight * 4 : spaceBtwLockAndKeyY * 6 + squareHeight * 5),
            closed: true,
            opening: false,
            restart() {
                this.posX1 = 0;
                this.posX2 = canvas.width / 2;
                this.closed = true;
                this.opening = false;
                // if (lockKey.noOfLocks < 8) this.gateHeight = squareHeight * 3;
                this.gateHeight = lockKey.noOfLocks < 8 ? spaceBtwLockAndKeyY * 2 + squareHeight : lockKey.noOfLocks < 15 ? spaceBtwLockAndKeyY * 3 + squareHeight * 2 : lockKey.noOfLocks < 22 ? spaceBtwLockAndKeyY * 4 + squareHeight * 3 : lockKey.noOfLocks < 29 ? spaceBtwLockAndKeyY * 5 + squareHeight * 4 : spaceBtwLockAndKeyY * 6 + squareHeight * 5;
                this.gateHeight = this.gateHeight + extension;
            },
            open() {
                if (this.opening) {
                    if (this.posX1 + this.halfSize > lockKey.firstLetterXPos - spacing) { this.posX1 -= 10; this.posX2 += 10; }
                    else {
                        if (this.closed) {
                            lockKey.audio.play();
                            // console.log("Audio played!");
                            this.closed = false;
                        }
                    }
                }
            },
            draw() {
                context.fillStyle = 'black';
                context.fillRect(this.posX1, 0, this.halfSize, this.gateHeight);
                context.fillRect(this.posX2, 0, this.halfSize, this.gateHeight);
            }
        }

        var escapee = {
            posX: canvas.width / 2 - smallerSquareSize / 2,
            posY: canvas.height,
            speed: 0.5,
            preScore: 0,
            score: typeof (Storage) !== "undefined" ? JSON.parse(localStorage.getItem('lastScore')) !== null ? JSON.parse(localStorage.getItem('lastScore')) : 0 : 0,

            restart() {
                this.posY = canvas.height;
                this.preScore = 0;
            },
            update() {
                if (this.posY >= gate.gateHeight) this.posY -= this.speed;
                else {
                    if (gate.closed) {
                        if (this.preScore > -21) this.preScore -= 0.1;
                    } else {
                        if (this.posY > -squareSize) {
                            this.posY -= this.speed;
                            if (this.preScore < 20) this.preScore += 0.1;
                        }

                        // if (lockKey.show && this.posY < gateHigh + gateHeight - smallerSquareSize) lockKey.show = false;
                        if (this.posY <= -spaceBtwLockAndKeyY) {
                            catcher.distToEscapee = Math.abs(this.posY - catcher.posY);
                            this.score += Math.floor(this.preScore);
                            if (typeof (Storage) !== "undefined") {
                                localStorage.setItem('theDistToEscapee', JSON.stringify(catcher.distToEscapee));
                                localStorage.setItem('lastScore', JSON.stringify(this.score));
                            }
                            this.restart();
                            catcher.restart();
                            lockKey.changeWordSet();
                            gate.restart();
                        }
                    }
                }
            },
            draw() {
                context.fillStyle = 'blue';
                context.fillRect(this.posX, this.posY, smallerSquareSize, smallerSquareSize);
            },
            drawScore() {
                context.fillStyle = 'yellow';
                context.font = `${textSize}px Arial`;
                context.fillText(this.score, canvas.width / 2, canvas.height / 12);
            }
        }

        var catcher = {
            posX: canvas.width / 2 - squareSize / 2,
            distToEscapee: typeof (Storage) !== "undefined" ? JSON.parse(localStorage.getItem('theDistToEscapee')) !== null ? JSON.parse(localStorage.getItem('theDistToEscapee')) : 0 : 0,
            posY: typeof (Storage) !== "undefined" && JSON.parse(localStorage.getItem('theDistToEscapee')) !== null && JSON.parse(localStorage.getItem('theDistToEscapee')) > 0 ?
                canvas.height + JSON.parse(localStorage.getItem('theDistToEscapee')) : canvas.height + squareSize,
            gameOver: false,
            restart() {
                console.log(this.distToEscapee)
                if (this.gameOver) {
                    this.distToEscapee = 0;
                    this.gameOver = false;
                }
                if (this.distToEscapee === 0)
                    this.posY = canvas.height + squareSize;
                else this.posY = canvas.height + this.distToEscapee;
            },
            update() {
                if (this.posY >= 0) this.posY -= 0.45;
                if (this.posY < escapee.posY + smallerSquareSize) this.gameOver = true;
            },
            draw() {
                context.fillStyle = 'red';
                context.fillRect(this.posX, this.posY, squareSize, squareSize);
            }
        }

        let requestID;

        const render = () => {

            //Restart stuff
            if (restartRef.current.className === 'restart1Word') {

                lockKey.currentWordSetIndex = 0;
                lockKey.setLocksAndKeys();
                catcher.gameOver = true;
                escapee.restart();
                escapee.score = 0;
                catcher.restart();
                gate.restart();
                setPause(false);
                setRestart(false);
            }

            context.clearRect(0, 0, canvas.width, canvas.height);
            gate.draw();

            escapee.draw();
            catcher.draw();

            if (pauseRef.current.textContent === "||") {
                //update Stuff
                gate.open();
                if (!catcher.gameOver) {
                    escapee.update();
                    catcher.update();
                }
                lockKey.draw();
            }


            //Draw stuff
            context.fillStyle = 'black';
            context.fillRect(0, 0, wallWidth, canvas.height);
            context.fillRect(canvas.width, 0, -wallWidth, canvas.height);
            context.fillRect(0, canvas.height, canvas.width, -smallerSquareHeight);

            escapee.drawScore();
            if (catcher.gameOver){
                context.fillStyle = 'red';
                context.font = `bold ${textSize2}px Arial`;
                context.fillText('Game Over!', canvas.width / 2, canvas.height / 2);
            } 


            requestID = requestAnimationFrame(render);
        };
        render();

        return () => {
            cancelAnimationFrame(requestID);
        }


    }, []);

    return (
        <div className="aroundCanvasWord" id='home'>
            <canvas ref={canvasRef} className='portraitWord' />
            <div className="samePosWord">
                <div className='infoWord'>i
                    <span className='tooltip-textWord'>
                        *Swipe up to move forward.<br />
                        *Swipe right to move right or stop moving left.<br />
                        *Swipe left to move left or stop moving right.<br />
                        *Swipe Down to slow down or stop moving forward.<br />
                        *Tap the game screen to stop moving.<br />
                        *Tap 'O' to restart game.<br />
                        *Tap '||' to pause game.<br />
                        *Tap '►' to resume game.<br />
                        *Tap 'X' to exit game.<br />
                        *Tap this instruction screen to return to game<br />
                    </span>
                    <span className='tooltip-text-desktopWord'>
                        *Press the 'Up Arrow' key to move forward.<br />
                        *Press the 'Left Arrow' key to move left or stop moving right and the 'right Arrow' key to move right or stop moving left.<br />
                        *Press the 'Down Arrow' key to slow down or stop moving forward.<br />
                        *Press the 'Enter' key to stop moving.<br />
                        *Click 'O' to restart game.<br />
                        *Click '||' to pause game.<br />
                        *Click '►' to resume game.<br />
                        *Click 'X' to exit game.<br />
                        *Click the game screen to use the keys on your keyboard.<br />
                    </span>
                </div>
                <div ref={restartRef} onClick={() => setRestart(true)} className={restart ? 'restart1Word' : 'restart2Word'}>
                    O
                </div>
                <p ref={pauseRef} onClick={() => setPause(!pause)} className="pauseWord">
                    {!pause ? "||" : "►"}
                </p>
                <Link to="/isiapps#home">
                    <div className='exitWord'>X</div>
                </Link>
            </div>

        </div>
    )
}

export default WhatsTheWord