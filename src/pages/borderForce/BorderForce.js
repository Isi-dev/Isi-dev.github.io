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


        var gunAngle = 0;
        const setGunAngle = function (newAngle) {
            gunAngle += newAngle;
            // console.log(gunAngle)
        }
        const bullets = [];
        const enemies = [];

        const blockSize = canvas.width / 48;
        const wallY = canvas.height - canvas.height / 4.7;
        const wall = [];

        //Build wall
        for (let bh = 0; bh < 10; bh++) {
            for (let bx = 0; bx < 48; bx++) {
                wall.push({ size: blockSize, x: bx * blockSize, y: wallY + bh * blockSize });
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

        //Create explosion effect
        // Define the explosion particles
        const particles = [];

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

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw wall
            wall.forEach((block) => {
                ctx.drawImage(allImages, 230, 0, 5, 5, block.x, block.y, block.size, block.size);

            });


            // Draw gun
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height);
            ctx.rotate((gunAngle * Math.PI) / 180);
            if (showImages) {
                ctx.drawImage(allImages, 0, 0, 60, 100, -gunImageWidth / 2, -gunHeight + recoilEffectY + recoilEffectX, gunImageWidth, gunHeight);
            } else {
                ctx.fillStyle = 'green';
                ctx.fillRect(-gunWidth / 2, -gunHeight, gunWidth, gunHeight);
            }
            ctx.restore();

            // Draw bullets
            bullets.forEach((bullet) => {
                ctx.fillStyle = 'gray';
                ctx.fillRect(bullet.x, bullet.y, bullet.size, bullet.size);
                bullet.x += Math.sin((bullet.angle * Math.PI) / 180) * 5; // Move the bullet in the direction it's facing
                bullet.y -= Math.cos((bullet.angle * Math.PI) / 180) * 5;
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
                        ctx.drawImage(allImages, 70, 0, 50, 50, enemy.x + enemy.width / 2, enemy.y + enemy.height/1.5, 25, 25);
                        bullets.splice(bullets.indexOf(bullet), 1);
                        if (enemy.power-- <= 4) {
                            enemies.splice(index, 1);
                            if (enemy.enemyMake === 'robot')
                                createExplosion(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, 5, 50, 0, 1, 1, 0.04);
                            if (enemy.enemyMake === 'ram')
                                createExplosion(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, 7, 100, 0.5, 1, 1, 0.05);
                            if (enemy.enemyMake === 'destroyer')
                                createExplosion(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, 4, 500, 0, 1, .5, 0.01);
                        }
                        // createExplosion(x, y, rad, numParticles, speedFactor1, speedFactor2, alpha, alphaDecline)
                    }
                });
            });

            // Draw enemies
            enemies.forEach((enemy) => {
                if (showImages) {
                    if (enemy.enemyMake === 'destroyer')
                        ctx.drawImage(allImages, 350, 0, 80, 150, enemy.x, enemy.y, enemy.width, enemy.height);
                    if (enemy.enemyMake === 'robot')
                        ctx.drawImage(allImages, 250, 0, 40, 50, enemy.x, enemy.y, enemy.width, enemy.height);
                    if (enemy.enemyMake === 'ram')
                        ctx.drawImage(allImages, 300, 0, 40, 100, enemy.x, enemy.y, enemy.width, enemy.height);
                    

                } else {
                    ctx.fillStyle = 'black';
                    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
                }
                enemy.y += enemy.vy;

                // Check for collisions with wall
                wall.forEach((block, index) => {
                    if (
                        ((block.x > enemy.x &&
                            block.x < enemy.x + enemy.width) || (block.x < enemy.x && block.x + block.size > enemy.x)) &&
                        ((block.y > enemy.y &&
                            block.y < enemy.y + enemy.height) || (block.y < enemy.y && block.y + block.size > enemy.y))
                    ) {
                        // Remove the block and enemy upon collision
                        wall.splice(index, 1);
                        if (enemy.power-- === 0 && !enemy.hit) {
                            if (enemy.enemyMake === 'robot')
                                createExplosion(enemy.x + enemy.width / 2, enemy.y + enemy.height, 5, 50, 0, 1, 1, 0.04);
                            if (enemy.enemyMake === 'ram')
                                createExplosion(enemy.x + enemy.width / 2, enemy.y + enemy.height, 7, 100, 0.5, 1, 1, 0.05);
                            if (enemy.enemyMake === 'destroyer')
                                createExplosion(enemy.x + enemy.width / 2, enemy.y + enemy.height, 4, 500, 0, 1, .5, 0.01);
                            enemy.hit = true;
                        }
                    }
                });
                if (enemy.hit) {
                    enemies.splice(enemies.indexOf(enemy), 1);

                }
            });



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

            requestID = requestAnimationFrame(gameLoop);

            // console.log("game loop here bro!");
        };



        let initialTouchX = null; // Store the initial touch X position

        // Handle touch events for gun rotation and shooting
        canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            // Shooting
            recoilEffect = 3;
            recoilEffectX = gunAngle < 0 ? recoilEffect * Math.cos(((gunAngle + 90) * Math.PI) / 180) : recoilEffect * Math.cos(((gunAngle + 270) * Math.PI) / 180);
            recoilEffectY = recoilEffect * Math.cos((gunAngle * Math.PI) / 180);
            const bulletSize = canvas.width / 48;
            const bulletX = canvas.width / 2 - bulletSize / 2 + gunHeight * Math.sin((gunAngle * Math.PI) / 180);
            const bulletY = canvas.height - gunHeight * Math.cos((gunAngle * Math.PI) / 180);

            bullets.push({ size: bulletSize, x: bulletX, y: bulletY, angle: gunAngle });

            if (!showGunFire) {
                fireImageNo = ++fireImageNo % 3;
                // gunFireX = canvas.width / 2 - canvas.height / 32 + gunHeight * Math.sin((gunAngle * Math.PI) / 180);
                // gunFireY = canvas.height - canvas.height / 32 - gunHeight * Math.cos((gunAngle * Math.PI) / 180);
                showGunFire = true;
            }


            //Begin changing gun direction
            const { pageX } = e.touches[0];
            initialTouchX = pageX; // Store the initial touch position
        });

        canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            // Gun rotation
            if (initialTouchX !== null) {
                const { pageX } = e.touches[0];

                // Calculate the angle based on the difference between initial and current touch positions
                const deltaX = pageX - initialTouchX;
                const angle = Math.atan(deltaX, gunHeight);
                setGunAngle(angle);
                // Update the initial touch position for continuous rotation
                initialTouchX = pageX;
            }
        });

        canvas.addEventListener('touchend', () => {
            initialTouchX = null; // Reset the initial touch position on touchend
        });

        // Initialize the game
        gameLoop();

        // Create enemies
        let setId;
        setId = setInterval(() => {
            // console.log("Set Interval here bro!");
            const selectEnemy = Math.random();
            let enemyType = 'robot';
            let resilience = 3;
            let speedY = 4;
            let shoots = false;
            let enemyWidth = canvas.width / 12;
            let enemyHeight = canvas.height / 16;
           
            if (selectEnemy >= .5 && selectEnemy < .8) {
                enemyHeight = canvas.height / 8;
                enemyType = 'ram';
                resilience = 5;
                speedY = 3;
            }
            if (selectEnemy >= .8) {
                enemyWidth = canvas.width / 6;
                enemyHeight = canvas.height / 5.3;
                enemyType = 'destroyer';
                resilience = 10;
                speedY = 2;
            }

            const enemyX = Math.random() * (canvas.width - enemyWidth);
            let enemyY = -enemyHeight;
            
            enemies.push({ enemyMake: enemyType, power: resilience, x: enemyX, y: enemyY, width: enemyWidth, height: enemyHeight, vy: speedY, canShoot: shoots, hit: false });
        }, 2000);

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
                        *Swipe up to move paddle up.<br />
                        *Swipe right to move paddle right.<br />
                        *Swipe left to move paddle left.<br />
                        *Swipe Down to move paddle down.<br />
                        *Tap the game screen to stop a moving paddle.<br />
                        *Tap 'O' to restart game.<br />
                        *Tap '||' to pause game.<br />
                        *Tap '►' to resume game.<br />
                        *Tap 'X' to exit game.<br />
                        *Tap this instruction screen to return to game<br />
                    </span>
                    <span className='tooltip-text-desktopbf'>
                        *Press the 'Up Arrow' key to move paddle up.<br />
                        *Press the 'Left Arrow' key to move paddle left and the 'Right Arrow' key to move paddle right.<br />
                        *Press the 'Down Arrow' key to move paddle down.<br />
                        *Press the 'Enter' key to stop a moving paddle.<br />
                        *Click 'O' to restart game.<br />
                        *Click '||' to pause game.<br />
                        *Click '►' to resume game.<br />
                        *Click 'X' to exit game.<br />
                        *Click the game screen to use the keys on your keyboard.<br />
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
                ref={canvasRef}

                style={{ backgroundColor: 'lightgray' }}
            ></canvas>
        </div>
    );
};

export default BorderForce;
