import React, { useRef, useEffect, useState } from 'react'
import Player from './components/Player';
import './electric.css';
import { HashLink as Link } from 'react-router-hash-link';
import History from './components/History';
import Generation from './components/Generation';
import Transmission from './components/Transmission';
import Distribution from './components/Distribution';
import General from './components/General';

const Electric = () => {

    const [pause, setPause] = useState(false);
    const [restart, setRestart] = useState("");
    const restartRef = useRef("null");
    const pauseRef = useRef("null");
    const canvasRef = useRef("null");

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
        var Game = {};
        var player = new Player(canvas);
        player.setPosition(canvas, Game);
        var history = new History(canvas);
        history.setQuestionsAndOptions();
        history.setRandomOptionPosition();
        var generation = new Generation(canvas);
        generation.setQuestionsAndOptions();
        generation.setRandomOptionPosition();
        var transmission = new Transmission(canvas);
        transmission.setQuestionsAndOptions();
        transmission.setRandomOptionPosition();
        var distribution = new Distribution(canvas);
        distribution.setQuestionsAndOptions();
        distribution.setRandomOptionPosition();
        var general = new General(canvas);
        general.setQuestionsAndOptions();
        general.setRandomOptionPosition();


        Game.score = 0;
        let showHighScore = false;
        let newHighScore = false;
        let highScores = [0, 0, 0, 0, 0];
        Game.playScreen = false;
        Game.historyGame = false;
        Game.generationGame = false;
        Game.transmissionGame = false;
        Game.distributionGame = false;
        Game.generalGame = false;
        Game.life = 10;
        Game.victory = false;
        if (typeof (Storage) !== "undefined") {
            showHighScore = true;
            highScores = JSON.parse(localStorage.getItem('electricityHighScore')) || highScores;
        }
        Game.handleHighScore = function () {
            if (showHighScore) {
                if (Game.historyGame) {
                    if (Game.score > highScores[0]) {
                        newHighScore = true;
                        highScores[0] = Game.score;
                        localStorage.setItem('electricityHighScore', JSON.stringify(highScores));
                    }
                } else if (Game.generationGame) {
                    if (Game.score > highScores[1]) {
                        newHighScore = true;
                        highScores[1] = Game.score;
                        localStorage.setItem('electricityHighScore', JSON.stringify(highScores));
                    }
                } else if (Game.transmissionGame) {
                    if (Game.score > highScores[2]) {
                        newHighScore = true;
                        highScores[2] = Game.score;
                        localStorage.setItem('electricityHighScore', JSON.stringify(highScores));
                    }
                } else if (Game.distributionGame) {
                    if (Game.score > highScores[3]) {
                        newHighScore = true;
                        highScores[3] = Game.score;
                        localStorage.setItem('electricityHighScore', JSON.stringify(highScores));
                    }
                } else if (Game.generalGame) {
                    if (Game.score > highScores[4]) {
                        newHighScore = true;
                        highScores[4] = Game.score;
                        localStorage.setItem('electricityHighScore', JSON.stringify(highScores));
                    }
                }
                if (newHighScore) {
                    ctx.fillText("NEW HIGH SCORE!", canvas.width / 2, canvas.height / 2 + 60);
                } else {
                    if (Game.historyGame) ctx.fillText("Highest Score: " + highScores[0], canvas.width / 2, canvas.height / 2 + 60);
                    else if (Game.generationGame) ctx.fillText("Highest Score: " + highScores[1], canvas.width / 2, canvas.height / 2 + 60);
                    else if (Game.transmissionGame) ctx.fillText("Highest Score: " + highScores[2], canvas.width / 2, canvas.height / 2 + 60);
                    else if (Game.distributionGame) ctx.fillText("Highest Score: " + highScores[3], canvas.width / 2, canvas.height / 2 + 60);
                    else if (Game.generalGame) ctx.fillText("Highest Score: " + highScores[4], canvas.width / 2, canvas.height / 2 + 60);
                }
            }
        }

        //Keyboard inputs
        canvas.focus();
        canvas.addEventListener('keydown', event => {
            event.preventDefault();
            switch (event.key) {
                case "Enter":
                    player.velX = 0;
                    player.velY = 0;
                    break;
                case "ArrowLeft":
                    if (player.velX > -1) player.velX--;
                    break;
                case "ArrowRight":
                    if (player.velX < 1) player.velX++;
                    break;
                case "ArrowUp":
                    if (player.velY < 3) player.velY++;
                    break;
                case "ArrowDown":
                    if (player.velY > 0) player.velY--;
                    break;

                default:
                    return;
            }
        }, false);

        let requestID;

        const render = () => {

            if (restartRef.current.className === 'restart1Elect') {
                setPause(false);
                Game.score = 0;
                newHighScore = false;
                Game.life = 10;
                Game.victory = false; 
                if (Game.historyGame) history.restart();
                if (Game.generationGame) generation.restart();
                if (Game.transmissionGame) transmission.restart();
                if (Game.distributionGame) distribution.restart();
                if (Game.generalGame) general.restart();
                if (Game.playScreen) Game.playScreen = false;
                Game.historyGame = false;
                Game.generationGame = false;
                Game.transmissionGame = false;
                Game.distributionGame = false;
                Game.generalGame = false;
                player.restart();
                setRestart(false);
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (Game.playScreen) {
                if (Game.life > 0) {
                    //Draw stuff
                    if (Game.historyGame) history.draw(canvas, ctx);
                    else if (Game.generationGame) generation.draw(canvas, ctx);
                    else if (Game.transmissionGame) transmission.draw(canvas, ctx);
                    else if (Game.distributionGame) distribution.draw(canvas, ctx);
                    else if (Game.generalGame) general.draw(canvas, ctx);
                    player.draw(ctx);

                    if (pauseRef.current.textContent === "||") {
                        //update Stuff
                        if (Game.historyGame) history.update(player, Game);
                        else if (Game.generationGame) generation.update(player, Game);
                        else if (Game.transmissionGame) transmission.update(player, Game);
                        else if (Game.distributionGame) distribution.update(player, Game);
                        else if (Game.generalGame) general.update(player, Game);
                        player.update(canvas);
                    }
                    ctx.font = "20px verdana";
                    ctx.fillStyle = "red";
                    ctx.fillText(Game.score, canvas.width - 30, 25);

                    if (Game.victory) {
                        ctx.font = "30px verdana";
                        ctx.fillStyle = "white";
                        ctx.fillText("CONGRATS!", canvas.width / 2, canvas.height / 2);
                        Game.handleHighScore();
                    }

                } else {
                    ctx.font = "30px verdana";
                    ctx.fillStyle = "white";
                    ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2 - 60);
                    ctx.fillText("Score: " + Game.score, canvas.width / 2, canvas.height / 2);
                    Game.handleHighScore();
                }

                ctx.font = "15px verdana";
                ctx.fillStyle = "red";
                let gap = 0;
                for (let i = 0; i < Game.life; i++) {
                    ctx.fillText("♥", 15 + gap, 25);
                    gap += 25;
                }
            } else {
                ctx.fillStyle = "black";
                ctx.beginPath();
                ctx.ellipse(canvas.width / 2, canvas.height / 6 - canvas.height / 70, canvas.width / 3, canvas.height / 24, 0, 0, 2 * Math.PI);
                ctx.ellipse(canvas.width / 2, 2 * canvas.height / 6 - canvas.height / 70, canvas.width / 3, canvas.height / 24, 0, 0, 2 * Math.PI);
                ctx.ellipse(canvas.width / 2, 3 * canvas.height / 6 - canvas.height / 70, canvas.width / 3, canvas.height / 24, 0, 0, 2 * Math.PI);
                ctx.ellipse(canvas.width / 2, 4 * canvas.height / 6 - canvas.height / 70, canvas.width / 3, canvas.height / 24, 0, 0, 2 * Math.PI);
                ctx.ellipse(canvas.width / 2, 5 * canvas.height / 6 - canvas.height / 70, canvas.width / 3, canvas.height / 24, 0, 0, 2 * Math.PI);
                ctx.fill();

                ctx.font = "25px verdana";
                ctx.fillStyle = "white";
                ctx.fillText("History", canvas.width / 2, canvas.height / 6);
                ctx.fillText("Generation", canvas.width / 2, 2 * canvas.height / 6);
                ctx.fillText("Transmission", canvas.width / 2, 3 * canvas.height / 6);
                ctx.fillText("Distribution", canvas.width / 2, 4 * canvas.height / 6);
                ctx.fillText("General", canvas.width / 2, 5 * canvas.height / 6);
            }


            requestID = requestAnimationFrame(render);
        };
        render();

        return () => {
            cancelAnimationFrame(requestID);
        }

    }, []);


    return (
        <div className="aroundCanvasElect" id='home'>
            <div className="samePosElect">
                <div className='infoElect'>i
                    <span className='tooltip-textElect'>
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
                    <span className='tooltip-text-desktopElect'>
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
                <div ref={restartRef} onClick={() => setRestart(true)} className={restart ? 'restart1Elect' : 'restart2Elect'}>
                    O
                </div>
                <p ref={pauseRef} onClick={() => setPause(!pause)} className="pauseElect">
                    {!pause ? "||" : "►"}
                </p>
                <Link to="/isiapps#home">
                    <div className='exitElect'>X</div>
                </Link>
            </div>
            <canvas ref={canvasRef} tabIndex={-1} className={window.innerHeight > window.innerWidth ? 'portraitElect' : 'landscapeElect'} />
        </div>
    )
}

export default Electric