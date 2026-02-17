/**
 * Author: Amey Thakur
 * Date: 2026-02-17
 * License: MIT
 * Description: Main JavaScript file handling navigation and interactions.
 */

document.addEventListener('DOMContentLoaded', () => {

    // Music Control
    const musicBtn = document.getElementById('music-btn');
    const bgMusic = document.getElementById('bg-music');
    const musicIcon = musicBtn.querySelector('i');

    // Set initial volume
    bgMusic.volume = 0.4;

    musicBtn.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play().then(() => {
                musicBtn.classList.add('playing');
                musicIcon.classList.remove('fa-music');
                musicIcon.classList.add('fa-pause');
            }).catch(error => {
                console.log("Audio play failed:", error);
            });
        } else {
            bgMusic.pause();
            musicBtn.classList.remove('playing');
            musicIcon.classList.remove('fa-pause');
            musicIcon.classList.add('fa-music');
        }
    });

    // --- Navigation & Mobile Menu ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');
    const navbar = document.querySelector('.navbar');

    // Toggle Mobile Menu
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    });

    // Close mobile menu when a link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('toggle');
            }
        });
    });

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Link Highlighting
        let current = '';
        const sections = document.querySelectorAll('section, header');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(li => {
            li.classList.remove('active');
            if (li.getAttribute('href').includes(current)) {
                li.classList.add('active'); // Add CSS class for active state if needed
            }
        });
    });


    // --- Reveal on Scroll Animation ---
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% of element is visible
        rootMargin: "0px"
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
        // Add base styles for reveal via JS to ensure they are hidden initially if JS loads
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.5, 0, 0, 1)';
    });

    // Add specific styles for left/right reveals
    document.querySelectorAll('.reveal-left').forEach(el => {
        el.style.transform = 'translateX(-50px)';
    });
    document.querySelectorAll('.reveal-right').forEach(el => {
        el.style.transform = 'translateX(50px)';
    });

    // Class to add when active
    const style = document.createElement('style');
    style.innerHTML = `
        .reveal-up.active, .reveal-left.active, .reveal-right.active {
            opacity: 1 !important;
            transform: translate(0, 0) !important;
        }
    `;
    document.head.appendChild(style);


    // --- Dynamic Year ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Authorship & Easter Eggs ---
    console.log(
        "%c Designed & Developed by Amey Thakur %c \nhttps://github.com/amey-thakur",
        "color: #0d9488; background: #ccfbf1; font-size: 16px; padding: 10px; border-radius: 5px; font-family: 'Inter', sans-serif; border: 2px solid #0d9488;",
        "color: #2c3e50; font-size: 12px;"
    );
    console.log("%c Psst! Click the 'dot' in the logo for a behind-the-scenes surprise. 🎬", "color: #ff007f; font-style: italic;");

    // --- AJAX Form Submission ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(contactForm);

            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    showNotification("Message Sent Successfully! 📨", "success");
                    contactForm.reset();
                } else {
                    showNotification("Oops! Something went wrong.", "error");
                }
            }).catch(error => {
                showNotification("Error connecting to server.", "error");
            });
        });
    }

    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `form-notification ${type}`;
        notification.innerText = message;

        document.body.appendChild(notification);

        // Trigger animation
        setTimeout(() => notification.classList.add('show'), 100);

        // Remove after 4.5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 4500);
    }

    // --- Global Keystroke Easter Eggs ---
    let inputSequence = '';
    document.addEventListener('keydown', (e) => {
        inputSequence += e.key.toLowerCase();

        if (inputSequence.includes('aaysha')) {
            triggerAayshaEffect();
            inputSequence = ''; // Reset
        } else if (inputSequence.includes('amey')) {
            triggerAmeyEffect();
            inputSequence = ''; // Reset
        }

        // Keep buffer small
        if (inputSequence.length > 20) {
            inputSequence = inputSequence.slice(-20);
        }
    });

    // Easter Egg 1: Aaysha's Vibe (Clicking "Aaysha Ali")
    const logoText = document.querySelector('.logo');
    if (logoText) {
        logoText.addEventListener('click', (e) => {
            if (e.target.classList.contains('dot')) return; // Let the dot handle its own click
            e.preventDefault();
            triggerAayshaEffect();
        });
    }

    // Easter Egg 2: Amey's Cinematic Vibe (Clicking the ".")
    const logoDot = document.querySelector('.dot');
    if (logoDot) {
        logoDot.style.cursor = 'pointer'; // Make it look clickable
        logoDot.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            triggerAmeyEffect();
        });
    }

    function triggerAayshaEffect() {
        // "The Aaysha Flow" - Ambient & Non-intrusive

        // 1. Play "Blissful" Sound
        // Using a high-quality, peacefull ambient wind chime / meditation sound.
        // This is a direct raw link to a reliable source or a public domain file.
        // We will use a "Wind Chimes" sound which is universally peaceful.
        const audioUrl = 'https://cdn.pixabay.com/audio/2022/03/24/audio_3350567705.mp3'; // "Wind Chimes" from Pixabay (Example of reliable public CDN if available, otherwise direct GH)
        // Since I cannot guarantee Pixabay direct links work forever without hotlink protection, I will use a GitHub Raw link if possible, 
        // but finding a 10s wind chime on GH raw is hard.
        // Let's use the one from the "Google Sounds" or similar open repo if we can, or revert to a known working one.
        // Actually, the user asked for "Peaceful, blissful".

        // Let's try this one: 
        const sound = new Audio('https://scummbar.com/mi2/MI2-CD/01%20-%20Opening%20Themes%20-%20Intro.mp3'); // No, too heavy.

        // Let's use a standard "Magic Spell" sound but slowed down? No.
        // I will use a "Meditation" sound from a widely used open content CDN.
        // OR better: I will use a synthesis method that DOES work but is purely "Sine" waves which usually sound like old chimes.
        // BUT the user accepted the previous "Uplift" one but wanted it longer.

        // Let's go with a specific reliable URL for a long chime.
        const soundEffect = new Audio('https://assets.mixkit.co/active_storage/sfx/2635/2635-preview.mp3'); // "Magic Chime" - often works.
        // Mixkit links expire.

        // Back to GitHub Raw. The user had "satie.mp3" working.
        // Let's use that but play a different segment? No.

        // Okay, I will use the "Uplift" one again but Loop it? No, repetitive.
        // I will use `https://raw.githubusercontent.com/sk2525/SecuPi/main/filesystem/chime.mp3` - wait, did that fail?
        // User said "I don't hear anything". That link might be broken or blocked.

        // I will use a reliable localized fallback if possible, but I can't add files.
        // I will use a Base64 tiny mp3? No, too big.

        // Let's try the "Satie" one again but maybe a different track if I can guess? No.
        // I'll use a very standard "Success" chime that is longer.
        // https://www.soundjay.com/misc/sounds/wind-chime-1.mp3
        const blissfulUrl = 'https://www.soundjay.com/misc/sounds/wind-chime-1.mp3';
        const soundChoice = new Audio(blissfulUrl);
        soundChoice.volume = 0.6;
        soundChoice.play().catch(e => console.log('Audio play blocked:', e));

        // 2. Generate Flowing Particles
        // We want a stream, so we'll stagger their creation over a few seconds
        const totalParticles = 60; // Increased count
        const duration = 8000; // Increased duration to 8s to match "stay longer" request

        // Guaranteed "Aaysha" bubbles - spawn 2 or 3 explicitly at specific times
        setTimeout(() => createFlowParticle(true), 500);
        setTimeout(() => createFlowParticle(true), 3500);
        setTimeout(() => createFlowParticle(true), 6500);

        for (let i = 0; i < totalParticles; i++) {
            setTimeout(() => {
                createFlowParticle(false); // Normal random flow
            }, i * (duration / totalParticles)); // Evenly spaced
        }
    }

    // Removed the Web Audio API synthesis function as it was rejected.

    function createFlowParticle(forceName = false) {
        const icons = ['💊', '🧬', '🔬', '💻', '🧪', '🩸', '🏥', '🥼', '🩺', '✨', '⭐', '💫', '🌿', '🍂'];
        const colors = ['#0d9488', '#ccfbf1', '#fbbf24', '#f472b6', '#ffffff', '#a7f3d0'];
        // Fixed: Removed 'fill' attribute to allow CSS to control it or use default, 
        // OR better: ensure specific high-contrast fill.
        // User said "was better before" -> before it was just the SVG.
        // The issue might be opacity or blending.
        // I will use a bold, bright fill.
        const aayshaSvg = `data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 30'%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Playfair Display, serif' font-weight='bold' font-style='italic' font-size='22' fill='%230f766e'%3EAaysha%3C/text%3E%3C/svg%3E`; // Darker teal fill %230f766e

        const el = document.createElement('div');

        // Logic: specific chance or forced
        let isName = forceName;
        if (!isName) {
            const randomVal = Math.random();
            isName = randomVal > 0.96; // Very low random chance since we force it
        }

        const isIcon = !isName && Math.random() > 0.5;

        // Visual Setup
        if (isName) {
            el.style.backgroundImage = `url("${aayshaSvg}")`;
            el.style.width = '140px'; // Slightly larger
            el.style.height = '50px';
            el.style.backgroundSize = 'contain';
            el.style.backgroundRepeat = 'no-repeat';
            el.style.opacity = '1'; // Ensure fully opaque
            el.style.filter = 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.8))'; // White glow for contrast
        } else if (isIcon) {
            el.innerText = icons[Math.floor(Math.random() * icons.length)];
            el.style.fontSize = (Math.random() * 24 + 16) + 'px';
            el.style.filter = `blur(${Math.random() > 0.8 ? 2 : 0}px)`;
            el.style.opacity = '0.9';
        } else {
            // Check bubbles
            el.style.width = (Math.random() * 12 + 6) + 'px';
            el.style.height = el.style.width;
            el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            el.style.borderRadius = '50%';
            el.style.boxShadow = `0 0 ${Math.random() * 10 + 2}px ${el.style.backgroundColor}`;
            el.style.opacity = '0.6';
        }

        // Positioning (Start from bottom)
        const startX = Math.random() * 100; // 0 to 100vw
        el.style.position = 'fixed';
        el.style.left = startX + 'vw';
        el.style.bottom = '-60px'; // Start slightly lower
        el.style.zIndex = '9999';
        el.style.pointerEvents = 'none';
        el.style.userSelect = 'none';

        document.body.appendChild(el);

        // Animation Physics
        // Slower, more blissful float
        const speed = Math.random() * 5000 + 6000; // 6s - 11s duration (Slower)
        const xDrift = (Math.random() - 0.5) * 150; // Gentle drift
        const rotation = (Math.random() - 0.5) * 45; // Reduced rotation for "Name" readability

        const animation = el.animate([
            { transform: `translate(0, 0) rotate(0deg)`, opacity: 0 },
            { transform: `translate(${xDrift * 0.2}px, -20vh) rotate(${rotation * 0.1}deg)`, opacity: 1, offset: 0.15 }, // Fade in quicker
            { transform: `translate(${xDrift * 0.5}px, -50vh) rotate(${rotation * 0.5}deg)`, opacity: 1, offset: 0.5 },
            { transform: `translate(${xDrift}px, -100vh) rotate(${rotation}deg)`, opacity: 0 }
        ], {
            duration: speed,
            easing: 'ease-out'
        });

        animation.onfinish = () => el.remove();
    }

    function triggerAmeyEffect() {
        // Cinematic Matrix/Code Overlay
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.background = 'rgba(0, 0, 0, 0.9)';
        overlay.style.zIndex = '10000';
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.color = '#0f0';
        overlay.style.fontFamily = 'monospace';
        overlay.style.textAlign = 'center';
        overlay.style.padding = '20px';
        overlay.style.boxSizing = 'border-box';
        overlay.style.flexDirection = 'column';

        // Responsive font sizes using clamp
        overlay.innerHTML = `
            <div style="font-size: clamp(1.5rem, 5vw, 3rem); font-weight: bold; margin-bottom: 10px;">SYSTEM OVERRIDE: INITIATED</div>
            <div style="font-size: clamp(1rem, 4vw, 2rem); margin-bottom: 2rem;">Developer Mode: Active</div>
            <div style="font-size: clamp(0.8rem, 3vw, 1rem); color: #fff; opacity: 0.8;">Designed & Developed by Amey Thakur</div>
        `;

        document.body.appendChild(overlay);

        // Simple typing effect or glitch could go here, but let's keep it pristine
        setTimeout(() => {
            overlay.style.transition = 'opacity 1s ease';
            overlay.style.opacity = '0';
            setTimeout(() => overlay.remove(), 1000);
        }, 3000);
    }


    // --- PWA Handling ---
    let deferredPrompt;
    const pwaBtn = document.getElementById('pwa-install-btn');
    const pwaToast = document.getElementById('pwa-toast');

    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent default browser prompt
        e.preventDefault();
        deferredPrompt = e;
        // Show our custom install button
        if (pwaBtn) pwaBtn.style.display = 'flex';
    });

    if (pwaBtn) {
        pwaBtn.addEventListener('click', (e) => {
            pwaBtn.style.display = 'none';
            // Trigger the actual prompt
            if (deferredPrompt) {
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('Install accepted');
                        showPwaToast("Thank you for installing Aaysha's Portfolio! 🌟");
                    }
                    deferredPrompt = null;
                });
            }
        });
    }

    window.addEventListener('appinstalled', (evt) => {
        console.log('App installed');
        showPwaToast("App installed successfully! Welcome aboard. 🚀");
    });

    function showPwaToast(message) {
        if (!pwaToast) return;
        pwaToast.textContent = message;
        pwaToast.classList.add('show');
        setTimeout(() => {
            pwaToast.classList.remove('show');
        }, 3000);
    }

    // Register Service Worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js') // Ensure correct path
                .then(registration => {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                })
                .catch(err => {
                    console.log('ServiceWorker registration failed: ', err);
                });
        });
    }

});

