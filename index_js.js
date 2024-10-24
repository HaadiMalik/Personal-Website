document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");
  
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -50% 0px", // Adjust this value based on your sticky navbar height
      threshold: 0.15
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").substring(1) === entry.target.id) {
              link.classList.add("active");
            }
          });
        }
      });
    }, observerOptions);
  
    sections.forEach(section => {
      observer.observe(section);
    });
  });
  