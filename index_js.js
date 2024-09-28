// Select all the <h2> elements within each section
const headings = document.querySelectorAll('section h2');
const navLinks = document.querySelectorAll('nav ul li a');

// Function to activate the link based on the currently active section
function activateLink(sectionId) {
    // Remove the active class from all links
    navLinks.forEach(link => link.classList.remove('active'));

    // Find the corresponding nav link for the active section and add the active class
    const activeLink = document.querySelector(`nav ul li a[href="#${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
        console.log(`Activated link for section: ${sectionId}`); // Debug statement
    }
}

// Helper function to find the closest section element
function findClosestSection(element) {
    while (element && element.tagName !== 'SECTION') {
        element = element.parentElement;
    }
    return element;
}

// Create an intersection observer to watch for heading visibility
const observer = new IntersectionObserver((entries) => {
    let activeSection = null;
    entries.forEach(entry => {
        const section = findClosestSection(entry.target);
        console.log(`Heading in view: ${section ? section.id : 'none'}`); // Debug statement
        if (entry.isIntersecting && entry.intersectionRatio > 0.25) { // Use a threshold for activation
            if (!activeSection || entry.intersectionRatio > activeSection.intersectionRatio) {
                activeSection = entry;
            }
        }
    });
    if (activeSection) {
        const section = findClosestSection(activeSection.target);
        if (section) {
            activateLink(section.id);
        }
    }
}, {
    threshold: 0.5, // Trigger when 50% of the heading is visible
    rootMargin: '-20% 0px -50% 0px', // Adjust to ensure activation occurs earlier
});

// Observe each heading
headings.forEach(heading => {
    observer.observe(heading);
});

// Manual check on page load
function checkInitialSection() {
    let activeSection = null;
    headings.forEach(heading => {
        const rect = heading.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            const section = findClosestSection(heading);
            if (section && (!activeSection || rect.top < activeSection.rect.top)) {
                activeSection = { section, rect };
            }
        }
    });
    if (activeSection) {
        activateLink(activeSection.section.id);
    }
}

// Call this function on page load
window.addEventListener('load', checkInitialSection);

// Add scroll event listener to check if the user has scrolled to the bottom
window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        activateLink('media'); // Activate the "Media" section when scrolled to the bottom
    }
});
