/**
 * Author: Amey Thakur
 * Date: 2026-02-17
 * License: MIT
 * Description: Main JavaScript for Aaysha Ali's Portfolio.
 * Handles navigation, animations, and form interactions.
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

});
