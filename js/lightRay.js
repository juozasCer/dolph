const lightCanvas = document.getElementById('lightCanvas');
const lightCtx = lightCanvas.getContext('2d');

function resizeLightCanvas() {
  lightCanvas.width = window.innerWidth;
  lightCanvas.height = window.innerHeight;
}
resizeLightCanvas();
window.addEventListener('resize', resizeLightCanvas);

// Function to create underwater light rays effect
function drawLightRays() {
  lightCtx.clearRect(0, 0, lightCanvas.width, lightCanvas.height);  // Clear the canvas
  lightCtx.save();
  lightCtx.globalCompositeOperation = 'lighter';  // Blend rays for a light effect
  lightCtx.globalAlpha = 0.1;  // Light transparency for rays

  const rayCount = 10;  // Number of rays
  const maxRayWidth = lightCanvas.width * 0.6;  // Maximum width of rays
  const maxRayLength = lightCanvas.height * 0.8;  // Maximum length of rays

  for (let i = 0; i < rayCount; i++) {
    lightCtx.beginPath();
    const rayWidth = Math.random() * maxRayWidth;  // Randomize ray width
    const rayLength = Math.random() * maxRayLength;  // Randomize ray length
    const rayX = Math.random() * lightCanvas.width;  // Randomize X position

    const gradient = lightCtx.createLinearGradient(rayX, 0, rayX + rayWidth, rayLength);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');  // Brighter at the top
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');  // Fades out at the bottom

    lightCtx.fillStyle = gradient;
    lightCtx.moveTo(rayX, 0);
    lightCtx.lineTo(rayX + rayWidth / 2, rayLength);
    lightCtx.lineTo(rayX - rayWidth / 2, rayLength);
    lightCtx.closePath();
    lightCtx.fill();
  }
  lightCtx.restore();
}

// Animation loop to keep rays moving
function animateLightRays() {
  drawLightRays();
  requestAnimationFrame(animateLightRays);
}

animateLightRays();  // Start the animation
