// Function to create bubbles
function createBubble() {
  const bubble = document.createElement('img');
  bubble.src = '/images/bubbles.png'; // Path to your bubble PNG
  bubble.classList.add('bubble');

  // Set random size for the bubble
  const size = Math.random() * (50 - 20) + 20; // Random size between 20px and 50px
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;

  // Set random horizontal position within the viewport
  bubble.style.left = `${Math.random() * window.innerWidth}px`;

  // Position the bubble at the bottom of the viewport, not the page
  bubble.style.position = 'fixed';  // Fix the bubble's position to the viewport
  bubble.style.bottom = '-50px';    // Start slightly below the viewport

  // Set the z-index for the bubble to be behind the footer
  bubble.style.zIndex = '100';  // Make sure the footer has a higher z-index

  // Append bubble to the body
  document.body.appendChild(bubble);

  // Animate bubble moving upwards within the viewport
  setTimeout(() => {
    bubble.style.transform = `translateY(-${window.innerHeight + 100}px)`; // Move upwards outside of viewport
    bubble.style.transition = 'transform 7s linear, opacity 7s'; // Smooth animation and opacity transition
    bubble.style.opacity = '0'; // Fade out as it moves up
  }, 100);

  // Remove bubble after animation completes
  setTimeout(() => {
    bubble.remove();
  }, 7000); // Ensure bubble lasts long enough to reach the top
}

// Create bubbles at intervals
setInterval(createBubble, 500);
