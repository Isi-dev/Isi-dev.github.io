import React, { useRef, useEffect } from 'react'
import './screen.css';
import Ball from './components/Ball'
import Paddle from './components/Paddle';
import BreakablePaddleManager from './components/BreakablePaddleManager';





const BreakOut = () => {
    const canvasRef = useRef("null");
    var ball = new Ball();
    var paddle = new Paddle();
    var breakablePaddleManager = new BreakablePaddleManager();
    
    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = 480;
        canvas.height = 800;
        const ctx = canvas.getContext("2d");


        paddle.setPosition(canvas, canvas.width, canvas.height);
        breakablePaddleManager.setPosition();

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ball.draw(ctx);
            paddle.draw(ctx);
            ball.update(canvas.width, canvas.height);
            paddle.update(canvas.width, canvas.height, ball);
            breakablePaddleManager.update(ctx, ball, paddle);


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