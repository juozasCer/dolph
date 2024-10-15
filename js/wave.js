
// Canvas setup
const canvas = document.getElementById('waterCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = (window.innerHeight / 2)+0;

const waterImage = new Image();
waterImage.src = 'https://dolph-rosy.vercel.app/SVG/Artboard7.svg';  // Load the water SVG

let time = 0; // For wave movement

// Function to apply the wavy effect
function drawWave() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const waveAmplitude = 20; // Height of the wave
    const waveFrequency = 0.02; // Wave frequency (more = more waves)
    const waveSpeed = 0.1; // Speed of the wave movement

    const stripHeight = 10; // Each "strip" of the image that will be warped
    const extraWidth = 800; // Extra width to hide wave corners

    // Loop through the image height in strips
    for (let y = 0; y < canvas.height; y += stripHeight) {
        // Calculate the horizontal offset for each strip using a sine wave
        const xOffset = Math.sin((y * waveFrequency) + time) * waveAmplitude;

        // Draw each strip of the image, offset horizontally
        ctx.drawImage(
            waterImage,
            0, y, canvas.width, stripHeight,         // Source image (start at 0)
            -extraWidth / 2 + xOffset, y,            // Draw with an offset, center it with -extraWidth / 2
            canvas.width + extraWidth, stripHeight   // Draw with extra width to hide edges
        );
    }

    // Increment time to animate the wave
    time += waveSpeed;

    // Repeat the drawing for the next frame
    requestAnimationFrame(drawWave);
}

// Start the wave animation once the image is loaded
waterImage.onload = () => {
    drawWave();
};

// Handle canvas resizing
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight / 2;
});
