// ===== SCROLL PROGRESS BAR =====
const progressBar = document.getElementById('progressBar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
});

// ===== NAVBAR SCROLL EFFECT =====
const nav = document.querySelector('.nav');
let lastScrollY = window.pageYOffset;

window.addEventListener('scroll', () => {
    const currentScrollY = window.pageYOffset;
    
    if (currentScrollY > 100) {
        nav.style.background = 'rgba(10, 14, 26, 0.95)';
        nav.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.4)';
    } else {
        nav.style.background = 'rgba(10, 14, 26, 0.8)';
        nav.style.boxShadow = 'none';
    }
    
    lastScrollY = currentScrollY;
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = nav.offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Elements to animate on scroll
const animatedElements = document.querySelectorAll(
    '.info-card, .experience-card, .project-card, .skill-category, .leadership-card, .contact-item'
);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    fadeObserver.observe(el);
});

// ===== SKILL BARS ANIMATION =====
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                const width = bar.style.getPropertyValue('--width');
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const skillCategories = document.querySelectorAll('.skill-category');
skillCategories.forEach(category => skillObserver.observe(category));

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--accent-primary)';
        }
    });
});

// ===== TYPEWRITER EFFECT FOR CODE WINDOW =====
const codeContent = document.querySelector('.window-content code');
if (codeContent) {
    const codeText = codeContent.innerHTML;
    codeContent.innerHTML = '';
    
    let charIndex = 0;
    const typeSpeed = 15;
    
    const codeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const typeWriter = () => {
                    if (charIndex < codeText.length) {
                        codeContent.innerHTML = codeText.substring(0, charIndex + 1);
                        charIndex++;
                        setTimeout(typeWriter, typeSpeed);
                    }
                };
                setTimeout(typeWriter, 500);
                codeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    const codeWindow = document.querySelector('.code-window');
    if (codeWindow) {
        codeObserver.observe(codeWindow);
    }
}

// ===== PARALLAX EFFECT ON HERO =====
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
        }
    });
}

// ===== CURSOR GLOW EFFECT (OPTIONAL ENHANCEMENT) =====
const createCursorGlow = () => {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-glow';
    cursor.style.cssText = `
        position: fixed;
        width: 500px;
        height: 500px;
        border-radius: 50%;
        pointer-events: none;
        background: radial-gradient(circle, rgba(96, 165, 250, 0.08), transparent 70%);
        transform: translate(-50%, -50%);
        z-index: 9999;
        transition: opacity 0.3s;
        opacity: 0;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursor.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
};

// Only create cursor glow on larger screens
if (window.innerWidth > 968) {
    createCursorGlow();
}

// ===== PREVENT ANIMATION ON PAGE LOAD =====
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ===== REDUCED MOTION SUPPORT =====
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
    });
}

// ===== CONSOLE EASTER EGG =====
console.log(
    '%c👋 Hello there!',
    'font-size: 24px; font-weight: bold; color: #60a5fa; text-shadow: 0 0 10px rgba(96, 165, 250, 0.5);'
);
console.log(
    '%cLooking for a talented co-op student?\n%cLet\'s connect: aakashharen@gmail.com',
    'font-size: 16px; color: #cbd5e1; margin-top: 10px;',
    'font-size: 14px; color: #10b981; font-weight: bold;'
);
console.log(
    '%cCheck out my GitHub: https://github.com/Aakash-Harendran',
    'font-size: 14px; color: #94a3b8;'
);