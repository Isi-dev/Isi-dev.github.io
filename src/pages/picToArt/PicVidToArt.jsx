import React, { useRef, useState } from 'react'
import './picart.css';
import { HashLink as Link } from 'react-router-hash-link';

const PicVidToArt = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedVideoFile, setSelectedVideoFile] = useState(null);
    const videoRef = useRef(null);
    const [frameInterval, setFrameInterval] = useState(12);
    const [blackThreshold, setBlackThreshold] = useState(225);
    const [penLightness, setPenLightness] = useState(1.0);
    const [maxThreshold, setMaxThreshold] = useState(255);
    const [numGrades, setNumGrades] = useState(255);
    const [contrast, setContrast] = useState(10);
    const [blur, setBlur] = useState(12);
    const [cblur, setCBlur] = useState(20);
    const [invert, setInvert] = useState(false);
    const [inputType, setInputType] = useState('grayscale');
    const [original, setOriginal] = useState(false);
    const [outputContainer, setOutputContainer] = useState(null);
    const [outputFrameContainer, setOutputFrameContainer] = useState(null);
    const [progress, setProgress] = useState(0);

    let count = 0;


    const handleInputChange = (event) => {
        // Handle changes in input values and update state accordingly
        const { id, value, type } = event.target;
        switch (type) {
            case 'checkbox':
                // For checkboxes, use the "checked" property to update the state
                switch (id) {
                    case 'invert':
                        setInvert(!invert);
                        break;
                    case 'original':
                        setOriginal(!original);
                        break;
                    // Add more cases for other checkboxes if needed
                    default:
                        break;
                }
                break;
            case 'number':
                // For numeric inputs, parse the value and update the state
                switch (id) {
                    case 'blackThreshold':
                        setBlackThreshold(parseInt(value, 10));
                        break;
                    case 'penLightness':
                        setPenLightness(parseFloat(value, 10));
                        break;
                    case 'maxThresholdInput':
                        setMaxThreshold(parseInt(value, 10));
                        break;
                    case 'numGradesInput':
                        setNumGrades(parseInt(value, 10));
                        break;
                    case 'contrastInput':
                        setContrast(parseInt(value, 10));
                        break;
                    case 'blurInput':
                        setBlur(parseInt(value, 10));
                        break;
                    case 'cblurInput':
                        setCBlur(parseInt(value, 10));
                        break;
                    case 'frameInterval':
                        setFrameInterval(parseInt(value, 10));
                        break;
                    default:
                        break;
                }
                break;
            // Add more cases for other input types if needed
            default:
                break;
        }

    };

    const handleInputTypeChange = (event) => {
        // Update the inputType state when radio button selection changes
        setInputType(event.target.value);
    };


    const handleFileChange = (event) => {
        // Update the selected file state when the file input changes
        setSelectedFile(event.target.files[0]);
    };

    const handleVideoFileChange = (event) => {
        setSelectedVideoFile(event.target.files[0]);
    }

    const handleConvertImage = () => {
        // Your conversion logic here
        // Update the state of outputImage with the result
        // e.g., setOutputImage(result);
        // Check if an image is selected
        if (!selectedFile) {
            alert('Please select an image.');
            return;
        }

        // count = 0;

        // Clear previous output
        setOutputContainer('');

        // Create a new FileReader
        const reader = new FileReader();

        // When the file is loaded, display the conversion result
        reader.onload = function (e) {
            // Create a new Image
            const img = new Image();
            img.src = e.target.result;

            // When the image is loaded, apply the sketch effect
            img.onload = function () {
                const inputTypeC = inputType ? inputType : 'color';

                setProgress(0);

                const sketchCanvas = applySketchEffect(img, {
                    blackThreshold: parseInt(blackThreshold, 10),
                    penLightness: parseFloat(penLightness),
                    maxThreshold: parseInt(maxThreshold, 10),
                    numGrades: parseInt(numGrades, 10),
                    contrast: parseInt(contrast, 10),
                    blur: parseInt(blur, 10),
                    cblur: parseInt(cblur, 10),
                    invert: invert,
                    inputType: inputTypeC,
                    original: original,
                });

                if (count > 0) {
                    count = 0;
                    console.log("input error back to " + count);
                    return;
                }


                // Set the sketch canvas to the output container
                setOutputContainer(sketchCanvas.toDataURL());
            };
        };

        // Read the image file as a data URL
        reader.readAsDataURL(selectedFile);

    };

    // Function to apply the sketch effect to an image
    const applySketchEffect = (img, options) => {
        validateInputs(options.blackThreshold, 10, 254, 'Black Pixels Threshold');
        validateInputs(options.penLightness, 0.1, 2, 'Lighten Sketch');
        validateInputs(options.maxThreshold, 2, 255, 'Color Threshold');
        validateInputs(options.numGrades, 2, 255, 'Number of Colors');
        validateInputs(options.contrast, 1, 20, 'Contrast');
        validateInputs(options.blur, 0, 20, 'GrayScale Blur');
        validateInputs(options.cblur, 0, 40, 'Color Blur');
        if (count > 0) {
            return;
        }

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d', { willReadFrequently: true });

        // Set canvas size to image size
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw the image on the canvas
        ctx.drawImage(img, 0, 0, img.width, img.height);

        // Get the image data from the canvas
        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        const data = imageData.data;
        const imageData2 = ctx.getImageData(0, 0, img.width, img.height);
        const data2 = imageData2.data;
        const imageData3 = ctx.getImageData(0, 0, img.width, img.height);
        const data3 = imageData3.data;



        if (options.inputType === 'color' && original) {
            return createCanvasFromImageData(imageData);
        }

        convertToGrayscale(data);


        if (original) {
            return createCanvasFromImageData(imageData);
        }

        convertToGrayscale(data2);
        invertPixelValues(data2);
        applyGaussianBlur(data2, img.width, img.height, options.blur);
        invertPixelValues(data2);

        // Apply the user-defined gradient
        applyGradient(data, options.maxThreshold, options.numGrades);

        divideImages(data, data2, 256);
        darkenImage(data, options.blackThreshold, options.penLightness);



        // Invert the pixel values (reverse black and white)
        if (invert) invertPixelValues(data);

        // Handle 'color' mode separately
        if (options.inputType === 'color') {

            // console.log("Color")
            // applyGradientColor(data3, options.maxThreshold, options.numGrades);
            applyGaussianBlur(data3, img.width, img.height, options.cblur);
            applyContrast(data3, options.contrast, options.inputType);
            putDarkLinesOnColoredImage(data3, data, options.blackThreshold)

            // Invert the pixel values (reverse black and white)
            // if (invert) invertPixelValues(data3);

            return createCanvasFromImageData(imageData3);
        }

        // Create a new canvas for the sketch
        const sketchCanvas = document.createElement('canvas');
        const sketchCtx = sketchCanvas.getContext('2d');
        sketchCanvas.width = img.width;
        sketchCanvas.height = img.height;


        // Draw pixels based on the inverted values
        for (let i = 0; i < data.length; i += 4) {
            const invertedValue = data[i];
            const x = (i / 4) % img.width;
            const y = Math.floor((i / 4) / img.width);
            sketchCtx.fillStyle = `rgb(${invertedValue}, ${invertedValue}, ${invertedValue})`;
            sketchCtx.fillRect(x, y, 1, 1);
        }

        // Return the canvas with the sketch
        return sketchCanvas;
    }

    const validateInputs = (inputData, minValue, maxValue, text) => {
        //Validate inputs
        if (!isNaN(inputData) && inputData >= minValue && inputData <= maxValue) {
            // console.log(text + " input okay!")
        } else {
            count++;
            console.log(count);
            alert('Please enter a valid value for ' + text);
            return;
        }
    }


    // Helper function to create a canvas from image data
    const createCanvasFromImageData = (imageData) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = imageData.width;
        canvas.height = imageData.height;
        ctx.putImageData(imageData, 0, 0);
        return canvas;
    }

    // Function to convert the image to grayscale
    const convertToGrayscale = (data) => {
        for (let i = 0; i < data.length; i += 4) {
            const average = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] = average;
            data[i + 1] = average;
            data[i + 2] = average;
        }
    }

    // Function to convert the image to grayscale
    const darkenImage = (data, threshold, scale) => {
        for (let i = 0; i < data.length; i += 4) {
            const gray = (data[i] + data[i + 1] + data[i + 2]) / 3;
            if (gray < threshold) {
                data[i] = data[i] * scale;
                data[i + 1] = data[i + 1] * scale;
                data[i + 2] = data[i + 2] * scale;
            }
        }
    }

    // Function to apply the user-defined gradient to the image data
    const applyGradient = (data, maxThreshold, numGrades) => {
        const interval = Math.floor(maxThreshold / (numGrades - 1));

        for (let i = 0; i < data.length; i += 4) {
            const value = data[i];
            let gradientValue = 0;

            for (let j = 0; j < numGrades; j++) {
                if (value <= j * interval) {
                    gradientValue = j * (255 / (numGrades - 1));
                    break;
                }
            }

            data[i] = gradientValue;
            data[i + 1] = gradientValue;
            data[i + 2] = gradientValue;
        }
    }

    const putDarkLinesOnColoredImage = (dataOriginal, dataEdges, threshold) => {
        // Iterate through pixels to overlay black lines
        for (let i = 0; i < dataOriginal.length; i += 4) {
            // Check if the pixel in the edges image is not black
            if (dataEdges[i] < threshold || dataEdges[i + 1] < threshold || dataEdges[i + 2] < threshold) {
                // Set the pixel in the original image to black
                dataOriginal[i] = dataEdges[i];       // Red channel
                dataOriginal[i + 1] = dataEdges[i + 1];   // Green channel
                dataOriginal[i + 2] = dataEdges[i + 2];   // Blue channel
            }
        }
    }


    // Function to invert the pixel values
    function invertPixelValues(data) {
        for (let i = 0; i < data.length; i += 4) {
            data[i] = 255 - data[i];
            data[i + 1] = 255 - data[i + 1];
            data[i + 2] = 255 - data[i + 2];
        }
    }

    //Function to perform pixel-wise division
    function divideImages(img1, img2, scale) {
        for (let i = 0; i < img1.length; i++) {
            img1[i] = img1[i] / img2[i] * scale;
        }
    }

    // Function to contrast the pixel values
    function applyContrast(data, contrast, inputType) {
        const con = contrast / 10;
        const gamma = 1.5 - con / 1.4;
        for (let i = 0; i < data.length; i += 4) {
            if (inputType === 'grayscale') {
                if (con >= 0.1 && con < 1) {
                    data[i] = data[i] * con;
                    data[i + 1] = data[i + 1] * con;
                    data[i + 2] = data[i + 2] * con;
                }
                if (con > 1 && con <= 2.1) {

                    data[i] = data[i] + 245 * (con - 1);
                    data[i + 1] = data[i + 1] + 245 * (con - 1);
                    data[i + 2] = data[i + 2] + 245 * (con - 1);
                    if (data[i] > 255) data[i] = 255;
                    if (data[i + 1] > 255) data[i + 1] = 255;
                    if (data[i + 2] > 255) data[i + 2] = 255;
                }
            }
            else {
                // Adjust the contrast of the colored image using gamma correction
                data[i] = Math.pow(data[i] / 255, gamma) * 255;
                data[i + 1] = Math.pow(data[i + 1] / 255, gamma) * 255;
                data[i + 2] = Math.pow(data[i + 2] / 255, gamma) * 255;
            }
        }
    }

    function applyGaussianBlur(data, width, height, blurRadius) {
        if (blurRadius === 0) {
            // No blur, simply return without processing
            return;
        }

        const matrixSize = blurRadius * 2 + 1;
        const weights = calculateGaussianWeights(blurRadius);

        const result = new Uint8ClampedArray(data.length);

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let red = 0;
                let green = 0;
                let blue = 0;
                let alpha = 0;

                for (let i = 0; i < matrixSize; i++) {
                    for (let j = 0; j < matrixSize; j++) {
                        const offsetX = (x + i - blurRadius + width) % width;// Ensure offsetX is within bounds
                        const offsetY = (y + j - blurRadius + height) % height; // Ensure offsetY is within bounds

                        const pixelIndex = (offsetY * width + offsetX) * 4;

                        const weight = weights[i] * weights[j];

                        red += data[pixelIndex] * weight;
                        green += data[pixelIndex + 1] * weight;
                        blue += data[pixelIndex + 2] * weight;
                        alpha += data[pixelIndex + 3] * weight;
                    }
                }

                const resultIndex = (y * width + x) * 4;
                result[resultIndex] = red;
                result[resultIndex + 1] = green;
                result[resultIndex + 2] = blue;
                result[resultIndex + 3] = alpha;
            }
        }

        data.set(result);
    }

    function calculateGaussianWeights(blurRadius) {
        const weights = [];

        for (let i = -blurRadius; i <= blurRadius; i++) {
            const weight = gaussianFunction(i, blurRadius / 3.0); // You can adjust the standard deviation here
            weights.push(weight);
        }

        const sum = weights.reduce((acc, val) => acc + val, 0);
        return weights.map((val) => val / sum);
    }

    function gaussianFunction(x, sigma) {
        return (1 / (2 * Math.PI * sigma * sigma)) * Math.exp(-(x * x) / (2 * sigma * sigma));
    }



    const handleDownloadImage = () => {
        // Implement download logic// Check if there is an output canvas
        if (!outputContainer) {
            alert('Please convert an image first.');
            return;
        }

        // Create a unique filename based on the timestamp
        const timestamp = new Date().getTime();
        const newFilename = `sketch_${timestamp}.png`;

        // Create a link element to trigger the download
        const downloadLink = document.createElement('a');
        downloadLink.href = outputContainer; // Assuming outputContainer is a data URL
        downloadLink.download = newFilename;

        // Append the link to the body
        document.body.appendChild(downloadLink);

        // Trigger the download
        downloadLink.click();

        // Remove the link from the body
        document.body.removeChild(downloadLink);
    };


    const handleConvertBatchImages = async () => {
        //implement
        const validateFolderName = (name) => {
            // Trim leading/trailing whitespaces
            const trimmedName = name.trim();

            // Check for reserved names or other restrictions
            if (['CON', 'PRN', 'AUX', 'NUL', 'COM1', 'COM2' /*... add more reserved names ...*/].includes(trimmedName.toUpperCase())) {
                throw new Error(`Invalid folder name: ${trimmedName}`);
            }

            // Add more validation checks if needed

            return trimmedName;
        };

        const getValidatedDirectoryHandle = async (fileHandle, folderName) => {
            try {
                const validatedFolderName = validateFolderName(folderName);
                return await fileHandle.getDirectoryHandle(validatedFolderName, { create: true });
            } catch (error) {
                console.error(error);
                throw error; // Rethrow the error to handle it appropriately in the calling code
            }
        };

        // Request file system access
        try {
            const fileHandle = await window.showDirectoryPicker();

            const inputFolderHandle = await getValidatedDirectoryHandle(fileHandle, 'picsIn');
            console.log('Obtained file handle:', fileHandle);

            // Get all files in the input folder
            const inputFolderEntries = await inputFolderHandle.values();
            console.log('Input folder entries:', inputFolderEntries);
            const inputFolderFiles = [];

            for await (const entry of inputFolderEntries) {
                console.log(entry.name, entry.isFile, entry.isDirectory, entry.kind);

                if (entry.kind === 'file') {
                    inputFolderFiles.push(entry);
                }
            }

            // Check if there are images in the input folder
            if (inputFolderFiles.length === 0) {
                alert('No images found in the input folder.');
                return;
            }

            // Iterate through images and perform batch conversion
            for (let i = 0; i < inputFolderFiles.length; i++) {
                const file = inputFolderFiles[i];
                const fileHandle = await file.getFile();

                // Create a new FileReader
                const reader = new FileReader();

                reader.onload = function (e) {
                    const img = new Image();
                    img.src = e.target.result;

                    img.onload = function () {
                        const inputTypeC = inputType ? inputType : 'color';
                        const sketchCanvas = applySketchEffect(img, {
                            blackThreshold: parseInt(blackThreshold, 10),
                            penLightness: parseFloat(penLightness),
                            maxThreshold: parseInt(maxThreshold, 10),
                            numGrades: parseInt(numGrades, 10),
                            contrast: parseInt(contrast, 10),
                            blur: parseInt(blur, 10),
                            cblur: parseInt(cblur, 10),
                            invert: invert,
                            inputType: inputTypeC,
                            original: original,
                        });

                        if (count > 0) {
                            count = 0;
                            return;
                        }

                        // Create a unique filename based on the timestamp
                        const filename = `sketch_${new Date().getTime()}_${i}.png`;

                        // Trigger download for the converted image
                        downloadCanvas(sketchCanvas, filename);

                    };
                };

                // Read the image file as a data URL
                reader.readAsDataURL(fileHandle);
            }
        } catch (error) {
            console.error(error);
        }

    };

    const downloadCanvas = (canvas, filename) => {
        // Convert the canvas to a data URL
        const dataURL = canvas.toDataURL('image/png');

        // Create a download link
        const a = document.createElement('a');
        a.href = dataURL;
        a.download = filename;

        // Trigger a click on the link to start the download
        a.click();
    }

    const handleLoadVideo = () => {
        // Implement video loading logic


        // Check if a video is selected
        if (!selectedVideoFile) {
            alert('Please select a video.');
            return;
        }
        videoRef.current.src = URL.createObjectURL(selectedVideoFile);
    };

    let frameCount = 0;

    const handleConvertFrames = () => {
        // Implement frame conversion logic

        // Check if the video is loaded
        if (!videoRef.current.src || videoRef.current.src === 'undefined') {
            alert('Please load a video first.');
            return;
        }

        // Create a canvas for drawing video frames
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;

        let capturedFrames = new Set();

        // Set initial time to zero
        let currentTime = 0;

        // Function to capture frame and apply sketch effect
        function captureAndSketchFrame() {
            // Set video's current time
            videoRef.current.currentTime = currentTime;

            // Draw the current frame on the canvas
            ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            const frameDataUrl = canvas.toDataURL('image/png');

            // Check if the frame has already been captured
            if (capturedFrames.has(frameDataUrl)) {
                return;
            }

            // Add the frame to the set to avoid duplicates
            capturedFrames.add(frameDataUrl);

            // Create an Image object from the captured frame
            const frameImage = new Image();
            frameImage.src = frameDataUrl;

            frameImage.onload = function () {
                const inputTypeC = inputType ? inputType : 'color';

                const sketchCanvas = applySketchEffect(frameImage, {
                    blackThreshold: parseInt(blackThreshold, 10),
                    penLightness: parseFloat(penLightness),
                    maxThreshold: parseInt(maxThreshold, 10),
                    numGrades: parseInt(numGrades, 10),
                    contrast: parseInt(contrast, 10),
                    blur: parseInt(blur, 10),
                    cblur: parseInt(cblur, 10),
                    invert: invert,
                    inputType: inputTypeC,
                    original: original,
                });

                if (count > 0) {
                    count = 0;
                    console.log("input error back to " + count);
                    return;
                }

                // Create a link to download the sketched image
                frameCount++;
                const frameNumber = String(frameCount).padStart(3, '0'); // Use padStart to format the frame number
                const downloadLink = document.createElement('a');
                downloadLink.href = sketchCanvas.toDataURL('image/png');
                downloadLink.download = `frame_${frameNumber}.png`;

                // Append the link to the body
                document.body.appendChild(downloadLink);

                // Trigger the download
                downloadLink.click();

                // Remove the link from the body
                document.body.removeChild(downloadLink);

                // Move to the next frame
                currentTime += 1 / frameInterval;

                // Check if we've reached the end of the video
                if (currentTime >= videoRef.current.duration) {
                    clearInterval(captureInterval);
                    alert('Finished Video Conversion!');
                    return;
                }
            };
        }

        // Set interval to capture frames
        const captureInterval = setInterval(captureAndSketchFrame, 100);
    };

    const handleConvertCurrentFrame = () => {
        // Implement current frame conversion logic
        // Check if the video is loaded
        if (!videoRef.current.src || videoRef.current.src === 'undefined') {
            alert('Please load a video first.');
            return;
        }

        // Create a canvas container
        setOutputFrameContainer('');

        // Create a canvas for drawing video frames
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;


        // Draw the current frame on the canvas
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const frameDataUrl = canvas.toDataURL('image/png');


        // Create an Image object from the captured frame
        const frameImage = new Image();
        frameImage.src = frameDataUrl;

        frameImage.onload = function () {
            const inputTypeC = inputType ? inputType : 'color';

            setProgress(0);

            const sketchCanvas = applySketchEffect(frameImage, {
                blackThreshold: parseInt(blackThreshold, 10),
                penLightness: parseFloat(penLightness),
                maxThreshold: parseInt(maxThreshold, 10),
                numGrades: parseInt(numGrades, 10),
                contrast: parseInt(contrast, 10),
                blur: parseInt(blur, 10),
                cblur: parseInt(cblur, 10),
                invert: invert,
                inputType: inputTypeC,
                original: original,
            });

            if (count > 0) {
                count = 0;
                console.log("input error back to " + count);
                return;
            }


            // Set the sketch canvas to the output container
            setOutputFrameContainer(sketchCanvas.toDataURL());
        };
    };

    const handleDownloadFrame = () => {
        // Implement download logic// Check if there is an output canvas
        if (!outputFrameContainer) {
            alert('Please convert a video frame first.');
            return;
        }

        // Create a unique filename based on the timestamp
        const timestamp = new Date().getTime();
        const newFilename = `sketch_${timestamp}.png`;

        // Create a link element to trigger the download
        const downloadLink = document.createElement('a');
        downloadLink.href = outputFrameContainer; // Assuming outputFrameContainer is a data URL
        downloadLink.download = newFilename;

        // Append the link to the body
        document.body.appendChild(downloadLink);

        // Trigger the download
        downloadLink.click();

        // Remove the link from the body
        document.body.removeChild(downloadLink);
    };


    return (
        <div className="aroundCanvasArt" id='home'>
            <div className="samePosArt">
                <div className='infoArt'>i
                    <span className='tooltip-textArt'>
                        *How to use.<br />

                    </span>
                    <span className='tooltip-text-desktopArt'>
                        *How to use.<br />
                    </span>
                </div>
                <div>
                    $
                </div>
                <Link to="/isiapps#home">
                    <div className='exitbf'>X</div>
                </Link>
            </div>
            <div
                className={window.innerHeight > window.innerWidth ? 'portraitArt' : 'landscapeArt'} >
                <h1>Pic/Vid To Art</h1>

                <br></br>
                <h3> Conversion Parameters</h3>

                <input type="file" id="imageInput" accept="image/*" onChange={handleFileChange} className='buttonC' />
                <br></br>


                <label htmlFor="blackThreshold">Details (10-254): </label>
                <input type="number" id="blackThreshold" min="10" max="254" value={blackThreshold}
                    onChange={handleInputChange}
                />
                <br></br>

                <label htmlFor="penLightness">Sketch (0.1-2.0): </label>
                <input type="number" id="penLightness" step="0.1" min="0.1" max="2.0" value={penLightness}
                    onChange={handleInputChange}
                />
                <br></br>

                <label htmlFor="maxThresholdInput">Pixels Threshold (2-255): </label>
                <input type="number" id="maxThresholdInput" min="2" max="255" value={maxThreshold}
                    onChange={handleInputChange} />
                <br></br>

                <label htmlFor="numGradesInput">Pixels Variation (2-255): </label>
                <input type="number" id="numGradesInput" min="2" max="255" value={numGrades}
                    onChange={handleInputChange} />
                <br></br>

                <label htmlFor="contrastInput">Contrast (1-20): </label>
                <input type="number" id="contrastInput" min="1" max="20" value={contrast}
                    onChange={handleInputChange} />
                <br></br>

                <label htmlFor="blurInput">Pen Thickness (0-20): </label>
                <input type="number" id="blurInput" min="0" max="20" value={blur}
                    onChange={handleInputChange} />
                <br></br>

                <label htmlFor="cblurInput">Color Blur (0-40): </label>
                <input type="number" id="cblurInput" min="0" max="40" value={cblur}
                    onChange={handleInputChange} />
                <br></br>


                <label>
                    <input type="checkbox" id="invert" checked={invert}
                        onChange={handleInputChange} /> Invert white & black pixels
                </label>
                <br></br>

                <label className='labelDC'>
                    <input type="radio" name="inputType" value="grayscale"
                        checked={inputType === 'grayscale'}
                        onChange={handleInputTypeChange}
                    /> Grayscale Image
                </label>
                <label className='labelDC'>
                    <input type="radio" name="inputType" value="color"
                        checked={inputType === 'color'}
                        onChange={handleInputTypeChange}
                    /> colored Image
                </label>
                <br></br>

                <label>
                    <input type="checkbox" id="original" checked={original}
                        onChange={handleInputChange} /> Output original Image
                </label>
                <br></br>
                <br></br>
                <br></br>
                <h2> Convert the selected Pic</h2>
                <p className="arrangeInfo">Click the button below to convert the file you chose into a sketch, line Art etc, depending on the conversion parameters. You may choose to download
                    the resulting image thereafter.</p>
                <button type="button" onClick={handleConvertImage} className='buttonC'>Convert Pic</button>
                {progress > 0 && progress < 100 && (
                    <p>Conversion Progress: {progress.toFixed(2)}%</p>
                )}
                {outputContainer && (
                    <div >
                        <img src={outputContainer} className='imgArt' alt="Converted" />
                        {/* <br></br> */}
                        <button type="button" onClick={handleDownloadImage} className='buttonC'> Download Image</button>
                    </div>
                )}

                <br></br>
                <br></br>
                <br></br>
                <h2> Convert All Pics In a Folder</h2>
                <p className="arrangeInfo">Create a folder named 'picsIn' in your pictures folder and place all the pictures you want to convert into folder 'picsIn'.
                    Click the button below and select the pictures folder. Click 'view files', then 'save changes' on the alerts that appear and the images will be downloaded into your downloads folder.</p>
                <button type="button" onClick={handleConvertBatchImages} className='buttonC'>Convert & Download Pics</button>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <h2> Get Image Frames From Video</h2>
                <br></br>
                <div className="arrangeInfo2">
                    <input type="file" id="videoInput" accept="video/*" onChange={handleVideoFileChange} className='buttonC' />
                    <button type="button" onClick={handleLoadVideo} className='buttonC'>Load Video</button>
                </div>
                <br></br>
                <label htmlFor="frameInterval">Frame(s) Per Second: (1-60): </label>
                <input type="number" id="frameInterval" min="1" max="60" value={frameInterval} onChange={handleInputChange} />
                <br></br>
                <br></br>
                <button type="button" onClick={handleConvertFrames} className='buttonC'>Convert & Download Frames</button>
                <br></br>
                <br></br>
                < video ref={videoRef} width='400' controls />
                <button type="button" onClick={handleConvertCurrentFrame} className='buttonC'>Convert Current Frame</button>
                <br></br>
                <br></br>
                {outputFrameContainer && (
                    <div >
                        <img src={outputFrameContainer} className='imgArt' alt="Converted" />
                        <br></br>
                        <button type="button" onClick={handleDownloadFrame} className='buttonC'>Download Frame</button>
                    </div>
                )}
                <br></br>
                <br></br>
            </div>

        </div>
    )
}

export default PicVidToArt