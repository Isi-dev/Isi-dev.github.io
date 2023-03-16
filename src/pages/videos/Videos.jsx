import React, { useRef, useEffect, useState } from 'react'
import './tetrisScreen.css';
import { HashLink as Link } from 'react-router-hash-link';

const Videos = () => {
  const [pause, setPause] = useState(false);
  const [restart, setRestart] = useState("");
  const restartRef = useRef("null");
  const pauseRef = useRef("null");
  const canvasRef = useRef("null");

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.textAlign = "center";


  }, []);

  return (
    <>
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
        <canvas ref={canvasRef} width="400" height="800" tabIndex={-1} className={window.innerHeight > window.innerWidth ? 'portraitWindow' : 'landscapeWindow'} />
      </div>
    </>
  )
}

export default Videos