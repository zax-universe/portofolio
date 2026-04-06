document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    renderAll();
    initSpotlightEffect();
    initSmoothScroll();
    initCursorGlow();
    initTypingEffect();
    initScrollAnimations();
    initNavbar();
    initScrollProgress();
    initBackToTop();
    initAudioEffects();
}

function renderAll() {
    const navContainer = document.getElementById('navbar');
    if(navContainer) navContainer.innerHTML = Components.renderNav();

    const heroContainer = document.getElementById('hero');
    if(heroContainer) heroContainer.innerHTML = Components.renderHero(settings.hero);

    const aboutContainer = document.getElementById('about');
    if(aboutContainer) aboutContainer.innerHTML = Components.renderAbout(settings.profile);
    
    const skillsContainer = document.getElementById('skills');
    if(skillsContainer) skillsContainer.innerHTML = Components.renderSkills(settings.skills);

    const githubContainer = document.getElementById('github');
    if(githubContainer) githubContainer.innerHTML = Components.renderGithubStats(settings.profile.github);

    const projectsContainer = document.getElementById('projects');
    if(projectsContainer) projectsContainer.innerHTML = Components.renderProjects(settings.projects);
    
    const footerContainer = document.getElementById('footer');
    if(footerContainer) footerContainer.innerHTML = Components.renderFooter();

    document.querySelectorAll('.btn, .social-icon, .nav-link, .skill-item, .glass-card').forEach(el => {
        el.classList.add('clickable-element');
    });
}

function initSpotlightEffect() {
    const cards = document.querySelectorAll('.bento-card');
    
    document.addEventListener('mousemove', (e) => {
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

function initSmoothScroll() {
   document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

function initTypingEffect() {
    const textElement = document.getElementById('typing-text');
    if (!textElement) return;

    const phrases = settings.hero.roles;
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            textElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            textElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-slide-up');
                entry.target.classList.remove('opacity-0');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(5, 5, 17, 0.9)';
            navbar.style.padding = '0 40px';
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
            navbar.style.top = '0';
            navbar.style.width = '100%';
            navbar.style.borderRadius = '0';
        } else {
            if (window.innerWidth > 768) {
                navbar.style.background = 'rgba(10, 10, 12, 0.6)';
                navbar.style.padding = '0 30px';
                navbar.style.boxShadow = 'none';
                navbar.style.top = '20px';
                navbar.style.width = '90%';
                navbar.style.borderRadius = '50px';
            }
        }
    });

    setTimeout(() => {
        const toggle = document.getElementById('nav-toggle');
        const navList = document.getElementById('nav-list');
        if (toggle && navList) {
            toggle.onclick = () => {
                navList.classList.toggle('active');
            };
            
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                   navList.classList.remove('active'); 
                });
            });
        }
    }, 100);
}

function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.height = '3px';
    progressBar.style.backgroundColor = 'var(--primary)';
    progressBar.style.width = '0%';
    progressBar.style.zIndex = '9999';
    progressBar.style.transition = 'width 0.1s';
    progressBar.style.boxShadow = '0 0 10px var(--primary)';
    
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

function initBackToTop() {
    const btn = document.createElement('button');
    btn.innerHTML = '<i class="ri-arrow-up-line"></i>';
    btn.className = 'btn-back-to-top clickable-element';
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function initAudioEffects() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const ctx = new AudioContext();

    const playSound = (type) => {
        if (ctx.state === 'suspended') ctx.resume();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        if (type === 'hover') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(400, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.05);
            gain.gain.setValueAtTime(0.05, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
            osc.start();
            osc.stop(ctx.currentTime + 0.05);
        } else if (type === 'click') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(300, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);
            gain.gain.setValueAtTime(0.1, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
            osc.start();
            osc.stop(ctx.currentTime + 0.1);
        }
    };

    document.body.addEventListener('mouseenter', (e) => {
        if (e.target.closest('.clickable-element') || e.target.closest('a') || e.target.closest('button')) {
            playSound('hover');
        }
    }, true);

    document.body.addEventListener('click', (e) => {
        if (e.target.closest('.clickable-element') || e.target.closest('a') || e.target.closest('button')) {
            playSound('click');
        }
    });
}

function initCursorGlow() {
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);

    document.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });
    document.addEventListener('mouseleave', () => {
        glow.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        glow.style.opacity = '1';
    });
}

function initTwinklingStars() {
    const container = document.createElement('div');
    container.className = 'stars-container';
    document.body.appendChild(container);

    const starCount = 80;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        const size = Math.random() * 2 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.setProperty('--duration', (Math.random() * 3 + 2) + 's');
        star.style.setProperty('--opacity', (Math.random() * 0.7 + 0.3));
        star.style.animationDelay = Math.random() * 5 + 's';
        
        container.appendChild(star);
    }
}

function initHeroParticles() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    const particleCount = 60;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.fillStyle = 'rgba(88, 196, 220, 0.5)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.strokeStyle = `rgba(88, 196, 220, ${0.1 - distance/1500})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }
    init();
    animate();
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });
}
