import React, { useRef, useEffect } from 'react'
import './screen.css';
import Ball from './components/Ball'
import Paddle from './components/Paddle';
import BreakablePaddleManager from './components/BreakablePaddleManager';





const BreakOut = () => {
    var Game = {};
    const canvasRef = useRef("null");
    var ball = new Ball();
    var paddle = new Paddle();
    var breakablePaddleManager = new BreakablePaddleManager();

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = 480;
        canvas.height = 800;
        const ctx = canvas.getContext("2d");
        ctx.textAlign="center";

        Game.score = 0;
        Game.life = 15;
        paddle.setPosition(canvas, canvas.width, canvas.height);
        breakablePaddleManager.setPosition();

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (Game.life > 0) {
                ball.draw(ctx);
                paddle.draw(ctx);
                ball.update(canvas.width, canvas.height, Game);
                paddle.update(canvas.width, canvas.height, ball, Game);
                breakablePaddleManager.update(ctx, ball, paddle, Game);

            }else{
                ctx.font = "40px verdana";
                ctx.fillStyle = "white";
                ctx.fillText("Game Over",canvas.width/2,canvas.height/2);
            }

            ctx.font = "25px verdana";
            ctx.fillStyle = "red";
            let gap = 0;
            for(let i=0;i<Game.life;i++){
                ctx.fillText("♥", 25+gap, 25);
                gap+=25;
            }


            ctx.font = "25px verdana";
            ctx.fillStyle = "white";
            ctx.fillText(Game.score, 400, 25);
            requestAnimationFrame(render);
        };
        render();
    }, []);


    return (
        <div className="aroundCanvas">
            <canvas id="canvas" ref={canvasRef} className={window.innerHeight > window.innerWidth ? 'portraitWindow' : 'landscapeWindow'} />
        </div>
    )
}

export default BreakOut