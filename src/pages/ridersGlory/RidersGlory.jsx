import React, { useRef, useEffect } from 'react'

const RidersGlory = () => {

    const canvasRef = useRef(null);


    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        const render = () => {
           
            ctx.clearRect(0, 0, canvas.width, canvas.height);
           
            requestAnimationFrame(render);
        };
        render();
    }, []);


    return (
        <>
            <div>
                <canvas ref={canvasRef} width="800" height="480" />
            </div>
        </>
    )
}

export default RidersGlory