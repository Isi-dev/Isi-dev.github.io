import React, { useState, useRef, useEffect } from 'react';
import './archersAim.css';
import { HashLink as Link } from 'react-router-hash-link';
import ImagesFromDBPromise from '../borderForce/imagesToOffline';



const ArchersAim = () => {
    const canvasRef = useRef(null);
    const [pause, setPause] = useState(false);
    const [restart, setRestart] = useState("");
    const restartRef = useRef("null");
    const pauseRef = useRef("null");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //Wait for data to store in database and load
        var ImagesOffline = [];
        let requestID;

        const fetchData = async () => {
            try {

                const imagesOffline = await ImagesFromDBPromise;
                ImagesOffline = Array.from(imagesOffline);

                setLoading(false);
                setTimeout(() => {
                    initializeComponent();
                }, 0);

            } catch (error) {
                console.error(error);
                setLoading(false); // Set loading to false in case of an error
            }
        };

        fetchData();

        const initializeComponent = () => {
            const canvas = canvasRef.current;

            if (!canvas) {
                console.error('Canvas element not found.');
                return;
            }


            if (window.innerHeight > window.innerWidth) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            } else {
                canvas.width = 480;
                canvas.height = 800;
            }

            const ctx = canvas.getContext('2d');

            // var img = '/assets/appImages/borderForceSprite.png';
            var allImages = new Image();
            // allImages.src = img;
            // allImages.src = BfThoughts[0].image;
            if (ImagesOffline && ImagesOffline.length > 0) {
                allImages.src = ImagesOffline[2].imageURL;
            } else {
                console.log("Local storage not accessible.");
                allImages.src = '/assets/appImages/archersAimSprite.png';
            }
            let showImages = false;
            allImages.onload = function () {
                showImages = true;
            };

            allImages.onerror = function () {
                console.error('Error loading image from database');
            };


            //Touch inputs
            const canvasTopBorder = canvas.getBoundingClientRect().top;
            const correctMouseY = canvas.height / canvas.getBoundingClientRect().height;
            const canvasLeftBorder = canvas.getBoundingClientRect().left;
            const correctMouseX = canvas.width / canvas.getBoundingClientRect().width;

            var player = { score: 0, gameover: false, arrowAim: true, backToAim: 0 }

            var gunAngle = 0;
            const maxAngle = 30;

            const setGunAngle = function (newAngle) {
                if (gunAngle > -maxAngle && gunAngle < maxAngle)
                    gunAngle += newAngle;
                if (gunAngle < -maxAngle) gunAngle = -maxAngle + 1;
                if (gunAngle > maxAngle) gunAngle = maxAngle - 1;
                // console.log(gunAngle)
            }

            // Player's arrows
            const archerWidth = canvas.width / 2.8;
            const archerHeight = canvas.height / 3.1;
            const hArcherWidth = archerWidth / 2;
            const sArcherHeight = archerHeight / 1.2;
            let playing = true;
            let bullets = [];

            let objectsToHit = [];
            let objectsCreatedNo = 0;
            let objectAppearanceDelay = 0;

            //Create object
            const createObject = function (objType, objStartX, objStartY, objSpeedX, objSpeedY, objMoveYLimit, objWidth, objHeight, objColor) {
                objectsToHit.push({ make: objType, x: objStartX, y: objStartY, width: objWidth, height: objHeight, vx: objSpeedX, vy: objSpeedY, moveTo: objMoveYLimit, color: objColor });
                objectsCreatedNo++;
            }



            // Game loop
            const gameLoop = () => {
                //Restart stuff
                if (restartRef.current.className === 'restart1AA') {
                    playing = true;
                    bullets = [];
                    objectsToHit = [];
                    objectsCreatedNo = 0;


                };


                //update and draw stuff
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                if (pauseRef.current.textContent === "||") {
                    if (!playing) playing = true;




                    //Create objects
                    if (objectsToHit.length === 0 && objectAppearanceDelay++ >= 50) {
                        if (objectsCreatedNo <= 20) {
                            let color = "pink";
                            const colNo = Math.random();
                            // console.log(colNo);
                            if (colNo < 0.5) color = "yellow";
                            createObject("circle", Math.random() * canvas.width * 0.8, canvas.height / 10, 0, 0, canvas.height / 10, canvas.width / 10, canvas.width / 10, color);
                        }
                        objectAppearanceDelay = 0;
                    }

                    if (objectsToHit.length > 0) {
                        //First 10 circles
                        if (objectsCreatedNo <= 20) {
                            objectsToHit.forEach((obj) => {
                                ctx.beginPath();
                                if (obj.color === "pink")
                                    ctx.fillStyle = "yellow";
                                else ctx.fillStyle = "pink";
                                ctx.arc(obj.x, obj.y, obj.width / 1.5, 0, 2 * Math.PI);
                                ctx.fill();

                                ctx.beginPath();
                                ctx.fillStyle = obj.color;
                                ctx.strokeStyle = "black";
                                ctx.arc(obj.x, obj.y, obj.width / 2, 0, 2 * Math.PI);
                                ctx.fill();
                                ctx.stroke();

                                ctx.beginPath();
                                ctx.fillStyle = 'brown';
                                ctx.arc(obj.x, obj.y, obj.width / 15, 0, 2 * Math.PI);
                                ctx.fill();
                            });
                        }
                    }



                    bullets.forEach((bullet) => {

                        ctx.save();
                        ctx.translate(bullet.x + bullet.width / 2, bullet.y);
                        ctx.rotate((bullet.angle * Math.PI) / 180);
                        ctx.translate(-(bullet.x + bullet.width / 2), -bullet.y);
                        ctx.drawImage(allImages, 0, 0, 6, 32, bullet.x, bullet.y, bullet.width, bullet.height);
                        ctx.restore();




                        bullet.x += Math.sin((bullet.angle * Math.PI) / 180) * bullet.speed; // Move the bullet in the direction it's facing
                        bullet.y -= Math.cos((bullet.angle * Math.PI) / 180) * bullet.speed;

                        objectsToHit.forEach((obj, index) => {
                            if (
                                (bullet.x + bullet.width / 2 > obj.x - obj.width / 3 &&
                                    bullet.x + bullet.width / 2 < obj.x + obj.width / 3) &&
                                (
                                    bullet.y <= obj.y + obj.height / 2 && bullet.y > obj.y - obj.height / 4)
                            ) {
                                objectsToHit.splice(index, 1);
                                bullet.speed = 3;
                            }
                        });


                        if (bullet.x + bullet.width < 0 || bullet.y + bullet.height < 0 || bullet.x > canvas.width) {
                            bullets.splice(bullets.indexOf(bullet), 1);
                            // player.arrowAim = true;
                        }

                    });

                    if (!player.arrowAim) {
                        if (player.backToAim++ > 30) {
                            player.arrowAim = true;
                            player.backToAim = 0;
                        }
                    }





                    // Draw archer
                    ctx.save();
                    ctx.translate(canvas.width / 2, canvas.height);
                    ctx.rotate((gunAngle * Math.PI) / 180);
                    if (showImages) {
                        if (player.arrowAim) {
                            ctx.drawImage(allImages, 100, 0, 86, 129, -hArcherWidth, -sArcherHeight, archerWidth, archerHeight);
                        }
                        else {

                            ctx.drawImage(allImages, 10, 0, 86, 129, -hArcherWidth, -sArcherHeight, archerWidth, archerHeight);
                        }

                    } else {
                        ctx.fillStyle = 'brown';
                        ctx.fillRect(-hArcherWidth, -sArcherHeight, archerWidth, archerHeight);
                    }
                    ctx.restore();



                } else { //Show paused screen

                }


                requestID = requestAnimationFrame(gameLoop);

            };

            let initialTouchX = null; // Store the initial touch X position


            // Handle touch events for gun rotation and shooting
            canvas.addEventListener('touchstart', (e) => {
                e.preventDefault();
                //Begin changing gun direction
                const { pageX } = e.touches[0];
                initialTouchX = pageX; // Store the initial touch position
            });

            canvas.addEventListener('touchmove', (e) => {
                e.preventDefault();
                // Gun rotation
                if (playing && !player.gameover && initialTouchX !== null) {

                    const { pageX } = e.touches[0];

                    // Calculate the angle based on the difference between initial and current touch positions
                    const deltaX = pageX - initialTouchX;
                    const angle = Math.atan(deltaX, sArcherHeight);
                    setGunAngle(angle);
                    // Update the initial touch position for continuous rotation
                    initialTouchX = pageX;
                }
            });

            canvas.addEventListener('touchend', (e) => {
                const arrowWidth = canvas.width / 40;
                const arrowHeight = canvas.height / 12.5;
                const ang = gunAngle;
                const arrowX = canvas.width / 2 - arrowWidth / 2 + (sArcherHeight + arrowHeight) * Math.sin((ang * Math.PI) / 180);
                const arrowY = canvas.height - (sArcherHeight + arrowHeight) * Math.cos(((ang) * Math.PI) / 180);

                if (player.arrowAim) {
                    bullets.push({ width: arrowWidth, height: arrowHeight, x: arrowX, y: arrowY, angle: ang, speed:4 });
                    player.arrowAim = false;
                }
                initialTouchX = null; // Reset the initial touch position on touchend

            });

            // const handleMouseDown = (e) => {
            //     if (playing && !game.gameOver && !game.victory) {
            //         const mousePosX = (e.clientX - canvasLeftBorder) * correctMouseX;
            //         const mousePosY = (e.clientY - canvasTopBorder) * correctMouseY;
            //         const gunX = canvas.width / 2;
            //         const deltaX = mousePosX - gunX;
            //         const deltaY = canvas.height - mousePosY;


            //         const bulletSize = canvas.width / 48;
            //         const bulletX = canvas.width / 2 - bulletSize / 2 + gunHeight * Math.sin((gunAngle * Math.PI) / 180);
            //         const bulletY = canvas.height - gunHeight * Math.cos((gunAngle * Math.PI) / 180);

            //         bullets.push({ size: bulletSize, x: bulletX, y: bulletY, angle: gunAngle });

            //         if (!showGunFire) {
            //             fireImageNo = ++fireImageNo % 3;
            //             showGunFire = true;
            //         }

            //     }
            // }

            // const handleMouseMove = (e) => {
            //     const mousePosX = (e.clientX - canvasLeftBorder) * correctMouseX;
            //     const mousePosY = (e.clientY - canvasTopBorder) * correctMouseY;
            //     const gunX = canvas.width / 2;
            //     const deltaX = mousePosX - gunX;
            //     const deltaY = canvas.height - mousePosY;
            //     if (playing && !game.gameOver && !game.victory)
            //         gunAngle = (Math.atan2(deltaX, deltaY) * 180) / Math.PI;
            // }

            // // const handleMouseUp = () => {

            // // }

            // canvas.addEventListener('mousedown', handleMouseDown);
            // canvas.addEventListener('mousemove', handleMouseMove);
            // // canvas.addEventListener('mouseup', handleMouseUp);

            // Initialize the game
            gameLoop();

        };






        return () => {
            // canvas.removeEventListener('touchstart');
            // canvas.removeEventListener('touchmove');
            cancelAnimationFrame(requestID);
        };
    }, []);



    if (loading) {
        return (
            <>
                <div>
                    <p style={{ textalign: 'center' }}>Loading...</p>
                </div>
            </>
        );
    }

    else {


        return (
            <div className="aroundCanvasAA" id='home'>
                <div className="samePosAA">
                    <div className='infoAA'>i
                        <span className='tooltip-textAA'>
                            *Your task is to defend a country's border against an invading army.<br />
                            *Tap screen to shoot in the direction you tap.<br />
                            *The number, 10, on the screen represents the number of bombs in the your possession. Tap it to release a bomb from the base of your gun.<br />
                            *Move finger to any side of the screen to rotate your gun.<br />
                            *Tap 'O' to restart game.<br />
                            *Tap '||' to pause game.<br />
                            *Tap '►' to resume game.<br />
                            *Tap 'X' to exit game.<br />
                            *Tap this instruction screen to return to game<br />
                        </span>
                        <span className='tooltip-text-desktopAA'>
                            *Your task is to defend a country's border against an invading army.<br />
                            *Left click the left mouse button to shoot in the direction of your cursor.<br />
                            *The number, 10, on the screen represents the number of bombs in the your possession. Tap it to release a bomb from the base of your gun.<br />
                            *Move your mouse to aim the gun at any direction.<br />
                            *Click 'O' to restart game.<br />
                            *Click '||' to pause game.<br />
                            *Click '►' to resume game.<br />
                            *Click 'X' to exit game.<br />
                        </span>
                    </div>
                    <div ref={restartRef} onClick={() => setRestart(true)} className={restart ? 'restart1AA' : 'restart2AA'}>
                        O
                    </div>
                    <p ref={pauseRef} onClick={() => setPause(!pause)} className="pauseAA">
                        {!pause ? "||" : "►"}
                    </p>
                    <Link to="/isiapps#home">
                        <div className='exitAA'>X</div>
                    </Link>
                </div>
                <canvas
                    ref={canvasRef} className={window.innerHeight > window.innerWidth ? 'portraitAA' : 'landscapeAA'}

                    style={{ backgroundColor: 'skyblue' }}
                ></canvas>
            </div>
        );

    };


};

export default ArchersAim
