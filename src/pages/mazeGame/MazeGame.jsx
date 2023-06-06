import React, { useRef, useEffect, useState } from 'react';
import './mazegame.css';
import { HashLink as Link } from 'react-router-hash-link';

const MazeGame = () => {

    const [loadingAssets, setLoadingAssets] = useState(true);
    const [dots, setDots] = useState('.');
    const [pause, setPause] = useState(false);
    const [restart, setRestart] = useState("");
    const [currentScreen, setCurrentScreen] = useState("selectLevel");
    const [nextLevel, setNextLevel] = useState("");
    const [gameLevel, setGameLevel] = useState("");
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
    const nextRef = useRef("null");


    function addDivToDivOfLevels(levelRef, lev) {
        divOfLevels.push(
            <div key={lev} ref={levelRef} onClick={() => setGameLevel('level ' + (lev + 1))} className='levelSelect'
                style={{
                    top: `calc(8.5% * ${(lev + 1)})`,
                }}>
                {gameLevel === 'level ' + (lev + 1) ? "selected" : 'level ' + (lev + 1)}
            </div>
        )
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
        const ctx = canvas.getContext("2d");
        ctx.textAlign = "center";
        var img = '/assets/appImages/mazeImages.png';
        var allImages = new Image();
        allImages.src = img;

        const intervalId = setInterval(() => {
            setDots((prevDots) => {
                if (prevDots.length === 3) {
                    return '.';
                } else {
                    return prevDots + '.';
                }
            });
        }, 500);

        allImages.onload = function () {
            // console.log("Texture Ready!");
            clearInterval(intervalId);
            setLoadingAssets(false);
        };

        var Game = {};
        let seconds = 0;
        var noLevels = 10;
        var level = [];
        for (var i = 0; i < noLevels; i++) {
            level[i] = false;
        };

        let nextLevel = false;


        var cellWidth = 20;
        var cellHeight = 30;

        var mazes = [];
        mazes[0] = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 2, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

        ];
        mazes[1] = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

        ];
        mazes[2] = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1],
            [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1],
            [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1],
            [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1],
            [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1],
            [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1],
            [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

        ];
        mazes[3] = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1],
            [1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1],
            [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 2, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

        ];
        mazes[4] = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 2, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

        ];
        mazes[5] = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
            [1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
            [1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
            [1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 2, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

        ];
        mazes[6] = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
            [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
            [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
            [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
            [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
            [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
            [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
            [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
            [1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1],
            [1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1],
            [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1],
            [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1],
            [1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1],
            [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1],
            [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1],
            [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 2, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

        ];
        mazes[7] = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1],
            [1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1],
            [1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1],
            [1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1],
            [1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 2, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

        ];
        mazes[8] = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

        ];
        mazes[9] = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
            [1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
            [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

        ];
        var player = {
            x: 1,
            y: 1,
            vel: 0.05,
            inCellX: 0,
            inCellY: 0,
            cellX: 1,
            cellY: 1,
            direction: "",
            faceDirection: "down"
        };

        class Enemy {
            constructor() {
                this.x = 0;
                this.y = 0;
                this.cellX = 0;
                this.cellY = 0;
                this.inCellX = 0;
                this.inCellY = 0;
                this.vel = 0;
                this.assignedDirection = false;
                this.direction = "";
                this.startingX = 0;
                this.startingY = 0;
                this.startingVel = 0;
                this.startingDirection = "";
                this.faceDirection = "";
                this.prevFaceDirection = "";
                this.wait = 0;
                this.waitMax = 0;
                this.show = false;
                this.bulletX = 0;
                this.bulletY = 0;
                this.bulletCellX = 0;
                this.bulletCellY = 0;
                this.bulletinCellX = 0;
                this.bulletinCellY = 0;
                this.showBullet = false;
                this.timeToSeeBullet = 0;
            }

            reConstruct(x, y, vel, direction, waitMax) {
                this.x = x;
                this.y = y;
                this.cellX = x;
                this.cellY = y;
                this.inCellX = 0;
                this.inCellY = 0;
                this.vel = vel;
                this.assignedDirection = true;
                this.direction = direction;
                this.startingX = x;
                this.startingY = y;
                this.startingVel = vel;
                this.startingDirection = direction;
                this.faceDirection = direction;
                this.prevFaceDirection = "";
                this.wait = 0;
                this.waitMax = waitMax;
                this.bulletX = x;
                this.bulletY = y;
                this.bulletCellX = x;
                this.bulletCellY = y;
                this.bulletinCellX = 0;
                this.bulletinCellY = 0;
                this.showBullet = false;
                this.timeToSeeBullet = 0;
            }

            restart() {    
                this.show = false; 
            }

            draw() {
                if (this.show) {
                    if (this.showBullet) {
                        ctx.fillStyle = "red";
                        ctx.fillRect(this.bulletX, this.bulletY, 4, 4);

                    }

                    // ctx.fillStyle = "purple";
                    // ctx.fillRect(this.x * cellWidth, this.y * cellHeight, cellWidth, cellHeight);
                    if (this.faceDirection === "down") ctx.drawImage(allImages, 0, 34, 32, cellHeight, this.x * cellWidth - 6, this.y * cellHeight, 32, cellHeight);
                    if (this.faceDirection === "right") ctx.drawImage(allImages, 32, 34, 32, cellHeight, this.x * cellWidth - 6, this.y * cellHeight, 32, cellHeight);
                    if (this.faceDirection === "up") ctx.drawImage(allImages, 64, 34, 32, cellHeight, this.x * cellWidth - 6, this.y * cellHeight, 32, cellHeight);
                    if (this.faceDirection === "left") ctx.drawImage(allImages, 96, 34, 32, cellHeight, this.x * cellWidth - 6, this.y * cellHeight, 32, cellHeight);
                }
            }

            checkSideOfVertical(maze) {
                if (maze[this.cellY][this.cellX - 1] === 0 && this.faceDirection === this.direction && this.assignedDirection) {
                    this.bulletCellY = this.cellY;
                    this.wait = this.waitMax;
                    this.prevFaceDirection = "";
                    this.faceDirection = "left";
                    this.assignedDirection = false;
                }
                if (this.wait === 0 && !this.assignedDirection && this.faceDirection === "left") {
                    this.prevFaceDirection = "left";
                    this.faceDirection = this.direction;
                }
                if (maze[this.cellY][this.cellX - 1] === 1 && !this.assignedDirection && this.prevFaceDirection === "left") {
                    this.assignedDirection = true;
                }

                if (maze[this.cellY][this.cellX + 1] === 0 && this.faceDirection === this.direction && this.assignedDirection) {
                    this.bulletCellY = this.cellY;
                    this.wait = this.waitMax;
                    this.prevFaceDirection = "";
                    this.faceDirection = "right";
                    this.assignedDirection = false;
                }
                if (this.wait === 0 && !this.assignedDirection && this.faceDirection === "right") {
                    this.prevFaceDirection = "right";
                    this.faceDirection = this.direction;
                }
                if (maze[this.cellY][this.cellX + 1] === 1 && !this.assignedDirection && this.prevFaceDirection === "right") {
                    this.assignedDirection = true;
                }
            }

            checkSideOfHorizontal(maze) {
                if (maze[this.cellY + 1][this.cellX] === 0 && this.faceDirection === this.direction && this.assignedDirection) {
                    this.bulletCellX = this.cellX;
                    this.prevFaceDirection = "";
                    this.faceDirection = "down";
                    this.wait = this.waitMax;
                    this.assignedDirection = false;
                }
                if (this.wait === 0 && !this.assignedDirection && this.faceDirection === "down") {
                    this.prevFaceDirection = "down";
                    this.faceDirection = this.direction;
                }
                if (maze[this.cellY + 1][this.cellX] === 1 && !this.assignedDirection && this.prevFaceDirection === "down") {
                    this.assignedDirection = true;
                }
                if (maze[this.cellY - 1][this.cellX] === 0 && this.faceDirection === this.direction && this.assignedDirection) {
                    this.bulletCellX = this.cellX;
                    this.prevFaceDirection = "";
                    this.faceDirection = "up";
                    this.wait = this.waitMax;
                    this.assignedDirection = false;
                }
                if (this.wait === 0 && !this.assignedDirection && this.faceDirection === "up") {
                    this.prevFaceDirection = "up";
                    this.faceDirection = this.direction;
                }
                if (maze[this.cellY - 1][this.cellX] === 1 && !this.assignedDirection && this.prevFaceDirection === "up") {
                    this.assignedDirection = true;
                }
            }

            updateBullet(maze, player, game) {
                if (maze[this.cellY] !== maze[player.cellY] && maze[this.cellX] !== maze[player.cellX]
                    && maze[this.cellY + 1] !== maze[player.cellY] && maze[this.cellY - 1] !== maze[player.cellY]
                    && maze[this.cellX + 1] !== maze[player.cellX] && maze[this.cellX - 1] !== maze[player.cellX]) {
                    this.bulletCellX = this.cellX;
                    this.bulletCellY = this.cellY;
                    this.bulletinCellX = this.x;
                    this.bulletinCellY = this.y;

                    if (this.showBullet) {
                        // if (this.direction === "up" || this.direction === "down") {
                        //     if (this.bulletCellY - 1 > player.cellY || this.bulletCellY + 1 < player.cellY)
                        this.showBullet = false;
                        // }
                    }

                } else {
                    if (maze[this.cellX] === maze[player.cellX] || this.cellX - 1 === player.cellX || this.cellX + 1 === player.cellX) {
                        if (this.cellY > player.cellY) {
                            if (this.faceDirection === "up") {
                                if (maze[this.bulletCellY - 1][this.bulletCellX] !== 1) {
                                    this.bulletCellX = this.cellX;
                                    this.bulletinCellX = this.x;
                                    this.bulletCellY--;
                                    this.bulletinCellY = this.bulletCellY;
                                }
                                else {
                                    // if (this.showBullet) this.showBullet = false;
                                    this.bulletCellY = this.cellY;
                                    this.bulletinCellY = this.y;
                                }
                            } else {
                                // if (this.showBullet) this.showBullet = false;
                                this.bulletCellY = this.cellY;
                                this.bulletinCellY = this.y;
                            }
                        } if (this.cellY < player.cellY) {
                            if (this.faceDirection === "down") {
                                if (maze[this.bulletCellY + 1][this.bulletCellX] !== 1) {
                                    this.bulletCellX = this.cellX;
                                    this.bulletinCellX = this.x;
                                    this.bulletCellY++;
                                    this.bulletinCellY = this.bulletCellY;
                                }
                                else {
                                    // if (this.showBullet) this.showBullet = false;
                                    this.bulletCellY = this.cellY;
                                    this.bulletinCellY = this.y;
                                }
                            } else {
                                // if (this.showBullet) this.showBullet = false;
                                this.bulletCellY = this.cellY;
                                this.bulletinCellY = this.y;
                            }
                        }
                    }
                    if (maze[this.cellY] === maze[player.cellY] || this.cellY - 1 === player.cellY || this.cellY + 1 === player.cellY) {

                        if (this.cellX > player.cellX) {
                            if (this.faceDirection === "left") {
                                if (maze[this.bulletCellY][this.bulletCellX - 1] !== 1) {
                                    this.bulletCellY = this.cellY;
                                    this.bulletinCellY = this.bulletCellY;
                                    this.bulletCellX--;
                                    this.bulletinCellX = this.bulletCellX;
                                }
                                else {
                                    // if (this.showBullet) this.showBullet = false;
                                    this.bulletCellX = this.cellX;
                                    this.bulletinCellX = this.x;
                                }
                            } else {
                                // if (this.showBullet) this.showBullet = false;
                                this.bulletCellX = this.cellX;
                                this.bulletinCellX = this.x;
                            }
                        }
                        if (this.cellX < player.cellX) {
                            if (this.faceDirection === "right") {
                                if (maze[this.bulletCellY][this.bulletCellX + 1] !== 1) {
                                    this.bulletCellY = this.cellY;
                                    this.bulletinCellY = this.bulletCellY;
                                    this.bulletCellX++;
                                    this.bulletinCellX = this.bulletCellX;
                                }
                                else {
                                    // if (this.showBullet) this.showBullet = false;
                                    this.bulletCellX = this.cellX;
                                    this.bulletinCellX = this.x;
                                }
                            } else {
                                // if (this.showBullet) this.showBullet = false;
                                this.bulletCellX = this.cellX;
                                this.bulletinCellX = this.x;
                            }
                        }
                    }

                }
                this.bulletX = this.bulletinCellX * cellWidth + 8;
                this.bulletY = this.bulletinCellY * cellHeight + 8;

                //Check bullet collision with player
                if (((this.bulletCellY === player.cellY)
                    || ((player.y + 0.3 < player.cellY) && (this.bulletCellY + 1 === player.cellY))
                    || ((player.y - 0.3 > player.cellY) && (this.bulletCellY - 1 === player.cellY)))
                    && ((this.bulletCellX === player.cellX)
                        || ((player.x + 0.5 < player.cellX) && (this.bulletCellX + 1 === player.cellX))
                        || ((player.x - 0.5 > player.cellX) && (this.bulletCellX - 1 === player.cellX)))) {
                    // console.log("Saw player!")
                    if (!this.showBullet) {
                        this.showBullet = true;
                        this.wait = this.waitMax;
                        game.score -= 100;
                    }
                    if (this.timeToSeeBullet++ >= 2) {
                        if (game.life > 0) game.life--;
                        this.timeToSeeBullet = 0;
                    }
                }
            }

            update(maze, player, game) {
                if (this.show) {
                    if (this.direction === "left") {
                        if (this.wait === 0) {
                            if (maze[this.cellY][this.cellX - 1] !== 1) {
                                this.x -= this.vel;
                                this.inCellX -= this.vel;
                                if (Math.abs(this.inCellX) >= 1.0) {
                                    this.cellX--;
                                    this.x = this.cellX;
                                    this.inCellX = 0;
                                }
                            } else {
                                this.direction = "right";
                            }
                            this.checkSideOfHorizontal(maze);
                        } else {
                            if (this.wait !== 0) this.wait--;
                        }
                    } else if (this.direction === "up") {
                        if (this.wait === 0) {
                            if (maze[this.cellY - 1][this.cellX] !== 1) {
                                this.y -= this.vel;
                                this.inCellY -= this.vel;
                                if (Math.abs(this.inCellY) >= 1.0) {
                                    this.cellY--;
                                    this.y = this.cellY;
                                    this.inCellY = 0;
                                }
                            } else {
                                this.direction = "down";

                            }
                            this.checkSideOfVertical(maze);
                        } else {
                            if (this.wait !== 0) this.wait--;
                        }
                    } else if (this.direction === "right") {
                        if (this.wait === 0) {
                            if (maze[this.cellY][this.cellX + 1] !== 1) {
                                this.x += this.vel;
                                this.inCellX += this.vel;
                                if (Math.abs(this.inCellX) >= 1.0) {
                                    this.cellX++;
                                    this.x = this.cellX;
                                    this.inCellX = 0;
                                }
                            } else {
                                this.direction = "left";
                            } this.checkSideOfHorizontal(maze);
                        } else {
                            if (this.wait !== 0) this.wait--;
                        }
                    } else if (this.direction === "down") {
                        if (this.wait === 0) {
                            if (maze[this.cellY + 1][this.cellX] !== 1) {
                                this.y += this.vel;
                                this.inCellY += this.vel;
                                if (Math.abs(this.inCellY) >= 1.0) {
                                    this.cellY++;
                                    this.y = this.cellY;
                                    this.inCellY = 0;
                                }
                            } else {
                                this.direction = "up";

                            }
                            this.checkSideOfVertical(maze);
                        } else {
                            if (this.wait !== 0) this.wait--;

                        }
                    }
                    this.updateBullet(maze, player, game);
                }
            }
        }

        //Enemies
        var enemy = [];
        for (let e = 0; e < 10; e++) {
            enemy[e] = new Enemy();
        }

        function setEnemiesForLevels() {
            let levelNo = -1;
            for (let i = 0; i < level.length; i++) {
                if (level[i]) {
                    levelNo = i;
                    break;
                }
            }

            if (levelNo !== -1) {
                for (let e = 0; e <= levelNo; e++) {
                    if (!enemy[e].show) {
                        enemy[e].show = true;
                    }
                }
            }

            if (levelNo === 0) enemy[0].reConstruct(13, 11, 0.03, "down", 50);
            else if (levelNo === 1) {
                enemy[0].reConstruct(18, 10, 0.035, "left", 50);
                enemy[1].reConstruct(16, 27, 0.04, "up", 50);

            }
            else if (levelNo === 2) {
                enemy[0].reConstruct(17, 15, 0.035, "left", 50);
                enemy[1].reConstruct(11, 27, 0.03, "up", 50);
                enemy[2].reConstruct(17, 8, 0.032, "down", 50);
            }
            else if (levelNo === 3) {
                enemy[0].reConstruct(2, 9, 0.025, "right", 40);
                enemy[1].reConstruct(18, 18, 0.03, "left", 55);
                enemy[2].reConstruct(10, 25, 0.025, "up", 50);
                enemy[3].reConstruct(18, 3, 0.03, "down", 60);
            }
            else if (levelNo === 4) {
                enemy[0].reConstruct(2, 3, 0.03, "right", 50);
                enemy[1].reConstruct(5, 9, 0.03, "up", 50);
                enemy[2].reConstruct(10, 13, 0.025, "down", 55);
                enemy[3].reConstruct(17, 26, 0.035, "left", 65);
                enemy[4].reConstruct(18, 22, 0.035, "up", 50);
            }
            else if (levelNo === 5) {
                enemy[0].reConstruct(17, 9, 0.03, "left", 50);
                enemy[1].reConstruct(18, 9, 0.03, "up", 60);
                enemy[2].reConstruct(2, 14, 0.03, "right", 55);
                enemy[3].reConstruct(10, 9, 0.03, "down", 65);
                enemy[4].reConstruct(2, 20, 0.03, "down", 45);
                enemy[5].reConstruct(10, 23, 0.03, "right", 40);
            }
            else if (levelNo === 6) {
                enemy[0].reConstruct(3, 4, 0.03, "down", 50);
                enemy[1].reConstruct(9, 18, 0.03, "up", 70);
                enemy[2].reConstruct(14, 2, 0.03, "down", 55);
                enemy[3].reConstruct(18, 26, 0.03, "up", 65);
                enemy[4].reConstruct(3, 9, 0.03, "right", 45);
                enemy[5].reConstruct(18, 18, 0.03, "left", 40);
                enemy[6].reConstruct(4, 26, 0.03, "right", 60);
            }
            else if (levelNo === 7) {
                enemy[0].reConstruct(2, 26, 0.03, "up", 40);
                enemy[1].reConstruct(2, 3, 0.03, "right", 45);
                enemy[2].reConstruct(7, 19, 0.03, "right", 60);
                enemy[3].reConstruct(13, 10, 0.03, "left", 55);
                enemy[4].reConstruct(7, 6, 0.03, "down", 60);
                enemy[5].reConstruct(13, 23, 0.03, "up", 65);
                enemy[6].reConstruct(18, 3, 0.03, "down", 70);
                enemy[7].reConstruct(18, 26, 0.03, "left", 75);
            }
            else if (levelNo === 8) {
                enemy[0].reConstruct(13, 11, 0.03, "down", 50);
                enemy[1].reConstruct(13, 11, 0.03, "down", 50);
                enemy[2].reConstruct(13, 11, 0.03, "down", 50);
                enemy[3].reConstruct(13, 11, 0.03, "down", 50);
                enemy[4].reConstruct(13, 11, 0.03, "down", 50);
                enemy[5].reConstruct(13, 11, 0.03, "down", 50);
                enemy[6].reConstruct(13, 11, 0.03, "down", 50);
                enemy[7].reConstruct(13, 11, 0.03, "down", 50);
                enemy[8].reConstruct(13, 11, 0.03, "down", 50);
            }
            else if (levelNo === 9) {
                enemy[0].reConstruct(13, 11, 0.03, "down", 50);
                enemy[1].reConstruct(13, 11, 0.03, "down", 50);
                enemy[2].reConstruct(13, 11, 0.03, "down", 50);
                enemy[3].reConstruct(13, 11, 0.03, "down", 50);
                enemy[4].reConstruct(13, 11, 0.03, "down", 50);
                enemy[5].reConstruct(13, 11, 0.03, "down", 50);
                enemy[6].reConstruct(13, 11, 0.03, "down", 50);
                enemy[7].reConstruct(13, 11, 0.03, "down", 50);
                enemy[8].reConstruct(13, 11, 0.03, "down", 50);
                enemy[9].reConstruct(13, 11, 0.03, "down", 50);
            }
        }


        function drawEnemies() {
            for (let d = 0; d < 10; d++) {
                if (enemy[d].show) enemy[d].draw();
            }

        }

        function updateEnemies(player, game) {
            for (let u = 0; u < level.length; u++) {
                if (level[u]) {
                    for (let e = 0; e <= u; e++) {
                        enemy[e].update(mazes[u], player, game);
                    }
                }
            }

        }

        function restartEnemies() {
            for (let u = 0; u < level.length; u++) {
                if (level[u]) {
                    for (let e = 0; e <= u; e++) {
                        enemy[e].restart();
                    }
                }
            }
        }


        function drawMaze(maze) {
            for (var i = 0; i < maze.length; i++) {
                for (var j = 0; j < maze[i].length; j++) {
                    if (maze[i][j] === 0) {
                        ctx.fillStyle = "white";

                    } else if (maze[i][j] === 2) {
                        ctx.fillStyle = "lightblue";
                    } else {
                        ctx.fillStyle = "black";
                    }
                    ctx.fillRect(j * cellWidth, i * cellHeight, cellWidth, cellHeight);

                }
            }
        }

        function drawPlayer() {
            // ctx.fillStyle = "gray";
            // ctx.fillRect(player.x * cellWidth, player.y * cellHeight, cellWidth, cellHeight);
            if (player.faceDirection === "down") ctx.drawImage(allImages, 0, 0, cellWidth, cellHeight, player.x * cellWidth, player.y * cellHeight, cellWidth, cellHeight);
            if (player.faceDirection === "right") ctx.drawImage(allImages, 20, 0, cellWidth, cellHeight, player.x * cellWidth, player.y * cellHeight, cellWidth, cellHeight);
            if (player.faceDirection === "up") ctx.drawImage(allImages, 40, 0, cellWidth, cellHeight, player.x * cellWidth, player.y * cellHeight, cellWidth, cellHeight);
            if (player.faceDirection === "left") ctx.drawImage(allImages, 60, 0, cellWidth, cellHeight, player.x * cellWidth, player.y * cellHeight, cellWidth, cellHeight);
        }

        function drawMazes() {
            //ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (var i = 0; i < noLevels; i++) {
                if (level[i]) drawMaze(mazes[i]);
            }

        }



        function update(maze) {

            if (player.direction === "left") {
                if (maze[player.cellY][player.cellX - 1] !== 1) {
                    player.x -= player.vel;
                    player.inCellX -= player.vel;
                    if (Math.abs(player.inCellX) >= 1.0) {
                        player.cellX--;
                        player.x = player.cellX;
                        player.inCellX = 0;
                    }
                }
            } else if (player.direction === "up") {
                if (maze[player.cellY - 1][player.cellX] !== 1) {
                    player.y -= player.vel;
                    player.inCellY -= player.vel;
                    if (Math.abs(player.inCellY) >= 1.0) {
                        player.cellY--;
                        player.y = player.cellY;
                        player.inCellY = 0;
                    }
                }
            } else if (player.direction === "right") {
                if (maze[player.cellY][player.cellX + 1] !== 1) {
                    player.x += player.vel;
                    player.inCellX += player.vel;
                    if (Math.abs(player.inCellX) >= 1.0) {
                        player.cellX++;
                        player.x = player.cellX;
                        player.inCellX = 0;
                    }
                }
            } else if (player.direction === "down") {
                if (maze[player.cellY + 1][player.cellX] !== 1) {
                    player.y += player.vel;
                    player.inCellY += player.vel;
                    if (Math.abs(player.inCellY) >= 1.0) {
                        player.cellY++;
                        player.y = player.cellY;
                        player.inCellY = 0;
                    }
                }
            }
            checkWin(maze);
        }


        function checkWin(maze) {
            if (player.cellX === maze[0].length - 2 && player.cellY === maze.length - 2) {
                if (!Game.victory) {
                    Game.victory = true;
                    if (!level[9])
                        setCurrentScreen("nextLevel");
                }
            }
        }

        function selectLevelFn(lev, select) {
            if (lev.current != null) {
                if (lev.current.textContent === "selected") {
                    level[select] = true;
                    setEnemiesForLevels();
                    setCurrentScreen("");
                    Game.playScreen = true;
                    setGameLevel("");
                }
            }
        }

        function changeLevel(l) {
            level[l] = false;
            level[l + 1] = true;
            setEnemiesForLevels();
        }


        Game.score = 300;
        Game.life = 1;
        Game.playScreen = false;
        let showHighScore = false;
        let newHighScore = false;
        let highScores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        Game.victory = false;
        if (typeof (Storage) !== "undefined") {
            showHighScore = true;
            highScores = JSON.parse(localStorage.getItem('mazeHighScore')) || highScores;
        }
        Game.handleHighScore = function () {
            if (showHighScore) {
                let finalScore = Game.score * 4;
                for (var i = 0; i < noLevels; i++) {
                    if (level[i]) {
                        if (finalScore > highScores[i]) {
                            newHighScore = true;
                            highScores[i] = finalScore;
                            localStorage.setItem('mazeHighScore', JSON.stringify(highScores));
                        }
                    };
                };

                if (newHighScore) {
                    ctx.fillText("NEW HIGH SCORE!", canvas.width / 2, canvas.height / 2 + 60);
                } else {
                    for (var j = 0; j < noLevels; j++) {
                        if (level[j]) {
                            ctx.fillText("Best Score: " + highScores[j], canvas.width / 2, canvas.height / 2 + 60);
                        };
                    };
                }
            }
        }

        //Keyboard inputs
        canvas.focus();
        canvas.addEventListener('keydown', event => {
            event.preventDefault();
            switch (event.key) {
                case "Enter":
                    player.direction = "";
                    for (var m = 0; m < noLevels; m++) {
                        if (level[m]) {
                            if (mazes[m][player.cellY - 1][player.cellX] !== 1 || mazes[m][player.cellY + 1][player.cellX] !== 1) {
                                player.x = player.cellX
                                player.inCellX = 0;
                            }
                            if (mazes[m][player.cellY][player.cellX - 1] !== 1 || mazes[m][player.cellY][player.cellX + 1] !== 1) {
                                player.y = player.cellY
                                player.inCellY = 0;
                            }
                        }
                    }
                    break;
                case "ArrowLeft":
                    if (player.y === player.cellY) {
                        player.direction = "left";
                        player.faceDirection = "left";
                    }
                    break;
                case "ArrowRight":
                    if (player.y === player.cellY) {
                        player.direction = "right";
                        player.faceDirection = "right";
                    }
                    break;
                case "ArrowUp":
                    if (player.x === player.cellX) {
                        player.direction = "up";
                        player.faceDirection = "up";
                    }
                    break;
                case "ArrowDown":
                    if (player.x === player.cellX) {
                        player.direction = "down";
                        player.faceDirection = "down";
                    }
                    break;

                default:
                    return;
            }
        }, false);

        //Touch inputs
        var startTouchX = 0;
        var startTouchY = 0;
        var swipeLimit = 50;

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

            if (Game.playScreen) {
                if (Math.abs(startTouchX - endTouchX) >= Math.abs(startTouchY - endTouchY)) {
                    //Swipe right
                    if (startTouchX < endTouchX - swipeLimit) {
                        if (player.y === player.cellY) {
                            player.direction = "right";
                            player.faceDirection = "right";
                        }
                    }

                    //Swipe left
                    if (startTouchX > endTouchX + swipeLimit) {
                        if (player.y === player.cellY) {
                            player.direction = "left";
                            player.faceDirection = "left";
                        }
                    }
                } else {

                    //Swipe Down
                    if (startTouchY < endTouchY - swipeLimit) {
                        if (player.x === player.cellX) {
                            player.direction = "down";
                            player.faceDirection = "down";
                        }
                    }

                    //Swipe Up
                    if (startTouchY > endTouchY + swipeLimit) {
                        if (player.x === player.cellX) player.direction = "up";
                        player.faceDirection = "up";
                    }
                }
            }
            //Handle clicks
            if (Math.abs(startTouchX - endTouchX) < swipeLimit && Math.abs(startTouchY - endTouchY) < swipeLimit) {

                if (Game.playScreen) {
                    player.direction = "";
                    for (var m = 0; m < noLevels; m++) {
                        if (level[m]) {
                            if (mazes[m][player.cellY - 1][player.cellX] !== 1 || mazes[m][player.cellY + 1][player.cellX] !== 1) {
                                player.x = player.cellX
                                player.inCellX = 0;
                            }
                            if (mazes[m][player.cellY][player.cellX - 1] !== 1 || mazes[m][player.cellY][player.cellX + 1] !== 1) {
                                player.y = player.cellY
                                player.inCellY = 0;
                            }
                        }
                    }
                }
            }
            canvas.removeEventListener("touchend", swipes);
        }

        let requestID;

        const render = () => {

            if (restartRef.current.className === 'restart1Maze') {
                setPause(false);
                Game.score = 300;
                seconds = 0;
                newHighScore = false;
                Game.life = 1;
                Game.victory = false;
                player.x = 1;
                player.y = 1;
                player.inCellX = 0;
                player.inCellY = 0;
                player.cellX = 1;
                player.cellY = 1;
                player.faceDirection = "down";
                restartEnemies();
                Game.playScreen = false;
                setCurrentScreen("selectLevel");
                setNextLevel("");
                for (var i = 0; i < noLevels; i++) {
                    if (level[i]) level[i] = false;
                };
                if (nextLevel) nextLevel = false;

                player.direction = "";

                setRestart(false);
            }

            if (nextRef.current != null) {
                if (nextRef.current.textContent === "selected") {
                    Game.score = 300;
                    seconds = 0;
                    newHighScore = false;
                    Game.life = 1;
                    Game.victory = false;
                    player.x = 1;
                    player.y = 1;
                    player.inCellX = 0;
                    player.inCellY = 0;
                    player.cellX = 1;
                    player.cellY = 1;
                    player.direction = "";
                    player.faceDirection = "down";
                    restartEnemies();

                    //To check if a button press is sometimes
                    //run twice and that happened to be the case.
                    // console.log("GoingToNext");

                    if (nextLevel) {
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
                        nextLevel = false;
                    }

                    setNextLevel("");

                    setCurrentScreen("");
                }
            }


            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (Game.playScreen) {
                if (Game.life > 0) {

                    if (pauseRef.current.textContent === "||") {
                        //update Stuff
                        drawMazes();
                        drawEnemies();

                        for (var u = 0; u < noLevels; u++) {
                            if (level[u]) update(mazes[u]);
                        }
                        updateEnemies(player, Game);
                        if (!Game.victory && seconds++ >= 60) {
                            Game.score--;
                            seconds = 0;
                        }
                        if (Game.score === 0) Game.life = 0;

                    }
                    drawPlayer();

                    ctx.font = "20px verdana";
                    ctx.fillStyle = "pink";
                    ctx.fillText(Game.score, canvas.width - 30, 25);

                    if (Game.victory) {
                        ctx.font = "35px verdana";
                        ctx.fillStyle = "cyan";
                        ctx.fillText("CONGRATS!", canvas.width / 2, canvas.height / 2 - 60);
                        ctx.fillText("Score: " + Game.score * 4, canvas.width / 2, canvas.height / 2);
                        Game.handleHighScore();
                        if (!nextLevel && !level[9]) nextLevel = true;
                    }

                } else {
                    ctx.font = "40px verdana";
                    ctx.fillStyle = "red";
                    ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2 - 30);
                    // ctx.fillText("Score: " + Game.score, canvas.width / 2, canvas.height / 2);
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
            clearInterval(intervalId);
            cancelAnimationFrame(requestID);
        }

    }, []);


    return (
        <div className="aroundCanvasMaze" id='home'>
            <div className="samePosMaze">
                <div className='infoMaze'>i
                    <span className='tooltip-textMaze'>
                        *Help Don escape from the Sisterhood of Jez. Get to the exit(colored blue) before the time runs out.<br />
                        *Swipe up to move up.<br />
                        *Swipe right to move right.<br />
                        *Swipe left to move left.<br />
                        *Swipe Down to move down.<br />
                        *Tap the game screen to stop moving.<br />
                        *Tap 'O' to restart game.<br />
                        *Tap '||' to pause game.<br />
                        *Tap '►' to resume game.<br />
                        *Tap 'X' to exit game.<br />
                        *Tap this instruction screen to return to game<br />
                    </span>
                    <span className='tooltip-text-desktopMaze'>
                        *Help Don escape from the Sisterhood of Jez. Get to the exit(colored blue) before the time runs out.<br />
                        *Press the 'Up Arrow' key to move up.<br />
                        *Press the 'Left Arrow' key to move left and the 'right Arrow' key to move right.<br />
                        *Press the 'Down Arrow' key to move down.<br />
                        *Press the 'Enter' key to stop moving.<br />
                        *Click 'O' to restart game.<br />
                        *Click '||' to pause game.<br />
                        *Click '►' to resume game.<br />
                        *Click 'X' to exit game.<br />
                        *Click the game screen to use the keys on your keyboard.<br />
                    </span>
                </div>
                <div ref={restartRef} onClick={() => setRestart(true)} className={restart ? 'restart1Maze' : 'restart2Maze'}>
                    O
                </div>
                <p ref={pauseRef} onClick={() => setPause(!pause)} className="pauseMaze">
                    {!pause ? "||" : "►"}
                </p>
                <Link to="/isiapps#home">
                    <div className='exitMaze'>X</div>
                </Link>
            </div>
            <canvas ref={canvasRef} tabIndex={-1} width="400" height="900" className='portraitMaze' />
            {loadingAssets && <div className='loadingAssets'>Loading{dots}</div>}
            {!loadingAssets && currentScreen === 'selectLevel' && <div >
                {divOfLevels}
            </div>
            }
            {
                currentScreen === 'nextLevel' && <div ref={nextRef} onClick={() => setNextLevel('Next Level')} className='next'>{nextLevel === 'Next Level' ? "selected" : "Next Level"}</div>
            }
        </div>
    )
}

export default MazeGame