/**
 * Portfolio Website for Aaysha Ali
 * License: MIT
 * Description: Main JavaScript file handling navigation, theme, music and interactions.
 */

// Tracks the control that opened a modal so focus can return to it on close.
let lastFocusedElement = null;

// Honor the user's reduced-motion preference for scripted scrolling.
function scrollBehavior() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
}

// Keep keyboard focus inside an open modal (Tab / Shift+Tab wrap around).
function trapFocus(e, container) {
    const focusable = container.querySelectorAll(
        'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    const visible = Array.from(focusable).filter(el => el.offsetParent !== null);
    if (visible.length === 0) return;

    const first = visible[0];
    const last = visible[visible.length - 1];

    if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
    }
}

// Reflect the current theme on the toggle button (moon = go dark, sun = go light).
function syncThemeIcon() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    const icon = btn.querySelector('i');
    const isDark = document.body.classList.contains('dark-theme');
    if (icon) {
        icon.classList.toggle('fa-sun', isDark);
        icon.classList.toggle('fa-moon', !isDark);
    }
    btn.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
}

// Flip the theme and persist the choice.
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    syncThemeIcon();
}

document.addEventListener('DOMContentLoaded', () => {

    // --- Background Music Control ---
    const musicBtn = document.getElementById('music-btn');
    const bgMusic = document.getElementById('bg-music');
    if (musicBtn && bgMusic) {
        const musicIcon = musicBtn.querySelector('i');
        bgMusic.volume = 0.4;

        musicBtn.addEventListener('click', () => {
            if (bgMusic.paused) {
                bgMusic.play().then(() => {
                    musicBtn.classList.add('playing');
                    musicIcon.classList.remove('fa-music');
                    musicIcon.classList.add('fa-pause');
                }).catch(error => {
                    console.log('Audio play failed:', error);
                });
            } else {
                bgMusic.pause();
                musicBtn.classList.remove('playing');
                musicIcon.classList.remove('fa-pause');
                musicIcon.classList.add('fa-music');
            }
        });
    }

    // --- Navigation & Mobile Menu ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');
    const navbar = document.querySelector('.navbar');

    // Toggle Mobile Menu
    hamburger.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
        hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu when a link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('toggle');
                hamburger.setAttribute('aria-expanded', false);
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
                li.classList.add('active');
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
                    behavior: scrollBehavior()
                });
            }
        });
    });

    // --- Friendly console note ---
    console.log(
        "%c Hi there! Thanks for visiting Aaysha's portfolio. 🌿 ",
        "color: #0d9488; background: #ccfbf1; font-size: 14px; padding: 8px 12px; border-radius: 6px; font-family: 'Inter', sans-serif; border: 2px solid #0d9488;"
    );

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

    // --- Theme Toggle (visible button + secret "." in the logo) ---
    syncThemeIcon();

    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }

    const logoDot = document.querySelector('.dot');
    if (logoDot) {
        logoDot.style.cursor = 'pointer';
        logoDot.setAttribute('role', 'button');
        logoDot.setAttribute('tabindex', '0');
        logoDot.setAttribute('aria-label', 'Toggle dark theme');

        const dotToggle = (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleTheme();
            // Subtle dot pulse animation
            logoDot.style.transform = 'scale(1.8)';
            setTimeout(() => { logoDot.style.transform = 'scale(1)'; }, 300);
        };

        logoDot.addEventListener('click', dotToggle);
        logoDot.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                dotToggle(e);
            }
        });
    }

    // The saved theme is applied before first paint by an inline script in index.html,
    // so no restore step is needed here.

    // --- One-time teardown of stale Service Workers / caches from the old PWA build ---
    if ('serviceWorker' in navigator && !localStorage.getItem('sw-cleared')) {
        navigator.serviceWorker.getRegistrations().then(function (registrations) {
            for (let registration of registrations) {
                registration.unregister();
            }
        });

        if (window.caches) {
            caches.keys().then(function (names) {
                for (let name of names) {
                    caches.delete(name);
                }
            });
        }

        localStorage.setItem('sw-cleared', '1');
    }

});

// Global function to open document modal
window.openDocModal = function (docUrl, title) {
    const modal = document.getElementById('doc-modal');
    const iframe = document.getElementById('modal-iframe');
    const titleEl = document.getElementById('modal-title');
    const downloadBtn = document.getElementById('modal-download-btn');

    if (modal && iframe) {
        lastFocusedElement = document.activeElement;
        iframe.src = docUrl;
        titleEl.textContent = title;
        downloadBtn.href = docUrl;

        // Force the download attribute to use the actual filename
        const fileName = docUrl.split('/').pop();
        downloadBtn.setAttribute('download', fileName);

        // Override click to force download via blob for stubborn browsers
        downloadBtn.onclick = function (e) {
            e.preventDefault();

            // Show brief loading state
            const originalText = downloadBtn.innerHTML;
            downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';

            fetch(docUrl)
                .then(response => response.blob())
                .then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url;
                    a.download = fileName;
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(a);
                    downloadBtn.innerHTML = originalText;
                })
                .catch(() => {
                    // Fallback
                    const a = document.createElement('a');
                    a.href = docUrl;
                    a.download = fileName;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    downloadBtn.innerHTML = originalText;
                });
        };

        // Show modal and move focus into it
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('show');
            const closeBtn = modal.querySelector('.close-modal');
            if (closeBtn) closeBtn.focus();
        }, 10);
    }
};

// Setup modal close handlers once DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('doc-modal');
    const closeBtn = document.querySelector('.close-modal');

    function closeModal() {
        modal.classList.remove('show');
        // Wait for transition to finish before hiding completely
        setTimeout(() => {
            modal.style.display = 'none';
            document.getElementById('modal-iframe').src = ''; // Clear iframe to stop loading
        }, 300);
        if (lastFocusedElement) lastFocusedElement.focus();
    }

    if (modal && closeBtn) {
        // Close on X button click
        closeBtn.addEventListener('click', closeModal);

        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Keyboard support: Escape closes, Tab stays within the dialog
        document.addEventListener('keydown', (e) => {
            if (!modal.classList.contains('show')) return;
            if (e.key === 'Escape') {
                closeModal();
            } else if (e.key === 'Tab') {
                trapFocus(e, modal.querySelector('.modal-content'));
            }
        });
    }

    // Back to top button logic
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: scrollBehavior()
            });
        });
    }

    // --- Digital Business Card Modal ---
    const logoBtn = document.getElementById('logo-btn');
    const bizModal = document.getElementById('biz-card-modal');
    const closeBizCard = document.querySelector('.close-biz-card');

    if (logoBtn && bizModal) {
        // Open on logo click
        logoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            lastFocusedElement = document.activeElement;
            bizModal.style.display = 'flex';
            // Small delay for CSS transition to kick in
            setTimeout(() => {
                bizModal.classList.add('show');
                if (closeBizCard) closeBizCard.focus();
            }, 10);
        });

        // Close on X button
        if (closeBizCard) {
            closeBizCard.addEventListener('click', () => {
                closeBizModal();
            });
        }

        // Close on backdrop click
        bizModal.addEventListener('click', (e) => {
            if (e.target === bizModal) {
                closeBizModal();
            }
        });

        // Keyboard support: Escape closes, Tab stays within the dialog
        document.addEventListener('keydown', (e) => {
            if (!bizModal.classList.contains('show')) return;
            if (e.key === 'Escape') {
                closeBizModal();
            } else if (e.key === 'Tab') {
                trapFocus(e, bizModal.querySelector('.biz-card-content'));
            }
        });

        function closeBizModal() {
            bizModal.classList.remove('show');
            setTimeout(() => {
                bizModal.style.display = 'none';
            }, 300);
            if (lastFocusedElement) lastFocusedElement.focus();
        }
    }
});
