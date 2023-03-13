import React, { useRef, useEffect, useState } from 'react'
import './screen.css';
import Ball from './components/Ball'
import Paddle from './components/Paddle';
import BreakablePaddleManager from './components/BreakablePaddleManager';
import { HashLink as Link } from 'react-router-hash-link';



const BreakOut = () => {
    const [pause, setPause] = useState(false);
    const [restart, setRestart] = useState("");
    const restartRef = useRef("null");
    const pauseRef = useRef("null");
    const canvasRef = useRef("null");

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = 480;
        canvas.height = 800;
        const ctx = canvas.getContext("2d");
        ctx.textAlign = "center";
        var Game = {};
        var ball = new Ball();
        var paddle = new Paddle();
        var breakablePaddleManager = new BreakablePaddleManager();

        Game.score = 0;
        let showHighScore =false;
        let newHighScore = false;
        let highScore =0;
        Game.bonusScoreMax = 500;
        Game.bonusScore = Game.bonusScoreMax;
        Game.life = 10;
        Game.victory = false;
        if (typeof(Storage) !== "undefined") {
            showHighScore = true;
            highScore = JSON.parse(localStorage.getItem('highScore')) || highScore;
        }
        Game.handleHighScore = function(){
            if(showHighScore){
                if(Game.score > highScore){
                    newHighScore = true;
                    highScore = Game.score;
                    localStorage.setItem('highScore', JSON.stringify(highScore));
                }
                if(newHighScore){
                    ctx.fillText("NEW HIGH SCORE!",canvas.width / 2, canvas.height / 2 + 60);
                }else{
                    ctx.fillText("Highest Score: "+highScore, canvas.width / 2, canvas.height / 2 + 60);
                }
            }
        }
        paddle.setPosition(canvas, canvas.width, canvas.height);
        breakablePaddleManager.setPosition();

        let requestID;

        const render = () => {

            if (restartRef.current.className === 'restart1') {
                setPause(false);
                Game.score = 0;
                newHighScore = false;
                Game.bonusScore = Game.bonusScoreMax;
                Game.life = 10;
                Game.victory = false;
                ball.restart();
                paddle.restart();
                breakablePaddleManager.restart();
                setRestart(false);
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (Game.life > 0) {
                ball.draw(ctx);
                paddle.draw(ctx);
                breakablePaddleManager.draw(ctx);

                if (pauseRef.current.textContent === "||") {
                    ball.update(canvas.width, canvas.height, Game);
                    paddle.update(canvas.width, canvas.height, ball, Game);
                    breakablePaddleManager.update(ball, paddle, Game);
                }
                ctx.font = "20px verdana";
                ctx.fillStyle = "white";
                ctx.fillText(Game.score, 430, 25);

                if (Game.victory) {
                    ctx.font = "50px verdana";
                    ctx.fillStyle = "white";
                    ctx.fillText("CONGRATS!", canvas.width / 2, canvas.height / 2);
                    Game.handleHighScore();
                }

            } else {
                ctx.font = "40px verdana";
                ctx.fillStyle = "white";
                ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2-60);
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



            requestID = requestAnimationFrame(render);
        };
        render();

        return () => cancelAnimationFrame(requestID);


    }, []);


    return (

        <div className="aroundCanvas">
            <div className="samePos">
                <div ref={restartRef} onClick={() => setRestart(true)} className={restart ? 'restart1' : 'restart2'}>
                   O
                </div>
                <p ref={pauseRef} onClick={() => setPause(!pause)} className="pause">
                    {!pause ? "||" : "►"}
                </p>
                <Link to="/isiapps#home">
                    <div className='exit'>X</div>
                </Link>
            </div>
            <canvas id="canvas" ref={canvasRef} className={window.innerHeight > window.innerWidth ? 'portraitWindow' : 'landscapeWindow'} />
        </div>

    )
}

export default BreakOut