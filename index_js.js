// Select all the sections and nav links
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');

// Function to activate the link based on the currently active section
function activateLink(section) {
    // Remove the active class from all links
    navLinks.forEach(link => link.classList.remove('active'));

    // Find the corresponding nav link for the active section and add the active class
    const activeLink = document.querySelector(`nav ul li a[href="#${section.id}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Create an intersection observer to watch for section visibility
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            activateLink(entry.target); // Activate the link for the visible section
        }
    });
}, {
    threshold: 0.6 // Adjust threshold as needed (0 to 1)
});

// Observe each section
sections.forEach(section => {
    observer.observe(section);
});