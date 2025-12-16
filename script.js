// Basic Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, observerOptions);

document.querySelectorAll('.hidden').forEach((el) => observer.observe(el));

// Dynamic Copyright Year
document.getElementById('year').textContent = new Date().getFullYear();

// --- Dynamic Typing Effect ---
let text = "Automotive Embedded Software Engineer";
// Check if we are on the social page (Red Theme)
if (document.body.classList.contains('theme-red')) {
    text = "Travel • Vlogs • Lifestyle";
}

const typingElement = document.querySelector('.typing-effect');
let i = 0;

function typeWriter() {
    if (i < text.length) {
        if (typingElement) {
            typingElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
}
// Start typing effect on load
if (typingElement) {
    typingElement.textContent = ''; // Clear existing text to prevent double typing
    typeWriter();
}

// Tech Orb Parallax Effect
document.addEventListener('mousemove', (e) => {
    const orb = document.querySelector('.tech-orb');
    if (orb) {
        const x = (window.innerWidth - e.pageX) / 50;
        const y = (window.innerHeight - e.pageY) / 50;
        orb.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    }
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        // Add flex-direction column for mobile if needed via CSS class toggle
        navLinks.classList.toggle('active');
    });
}

// --- YouTube Auto-Fetch Logic ---
// Channel ID for TNVSai
const YOUTUBE_CHANNEL_ID = 'UCTskQQIfWrdYHHZm3sB_99w';

// Only run on social.html (check for specific element)
if (document.getElementById('yt-title-1')) {
    const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`;
    const API_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`;

    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'ok' && data.items.length > 0) {
                // Update First Video (Latest)
                updateVideoCard(1, data.items[0]);

                // Update Second Video (Previous), if available
                if (data.items.length > 1) {
                    updateVideoCard(2, data.items[1]);
                }
            }
        })
        .catch(error => console.error('Error fetching YouTube feed:', error));
}

function updateVideoCard(index, video) {
    // Robust ID Extraction (GUID)
    let videoId = '';
    if (video.guid && video.guid.includes('yt:video:')) {
        videoId = video.guid.split(':')[2];
    } else {
        videoId = video.link.split('v=')[1].split('&')[0];
    }

    // --- PLAN B: THUMBNAIL FALLBACK ---
    // Since local file embedding (file://) is hitting Error 153, 
    // we display the Thumbnail with a Play Button overlay.
    // This is 100% reliable and looks professional.

    const thumbUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
    const videoLink = video.link;

    const frame = document.getElementById(`yt-frame-${index}`);
    const placeholder = document.getElementById(`yt-placeholder-${index}`);

    // Find the container (parent of the iframe)
    let container = null;
    if (frame) container = frame.parentElement;
    else if (placeholder) container = placeholder.parentElement;

    if (container) {
        // Inject Image + Custom Play Button
        container.innerHTML = `
            <a href="${videoLink}" target="_blank" style="display:block; position:relative; width:100%; height:200px; text-decoration:none;">
                <img src="${thumbUrl}" style="width:100%; height:100%; object-fit:cover; border-radius:8px; border:1px solid rgba(255,255,255,0.1);">
                <div style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:60px; height:60px; background:rgba(255,0,0,0.9); border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 0 20px rgba(0,0,0,0.5); transition:transform 0.2s;">
                    <i class="fas fa-play" style="color:white; font-size:24px; margin-left:4px;"></i>
                </div>
            </a>
        `;
    }

    // Update Text Content
    const titleEl = document.getElementById(`yt-title-${index}`);
    const descEl = document.getElementById(`yt-desc-${index}`);
    const linkEl = document.getElementById(`yt-link-${index}`);

    if (titleEl) titleEl.textContent = video.title;
    if (descEl) descEl.textContent = `Published: ${new Date(video.pubDate).toLocaleDateString()}`;
    if (linkEl) linkEl.href = video.link;
}
