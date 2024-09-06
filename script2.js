document.addEventListener('DOMContentLoaded', () => {
    const section = document.querySelector('.section');
    const allImages = document.querySelectorAll('.section img');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');

    let activeImageIndex = -1;

    function updateActiveImage(index) {
        // Deselect previously active image
        if (activeImageIndex >= 0) {
            allImages[activeImageIndex].classList.remove('active');
        }

        // Check if the new index is valid
        if (index >= 0 && index < allImages.length) {
            // If the new image is already active, deactivate it
            if (activeImageIndex === index) {
                allImages[index].classList.remove('active');
                activeImageIndex = -1;
            } else {
                // Add 'active' class to the new image
                allImages[index].classList.add('active');
                activeImageIndex = index;

                // Center the active image
                const offset = allImages[index].offsetLeft - (window.innerWidth / 2) + (allImages[index].offsetWidth / 2);
                section.scrollLeft = offset;
            }
        }
    }

    function scrollHorizontally() {
        function step() {
            section.scrollLeft += 1; // Adjust the scroll speed as needed
            if (section.scrollLeft >= section.scrollWidth - section.clientWidth) {
                section.scrollLeft = 0;
            }
            requestAnimationFrame(step);
        }
        step();
    }

    function setupHoverPause() {
        section.addEventListener('mouseover', () => section.style.overflow = 'hidden');
        section.addEventListener('mouseout', () => section.style.overflow = 'auto');
    }

    setupHoverPause();

    // Add event listener to each image to handle the selection/deselection
    allImages.forEach((image, index) => {
        image.addEventListener('click', () => updateActiveImage(index));
    });

    prevButton.addEventListener('click', () => {
        if (activeImageIndex > 0) {
            updateActiveImage(activeImageIndex - 1);
        }
    });

    nextButton.addEventListener('click', () => {
        if (activeImageIndex < allImages.length - 1) {
            updateActiveImage(activeImageIndex + 1);
        }
    });

    // Initial setup
    updateActiveImage(0); // Start with the first image active
    scrollHorizontally();
});

