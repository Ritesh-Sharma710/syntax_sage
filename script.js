// script.js - THE SYNTAX SAGE
document.addEventListener('DOMContentLoaded', () => {
    console.log('THE SYNTAX SAGE website is fully loaded!');

    // --- Smooth Scroll for Navigation Links ---
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- Scroll-Driven Animations (IntersectionObserver) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(section => {
        observer.observe(section);
    });

    // --- Magnetic Button Micro-Interaction ---
    const magneticButtons = document.querySelectorAll('.magnetic-btn');
    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    // --- Back to Top Button ---
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = `
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
        </svg>
    `;
    backToTopButton.className = 'fixed bottom-6 right-6 bg-teal-500 hover:bg-teal-400 text-black p-3 rounded-full shadow-lg transition-all duration-300 ease-in-out opacity-0 scale-0 z-50';
    document.body.appendChild(backToTopButton);

    const toggleBackToTopButton = () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.remove('opacity-0', 'scale-0');
            backToTopButton.classList.add('opacity-100', 'scale-100');
        } else {
            backToTopButton.classList.remove('opacity-100', 'scale-100');
            backToTopButton.classList.add('opacity-0', 'scale-0');
        }
    };
    window.addEventListener('scroll', toggleBackToTopButton);
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- SPACE & TERMINAL ANIMATION ---
    const canvas = document.getElementById('spaceCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let stars = [];
        let terminals = [];

        // Configuration
        const STAR_COUNT = 200;
        const TERMINAL_SPAWN_RATE = 1500; // ms
        let lastTerminalSpawn = 0;

        // Expanded Palette for Terminals
        const TERMINAL_BODY_COLORS = ['#1a1a1a', '#2d2d2d', '#333333'];
        const TERMINAL_SCREEN_COLORS = [
            'rgba(45, 212, 191, 0.8)', // Teal
            'rgba(168, 85, 247, 0.8)', // Purple
            'rgba(234, 179, 8, 0.8)',  // Yellow
            'rgba(239, 68, 68, 0.8)',  // Red
            'rgba(59, 130, 246, 0.8)'  // Blue
        ];

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initStars();
        }

        window.addEventListener('resize', resize);

        class Star {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 2;
                this.speed = Math.random() * 0.5 + 0.1;
                this.opacity = Math.random();
            }
            update() {
                this.y += this.speed;
                if (this.y > height) this.reset();
            }
            draw() {
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        class Terminal {
            constructor() {
                this.size = Math.random() * 40 + 30; // 30-70px
                this.aspectRatio = 0.7;
                this.width = this.size;
                this.height = this.size * this.aspectRatio;

                // Spawn from sides
                this.direction = Math.random() < 0.5 ? 1 : -1;
                this.x = this.direction === 1 ? -this.width : width + this.width;
                this.y = Math.random() * (height - this.height);

                this.speedX = (Math.random() * 1.5 + 0.5) * this.direction;
                this.speedY = (Math.random() - 0.5) * 1.5;
                this.rotation = (Math.random() - 0.5) * 0.2;
                this.rotationSpeed = (Math.random() - 0.5) * 0.02;

                this.bodyColor = TERMINAL_BODY_COLORS[Math.floor(Math.random() * TERMINAL_BODY_COLORS.length)];
                this.screenColor = TERMINAL_SCREEN_COLORS[Math.floor(Math.random() * TERMINAL_SCREEN_COLORS.length)];
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.rotation += this.rotationSpeed;
            }

            draw() {
                ctx.save();
                ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
                ctx.rotate(this.rotation);
                ctx.translate(-this.width / 2, -this.height / 2);

                // Body
                ctx.fillStyle = this.bodyColor;
                ctx.beginPath();
                ctx.roundRect(0, 0, this.width, this.height, 4);
                ctx.fill();

                // Screen
                ctx.fillStyle = this.screenColor;
                const swatchMargin = this.width * 0.1;
                ctx.beginPath();
                ctx.roundRect(swatchMargin, swatchMargin, this.width - swatchMargin * 2, this.height * 0.6, 2);
                ctx.fill();

                // Lines
                ctx.fillStyle = 'rgba(255,255,255,0.3)';
                const lineX = swatchMargin;
                const lineY = this.height * 0.8;
                const lineHeight = this.height * 0.08;
                ctx.fillRect(lineX, lineY, this.width * 0.5, lineHeight);

                ctx.restore();
            }

            isOffScreen() {
                return (this.x < -100 || this.x > width + 100 || this.y < -100 || this.y > height + 100);
            }
        }

        function initStars() {
            stars = [];
            for (let i = 0; i < STAR_COUNT; i++) {
                stars.push(new Star());
            }
        }

        function animate(time) {
            ctx.clearRect(0, 0, width, height);

            // Draw gradient background layer
            const gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width);
            gradient.addColorStop(0, '#1a1a2e');
            gradient.addColorStop(1, '#000000');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            // Update/Draw Stars
            stars.forEach(star => {
                star.update();
                star.draw();
            });

            // Spawn Terminals
            if (time - lastTerminalSpawn > TERMINAL_SPAWN_RATE) {
                terminals.push(new Terminal());
                lastTerminalSpawn = time;
            }

            // Update/Draw Terminals
            terminals = terminals.filter(t => !t.isOffScreen());
            terminals.forEach(t => {
                t.update();
                t.draw();
            });

            requestAnimationFrame(animate);
        }

        resize();
        animate(0);
    }
});
