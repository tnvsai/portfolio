// DOM Elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            // Optional: unobserve after showing if you only want it to animate once
            // observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

// Select all elements with the 'hidden' class to watch
document.querySelectorAll('.hidden').forEach((el) => {
    observer.observe(el);
});

// Dynamic Copyright Year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile Menu Toggle (Simple implementation)
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        if (navLinks.style.display === 'flex') {
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '70px';
            navLinks.style.right = '0';
            navLinks.style.background = 'rgba(5, 11, 20, 0.95)';
            navLinks.style.width = '100%';
            navLinks.style.padding = '20px';
            navLinks.style.textAlign = 'center';
            navLinks.style.backdropFilter = 'blur(10px)';
        }
    });
}

// Typing Effect for "Embedded Software Engineer"
// This is a simple visual enhancement to type out the role
const titleElement = document.querySelector('.typing-effect');
const textToType = "Embedded Software Engineer";
let charIndex = 0;

function typeText() {
    if (charIndex < textToType.length) {
        // We aren't actually clearing the text in HTML, assuming it starts empty or we clear it first
        if (charIndex === 0) titleElement.textContent = '';
        titleElement.textContent += textToType.charAt(charIndex);
        charIndex++;
        setTimeout(typeText, 100); // Typing speed
    }
}

// Trigger typing after a short delay
setTimeout(typeText, 1000);

// Mouse parallax effect for the "Tech Orb"
document.addEventListener('mousemove', (e) => {
    const orb = document.querySelector('.tech-orb');
    if (orb) {
        const x = (window.innerWidth - e.pageX * 2) / 100;
        const y = (window.innerHeight - e.pageY * 2) / 100;
        orb.style.transform = `translateX(${x}px) translateY(${y}px)`;
    }
});
