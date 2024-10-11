document.addEventListener('DOMContentLoaded', function () {
  const canvas = document.getElementById('waveCanvas');
  const ctx = canvas.getContext('2d');

  // Function to resize canvas to match the window size
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  // Call the resize function initially
  resizeCanvas();

  // Redo the canvas size on window resize
  window.addEventListener('resize', resizeCanvas);

  let img = new Image();
  img.src = '/images/vawe.png'; // Replace with the correct path to your image

  img.onload = function () {
    animateWave();
  };

  function animateWave() {
    const waveHeight = 20; // Max height of the wave distortion
    const waveFrequency = 0.01; // Frequency of the wave (how tightly packed the waves are)
    const waveSpeed = 0.05; // Speed at which the wave moves
    let offset = 0;

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

      const sliceWidth = 5; // Width of each vertical slice of the image

      for (let i = 0; i < canvas.width; i += sliceWidth) {
        // Calculate the vertical wave offset for each slice
        const waveOffset = Math.sin(i * waveFrequency + offset) * waveHeight;

        // Draw a vertical slice of the image with the calculated wave offset
        ctx.drawImage(
          img,                         // Image source
          i, 0, sliceWidth, img.height, // Source slice based on image height
          i, waveOffset, sliceWidth, canvas.height // Destination slice scaled to canvas height
        );
      }

      offset += waveSpeed; // Increment the offset for smooth wave animation

      requestAnimationFrame(draw); // Loop the animation
    }

    draw(); // Start the animation loop
  }
});
