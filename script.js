document.addEventListener('DOMContentLoaded', function () {

    // --- Mouse-Follow Spotlight Effect ---
    const spotlight = document.querySelector('.spotlight');
    if (spotlight) {
        window.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                spotlight.style.left = `${e.clientX}px`;
                spotlight.style.top = `${e.clientY}px`;
            });
        });
    }

    // --- Hide Header on Scroll ---
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop && scrollTop > 50) { header.classList.add('header-hidden'); } 
        else { header.classList.remove('header-hidden'); }
        if (scrollTop > 50) { header.classList.add('scrolled'); } 
        else { header.classList.remove('scrolled'); }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, false);

    // --- Hamburger Menu Logic ---
    const hamburger = document.getElementById('hamburger-button');
    const mobileNav = document.getElementById('mobile-nav');
    const body = document.body;
    
    hamburger.addEventListener('click', () => {
        body.classList.toggle('nav-open');
    });

    mobileNav.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            body.classList.remove('nav-open');
        }
    });

    // --- Intersection Observer for On-Scroll Animations ---
    const animatedElements = document.querySelectorAll('[class^="animate-"]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    animatedElements.forEach(element => { observer.observe(element); });

    // --- Project/Achievement Modal Logic ---
    const clickableCards = document.querySelectorAll('.project-card, .achievement-card'); // Select both
    const modal = document.getElementById('project-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const closeModal = document.querySelector('.close-button');

    clickableCards.forEach(card => {
        card.addEventListener('click', () => {
            modalImg.src = card.dataset.img;
            modalTitle.textContent = card.dataset.title;
            modalDesc.textContent = card.dataset.desc;
            modal.classList.add('active');
            body.classList.add('modal-open'); // Prevent background scroll
        });
    });

    const hideModal = () => { 
        modal.classList.remove('active'); 
        body.classList.remove('modal-open'); // Allow background scroll
    };

    closeModal.addEventListener('click', hideModal);
    modal.addEventListener('click', (e) => { 
        if (e.target === modal) { 
            hideModal(); 
        } 
    });
    document.addEventListener('keydown', (e) => { 
        if (e.key === "Escape" && modal.classList.contains('active')) { 
            hideModal(); 
        } 
    });

    // --- particles.js Configuration ---
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": { "number": { "value": 60, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#D9A7A0" }, "shape": { "type": "circle" }, "opacity": { "value": 0.4, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1 } }, "size": { "value": 3, "random": true }, "line_linked": { "enable": false }, "move": { "enable": true, "speed": 0.5, "direction": "none", "random": true, "out_mode": "out" } },
            "interactivity": { "events": { "onhover": { "enable": true, "mode": "bubble" }, "onclick": { "enable": false } }, "modes": { "bubble": { "distance": 200, "size": 6, "duration": 2, "opacity": 0.8 } } },
            "retina_detect": true
        });
    }
});