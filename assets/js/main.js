/**
 * Author: Amey Thakur
 * Date: 2026-02-17
 * License: MIT
 * Description: Main JavaScript file handling navigation and interactions.
 */

document.addEventListener('DOMContentLoaded', () => {

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
        // Burst of Medical & Tech Icons
        const icons = ['💊', '🧬', '🔬', '💻', '🧪', '🩸', '🏥'];
        for (let i = 0; i < 15; i++) {
            createFloatingIcon(icons[Math.floor(Math.random() * icons.length)]);
        }
    }

    function createFloatingIcon(icon) {
        const el = document.createElement('div');
        el.innerText = icon;
        el.style.position = 'fixed';
        el.style.left = Math.random() * window.innerWidth + 'px';
        el.style.bottom = '-50px';
        el.style.fontSize = (Math.random() * 20 + 20) + 'px';
        el.style.zIndex = '9999';
        el.style.pointerEvents = 'none';
        el.style.transition = 'transform 2s ease-out, opacity 2s ease-out';

        document.body.appendChild(el);

        setTimeout(() => {
            el.style.transform = `translateY(-${window.innerHeight}px) rotate(${Math.random() * 360}deg)`;
            el.style.opacity = '0';
        }, 50);

        setTimeout(() => {
            el.remove();
        }, 2000);
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
        overlay.style.fontSize = '2rem';
        overlay.style.flexDirection = 'column';
        overlay.innerHTML = `
            <div class="matrix-text">SYSTEM OVERRIDE: INITIATED</div>
            <div class="matrix-sub">Developer Mode: Active</div>
            <div style="font-size: 1rem; color: #fff; margin-top: 20px;">Designed & Developed by Amey Thakur</div>
        `;

        document.body.appendChild(overlay);

        // Simple typing effect or glitch could go here, but let's keep it pristine
        setTimeout(() => {
            overlay.style.transition = 'opacity 1s ease';
            overlay.style.opacity = '0';
            setTimeout(() => overlay.remove(), 1000);
        }, 3000);
    }

});
