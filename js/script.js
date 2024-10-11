// Function to change the section and separator background color based on scroll position
window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  const maxScrollHeight = document.body.scrollHeight - window.innerHeight; // Max scrollable height
  const scrollPercentage = scrollPosition / maxScrollHeight; // Scroll percentage (0 to 1)

  // Calculate color based on scroll position
  const startColor = [63, 94, 151]; // RGB for #3f5e97 (top color)
  const endColor = [0, 0, 67]; // RGB for a darker blue (bottom color)
  
  // Interpolate between start and end colors based on scroll percentage
  const currentColor = startColor.map((start, index) => {
      return Math.round(start + (endColor[index] - start) * scrollPercentage);
  });

  // Update section backgrounds
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
      section.style.backgroundColor = `rgb(${currentColor[0]}, ${currentColor[1]}, ${currentColor[2]})`;
  });

  // Update section2 backgrounds
  const sections2 = document.querySelectorAll('.section2');
  sections2.forEach(section2 => {
      section2.style.backgroundColor = `rgb(${currentColor[0]}, ${currentColor[1]}, ${currentColor[2]})`; // Corrected line
  });

    // Update section3 backgrounds
    const sections3 = document.querySelectorAll('.section3');
    sections3.forEach(section3 => {
        section3.style.backgroundColor = `rgb(${currentColor[0]}, ${currentColor[1]}, ${currentColor[2]})`; // Corrected line
    });

  // Update separator backgrounds
  const separators = document.querySelectorAll('.separator');
  separators.forEach(separator => {
      separator.style.backgroundColor = `rgb(${currentColor[0]}, ${currentColor[1]}, ${currentColor[2]})`;
  });
});



function animateNumbers() {
    const numbers = document.querySelectorAll('.animate-number'); // Select all elements with the 'animate-number' class

    const options = {
        threshold: 0.5, // Adjust this as needed. 0.5 means the animation triggers when 50% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Adjust the margin if needed to trigger the animation earlier/later
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target; // Get the element in view
                const finalNumber = parseFloat(target.textContent.replace(/,/g, '')); // Get the number inside the element
                let startNumber = 0;

                if (finalNumber === 0) {
                    startNumber = 100;
                }

                const decimalPlaces = (finalNumber % 1 === 0) ? 0 : finalNumber.toString().split('.')[1].length || 0;
                const duration = Math.max(Math.min(finalNumber * 10, 5000), 2000); // Duration of animation based on number size

                // Animation function
                const step = (timestamp, startTime) => {
                    if (!startTime) startTime = timestamp; // Store the initial time
                    const progress = timestamp - startTime; // Calculate progress
                    const percentage = Math.min(progress / duration, 1); // Get percentage of animation completion
                    const number = startNumber + (finalNumber - startNumber) * percentage; // Calculate the current number value
                    target.textContent = number.toFixed(decimalPlaces).replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Update the number

                    if (percentage < 1) {
                        requestAnimationFrame(timestamp => step(timestamp, startTime)); // Continue animation if not complete
                    }
                };

                requestAnimationFrame(step); // Start animation
                observer.unobserve(target); // Stop observing after animation starts
            }
        });
    }, options);

    numbers.forEach(number => {
        observer.observe(number); // Observe each number element
    });
}

// Call the function to start observing the numbers
document.addEventListener('DOMContentLoaded', () => {
    animateNumbers();
});
