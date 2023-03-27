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

    const boardWidth = 10;
    const boardHeight = 20;
    const cellSize = 40;
    const board = new Array(boardHeight).fill().map(() => new Array(boardWidth).fill(0));

    const pieces = [
      // I-piece    white
      [[0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
      // L-piece blue
      [[1, 0, 0], [1, 1, 1]],
      // J-piece red
      [[0, 0, 1], [1, 1, 1]],
      // O-piece white
      [[1, 1], [1, 1]],
      // S-piece blue
      [[0, 1, 1], [1, 1, 0]],
      // T-piece white
      [[1, 1, 1], [0, 1, 0]],
      // Z-piece red
      [[1, 1, 0], [0, 1, 1]]
    ];

    let bag = [];

    const pieceColors = ['white', 'blue', 'red'];

    let currentPiece = getRandomPiece();
    let nextPiece = getRandomPiece();
    let currentX = currentPiece.x;
    let currentY = 0;
    let gameScore = 0;
    let isGameOver = false;
    let lv = 1;
    let numberCleared = 0;
    let merged = false;
    let showHighScore = false;
    let newHighScore = false;
    let highScore = 0;
    if (typeof (Storage) !== "undefined") {
      showHighScore = true;
      highScore = JSON.parse(localStorage.getItem('tetrisHighScore')) || highScore;
    }

    var handleHighScore = function () {
      if (showHighScore) {
        if (gameScore > highScore) {
          newHighScore = true;
          highScore = gameScore;
          localStorage.setItem('tetrisHighScore', JSON.stringify(highScore));
        }
        if (newHighScore) {
          ctx.fillText("NEW HIGH SCORE!", canvas.width / 2, canvas.height / 2 + 60);
        } else {
          ctx.fillText("Highest Score: " + highScore, canvas.width / 2, canvas.height / 2 + 60);
        }
      }
    }

    function getRandomPiece() {
      if (bag.length === 0) {
        bag = pieces.map((x) => x);
      }
      const randomIndex = Math.floor(Math.random() * bag.length);
      let chosenPiece = bag[randomIndex];
      bag.splice(randomIndex, 1);
      let chosenColor = pieceColors[0];
      let posX = 3;
      let posY = -2;
      if (chosenPiece === pieces[1] || chosenPiece === pieces[4])
        chosenColor = pieceColors[1];
      if (chosenPiece === pieces[2] || chosenPiece === pieces[6])
        chosenColor = pieceColors[2];
      if (chosenPiece === pieces[0]) {
        posX = 3;
        posY = -3.5;
      }
      if (chosenPiece === pieces[3]) posX = 4;

      return {
        piece: chosenPiece,
        color: chosenColor,
        x: posX,
        y: posY
      };
    }

    function drawCell(x, y, color) {
      ctx.fillStyle = color;
      ctx.fillRect(x * cellSize, y * cellSize + 100, cellSize, cellSize);
      ctx.strokeRect(x * cellSize, y * cellSize + 100, cellSize, cellSize);
    }

    function drawPiece(piece, x, y, color) {
      piece.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          if (cell !== 0) {
            const cellX = x + colIndex;
            const cellY = y + rowIndex;
            drawCell(cellX, cellY, color);
          }
        });
      });
    }



    function drawBoard() {
      board.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          if (cell !== 0) {
            drawCell(colIndex, rowIndex, pieceColors[cell - 1]);

          }
        });
      });
    }

    function rotatePiece(arr) {
      const rows = arr.length;
      const cols = arr[0].length;

      // Create a new array with swapped rows and cols
      const rotated = [];
      for (let col = 0; col < cols; col++) {
        rotated[col] = [];
        for (let row = 0; row < rows; row++) {
          rotated[col][row] = arr[rows - 1 - row][col];
        }
      }

      return rotated;
    }

    function rotatePieceAntiClockwise(arr) {
      const rows = arr.length;
      const cols = arr[0].length;

      // Create a new array with swapped rows and cols
      const rotated = [];
      for (let col = 0; col < cols; col++) {
        rotated[col] = [];
        for (let row = 0; row < rows; row++) {
          rotated[col][row] = arr[row][cols - 1 - col];
        }
      }

      return rotated;
    }

    function isColliding(piece, x, y) {
      return piece.some((row, rowIndex) => {
        return row.some((cell, colIndex) => {
          const cellX = x + colIndex;
          const cellY = y + rowIndex;
          if (cell !== 0) {
            return (
              cellY >= boardHeight ||
              cellX < 0 ||
              cellX >= boardWidth ||
              board[cellY][cellX] !== 0
            );
          }
          return false;
        });
      });
    }

    function mergePiece(piece, x, y) {
      piece.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          const cellX = x + colIndex;
          const cellY = y + rowIndex;
          if (cell !== 0) {
            board[cellY][cellX] = pieceColors.indexOf(currentPiece.color) + 1;
            merged = true;
          }
        });
      });
    }

    function clearRows() {
      let rowsCleared = 0;
      for (let y = boardHeight - 1; y >= 0; y--) {
        if (board[y].every(cell => cell !== 0)) {
          for (let x = 4; x >= 0; x--) {
            setTimeout(() => { board[y][x] = 0 }, 120 * (4 - x));
          }
          for (let x1 = 5; x1 < boardWidth; x1++) {
            setTimeout(() => { board[y][x1] = 0 }, 120 * (x1 - 5));
          }
          // goDown = true;
          rowsCleared++;
        }

      }
      gameScore += rowsCleared ** 2 * 10 * lv;
      numberCleared += rowsCleared;
      if (numberCleared >= 10) {
        lv++;
        numberCleared = 0;
      }
    }

    function takeRowsDown() {
      for (let y = boardHeight - 1; y >= 0; y--) {
        if (y < 19) {
          const rowsToMove = 19 - y;
          if (board[y].some(cell => cell !== 0)) {
            for (var rowDown = 1; rowDown <= rowsToMove; rowDown++) {
              if (board[y + rowDown].every(cell => cell === 0)) {
                for (let z = 0; z < boardWidth; z++) {
                  board[y + rowDown][z] = board[y + rowDown - 1][z];
                  board[y + rowDown - 1][z] = 0;
                }
              } else break;
            }
          }
        }
      }
    }

    function update() {
      if (!isGameOver) {
        //if (goDown) takeRowsDown();
        takeRowsDown();
        if (isColliding(currentPiece.piece, currentX, currentY + 1)) {
          mergePiece(currentPiece.piece, currentX, currentY);
          clearRows();
          if (merged && currentY === 0) {
            isGameOver = true;
          } else {
            merged = false;
            currentPiece = nextPiece;
            nextPiece = getRandomPiece();
            currentX = currentPiece.x;
            currentY = 0;
          }
        } else {
          currentY++;
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (pauseRef.current.textContent === "||")
        drawBoard();

      drawPiece(currentPiece.piece, currentX, currentY, currentPiece.color);
      ctx.fillStyle = 'white';
      //ctx.fillRect(0, 0, 399, 1);
      ctx.fillRect(0, 100, 400, 2);
      //ctx.fillRect(0, 0, 2, 99);
      //ctx.fillRect(398, 0, 2, 99);
      ctx.font = 'bold 15px sans-serif';
      ctx.fillText('NEXT', 200, 18);
      ctx.font = 'bold 20px sans-serif';
      ctx.fillText('Lv', 25, 40);
      ctx.fillText('SCORE', 300, 40);
      ctx.fillText(lv, 25, 70);
      ctx.font = 'bold 25px sans-serif';
      ctx.fillText(gameScore, 300, 70);
      drawPiece(nextPiece.piece, nextPiece.x, nextPiece.y, nextPiece.color);



      if (isGameOver) {
        ctx.fillStyle = 'white';
        ctx.font = 'bold 40px sans-serif';
        ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
        handleHighScore();
      }
    }

    function gameLoop() {
      if (restartRef.current.className === 'restart1t') {
        setPause(false);
        startTouchX = 0;
        startTouchY = 0;
        bag = [];
        lv = 1;
        currentY = 0;
        numberCleared = 0;
        merged = false;
        // goDown = false;
        newHighScore = false;
        gameScore = 0;
        for (let reSt = 0; reSt < boardHeight; reSt++) {
          for (let rs = 0; rs < boardWidth; rs++)
            board[reSt][rs] = 0;
        }
        currentPiece = getRandomPiece();
        nextPiece = getRandomPiece();
        currentX = currentPiece.x;
        isGameOver = false;
        setRestart(false);
      }
      if (pauseRef.current.textContent === "||")
        update();
      draw();
      //console.log('playing');
    }

    //touch inputs

    let startTouchX = 0;
    let startTouchY = 0;
    let swipeLimit = 50;

    canvas.addEventListener("touchmove", e => {
      e.preventDefault();
    });
    canvas.addEventListener("touchstart", e => {
      e.preventDefault();
      startTouchX = e.changedTouches[0].clientX;
      startTouchY = e.changedTouches[0].clientY;
      canvas.addEventListener("touchend", swipes);

    });
    const swipes = e => {
      var endTouchX = e.changedTouches[0].clientX;
      var endTouchY = e.changedTouches[0].clientY;

      if (Math.abs(startTouchX - endTouchX) >= Math.abs(startTouchY - endTouchY)) {
        //Swipe right
        if (startTouchX < endTouchX - swipeLimit) {
          if (!isColliding(currentPiece.piece, currentX + 1, currentY)) {
            currentX++;
          }
        }

        //Swipe left
        if (startTouchX > endTouchX + swipeLimit) {
          if (!isColliding(currentPiece.piece, currentX - 1, currentY)) {
           currentX--;
          }

        }
      } else {

        //Swipe Down
        if (startTouchY < endTouchY - swipeLimit) {
          while (!isColliding(currentPiece.piece, currentX, currentY + 1)) {
            currentY++;
          }
        }

        //Swipe Up
        if (startTouchY > endTouchY + swipeLimit) {
          if (startTouchX < currentX*cellSize) {
            const rotatedPiece = rotatePiece(currentPiece.piece);
            if (!isColliding(rotatedPiece, currentX, currentY)) {
              currentPiece.piece = rotatedPiece;
            }
          }else{
             const rotatedPiece = rotatePieceAntiClockwise(currentPiece.piece);
             if (!isColliding(rotatedPiece, currentX, currentY)) {
              currentPiece.piece = rotatedPiece;
            }
          }
        }
      }

      //Handle clicks
      if (Math.abs(startTouchX - endTouchX) < swipeLimit && Math.abs(startTouchY - endTouchY) < swipeLimit) {
        //Do nothing
      }
      canvas.removeEventListener("touchend", swipes);
    }

    //Keyboard inputs
    canvas.focus();
    canvas.addEventListener('keydown', event => {
      if (!isGameOver) {
        if (event.key === 'ArrowLeft') {
          if (!isColliding(currentPiece.piece, currentX - 1, currentY)) {
            currentX--;
          }
        } else if (event.key === 'ArrowRight') {
          if (!isColliding(currentPiece.piece, currentX + 1, currentY)) {
            currentX++;
          }
        } else if (event.key === 'ArrowDown') {
          while (!isColliding(currentPiece.piece, currentX, currentY + 1)) {
            currentY++;
          }
        } else if (event.key === 'ArrowUp') {
          const rotatedPiece = rotatePieceAntiClockwise(currentPiece.piece);
          if (!isColliding(rotatedPiece, currentX, currentY)) {
            currentPiece.piece = rotatedPiece;
          }
        }
      }
    });

    let requestID;
    let timeoutId;
    const render = () => {
      gameLoop();

      timeoutId = setTimeout(() => {
        requestID = requestAnimationFrame(render);
      }, (400 - (lv - 1) * 50));

    };
    render();

    return () => {
      cancelAnimationFrame(requestID);
      clearTimeout(timeoutId);
    }

  }, []);

  return (
    <>
      <div className="aroundCanvast" id='topOfGame'>
        <div className='borders'>
          <div className="samePost">
            <div className='info'>i
              <span className='tooltip-text'>
                *Swipe up at left of a piece to rotate the piece clockwise.<br />
                *Swipe up at right of a piece to rotate the piece counter-clockwise.<br />
                *Swipe left to move a piece left and right to move a piece right.<br />
                *Swipe Down to instantly place a piece where you want.<br />
                *Tap O to restart game.<br/>
                *Tap || to pause game.<br/>
                *Tap ► to resume game.<br/>
                *Tap X to exit game.<br/>
              </span>
              <span className='tooltip-text-desktop'>
                *Press the 'Up Arrow' key to rotate a piece.<br />
                *Press the 'Left Arrow' key to move a piece left and the 'Right Arrow' key to move a piece right.<br />
                *Press the 'Down Arrow' key to instantly place a piece where you want.<br />
                *Left-Click O to restart game.<br/>
                *Left-Click || to pause game.<br/>
                *Left-Click ► to resume game.<br/>
                *Left-Click X to exit game.<br/>
                *Left-Click the game screen to use the arrow keys on your keyboard.<br/>


              </span>
            </div>
            <div ref={restartRef} onClick={() => setRestart(true)} className={restart ? 'restart1t' : 'restart2t'}>
              O
            </div>
            <p ref={pauseRef} onClick={() => setPause(!pause)} className="pauset">
              {!pause ? "||" : "►"}
            </p>
            <Link to="/isiapps#home">
              <div className='exitt' >X</div>
            </Link>
          </div>
          <canvas ref={canvasRef} width="400px" height="900px" tabIndex={-1} className={window.innerHeight > window.innerWidth ? 'portraitWindowt' : 'landscapeWindowt'} />
        </div>

      </div>
    </>
  )
}

export default Videos