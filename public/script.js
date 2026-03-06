document.addEventListener('DOMContentLoaded', () => {
    // Magic Dust Canvas background
    const canvas = document.getElementById('magic-dust');
    const ctx = canvas.getContext('2d');
    
    let width, height;
    let particles = [];

    function initCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        particles = [];
        const numParticles = Math.min(width * 0.1, 150); // Responsive amount of dust
        
        for(let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5 + 0.1, // Slight downward drift
                size: Math.random() * 2 + 0.5,
                alpha: Math.random() * 0.5 + 0.1
            });
        }
    }

    function animateDust() {
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            
            // Wrap around edges
            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y > height) p.y = 0;
            if (p.y < 0) p.y = height;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(253, 224, 71, ${p.alpha})`; // --primary color
            ctx.fill();
            
            // Twinkle effect
            if(Math.random() > 0.98) {
                p.alpha = Math.random() * 0.8 + 0.2;
            }
        });
        
        requestAnimationFrame(animateDust);
    }

    initCanvas();
    animateDust();

    window.addEventListener('resize', initCanvas);

    // Scroll Animations
    const animatedElements = document.querySelectorAll(
        '.bounce-up, .fade-up, .fade-up-delay, .fade-up-delay-2, .slide-in-left, .slide-in-right, .zoom-in, .pop-in'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.15, // Trigger when 15% is visible
        rootMargin: "0px 0px -50px 0px" // Slightly before it fully enters viewport
    });

    animatedElements.forEach(el => observer.observe(el));

    // Navbar glass effect on scroll
    const nav = document.querySelector('.glass-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(15, 23, 42, 0.9)'; // Darker glass
            nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        } else {
            nav.style.background = 'rgba(15, 23, 42, 0.6)';
            nav.style.boxShadow = 'none';
        }
    });

    // CA Copier Logic
    const copyBtn = document.getElementById('copy-ca');
    const caText = document.getElementById('ca-text');

    if (copyBtn && caText) {
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(caText.innerText).then(() => {
                const originalText = copyBtn.innerText;
                copyBtn.innerText = 'Copied! ✓';
                copyBtn.classList.add('copied');
                
                setTimeout(() => {
                    copyBtn.innerText = originalText;
                    copyBtn.classList.remove('copied');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    }
});
