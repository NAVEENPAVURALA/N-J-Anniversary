document.addEventListener("DOMContentLoaded", () => {
    // FORCE SCROLL TO TOP ON RELOAD
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // --------------------------------------------------------------------------
    // 0. Heartbeat Preloader (The "Anticipation" Phase)
    // --------------------------------------------------------------------------
    const preloader = document.getElementById('heartbeat-preloader');
    const beatText = document.querySelector('.heartbeat-text');
    const messages = ["For Jyo...", "My Love...", "My Life...", "Forever..."];
    let msgIndex = 0;

    if (preloader && beatText) {
        document.body.style.overflow = 'hidden'; // Lock scroll
        const msgInterval = setInterval(() => {
            if (msgIndex < messages.length) {
                beatText.style.opacity = 0;
                setTimeout(() => {
                    beatText.innerText = messages[msgIndex];
                    beatText.style.opacity = 0.8;
                    msgIndex++;
                }, 300);
            } else {
                clearInterval(msgInterval);
                finishPreloader();
            }
        }, 1200); // 1.2s per message

        function finishPreloader() {
            gsap.to(preloader, {
                opacity: 0,
                duration: 1.5,
                onComplete: () => {
                    preloader.style.display = 'none';
                    document.body.style.overflow = '';
                    // Trigger entrance music automatically if allowed, or wait for user
                    // Note: We leave the "Enter Experience" button logic as the primary audio trigger
                }
            });
        }
    }

    // --------------------------------------------------------------------------
    // 1. Core Setup & Mobile Normalize
    // --------------------------------------------------------------------------
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    // OPTIMIZED: Smoother mobile settings, less resistance
    const lenis = new Lenis({
        duration: isMobile ? 1.0 : 1.8,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        smooth: true,
        smoothTouch: false, // Let native touch handle scrolling on mobile for better performance
        touchMultiplier: 2
    });

    // FORCE SCROLL TOP (Lenis Aware)
    lenis.scrollTo(0, { immediate: true });

    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    gsap.registerPlugin(ScrollTrigger);

    // --------------------------------------------------------------------------
    // 10. Letter & Footer
    // --------------------------------------------------------------------------
    document.getElementById('open-letter-btn')?.addEventListener('click', (e) => {
        document.getElementById('letter-content').classList.toggle('open');
        e.currentTarget.textContent = document.getElementById('letter-content').classList.contains('open') ? "Close" : "Read My Heart";
    });

    // --------------------------------------------------------------------------
    // 9. Rose Rain Logic (Footer Trigger)
    // --------------------------------------------------------------------------
    // The original mouseX, mouseY for cursor are defined later in section 2.
    // If this section needs mouseX/Y, it should use the global ones or define its own.
    // Assuming the instruction means to use the existing mouseX/Y from section 2.

    // --------------------------------------------------------------------------
    // 2. Interactive Spotlight & TRUE LOVE RIPPLE
    // --------------------------------------------------------------------------
    const cursor = document.querySelector('.cursor-spotlight');
    let mouseX = 0, mouseY = 0; // Moved declaration to top of file or global scope if needed by multiple sections
    if (!isMobile && cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            mouseX = e.clientX; mouseY = e.clientY;
        });
    }

    document.addEventListener('click', (e) => {
        const ripple = document.createElement('div');
        ripple.classList.add('click-ripple');
        ripple.style.left = e.clientX + 'px';
        ripple.style.top = e.clientY + 'px';
        document.body.appendChild(ripple);
        setTimeout(() => ripple.remove(), 1000);
    });

    // --------------------------------------------------------------------------
    // 3. Visual Energy: Scramble Text Effect
    // --------------------------------------------------------------------------
    class ScrambleText {
        constructor(element, chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&') {
            this.element = element; this.chars = chars; this.originalText = element.innerText; this.frameRequest = null; this.frame = 0; this.queue = [];
        }
        setText(newText) {
            const oldText = this.originalText; const length = Math.max(oldText.length, newText.length); this.queue = [];
            for (let i = 0; i < length; i++) { this.queue.push({ from: oldText[i] || '', to: newText[i] || '', start: Math.floor(Math.random() * 40), end: Math.floor(Math.random() * 40) + 40 }); }
            cancelAnimationFrame(this.frameRequest); this.frame = 0; this.update();
        }
        update() {
            let output = ''; let complete = 0;
            for (let i = 0; i < this.queue.length; i++) {
                let { from, to, start, end, char } = this.queue[i];
                if (this.frame >= end) { complete++; output += to; }
                else if (this.frame >= start) { if (!char || Math.random() < 0.28) { char = this.chars[Math.floor(Math.random() * this.chars.length)]; this.queue[i].char = char; } output += char; }
                else { output += from; }
            }
            this.element.innerText = output;
            if (complete === this.queue.length) return;
            this.frameRequest = requestAnimationFrame(this.update.bind(this));
            this.frame++;
        }
        start() { const final = this.element.innerText; this.element.innerText = ''; this.originalText = ''; this.setText(final); }
    }


    // --------------------------------------------------------------------------
    // 4. Visual Energy: Magnetic Buttons
    // --------------------------------------------------------------------------
    if (!isMobile) {
        document.querySelectorAll('.enter-btn, .letter-btn').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                gsap.to(btn, { duration: 0.3, x: (e.clientX - rect.left - rect.width / 2) * 0.3, y: (e.clientY - rect.top - rect.height / 2) * 0.3, ease: 'power2.out' });
            });
            btn.addEventListener('mouseleave', () => { gsap.to(btn, { duration: 0.5, x: 0, y: 0, ease: 'elastic.out(1, 0.3)' }); });
        });
    }

    // --------------------------------------------------------------------------
    // 5. Live Love Counter
    // --------------------------------------------------------------------------
    const startDate = new Date("2025-02-09T00:00:00");
    const counterElement = document.getElementById('live-counter');
    setInterval(() => {
        const now = new Date();

        let years = now.getFullYear() - startDate.getFullYear();
        let months = now.getMonth() - startDate.getMonth();
        let days = now.getDate() - startDate.getDate();
        let hours = now.getHours() - startDate.getHours();
        let minutes = now.getMinutes() - startDate.getMinutes();
        let seconds = now.getSeconds() - startDate.getSeconds();

        // Adjust negative values by borrowing from larger units
        if (seconds < 0) { seconds += 60; minutes--; }
        if (minutes < 0) { minutes += 60; hours--; }
        if (hours < 0) { hours += 24; days--; }

        if (days < 0) {
            // Borrow days from the previous month
            const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            days += prevMonth.getDate();
            months--;
        }

        if (months < 0) {
            months += 12;
            years--;
        }

        if (counterElement) {
            // Format: Y M D H M S (Accurate for a lifetime)
            counterElement.innerText = `${years}Y ${months}M ${days}D ${hours}H ${minutes}M ${seconds}S`;
        }
    }, 1000);

    // --------------------------------------------------------------------------
    // 6. SVG Thread & Constellation Canvas
    // --------------------------------------------------------------------------
    const svgPath = document.getElementById('thread-path');
    function updateSVGThread() {
        if (!svgPath) return;
        const markers = document.querySelectorAll('.timeline-marker');
        const heroLine = document.querySelector('.scroll-indicator .line');
        const startY = heroLine ? (heroLine.getBoundingClientRect().bottom + window.scrollY) : 500;
        const centerX = window.innerWidth / 2;

        let pathString = `M ${centerX} ${startY}`;
        let lastX = centerX;
        let lastY = startY;

        markers.forEach((marker) => {
            const rect = marker.getBoundingClientRect();
            const curX = rect.left + window.scrollX + (rect.width / 2);
            const curY = rect.top + window.scrollY + (rect.height / 2);

            const deltaY = curY - lastY;
            const tension = deltaY * 0.5; // Smoothness factor

            // Smooth cubic bezier from last point to current point
            pathString += ` C ${lastX} ${lastY + tension}, ${curX} ${curY - tension}, ${curX} ${curY}`;

            lastX = curX;
            lastY = curY;
        });

        svgPath.setAttribute('d', pathString);
        const len = svgPath.getTotalLength(); svgPath.style.strokeDasharray = len; svgPath.style.strokeDashoffset = len;
    }
    // Recalculate on load to ensure images/layout are stable
    window.addEventListener('load', updateSVGThread);
    // Debounce resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(updateSVGThread, 100);
    });

    if (svgPath) gsap.to(svgPath, { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: "body", start: "top top", end: "bottom bottom", scrub: 1 } });

    // CONSTELLATION BACKGROUND
    const cCanvas = document.getElementById('constellation-canvas');
    if (cCanvas) {
        const ctx = cCanvas.getContext('2d');
        let stars = [];
        const starCount = isMobile ? 40 : 100;
        function resizeC() { cCanvas.width = window.innerWidth; cCanvas.height = window.innerHeight; }
        window.addEventListener('resize', resizeC); resizeC();

        class Star {
            constructor() { this.x = Math.random() * cCanvas.width; this.y = Math.random() * cCanvas.height; this.vx = (Math.random() - 0.5) * 0.2; this.vy = (Math.random() - 0.5) * 0.2; this.size = Math.random() * 2; }
            update() { this.x += this.vx; this.y += this.vy; if (this.x < 0) this.x = cCanvas.width; if (this.x > cCanvas.width) this.x = 0; if (this.y < 0) this.y = cCanvas.height; if (this.y > cCanvas.height) this.y = 0; }
            draw() { ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3})`; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); }
        }
        for (let i = 0; i < starCount; i++) stars.push(new Star());

        function animateStars() {
            ctx.clearRect(0, 0, cCanvas.width, cCanvas.height);
            stars.forEach(star => {
                star.update(); star.draw();
                // Connect to mouse
                const dx = star.x - mouseX; const dy = star.y - mouseY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    ctx.beginPath(); ctx.moveTo(star.x, star.y); ctx.lineTo(mouseX, mouseY);
                    ctx.strokeStyle = `rgba(179, 143, 111, ${1 - dist / 150})`; ctx.stroke();
                }
            });
            requestAnimationFrame(animateStars);
        }
        animateStars();
    }

    // --------------------------------------------------------------------------
    // 7. Entrance Logic
    // --------------------------------------------------------------------------
    const enterBtn = document.getElementById('enter-btn');
    const introOverlay = document.querySelector('.intro-overlay');
    const audio = document.getElementById('bg-music');

    // Scramblers REMOVED (User Feedback: looked like error)
    // let ts = document.querySelector('.hero-title') ? new ScrambleText(document.querySelector('.hero-title')) : null;
    // let ds = document.querySelector('.hero-date') ? new ScrambleText(document.querySelector('.hero-date'), '0123456789-./') : null;

    if (enterBtn) {
        enterBtn.addEventListener('click', () => {
            try {
                if (audio) {
                    audio.volume = 0;
                    audio.play().then(() => {
                        gsap.to(audio, { volume: 1.0, duration: 3 });
                    }).catch(e => console.error("Audio playback failed:", e));
                    document.getElementById('audio-control')?.classList.add('playing');
                }

                // Animate Out Intro
                gsap.timeline()
                    .to('.intro-content', { opacity: 0, duration: 0.5 })
                    .to(introOverlay, { opacity: 0, duration: 0.8, pointerEvents: 'none' })
                    .to('.hero-title, .hero-date, .live-counter-wrapper, .hero-subtitle, .scroll-indicator, #audio-control', { opacity: 1, y: 0, scale: 1, duration: 1, stagger: 0.1 });
            } catch (err) {
                console.error("Error in Enter Button Handler:", err);
            }
        });
    } else {
        console.error("Enter Button NOT Found!");
    }

    // --------------------------------------------------------------------------
    // 8. Responsive Animations (RESTORED)
    // --------------------------------------------------------------------------
    ScrollTrigger.matchMedia({
        "(min-width: 769px)": function () {
            // 3D Gallery Scroll (REMOVED)
            /*
            ScrollTrigger.create({
                trigger: ".memories-section",
                ...
            });
            */

            // Horizontal Vows
            const vowsContainer = document.querySelector('.vows-container');
            if (vowsContainer) {
                function getScrollAmount() { return -(vowsContainer.scrollWidth - window.innerWidth); }
                const tween = gsap.to(vowsContainer, { x: getScrollAmount, ease: "none" });

                // Parallax for Orbs (REMOVED)
                // gsap.to('.orb-1', { x: () => getScrollAmount() * 0.2, ease: "none", scrollTrigger: { trigger: ".vows-section-wrapper", start: "top top", end: () => `+=${getScrollAmount() * -1}`, scrub: 1 } });
                // gsap.to('.orb-2', { x: () => getScrollAmount() * 0.5, ease: "none", scrollTrigger: { trigger: ".vows-section-wrapper", start: "top top", end: () => `+=${getScrollAmount() * -1}`, scrub: 1 } });

                ScrollTrigger.create({
                    trigger: ".vows-section-wrapper", start: "top top", end: () => `+=${getScrollAmount() * -1}`,
                    pin: true, animation: tween, scrub: 1, invalidateOnRefresh: true
                });
            }
        },
        "all": function () {
            // Timeline Items
            const timelineItems = document.querySelectorAll('.timeline-item');
            timelineItems.forEach((item) => {
                gsap.fromTo(item,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
                        scrollTrigger: { trigger: item, start: "top 95%", end: "bottom 60%", toggleActions: "play none none reverse" }
                    }
                );
            });

            // Meaning Text Blur
            const meaningTexts = document.querySelectorAll('.meaning-text');
            gsap.fromTo(meaningTexts, { opacity: 0.2, filter: "blur(5px)" }, { opacity: 1, filter: "blur(0px)", stagger: 0.5, scrollTrigger: { trigger: ".meaning-section", start: "top center", end: "center center", scrub: true } });

            // Text Reveals
            const textLines = document.querySelectorAll('.text-reveal p');
            textLines.forEach((line, index) => {
                gsap.to(line, { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: index * 0.2, scrollTrigger: { trigger: '.emotional-section', start: "top 80%", toggleActions: "play none none reverse" } });
            });

            // Promise & Heartbeat
            gsap.to('.final-message', { opacity: 1, duration: 2, ease: "power2.inOut", scrollTrigger: { trigger: '.promise-section', start: "top 70%" } });
            gsap.to('.heartbeat', { scale: 1.1, duration: 0.8, repeat: -1, yoyo: true, ease: "sine.inOut" });
        }
    });

    // --------------------------------------------------------------------------
    // 8b. Draggable Polaroids & 3D Cards
    // --------------------------------------------------------------------------
    // Simple drag implementation for "Scattered Polaroids" feel
    // Replacing complex 3D scroll with draggable if desired, or enhancing it.
    // For now, we enhance the existing cards by making them draggable.

    // --------------------------------------------------------------------------
    // 8b. Draggable Polaroids & 3D Cards Enchanced
    // --------------------------------------------------------------------------
    const dragCards = document.querySelectorAll('.memory-card-3d');

    // Inject inner-float wrapper for independent animation
    dragCards.forEach(card => {
        const img = card.querySelector('img');
        if (img) {
            const wrapper = document.createElement('div');
            wrapper.className = 'inner-float';
            wrapper.style.animationDelay = Math.random() * 2 + 's'; // Randomize float
            card.appendChild(wrapper);
            wrapper.appendChild(img);
        }
    });

    dragCards.forEach(card => {
        let isDragging = false, startX, startY;

        // 3D Tilt Logic
        card.addEventListener('mousemove', (e) => {
            if (isDragging) return;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const cx = rect.width / 2;
            const cy = rect.height / 2;

            const rotateX = ((y - cy) / cy) * -15; // Max 15deg tilt
            const rotateY = ((x - cx) / cx) * 15;

            gsap.to(card, { rotationX: rotateX, rotationY: rotateY, duration: 0.5, ease: 'power2.out' });
        });

        card.addEventListener('mouseleave', () => {
            if (!isDragging) gsap.to(card, { rotationX: 0, rotationY: 0, duration: 0.5, ease: 'power2.out' });
        });

        card.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX; startY = e.clientY;
            gsap.to(card, { scale: 1.1, zIndex: 100, duration: 0.2, rotationX: 0, rotationY: 0 }); // Flatten for drag
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            gsap.to(card, { x: `+=${dx}`, y: `+=${dy}`, duration: 0 });
            startX = e.clientX; startY = e.clientY;
        });

        window.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                gsap.to(card, { scale: 1, zIndex: 1, duration: 0.3 });
            }
        });
    });

    // --------------------------------------------------------------------------
    // 8.5. SEQUENCE ANIMATION (New Feature: Journey in Motion)
    // --------------------------------------------------------------------------
    const canvas = document.getElementById("sequence-canvas");
    if (canvas) {
        const context = canvas.getContext("2d");
        const frameCount = 272; // Updated from 192
        const currentFrame = { index: 0 };
        const images = [];

        // Preload Images
        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            // File naming: ezgif-frame-001.jpg, ezgif-frame-010.jpg, ezgif-frame-100.jpg
            const frameNumber = i.toString().padStart(3, '0');
            img.src = `assets/sequence/ezgif-frame-${frameNumber}.jpg`;
            images.push(img);
        }

        // Render Function (Cover Logic)
        function render() {
            // Safety: Round logic to prevent float errors
            let constIndex = Math.round(currentFrame.index);
            // Clamp to valid range
            if (constIndex >= frameCount) constIndex = frameCount - 1;
            if (constIndex < 0) constIndex = 0;

            // Ensure image is loaded
            if (!images[constIndex] || !images[constIndex].complete) return;

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            // BACKGROUND FILL: Prevent empty space
            context.fillStyle = "#000000";
            context.fillRect(0, 0, canvas.width, canvas.height);

            const img = images[constIndex];
            const scale = Math.max(canvas.width / img.width, canvas.height / img.height) + 0.05; // Slight overscale
            const x = (canvas.width / 2) - (img.width / 2) * scale;
            const y = (canvas.height / 2) - (img.height / 2) * scale;

            context.drawImage(img, x, y, img.width * scale, img.height * scale);
        }

        // Trigger Render on first image load
        images[0].onload = render;


        // GSAP ScrollTrigger (Virtual Scroll Logic)
        ScrollTrigger.create({
            trigger: ".sequence-section",
            start: "top top",
            end: "+=12000", // Force 12,000px scroll distance (approx 12-15 screens)
            pin: true,
            scrub: true,
            onUpdate: self => {
                // Map progress (0 to 1) to frame index (0 to 271)
                const frameIndex = Math.min(
                    frameCount - 1,
                    Math.floor(self.progress * frameCount)
                );

                if (frameIndex !== currentFrame.index) {
                    currentFrame.index = frameIndex;
                    render();
                }
            }
        });

        // Handle Resize
        window.addEventListener('resize', render);
    }

    // --------------------------------------------------------------------------
    // 9. Rose Rain Logic (Footer Trigger)
    // --------------------------------------------------------------------------
    const footerTrigger = document.getElementById('footer-trigger');
    if (footerTrigger) {
        footerTrigger.addEventListener('click', () => {
            const container = document.getElementById('heart-container') || document.body;
            const petalImages = ['rose-petal.png', 'rose-petal-2.png'];

            for (let i = 0; i < 60; i++) {
                setTimeout(() => {
                    const h = document.createElement('img');
                    h.src = petalImages[Math.floor(Math.random() * petalImages.length)]; // Random pick
                    h.className = 'heart';
                    h.style.left = Math.random() * 100 + 'vw';
                    h.style.animationDuration = (Math.random() * 3 + 3) + 's'; // Slower, more floaty

                    // Randomize size and rotation for realism
                    const size = Math.random() * 20 + 20; // 20px to 40px
                    h.style.width = size + 'px';
                    h.style.transform = `rotate(${Math.random() * 360}deg)`;

                    container.appendChild(h);

                    setTimeout(() => h.remove(), 6000);
                }, i * 80);
            }
        });
    }



    // --------------------------------------------------------------------------
    // 11. Cinematic Blur Reveal & Gold Dust
    // --------------------------------------------------------------------------

    // A. Cinematic Blur Reveal
    const revealElements = document.querySelectorAll('h1, h2, h3, .hero-title, .vow-card p, .emotional-section p');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.classList.add('blur-reveal');
        revealObserver.observe(el);
    });

    // B. Gold Dust Cursor (RESTORED & OPTIMIZED)
    if (!isMobile) {
        const canvas = document.getElementById('gold-dust');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            let width, height;
            let particles = [];
            let lastX = 0, lastY = 0; // Optimization: Track last position

            function resize() {
                width = canvas.width = window.innerWidth;
                height = canvas.height = window.innerHeight;
            }
            window.addEventListener('resize', resize);
            resize();

            class Particle {
                constructor(x, y) {
                    this.x = x;
                    this.y = y;
                    this.size = Math.random() * 2 + 0.5; // Slightly smaller max size
                    this.speedX = Math.random() * 1.5 - 0.75; // Slower individual speed
                    this.speedY = Math.random() * 1.5 - 0.75;
                    this.life = 1;
                    this.decay = Math.random() * 0.03 + 0.02; // Faster decay for cleanup
                    this.color = `rgba(255, 215, 0, ${this.life})`;
                }
                update() {
                    this.x += this.speedX;
                    this.y += this.speedY;
                    this.life -= this.decay;
                    this.color = `rgba(197, 160, 101, ${this.life})`;

                    // Physics Polish: Air Resistance & Drift
                    this.speedX *= 0.95; // Friction
                    this.speedY *= 0.95; // Friction
                    this.y -= 0.2; // Thermal drift (heat rises)
                }
                draw() {
                    ctx.fillStyle = this.color;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            function handleParticles() {
                // Optimization: Limit max particles on screen
                if (particles.length > 50) particles.shift();

                for (let i = 0; i < particles.length; i++) {
                    particles[i].update();
                    particles[i].draw();
                    if (particles[i].life <= 0) {
                        particles.splice(i, 1);
                        i--;
                    }
                }
            }

            function animate() {
                ctx.clearRect(0, 0, width, height);
                // Optimization: Skip rendering if no particles
                if (particles.length > 0) {
                    handleParticles();
                }
                requestAnimationFrame(animate);
            }
            animate();

            window.addEventListener('mousemove', (e) => {
                // OPTIMIZED: Distance-based throttling
                const dx = e.clientX - lastX;
                const dy = e.clientY - lastY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance > 20) { // Only spawn if moved > 20px
                    particles.push(new Particle(e.clientX, e.clientY));
                    lastX = e.clientX;
                    lastY = e.clientY;
                }
            });
        }
    }

});
