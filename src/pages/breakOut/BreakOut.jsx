import React, { useRef, useEffect } from 'react'
import './screen.css';
import Ball from './components/Ball'
import Paddle from './components/Paddle';
import BreakablePaddleManager from './components/BreakablePaddleManager';
import { HashLink as Link } from 'react-router-hash-link';



const BreakOut = () => {
    const canvasRef = useRef("null");
    let restartG = false;
    let pauseG = false;

    const restart = () => {
        console.log("restart!")
        return restartG = true;
    }

    let handlePause = function () {
        if (pauseG) {
            pauseG = false;
        } else {
            pauseG = true;
        }
    }


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
        Game.bonusScoreMax = 500;
        Game.bonusScore = Game.bonusScoreMax;
        Game.life = 15;
        Game.victory = false;
        paddle.setPosition(canvas, canvas.width, canvas.height);
        breakablePaddleManager.setPosition();

        let requestID;

        const render = () => {

            if (restartG) {
                if (pauseG)
                    pauseG = false;
                Game.score = 0;
                Game.bonusScore = Game.bonusScoreMax;
                Game.life = 15;
                Game.victory = false;
                ball.restart();
                paddle.restart();
                breakablePaddleManager.restart();
                restartG = false;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (Game.life > 0) {
                ball.draw(ctx);
                paddle.draw(ctx);
                breakablePaddleManager.draw(ctx);
                if (!pauseG) {
                    ball.update(canvas.width, canvas.height, Game);
                    paddle.update(canvas.width, canvas.height, ball, Game);
                    breakablePaddleManager.update(ball, paddle, Game);
                }
                ctx.font = "20px verdana";
                ctx.fillStyle = "white";
                ctx.fillText(Game.score, 400, 25);

                if (Game.victory) {
                    ctx.font = "50px verdana";
                    ctx.fillStyle = "white";
                    ctx.fillText("CONGRATS!", canvas.width / 2, canvas.height / 2);
                }

            } else {
                ctx.font = "40px verdana";
                ctx.fillStyle = "white";
                ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
                ctx.fillText("Score: " + Game.score, canvas.width / 2, canvas.height / 2 + 50);
            }

            ctx.font = "20px verdana";
            ctx.fillStyle = "red";
            let gap = 0;
            for (let i = 0; i < Game.life; i++) {
                ctx.fillText("♥", 25 + gap, 25);
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
                <div onClick={restart} className="restart">
                    Restart
                </div>
                <div onClick={handlePause} className="pause">
                    ||
                </div>
                <Link to="/isiapps#home">
                    <div className='exit'>X</div>
                </Link>
            </div>
            <canvas id="canvas" ref={canvasRef} className={window.innerHeight > window.innerWidth ? 'portraitWindow' : 'landscapeWindow'} />
        </div>

    )
}

export default BreakOut