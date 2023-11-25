import React, { useState, useRef, useEffect } from 'react';
import './borderforce.css';
import { HashLink as Link } from 'react-router-hash-link';



const BorderForce = () => {
    const canvasRef = useRef(null);
    const [pause, setPause] = useState(false);
    const [restart, setRestart] = useState("");
    const restartRef = useRef("null");
    const pauseRef = useRef("null");

    useEffect(() => {
        const canvas = canvasRef.current;
        if (window.innerHeight > window.innerWidth) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        } else {
            canvas.width = 480;
            canvas.height = 800;
        }
        const ctx = canvas.getContext('2d');

        var img = '/assets/appImages/borderForceSprite.png';
        var allImages = new Image();
        allImages.src = img;
        let showImages = false;
        allImages.onload = function () {
            showImages = true;
        };


        //Touch inputs
        // let startTouchX = 0;
        // let startTouchY = 0;
        // let swipeLimit = 20;
        const canvasTopBorder = canvas.getBoundingClientRect().top;
        const correctMouseY = canvas.height / canvas.getBoundingClientRect().height;
        const canvasLeftBorder = canvas.getBoundingClientRect().left;
        const correctMouseX = canvas.width / canvas.getBoundingClientRect().width;

        var game = { totalEnemies: 0, enemyCreationTime: 600, gameOver: false };
        var player = { x: canvas.width / 2 - canvas.width / 9.6, y: canvas.height - canvas.height / 16, width: canvas.width / 4.8, height: canvas.height / 20, life: 200, score: 0, performance: 0, roundsFired: 0 };

        let showHighScore = false;
        let newHighScore = false;
        let highScores = [0, 0, 0, '-'];

        if (typeof (Storage) !== "undefined") {
            showHighScore = true;
            highScores = JSON.parse(localStorage.getItem('bfHighScore')) || highScores;
            console.log(highScores);
        } 

        let handleHighScore = function () {
            if (showHighScore) {
                if (player.score >= highScores[0] && player.performance > highScores[2] && !newHighScore) {
                    highScores[0] = player.score;
                    highScores[1] = player.roundsFired;
                    highScores[2] = player.performance;
                    highScores[3] = performanceRank;
                    localStorage.setItem('bfHighScore', JSON.stringify(highScores));
                    newHighScore = true;
                }

                ctx.fillStyle = 'black';
                ctx.font = `${textSize0}px Arial`;

                if (newHighScore) {
                    ctx.fillText("NEW BEST PERFORMANCE!", canvas.width / 2, canvas.height / 2 + canvas.height / 10);
                    ctx.fillText('Score:' + player.score + ', shots:' + player.roundsFired + ', rank:' + performanceRank, canvas.width / 2, canvas.height / 2 + canvas.height / 5);
                } else{
                    ctx.fillText('Score:' + player.score + ', shots:' + player.roundsFired + ', rank:' + performanceRank, canvas.width / 2, canvas.height / 2 + canvas.height / 10);
                    if(highScores[0] > 0)ctx.fillText('(BEST) Score:' + highScores[0] + ', shots:' + highScores[1] + ', rank:' + highScores[3], canvas.width / 2, canvas.height / 2 + canvas.height / 5);
                }
            }else{
                ctx.fillStyle = 'black';
                ctx.font = `bold ${textSize}px Arial`;
                ctx.fillText('Score:' + player.score + ', shots:' + player.roundsFired + ', rank:' + performanceRank, canvas.width / 2, canvas.height / 2 + canvas.height / 10);
            }
        }

        let shootAudio = new Audio('/assets/sounds/gunShot.mp3');
        let shootDestroyAudioZig = new Audio('/assets/sounds/gunShotLow.mp3');
        let shootDestroyAudio = new Audio('/assets/sounds/gunShotLow.mp3');
        let bigExplosionAudio = new Audio('/assets/sounds/bigExplosion.wav');
        let bigExplosionAudioTank = new Audio('/assets/sounds/bigExplosion.wav');
        let smallExplosionAudio = new Audio('/assets/sounds/lowExplosion.mp3');
        let smallExplosionAudioRam = new Audio('/assets/sounds/lowExplosion.mp3');
        let bulletExplosionAudio = new Audio('/assets/sounds/smallExplosion.wav');
        let rocketAudio = new Audio('/assets/sounds/rocketShoot.wav');
        let tankAudio = new Audio('/assets/sounds/tankShoot.wav');


        //pause sounds
        function pauseAudio() {
            shootAudio.pause();
            shootDestroyAudioZig.pause();
            shootDestroyAudio.pause();
            bigExplosionAudio.pause();
            bigExplosionAudioTank.pause();
            smallExplosionAudio.pause();
            smallExplosionAudioRam.pause();
            bulletExplosionAudio.pause();
            rocketAudio.pause();
            tankAudio.pause();
        }


        var gunAngle = 0;
        const setGunAngle = function (newAngle) {
            gunAngle += newAngle;
            // console.log(gunAngle)
        }

        const textSize0 = canvas.width / 20;
        const textSize = canvas.width / 16;
        const textSize2 = canvas.width / 8;

        let bullets = [];
        let enemies = [];
        let bulletLadyZ = [];
        let bulletEvil = [];
        var bulletLFreq = 0;
        var bulletLDFreq = 0;
        var fireLNo = 0;
        var fireLNoE = 0;
        var bulletRPG = { x: 0, y: canvas.height, width: canvas.width / 48, height: canvas.height / 80 };
        var bulletTank = { x: canvas.width / 2 - canvas.width / 192, y: canvas.height, width: canvas.width / 48, height: canvas.width / 24, power: 5 };
        let tankRelease = 150;
        let destroyerSuccessful = false;
        let invaderBlocksDestroyed = 0;
        let successfulInvaders = 0;
        let blocksDestroyed = 0;
        let performanceRank = '-';



        const blockSize = canvas.width / 48;
        const wallY = canvas.height - canvas.height / 4.7;
        let wall = [];

        //Build wall
        for (let bh = 0; bh < 12; bh++) {
            for (let bx = 0; bx < 48; bx++) {
                wall.push({ size: blockSize, x: bx * blockSize, y: wallY + bh * blockSize, destroyed: false });
            }
        }

        // Player's gun
        const gunWidth = canvas.width / 12;
        const gunHeight = canvas.height / 4;
        const gunImageWidth = canvas.width / 4;
        let recoilEffect = 0, recoilEffectX = 0, recoilEffectY = 0, count = 0;
        let showGunFire = false;
        let gunFireX = 0, gunFireY = 0, gunFireSize = canvas.height / 8;
        let fireImageNo = 1;
        let createEnemy = true;

        //Create explosion effect
        // Define the explosion particles
        let particles = [];

        // Create a particle class
        class Particle {
            constructor(x, y, radius, color, velocity, alpha, alphaDecline) {
                this.x = x;
                this.y = y;
                this.radius = radius;
                this.color = color;
                this.velocity = velocity;
                this.alphaDecline = alphaDecline;
                this.alpha = alpha;
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = this.alpha;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }

            update() {
                this.x += this.velocity.x;
                this.y += this.velocity.y;
                // this.alpha -= 0.04;
                this.alpha -= this.alphaDecline;
            }
        }


        // Create an explosion function
        function createExplosion(x, y, rad, numParticles, speedFactor1, speedFactor2, alpha, alphaDecline) {
            for (let i = 0; i < numParticles; i++) {
                const angle = (Math.PI * 2) * (i / numParticles);
                const speed = speedFactor1 + Math.random() * speedFactor2;
                const velocity = {
                    x: Math.cos(angle) * speed,
                    y: Math.sin(angle) * speed
                };
                // const radius = 3;
                const radius = rad;
                // const color = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`;
                const isBlack = Math.random() <= 0.2;
                const isWhite = Math.random() >= 0.7;
                const isRed = Math.random() < 0.7 && Math.random() >= 0.5;
                const color = isRed ? 'red' : isWhite ? 'white' : isBlack ? 'black' : 'yellow';
                particles.push(new Particle(x, y, radius, color, velocity, alpha, alphaDecline));
            }
        }



        let requestID;

        // Game loop
        const gameLoop = () => {

            //Restart stuff
            if (restartRef.current.className === 'restart1bf') {
                game.totalEnemies = 0;
                game.enemyCreationTime = 600;
                game.gameOver = false;

                player.life = 200;
                player.roundsFired = 0;
                player.score = 0;
                player.performance = 0;
                gunAngle = 0;

                bullets = [];
                enemies = [];
                bulletLadyZ = [];
                bulletEvil = [];
                bulletLFreq = 0;
                bulletLDFreq = 0;
                fireLNo = 0;
                fireLNoE = 0;
                tankRelease = 150;
                destroyerSuccessful = false;
                invaderBlocksDestroyed = 0;
                successfulInvaders = 0;
                blocksDestroyed = 0;
                performanceRank = '-';

                wall = [];
                //Build wall
                for (let bh = 0; bh < 12; bh++) {
                    for (let bx = 0; bx < 48; bx++) {
                        wall.push({ size: blockSize, x: bx * blockSize, y: wallY + bh * blockSize, destroyed: false });
                    }
                }

                recoilEffect = 0; recoilEffectX = 0; recoilEffectY = 0; count = 0;
                showGunFire = false;
                fireImageNo = 1;
                createEnemy = true;

                particles = [];

                pauseAudio();


                setPause(false);
                setRestart(false);
            }

            //update and draw stuff


            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (pauseRef.current.textContent === "||") {

                if (recoilEffect !== 0) {
                    if (count++ > 5) {
                        if (recoilEffectX !== 0)
                            recoilEffectX = 0;
                        if (recoilEffectY !== 0)
                            recoilEffectY = 0;
                        count = 0;
                        recoilEffect = 0;
                    }
                }

                // Draw wall
                wall.forEach((block) => {
                    if (!block.destroyed) {
                        if (showImages)
                            ctx.drawImage(allImages, 230, 0, 5, 5, block.x, block.y, block.size, block.size);
                        else {
                            ctx.fillStyle = 'brown';
                            ctx.fillRect(block.x, block.y, block.size, block.size);
                        }
                    }

                });

                // Draw bullets
                bullets.forEach((bullet) => {
                    ctx.fillStyle = 'gray';
                    ctx.fillRect(bullet.x, bullet.y, bullet.size, bullet.size);
                    bullet.x += Math.sin((bullet.angle * Math.PI) / 180) * 20; // Move the bullet in the direction it's facing
                    bullet.y -= Math.cos((bullet.angle * Math.PI) / 180) * 20;
                    if (bullet.x < 0 || bullet.y < 0 || bullet.x > canvas.width) bullets.splice(bullets.indexOf(bullet), 1);

                    // Check for collisions with enemies
                    enemies.forEach((enemy, index) => {
                        if (
                            ((bullet.x > enemy.x &&
                                bullet.x < enemy.x + enemy.width) || (bullet.x < enemy.x && bullet.x + bullet.size > enemy.x)) &&
                            ((bullet.y > enemy.y &&
                                bullet.y < enemy.y + enemy.height) || (bullet.y < enemy.y && bullet.y + bullet.size > enemy.y))
                        ) {
                            // Remove the bullet and enemy upon collision
                            ctx.drawImage(allImages, 70, 0, 50, 50, enemy.x + enemy.width / 2, enemy.y + enemy.height / 1.5, 25, 25);
                            bullets.splice(bullets.indexOf(bullet), 1);
                            player.score += 1;
                            if (enemy.power-- <= 4) {
                                enemies.splice(index, 1);
                                if (enemy.enemyMake === 'robot') {
                                    createExplosion(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, 5, 50, 0, 1, 1, 0.04);
                                    smallExplosionAudio.play();
                                }
                                if (enemy.enemyMake === 'ram') {
                                    createExplosion(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, 7, 100, 0.5, 1, 1, 0.05);
                                    smallExplosionAudioRam.play();
                                }
                                if (!destroyerSuccessful && enemy.enemyMake === 'destroyer') {
                                    createExplosion(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, 4, 500, 0, 1, .5, 0.01);
                                    bigExplosionAudio.play();
                                }
                                if (enemy.enemyMake === 'tank') {
                                    createExplosion(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, 5, 550, 0, 1, .5, 0.01);
                                    bigExplosionAudioTank.play();
                                }
                            }
                            // createExplosion(x, y, rad, numParticles, speedFactor1, speedFactor2, alpha, alphaDecline)
                        }
                    });
                    if (
                        ((bullet.x > bulletRPG.x &&
                            bullet.x < bulletRPG.x + bulletRPG.width) || (bullet.x < bulletRPG.x && bullet.x + bullet.size > bulletRPG.x)) &&
                        ((bullet.y > bulletRPG.y &&
                            bullet.y < bulletRPG.y + bulletRPG.height) || (bullet.y < bulletRPG.y && bullet.y + bullet.size > bulletRPG.y))
                    ) {
                        createExplosion(bulletRPG.x + bulletRPG.width / 2, bulletRPG.y + bulletRPG.height / 2, 2, 20, 0, 1, .5, 0.04);
                        bulletExplosionAudio.play();
                        bulletRPG.y = canvas.height;
                        bullets.splice(bullets.indexOf(bullet), 1);
                    }
                    if (
                        ((bullet.x > bulletTank.x &&
                            bullet.x < bulletTank.x + bulletTank.width) || (bullet.x < bulletTank.x && bullet.x + bullet.size > bulletTank.x)) &&
                        ((bullet.y > bulletTank.y &&
                            bullet.y < bulletTank.y + bulletTank.height) || (bullet.y < bulletTank.y && bullet.y + bullet.size > bulletTank.y))
                    ) {
                        createExplosion(bulletTank.x + bulletTank.width / 2, bulletTank.y + bulletTank.height / 2, 2, 20, 0, 1, .5, 0.04);
                        bulletExplosionAudio.play();
                        bulletTank.y = canvas.height;
                        bullets.splice(bullets.indexOf(bullet), 1);
                    }

                });

                // Draw enemies
                enemies.forEach((enemy, index) => {
                    if (showImages) {
                        if (enemy.enemyMake === 'destroyer') {
                            if (destroyerSuccessful && enemy.vy === 4) {
                                if (enemy.y < enemy.height * 2 || enemy.y > canvas.height - enemy.height * 2) {
                                    ctx.drawImage(allImages, 400, 160, 70, 120, enemy.x, enemy.y, enemy.width, enemy.height);

                                } else {
                                    ctx.drawImage(allImages, 300, 160, 70, 120, enemy.x, enemy.y, enemy.width, enemy.height);
                                    if (!game.gameOver && bulletLDFreq++ >= 10) {
                                        bulletEvil.push({ size: canvas.width / 120, x: enemy.x, y: enemy.y + enemy.height });
                                        ctx.drawImage(allImages, 70 + 50 * fireLNoE, 0, 50, 50, enemy.x - enemy.width / 3, enemy.y + enemy.height * .7, canvas.width / 9.6, canvas.width / 9.6);
                                        shootDestroyAudio.play();
                                        if (fireLNoE++ >= 2) fireLNoE = 0;
                                        bulletLDFreq = 0;
                                    }
                                }

                                bulletEvil.forEach((bullet) => {
                                    ctx.fillStyle = 'gray';
                                    if (!game.gameOver) ctx.fillRect(bullet.x, bullet.y, bullet.size, bullet.size);
                                    bullet.x -= 5;
                                    bullet.y += 10;
                                    if (
                                        ((bullet.x > player.x &&
                                            bullet.x < player.x + player.width) || (bullet.x < player.x && bullet.x + bullet.size > player.x)) &&
                                        ((bullet.y > player.y &&
                                            bullet.y < player.y + player.height) || (bullet.y < player.y && bullet.y + bullet.size > player.y))
                                    ) {
                                        recoilEffect = 1;
                                        recoilEffectY = recoilEffect;
                                        if (!game.gameOver) player.life -= 1;
                                        bulletEvil.splice(bulletEvil.indexOf(bullet), 1);
                                    }


                                    if (bullet.y >= canvas.height) bulletEvil.splice(bulletEvil.indexOf(bullet), 1);
                                });

                            } else {
                                ctx.drawImage(allImages, 350, 0, 80, 150, enemy.x, enemy.y, enemy.width, enemy.height);
                            }
                        }

                        if (enemy.enemyMake === 'tank') {
                            ctx.drawImage(allImages, 100, 150, 150, 200, enemy.x, enemy.y, enemy.width, enemy.height);
                            if (enemy.y >= enemy.moveTo) {
                                if (!game.gameOver && tankRelease++ >= 200) {
                                    bulletTank.y = enemy.height;
                                    ctx.drawImage(allImages, 170, 0, 50, 50, enemy.x + enemy.width / 5, enemy.height * .75, canvas.width / 4.8, canvas.width / 4.8);
                                    tankAudio.play();
                                    tankRelease = 0;
                                } else {
                                    if (!game.gameOver) bulletTank.y += 5;
                                }
                                if (bulletTank.y < canvas.height) {
                                    ctx.fillStyle = 'gray';
                                    if (!game.gameOver) ctx.fillRect(bulletTank.x, bulletTank.y, bulletTank.width, bulletTank.height);

                                    if (
                                        ((player.x > bulletTank.x &&
                                            player.x < bulletTank.x + bulletTank.width) || (player.x < bulletTank.x && player.x + player.width > bulletTank.x)) &&
                                        ((player.y > bulletTank.y &&
                                            player.y < bulletTank.y + bulletTank.height) || (player.y < bulletTank.y && player.y + player.height > bulletTank.y))
                                    ) {
                                        createExplosion(bulletTank.x + bulletTank.width / 2, bulletTank.y + bulletTank.height / 2, 2, 20, 0, 1, .5, 0.04);
                                        // bulletExplosionAudio.play();
                                        bulletTank.y = canvas.height;
                                        recoilEffect = 3;
                                        recoilEffectY = recoilEffect;
                                        if (!game.gameOver) player.life -= 10;
                                    }

                                    wall.forEach((block) => {
                                        if (!block.destroyed) {
                                            if (
                                                ((block.x > bulletTank.x &&
                                                    block.x < bulletTank.x + bulletTank.width) || (block.x < bulletTank.x && block.x + block.size > bulletTank.x)) &&
                                                ((block.y > bulletTank.y &&
                                                    block.y < bulletTank.y + bulletTank.height) || (block.y < bulletTank.y && block.y + block.size > bulletTank.y))
                                            ) {
                                                // Remove the block and enemy upon collision
                                                // wall.splice(index, 1);
                                                block.destroyed = true;
                                                blocksDestroyed++;
                                                if (bulletTank.power-- === 0) {

                                                    createExplosion(bulletTank.x + bulletTank.width / 2, bulletTank.y + bulletTank.height / 2, 2, 20, 0, 1, .5, 0.04);
                                                    bulletExplosionAudio.play();
                                                    bulletTank.y = canvas.height;
                                                    bulletTank.power = 5;
                                                }
                                            }
                                        }
                                    });


                                }
                            }
                        }
                        if (enemy.enemyMake === 'rpg') {
                            ctx.drawImage(allImages, 0, 150, 50, 120, enemy.x, enemy.y, enemy.width, enemy.height);
                            enemy.x += enemy.vx;
                            if (enemy.x <= 0 || enemy.x >= canvas.width / 4) enemy.vx = - enemy.vx;
                            if (enemy.y >= enemy.moveTo) {
                                if (!game.gameOver && enemy.x >= canvas.width / 4) {
                                    bulletRPG.x = enemy.x + enemy.width / 8;
                                    bulletRPG.y = enemy.y + enemy.height;
                                    ctx.drawImage(allImages, 120, 0, 50, 50, enemy.x - enemy.width / 2, enemy.y + enemy.height * .7, canvas.width / 8, canvas.width / 8);
                                    rocketAudio.play();
                                } else {
                                    if (bulletRPG.y < canvas.height) {
                                        ctx.fillStyle = 'gray';
                                        if (!game.gameOver && bulletRPG.y >= enemy.y + enemy.height)
                                            ctx.fillRect(bulletRPG.x, bulletRPG.y, bulletRPG.width, bulletRPG.height);
                                        if (bulletRPG.x < canvas.width / 2) bulletRPG.x++;
                                        bulletRPG.y += 6;

                                        if (
                                            ((player.x > bulletRPG.x &&
                                                player.x < bulletRPG.x + bulletRPG.width) || (player.x < bulletRPG.x && player.x + player.width > bulletRPG.x)) &&
                                            ((player.y > bulletRPG.y &&
                                                player.y < bulletRPG.y + bulletRPG.height) || (player.y < bulletRPG.y && player.y + player.height > bulletRPG.y))
                                        ) {
                                            createExplosion(bulletRPG.x + bulletRPG.width / 2, bulletRPG.y + bulletRPG.height / 2, 2, 20, 0, 1, .5, 0.04);
                                            // bulletExplosionAudio.play();
                                            bulletRPG.y = canvas.height;
                                            recoilEffect = 2;
                                            recoilEffectY = recoilEffect;
                                            if (!game.gameOver) player.life -= 5;
                                        }
                                    }
                                }
                            }
                        }
                        if (enemy.enemyMake === 'robot') {
                            ctx.drawImage(allImages, 250, 0, 40, 50, enemy.x, enemy.y, enemy.width, enemy.height);

                        }
                        if (enemy.enemyMake === 'ram') {
                            ctx.drawImage(allImages, 300, 0, 40, 100, enemy.x, enemy.y, enemy.width, enemy.height);

                        }

                        if (enemy.enemyMake === 'ladyZigzag') {
                            ctx.drawImage(allImages, 450, 0, 50, 120, enemy.x, enemy.y, enemy.width, enemy.height);

                            if (enemy.y > enemy.height * 1.5) {
                                enemy.x += enemy.vx;
                                if (enemy.x <= canvas.width / 3.7 || enemy.x >= canvas.width - canvas.width / 3.7) enemy.vx = - enemy.vx;

                                if (enemy.y >= enemy.moveTo - 2) enemy.vy = - enemy.vy;

                            }
                            if (enemy.y <= enemy.height * 1.5 - 4 && enemy.vy < 0) enemy.vy = - enemy.vy;
                            if (enemy.x > canvas.width / 2 - canvas.width / 9.6 && enemy.x < canvas.width / 2 + canvas.width / 9.6) {
                                if (!game.gameOver && bulletLFreq++ >= 10) {
                                    bulletLadyZ.push({ size: canvas.width / 120, x: enemy.x + canvas.width / 60, y: enemy.y + enemy.height });
                                    ctx.drawImage(allImages, 70 + 50 * fireLNo, 0, 50, 50, enemy.x - enemy.width / 8, enemy.y + enemy.height * .6, canvas.width / 9.6, canvas.width / 9.6);
                                    if (fireLNo++ >= 2) fireLNo = 0;
                                    shootDestroyAudioZig.play();
                                    bulletLFreq = 0;
                                }
                            }

                            bulletLadyZ.forEach((bullet) => {
                                ctx.fillStyle = 'gray';
                                if (!game.gameOver) ctx.fillRect(bullet.x, bullet.y, bullet.size, bullet.size);
                                bullet.y += 10;
                                if (
                                    ((bullet.x > player.x &&
                                        bullet.x < player.x + player.width) || (bullet.x < player.x && bullet.x + bullet.size > player.x)) &&
                                    ((bullet.y > player.y &&
                                        bullet.y < player.y + player.height) || (bullet.y < player.y && bullet.y + bullet.size > player.y))
                                ) {
                                    recoilEffect = 1;
                                    recoilEffectY = recoilEffect;
                                    if (!game.gameOver) player.life -= 1;
                                    bulletLadyZ.splice(bulletLadyZ.indexOf(bullet), 1);
                                }


                                if (bullet.y >= canvas.height) bulletLadyZ.splice(bulletLadyZ.indexOf(bullet), 1);
                            });
                        }


                    } else {
                        ctx.fillStyle = 'black';
                        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
                    }

                    //All enemies move to their y position to commence attack
                    if (enemy.y < enemy.moveTo) enemy.y += enemy.vy;
                    if (enemy.enemyMake === 'robot' || enemy.enemyMake === 'ram') {
                        if (enemy.y >= (canvas.height - canvas.height / 3)) {
                            if (enemy.x < canvas.width / 2 - enemy.width) enemy.x += 2;
                            if (enemy.x > canvas.width / 2) enemy.x -= 2;
                        }
                        if (
                            ((player.x > enemy.x &&
                                player.x < enemy.x + enemy.width) || (player.x < enemy.x && player.x + player.width > enemy.x)) &&
                            ((player.y > enemy.y &&
                                player.y < enemy.y + enemy.height) || (player.y < enemy.y && player.y + player.height > enemy.y))
                        ) {
                            enemies.splice(index, 1);
                            if (enemy.enemyMake === 'robot') {
                                createExplosion(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, 5, 50, 0, 1, 1, 0.04);
                                smallExplosionAudio.play();
                            }
                            if (enemy.enemyMake === 'ram') {
                                createExplosion(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, 7, 100, 0.5, 1, 1, 0.05);
                                smallExplosionAudioRam.play();
                            }
                            if (!game.gameOver) player.life -= 5;

                        }
                    }

                    // Check for collisions with wall
                    wall.forEach((block) => {
                        if (!block.destroyed) {
                            if (
                                ((block.x > enemy.x &&
                                    block.x < enemy.x + enemy.width) || (block.x < enemy.x && block.x + block.size > enemy.x)) &&
                                ((block.y > enemy.y &&
                                    block.y < enemy.y + enemy.height) || (block.y < enemy.y && block.y + block.size > enemy.y))
                            ) {
                                // Remove the block and enemy upon collision
                                // wall.splice(index, 1);
                                block.destroyed = true;
                                blocksDestroyed++;
                                if (enemy.power-- === 0 && !enemy.hit) {
                                    if (enemy.enemyMake === 'robot') {
                                        createExplosion(enemy.x + enemy.width / 2, enemy.y + enemy.height, 5, 50, 0, 1, 1, 0.04);
                                        smallExplosionAudio.play();
                                    }
                                    if (enemy.enemyMake === 'ram') {
                                        createExplosion(enemy.x + enemy.width / 2, enemy.y + enemy.height, 7, 100, 0.5, 1, 1, 0.05);
                                        smallExplosionAudioRam.play();
                                    }
                                    if (enemy.enemyMake === 'destroyer') {
                                        createExplosion(enemy.x + enemy.width / 2, enemy.y + enemy.height, 4, 500, 0, 1, .5, 0.01);
                                        bigExplosionAudio.play();
                                    }
                                    enemy.hit = true;
                                }
                            }
                        }
                    });
                    if (enemy.hit) {
                        enemies.splice(enemies.indexOf(enemy), 1);

                    }

                    if (enemy.y >= canvas.height) {
                        // if (enemy.enemyMake === 'destroyer') destroyerSuccessful = true;
                        if (!game.gameOver) {
                            if (++successfulInvaders >= 30) {
                                game.gameOver = true;
                            }
                        }
                        // console.log(successfulInvaders);
                        enemies.splice(enemies.indexOf(enemy), 1);
                    }

                });

                // Draw gun
                ctx.save();
                ctx.translate(canvas.width / 2, canvas.height);
                ctx.rotate((gunAngle * Math.PI) / 180);
                if (showImages) {
                    if (player.life > 0) {
                        if (successfulInvaders >= 30) {
                            ctx.drawImage(allImages, 300, 300, 60, 100, -gunImageWidth / 2, -gunHeight, gunImageWidth, gunHeight);
                        } else {
                            ctx.drawImage(allImages, 0, 0, 60, 100, -gunImageWidth / 2, -gunHeight + recoilEffectY + recoilEffectX, gunImageWidth, gunHeight);
                        }
                    }
                    else {
                        ctx.drawImage(allImages, 0, 300, 60, 100, -gunImageWidth / 2, -gunHeight, gunImageWidth, gunHeight);
                    }

                } else {
                    ctx.fillStyle = 'green';
                    ctx.fillRect(-gunWidth / 2, -gunHeight, gunWidth, gunHeight);
                }
                ctx.restore();

                if (!destroyerSuccessful) {
                    invaderBlocksDestroyed = 0;
                    wall.forEach((block) => {
                        if (block.destroyed) {
                            for (let bh = 0; bh < 12; bh++) {
                                for (let bx = 43; bx < 48; bx++) {
                                    if (block.x === bx * block.size && block.y === wallY + bh * block.size) {
                                        invaderBlocksDestroyed++;
                                        break;
                                    }
                                }
                            }
                        }

                    });
                    if (invaderBlocksDestroyed === 60) {
                        destroyerSuccessful = true;
                    }
                }



                if (showGunFire) {
                    gunFireX = canvas.width / 2 - canvas.height / 16 + gunHeight * Math.sin((gunAngle * Math.PI) / 180);
                    gunFireY = canvas.height - canvas.height / 16 - gunHeight * Math.cos((gunAngle * Math.PI) / 180);
                    ctx.drawImage(allImages, 70 + 50 * fireImageNo, 0, 50, 50, gunFireX, gunFireY, gunFireSize, gunFireSize);
                    showGunFire = false;
                }

                for (let i = 0; i < particles.length; i++) {
                    particles[i].update();
                    particles[i].draw();
                    if (particles[i].alpha <= 0) {
                        particles.splice(i, 1);
                        i--;
                    }
                }

                if (player.life <= 0) {
                    player.life = 0;
                    game.gameOver = true;
                }

                if (game.gameOver) {
                    ctx.font = `${textSize2}px Arial`;
                    ctx.fillStyle = 'red';
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
                    handleHighScore();
                }

                if (game.enemyCreationTime < 200) {
                    ctx.font = `${textSize2}px Arial`;
                    ctx.fillStyle = 'red';
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.fillText('CONGRATS!', canvas.width / 2, canvas.height / 2);
                    ctx.font = `${textSize}px Arial`;
                    ctx.fillStyle = 'green';
                    ctx.fillText('You saved a Nation.', canvas.width / 2, canvas.height / 2 + canvas.height / 20);
                    handleHighScore();
                }


                //Show player life
                ctx.fillStyle = 'green';
                ctx.fillRect(player.width / 3, canvas.height - player.height, player.life / 2, canvas.height / 80);

                ctx.font = `${textSize}px Arial`;
                ctx.fillStyle = 'red';
                //Show player score
                ctx.fillText(player.score, canvas.width - player.width, canvas.height - player.height / 1.5);

                //Show total attackers
                ctx.fillText(game.totalEnemies, player.width / 3, canvas.height / 12);

                //Show total invaders
                ctx.fillText(successfulInvaders, canvas.width - player.width, canvas.height / 12);

            } else {
                ctx.fillStyle = 'black';
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.font = `bold ${textSize}px Arial`;
                ctx.fillText('PAUSED', canvas.width / 2, canvas.height / 3);
                ctx.font = `${textSize0}px Arial`;
                ctx.fillText('Score : ' + player.score, canvas.width / 2, canvas.height / 2);
                ctx.fillText('Attackers : ' + game.totalEnemies, canvas.width / 2, canvas.height / 2 + canvas.height / 20);
                ctx.fillText('Invaders : ' + successfulInvaders, canvas.width / 2, canvas.height / 2 + canvas.height / 10);
                ctx.fillText('Shots : ' + player.roundsFired, canvas.width / 2, canvas.height / 2 + canvas.height / 6.67);
                ctx.fillText('Rank : ' + performanceRank, canvas.width / 2, canvas.height / 2 + canvas.height / 5);
                pauseAudio();
            }


            requestID = requestAnimationFrame(gameLoop);

            // console.log("game loop here bro!");
        };



        let initialTouchX = null; // Store the initial touch X position

        // Handle touch events for gun rotation and shooting
        canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            //For Shooting
            // startTouchX = e.changedTouches[0].clientX;
            // startTouchY = e.changedTouches[0].clientY;
            if (!game.gameOver) {

                const touch = e.touches[0];
                const gunX = canvas.width / 2;
                const deltaX = touch.clientX - gunX;
                const deltaY = canvas.height - touch.clientY;
                gunAngle = (Math.atan2(deltaX, deltaY) * 180) / Math.PI;
                player.roundsFired++;
                shootAudio.play();
                recoilEffect = 3;
                recoilEffectX = gunAngle < 0 ? recoilEffect * Math.cos(((gunAngle + 90) * Math.PI) / 180) : recoilEffect * Math.cos(((gunAngle + 270) * Math.PI) / 180);
                recoilEffectY = recoilEffect * Math.cos((gunAngle * Math.PI) / 180);
                const bulletSize = canvas.width / 48;
                const bulletX = canvas.width / 2 - bulletSize / 2 + gunHeight * Math.sin((gunAngle * Math.PI) / 180);
                const bulletY = canvas.height - gunHeight * Math.cos((gunAngle * Math.PI) / 180);

                bullets.push({ size: bulletSize, x: bulletX, y: bulletY, angle: gunAngle });

                if (!showGunFire) {
                    fireImageNo = ++fireImageNo % 3;
                    showGunFire = true;
                }

            }

            //Begin changing gun direction
            const { pageX } = e.touches[0];
            initialTouchX = pageX; // Store the initial touch position
        });

        canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            // Gun rotation
            if (!game.gameOver && initialTouchX !== null) {

                const { pageX } = e.touches[0];

                // Calculate the angle based on the difference between initial and current touch positions
                const deltaX = pageX - initialTouchX;
                const angle = Math.atan(deltaX, gunHeight);
                setGunAngle(angle);
                // Update the initial touch position for continuous rotation
                initialTouchX = pageX;
            }
        });

        canvas.addEventListener('touchend', (e) => {
            initialTouchX = null; // Reset the initial touch position on touchend

        });

        const handleMouseDown = (e) => {
            if (!game.gameOver) {
                player.roundsFired++;
                shootAudio.play();
                recoilEffect = 3;
                recoilEffectX = gunAngle < 0 ? recoilEffect * Math.cos(((gunAngle + 90) * Math.PI) / 180) : recoilEffect * Math.cos(((gunAngle + 270) * Math.PI) / 180);
                recoilEffectY = recoilEffect * Math.cos((gunAngle * Math.PI) / 180);
                const bulletSize = canvas.width / 48;
                const bulletX = canvas.width / 2 - bulletSize / 2 + gunHeight * Math.sin((gunAngle * Math.PI) / 180);
                const bulletY = canvas.height - gunHeight * Math.cos((gunAngle * Math.PI) / 180);

                bullets.push({ size: bulletSize, x: bulletX, y: bulletY, angle: gunAngle });

                if (!showGunFire) {
                    fireImageNo = ++fireImageNo % 3;
                    showGunFire = true;
                }
            }
        }

        const handleMouseMove = (e) => {
            const mousePosX = (e.clientX - canvasLeftBorder) * correctMouseX;
            const mousePosY = (e.clientY - canvasTopBorder) * correctMouseY;
            const gunX = canvas.width / 2;
            const deltaX = mousePosX - gunX;
            const deltaY = canvas.height - mousePosY;
            if (!game.gameOver)
                gunAngle = (Math.atan2(deltaX, deltaY) * 180) / Math.PI;
        }

        // const handleMouseUp = () => {

        // }

        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mousemove', handleMouseMove);
        // canvas.addEventListener('mouseup', handleMouseUp);

        // Initialize the game
        gameLoop();

        // Create enemies
        let setId;
        setId = setInterval(() => {
            // console.log("Set Interval here bro!");
            if (game.totalEnemies >= 1000) {
                player.performance = ((player.score*9) / player.roundsFired + player.life / 200) * 100 - (successfulInvaders / 30 + blocksDestroyed / 576) * 100;
                if (player.performance >= 900) performanceRank = 'Legendary!';
                else if (player.performance >= 800) performanceRank = 'Outstanding!';
                else if (player.performance >= 700) performanceRank = 'Excellent!';
                else if (player.performance >= 500) performanceRank = 'Great!';
                else if (player.performance >= 300) performanceRank = 'Good';
                else if (player.performance >= 100) performanceRank = 'Poor';
                else performanceRank = 'Bad';
            }

            // console.log(performance);

            let selectEnemy = Math.random();

            if (game.totalEnemies < 500)
                selectEnemy = .1;

            if (game.totalEnemies >= 500 && game.totalEnemies < 1000) {
                if (selectEnemy < .5) selectEnemy = .1;
                else selectEnemy = .4;
            }

            if (game.totalEnemies >= 1000 && game.totalEnemies < 1500) {
                if (selectEnemy < .3) selectEnemy = .1;
                else if (selectEnemy >= .3 && selectEnemy < .5) selectEnemy = .4;
                else selectEnemy = .7;
            }

            if (game.totalEnemies >= 1500 && game.totalEnemies < 2000) {
                if (selectEnemy < .3) selectEnemy = .1;
                else if (selectEnemy >= .3 && selectEnemy < .5) selectEnemy = .4;
                else if (selectEnemy >= .5 && selectEnemy < .7) selectEnemy = .7;
                else selectEnemy = .8;
            }

            if (game.totalEnemies >= 2000 && game.totalEnemies < 2500) {
                if (selectEnemy < .3) selectEnemy = .1;
                else if (selectEnemy >= .3 && selectEnemy < .5) selectEnemy = .4;
                else if (selectEnemy >= .5 && selectEnemy < .7) selectEnemy = .7;
                else if (selectEnemy >= .7 && selectEnemy < .8) selectEnemy = .6;
                else selectEnemy = .8;
            }

            let enemyType = 'robot';
            let resilience = 3;
            let speedX = 0;
            let speedY = 3;
            let moveYLimit = canvas.height - canvas.height / 16;
            let enemyWidth = canvas.width / 12;
            let enemyHeight = canvas.height / 16;

            if (selectEnemy >= .3 && selectEnemy < .5) {
                enemyHeight = canvas.height / 8;
                enemyType = 'ram';
                resilience = 5;
                speedY = 2;
            }
            if (game.gameOver) speedY = 0;
            let enemyX = Math.random() * (canvas.width - enemyWidth);
            if (selectEnemy >= .5 && selectEnemy < .7) {
                enemyType = 'destroyer';
                if (destroyerSuccessful) {
                    enemyWidth = canvas.width / 6.86;
                    enemyHeight = canvas.height / 6.6;
                    resilience = 1;
                    speedX = 0;
                    speedY = 4;
                    enemyX = canvas.width - enemyWidth;
                    moveYLimit = canvas.height;
                } else {
                    enemyWidth = canvas.width / 6;
                    enemyHeight = canvas.height / 5.3;
                    resilience = 7;
                    speedY = 1.5;
                    enemyX = canvas.width - enemyWidth;
                    moveYLimit = canvas.height;
                }
            }

            if (selectEnemy >= .7 && selectEnemy < .8) {
                enemyWidth = canvas.width / 9.6;
                enemyHeight = canvas.height / 6.7;
                enemyType = 'ladyZigzag';
                resilience = 1;
                speedX = -4;
                speedY = 2;
                if (game.totalEnemies >= 2500)
                    enemyX = canvas.width - canvas.width / 3.7;
                else {
                    if (Math.random() < .5) enemyX = canvas.width - canvas.width / 3.7;
                    else enemyX = canvas.width / 3;
                }
                moveYLimit = canvas.height / 2;
            }
            if (selectEnemy >= .8 && selectEnemy < .9) {
                enemyWidth = canvas.width / 9.6;
                enemyHeight = canvas.height / 6.7;
                enemyType = 'rpg';
                resilience = 1;
                speedX = 1;
                speedY = 1;
                enemyX = enemyWidth;
                moveYLimit = enemyHeight;
            }
            if (selectEnemy >= .9) {
                enemyWidth = canvas.width / 3.2;
                enemyHeight = canvas.height / 4;
                enemyType = 'tank';
                resilience = 15;
                speedX = 1;
                speedY = 1;
                enemyX = canvas.width / 2 - enemyWidth / 2;
                moveYLimit = 0;
            }
            let enemyY = -enemyHeight;

            createEnemy = true;

            enemies.forEach((enemy) => {
                if ((selectEnemy >= .5 && selectEnemy < .7 && enemy.enemyMake === 'destroyer') ||
                    (selectEnemy >= .7 && selectEnemy < .8 && enemy.enemyMake === 'ladyZigzag') ||
                    (selectEnemy >= .8 && selectEnemy < .9 && enemy.enemyMake === 'rpg') ||
                    (selectEnemy >= .9 && enemy.enemyMake === 'tank'))
                    createEnemy = false;

                if (game.gameOver && selectEnemy < .5 && (enemy.enemyMake === 'robot' || enemy.enemyMake === 'ram')) createEnemy = false;
            });

            if (pauseRef.current.textContent === "||") {

                if (createEnemy && game.enemyCreationTime >= 200) {
                    enemies.push({ enemyMake: enemyType, power: resilience, x: enemyX, y: enemyY, width: enemyWidth, height: enemyHeight, vx: speedX, vy: speedY, moveTo: moveYLimit, hit: false });
                    game.totalEnemies++;
                    if (game.totalEnemies % 100 === 0) {
                        game.enemyCreationTime -= 10;
                    }
                }

            }
        }, game.enemyCreationTime);

        return () => {
            // canvas.removeEventListener('touchstart');
            // canvas.removeEventListener('touchmove');
            cancelAnimationFrame(requestID);
            clearInterval(setId);
        };
    }, []);

    return (
        <div className="aroundCanvasbf" id='home'>
            <div className="samePosbf">
                <div className='infobf'>i
                    <span className='tooltip-textbf'>
                        *Your task is to defend a country's border against an invading army.<br />
                        *Tap screen to shoot in the direction you tap.<br />
                        *Move finger to any side of the screen to rotate your gun.<br />
                        *Tap 'O' to restart game.<br />
                        *Tap '||' to pause game.<br />
                        *Tap '►' to resume game.<br />
                        *Tap 'X' to exit game.<br />
                        *Tap this instruction screen to return to game<br />
                    </span>
                    <span className='tooltip-text-desktopbf'>
                        *Your task is to defend a country's border against an invading army.<br />
                        *Left click the left mouse button to shoot in the direction of your cursor.<br />
                        *Move your mouse to aim the gun at any direction.<br />
                        *Click 'O' to restart game.<br />
                        *Click '||' to pause game.<br />
                        *Click '►' to resume game.<br />
                        *Click 'X' to exit game.<br />
                    </span>
                </div>
                <div ref={restartRef} onClick={() => setRestart(true)} className={restart ? 'restart1bf' : 'restart2bf'}>
                    O
                </div>
                <p ref={pauseRef} onClick={() => setPause(!pause)} className="pausebf">
                    {!pause ? "||" : "►"}
                </p>
                <Link to="/isiapps#home">
                    <div className='exitbf'>X</div>
                </Link>
            </div>
            <canvas
                ref={canvasRef} className={window.innerHeight > window.innerWidth ? 'portraitbf' : 'landscapebf'}

                style={{ backgroundColor: 'lightgray' }}
            ></canvas>
        </div>
    );
};

export default BorderForce;
