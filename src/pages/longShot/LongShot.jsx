import React, { useRef, useEffect, useState } from 'react'
import './lsScreen.css';
import Ball from './components/Ball'
import Paddle from './components/Paddle';
import OppPaddleManager from './components/OppPaddleManager';
import { HashLink as Link } from 'react-router-hash-link';



const LongShot = () => {
    const [pause, setPause] = useState(false);
    const [restart, setRestart] = useState("");
    const [currentScreen, setCurrentScreen] = useState("selectLevel");
    const [replayLevel, setReplayLevel] = useState("");
    const [nextLevel, setNextLevel] = useState("");
    const [gameLevel, setGameLevel] = useState("");
    const [canPlayLevel, setCanPlayLevel] = useState(0);
    const restartRef = useRef("null");
    const pauseRef = useRef("null");
    const canvasRef = useRef("null");
    const divOfLevels = [];
    const levelRef0 = useRef("null");
    const levelRef1 = useRef("null");
    const levelRef2 = useRef("null");
    const levelRef3 = useRef("null");
    const levelRef4 = useRef("null");
    const levelRef5 = useRef("null");
    const levelRef6 = useRef("null");
    const levelRef7 = useRef("null");
    const levelRef8 = useRef("null");
    const levelRef9 = useRef("null");
    const replayRef = useRef("null");
    const nextRef = useRef("null");

    function addDivToDivOfLevels(levelRef, lev) {
        if (lev <= canPlayLevel) {
            divOfLevels.push(
                <div key={lev} ref={levelRef} onClick={() => setGameLevel('level ' + (lev + 1))} className='levelSelectL'
                    style={{
                        top: `calc(8.5% * ${(lev + 1)})`,
                    }}>
                    {gameLevel === 'level ' + (lev + 1) ? "selected" : 'level ' + (lev + 1)}
                </div>
            )
        }
        // console.log(divOfLevels.length);
    }

    addDivToDivOfLevels(levelRef0, 0);
    addDivToDivOfLevels(levelRef1, 1);
    addDivToDivOfLevels(levelRef2, 2);
    addDivToDivOfLevels(levelRef3, 3);
    addDivToDivOfLevels(levelRef4, 4);
    addDivToDivOfLevels(levelRef5, 5);
    addDivToDivOfLevels(levelRef6, 6);
    addDivToDivOfLevels(levelRef7, 7);
    addDivToDivOfLevels(levelRef8, 8);
    addDivToDivOfLevels(levelRef9, 9);






    useEffect(() => {
        const canvas = canvasRef.current;
        if (window.innerHeight > window.innerWidth) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        } else {
            canvas.width = 480;
            canvas.height = 800;
        }
        const ctx = canvas.getContext("2d");
        ctx.textAlign = "center";

        var level = [];
        for (var i = 0; i < 10; i++) {
            level[i] = false;
        };


        let replayLevel = false;
        let nextLevel = false;




        var Game = {};
        var ball = new Ball(canvas.width, canvas.height);
        var paddle = new Paddle(canvas.width, canvas.height);
        var breakablePaddleManager = new OppPaddleManager(canvas.width, canvas.height);


        Game.playScreen = false;
        let showHighScore = false;
        let newHighScore = false;
        let highScores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let transformedHighScore = [];

        Game.screen = 1;
        Game.score = 0;
        let noStorageSupport = false;
        if (typeof (Storage) !== "undefined") {
            showHighScore = true;
            highScores = JSON.parse(localStorage.getItem('longShotHighScore')) || highScores;
            let completed = 0;
            for (let r = 0; r < 10; r++) {
                if (highScores[r] > 0) completed++;
            }
            setCanPlayLevel(completed);
        } else {
            noStorageSupport = true;
        }


        //For viewing purpose only
        Game.transformHighScores = function () {
            for (let r = 0; r < 10; r++) {
                if (highScores[r] === 10) transformedHighScore[r] = '10 : 0';
                if (highScores[r] === 9) transformedHighScore[r] = '10 : 1';
                if (highScores[r] === 8) transformedHighScore[r] = '10 : 2';
                if (highScores[r] === 7) transformedHighScore[r] = '10 : 3';
                if (highScores[r] === 6) transformedHighScore[r] = '10 : 4';
                if (highScores[r] === 5) transformedHighScore[r] = '10 : 5';
                if (highScores[r] === 4) transformedHighScore[r] = '10 : 6';
                if (highScores[r] === 3) transformedHighScore[r] = '10 : 7';
                if (highScores[r] === 2) transformedHighScore[r] = '10 : 8';
                if (highScores[r] === 1) transformedHighScore[r] = '10 : 9';
            }
        }

        Game.handleHighScore = function () {
            if (showHighScore) {
                for (var i = 0; i < 10; i++) {
                    if (level[i]) {
                        if (Game.score > highScores[i]) {
                            newHighScore = true;
                            highScores[i] = Game.score;
                            localStorage.setItem('longShotHighScore', JSON.stringify(highScores));
                        }
                    };
                };

                Game.transformHighScores();

                if (newHighScore && !level[9]) {
                    ctx.fillText("NEW BEST SCORE!", canvas.width / 2, canvas.height / 2);
                } else {
                    for (var j = 0; j < 10; j++) {
                        if (level[j]) {
                            if (!level[9])
                                ctx.fillText("Best Score: " + transformedHighScore[j], canvas.width / 2, canvas.height / 2);
                        };
                    };
                }
                let completed = 0;
                for (let r = 0; r < 10; r++) {
                    if (highScores[r] > 0) completed++;
                }
                setCanPlayLevel(completed);
            }
        }

        function checkWin() {
            if (!level[9])
                if (ball.playerScore === 10) setCurrentScreen("nextLevel");
            if (ball.opponentScore === 10) setCurrentScreen("replayLevel");
        }

        function selectLevelFn(lev, select) {
            if (lev.current != null) {
                if (lev.current.textContent === "selected") {
                    level[select] = true;
                    Game.screen = 1;
                    breakablePaddleManager.level[select] = true;
                    setCurrentScreen("");
                    Game.playScreen = true;
                    setGameLevel("");
                }
            }
        }

        function changeLevel(l) {
            level[l] = false;
            breakablePaddleManager.level[l] = false;
            level[l + 1] = true;
            breakablePaddleManager.level[l + 1] = true;

        }

        //Keyboard inputs
        canvas.focus();
        canvas.addEventListener('keydown', event => {
            event.preventDefault();
            switch (event.key) {
                case "Enter":
                    paddle.vx = 0;
                    paddle.vy = 0;
                    break;
                case "ArrowLeft":
                    if (paddle.vx >= 0) paddle.vx = -2;
                    else
                        paddle.vx -= 2;
                    break;
                case "ArrowRight":
                    if (paddle.vx <= 0) paddle.vx = 2;
                    else paddle.vx += 2;
                    break;
                case "ArrowUp":
                    if (paddle.vy >= 0) paddle.vy = -2;
                    else paddle.vy -= 2;
                    break;
                case "ArrowDown":
                    if (paddle.vy <= 0) paddle.vy = 2;
                    else paddle.vy += 2;
                    break;
                // case "Backspace":
                //     navigate('/isiapps#home');
                //     break;
                default:
                    return;
            }
        }, false);
        paddle.setPosition(canvas);
        breakablePaddleManager.setPosition();


        let requestID;

        const render = () => {

            if (restartRef.current.className === 'restart1L') {
                setPause(false);
                Game.score = 0;
                newHighScore = false;
                Game.bonusScore = Game.bonusScoreMax;
                Game.playScreen = false;
                if (Game.playScreen)
                    Game.screen = 1;
                setCurrentScreen("selectLevel");
                setReplayLevel("");
                setNextLevel("");
                ball.restartNewLevel();
                paddle.restart();
                breakablePaddleManager.restart();
                for (var i = 0; i < 10; i++) {
                    if (level[i]) level[i] = false;
                    if (breakablePaddleManager.level[i]) breakablePaddleManager.level[i] = false;
                };
                if (replayLevel) replayLevel = false;
                if (nextLevel) nextLevel = false;
                setRestart(false);
            }

            if (nextRef.current != null) {
                if (nextRef.current.textContent === "selected") {

                    newHighScore = false;

                    if (nextLevel) {
                        // if (!gameAudio.paused || gameAudio.currentTime) {
                        //     gameAudio.pause();
                        //     gameAudio.currentTime = 0;
                        // }
                        ball.restartNewLevel();
                        paddle.restart();
                        breakablePaddleManager.restart();
                        let activeIndex = -1;
                        for (let i = 0; i < level.length; i++) {
                            if (level[i]) {
                                activeIndex = i;
                                break;
                            }
                        }

                        if (activeIndex !== -1 && activeIndex < level.length - 1) {
                            changeLevel(activeIndex);
                        }
                        Game.screen = 1;
                        nextLevel = false;
                    }

                    setNextLevel("");

                    setCurrentScreen("");
                }
            }

            if (replayRef.current != null) {
                if (replayRef.current.textContent === "selected") {

                    newHighScore = false;

                    if (replayLevel) {
                        // if (!gameAudio.paused || gameAudio.currentTime) {
                        //     gameAudio.pause();
                        //     gameAudio.currentTime = 0;
                        // }
                        ball.restartNewLevel();
                        paddle.restart();
                        breakablePaddleManager.replay();
                        Game.screen = 1;
                        replayLevel = false;
                    }

                    setReplayLevel("");

                    setCurrentScreen("");
                }
            }



            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (Game.playScreen) {
                if (Game.screen === 1) {
                    breakablePaddleManager.draw(ctx);
                    ball.draw(ctx);
                    paddle.draw(ctx);


                    if (pauseRef.current.textContent === "||") {
                        ball.update(Game);
                        paddle.update(ball, Game);
                        breakablePaddleManager.update(ball, paddle, Game);
                        if (ball.playerScore === 10 || ball.opponentScore === 10) {
                            Game.screen = 0;
                            checkWin();
                        }
                    }

                    breakablePaddleManager.drawScore(ctx, ball);


                    if (noStorageSupport) {
                        ctx.font = "15px verdana";
                        ctx.fillStyle = "white";
                        ctx.fillText("This browser lacks data storage support!", canvas.width / 2, canvas.height/80);
                        ctx.fillText("Some game features will not work properly.", canvas.width / 2, canvas.height/32);
                    }


                } else {
                    ctx.font = "35px verdana";
                    ctx.fillStyle = "white";
                    if (ball.playerScore === 10) {
                        Game.score = ball.playerScore - ball.opponentScore;
                        Game.handleHighScore();
                        if (!level[9]) {
                            ctx.fillText("Congrats!", canvas.width / 2, canvas.height / 2 - canvas.height/6.7);
                            let transScore = 0;
                            if (Game.score === 10) transScore = '10 : 0';
                            if (Game.score === 9) transScore = '10 : 1';
                            if (Game.score === 8) transScore = '10 : 2';
                            if (Game.score === 7) transScore = '10 : 3';
                            if (Game.score === 6) transScore = '10 : 4';
                            if (Game.score === 5) transScore = '10 : 5';
                            if (Game.score === 4) transScore = '10 : 6';
                            if (Game.score === 3) transScore = '10 : 7';
                            if (Game.score === 2) transScore = '10 : 8';
                            if (Game.score === 1) transScore = '10 : 9';
                            for (let r = 0; r < 9; r++) {
                                if (level[r]) ctx.fillText("Score: " + (transScore), canvas.width / 2, canvas.height / 2 - canvas.height/13.3);
                            }
                            if (!nextLevel) nextLevel = true;
                        }
                        if (level[9]) {
                            if (showHighScore) {
                                highScores = JSON.parse(localStorage.getItem('longShotHighScore')) || highScores;
                                Game.transformHighScores();
                            }
                            ctx.font = "15px verdana";
                            ctx.fillStyle = "lightgray";
                            ctx.fillText("Wow! You defeated all 10 opponents.", canvas.width / 2, canvas.height/6.7);
                            ctx.font = "50px verdana";
                            ctx.fillStyle = "cyan";
                            ctx.fillText("CONGRATS!", canvas.width / 2, canvas.height/4);
                            ctx.fillStyle = "white";
                            ctx.font = "18px verdana";
                            ctx.fillText("You are a Grand Master of LongShot!", canvas.width / 2, canvas.height/3.1);
                            ctx.fillStyle = "pink";
                            ctx.font = "35px verdana";
                            ctx.fillText("Best Scores", canvas.width / 2, canvas.height/2.5);
                            ctx.fillStyle = "yellow";
                            ctx.font = "30px verdana";
                            for (let i = 0; i < level.length; i++) {
                                if (i < 9) {
                                    ctx.fillText("Level 0" + (i + 1) + " - " + transformedHighScore[i], canvas.width / 2, canvas.height/2.2 + i * canvas.height/20);
                                }
                                else {
                                    ctx.fillText("Level " + (i + 1) + " - " + transformedHighScore[i], canvas.width / 2, canvas.height/2.2 + i * canvas.height/20);
                                }
                            }
                        }
                    }
                    else {
                        ctx.fillText("Try Again", canvas.width / 2, canvas.height / 2);
                        if (!replayLevel) replayLevel = true;
                    }
                    // Game.handleHighScore();
                }
            } else {
                //Since eval function is not good and the window function isn't working for my local variable, I will not use a loop here              
                selectLevelFn(levelRef0, 0);
                selectLevelFn(levelRef1, 1);
                selectLevelFn(levelRef2, 2);
                selectLevelFn(levelRef3, 3);
                selectLevelFn(levelRef4, 4);
                selectLevelFn(levelRef5, 5);
                selectLevelFn(levelRef6, 6);
                selectLevelFn(levelRef7, 7);
                selectLevelFn(levelRef8, 8);
                selectLevelFn(levelRef9, 9);
            }


            requestID = requestAnimationFrame(render);
        };
        render();

        return () => {
            cancelAnimationFrame(requestID);
        }

    }, []);


    return (

        <div className="aroundCanvasL" id='home'>
            <div className="samePosL">
                <div className='infoL'>i
                    <span className='tooltip-textL'>
                        *Swipe up to move paddle up.<br />
                        *Swipe right to move paddle right.<br />
                        *Swipe left to move paddle left.<br />
                        *Swipe Down to move paddle down.<br />
                        *Tap the game screen to stop a moving paddle.<br />
                        *Tap 'O' to restart game.<br />
                        *Tap '||' to pause game.<br />
                        *Tap '►' to resume game.<br />
                        *Tap 'X' to exit game.<br />
                        *Tap this instruction screen to return to game<br />
                    </span>
                    <span className='tooltip-text-desktopL'>
                        *Press the 'Up Arrow' key to move paddle up.<br />
                        *Press the 'Left Arrow' key to move paddle left and the 'Right Arrow' key to move paddle right.<br />
                        *Press the 'Down Arrow' key to move paddle down.<br />
                        *Press the 'Enter' key to stop a moving paddle.<br />
                        *Click 'O' to restart game.<br />
                        *Click '||' to pause game.<br />
                        *Click '►' to resume game.<br />
                        *Click 'X' to exit game.<br />
                        *Click the game screen to use the keys on your keyboard.<br />
                    </span>
                </div>
                <div ref={restartRef} onClick={() => setRestart(true)} className={restart ? 'restart1L' : 'restart2L'}>
                    O
                </div>
                <p ref={pauseRef} onClick={() => setPause(!pause)} className="pauseL">
                    {!pause ? "||" : "►"}
                </p>
                <Link to="/isiapps#home">
                    <div className='exitL'>X</div>
                </Link>
            </div>
            <canvas id="canvas" ref={canvasRef} tabIndex={-1} className={window.innerHeight > window.innerWidth ? 'portraitWindowL' : 'landscapeWindowL'} />
            {currentScreen === 'selectLevel' && <div >
                {divOfLevels}
            </div>
            }
            {
                currentScreen === 'nextLevel' && <div ref={nextRef} onClick={() => setNextLevel('Next Level')} className='nextL'>{nextLevel === 'Next Level' ? "selected" : "Next Level"}</div>
            }
            {
                currentScreen === 'replayLevel' && <div ref={replayRef} onClick={() => setReplayLevel('Replay Level')} className='nextL'>{replayLevel === 'Replay Level' ? "selected" : "Replay Level"}</div>
            }
        </div>

    )
}

export default LongShot