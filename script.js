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

    // --- Project Animation & Height Logic ---
    const filterContainer = document.querySelector('.project-filters');
    const projectLists = document.querySelectorAll('.project-list');
    const displayArea = document.querySelector('.project-display-area');

    const animateListItems = (listElement) => {
        const items = listElement.querySelectorAll('.project-item');
        items.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('visible');
            }, index * 100);
        });
    };
    
    const resetListItems = (listElement) => {
        const items = listElement.querySelectorAll('.project-item');
        items.forEach(item => {
            item.classList.remove('visible');
        });
    };

    // Set initial container height and animate first list
    const initialList = document.querySelector('.project-list:not(.hidden)');
    if (initialList) {
        displayArea.style.height = `${initialList.offsetHeight}px`;
        animateListItems(initialList);
    }
    
    if (filterContainer) {
        filterContainer.addEventListener('click', (e) => {
            if (e.target.tagName !== 'BUTTON') return;

            const filterBtns = filterContainer.querySelectorAll('.filter-btn');
            filterBtns.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');

            const filterValue = e.target.dataset.filter;
            const targetList = document.getElementById(`${filterValue}-projects`);
            const activeList = document.querySelector('.project-list:not(.hidden)');

            if (targetList === activeList) return;

            // 1. Temporarily make the target list visible to measure its real height
            targetList.classList.remove('hidden');
            const targetHeight = targetList.offsetHeight;
            targetList.classList.add('hidden'); // Immediately hide it again

            // 2. Animate the container to the height of the new list
            displayArea.style.height = `${targetHeight}px`;

            // 3. Reset and hide the old list
            if (activeList) {
                resetListItems(activeList);
                activeList.classList.add('hidden');
            }

            // 4. Show and animate the new list
            targetList.classList.remove('hidden');
            animateListItems(targetList);
        });
    }

    // --- Project/Achievement Modal Logic ---
    const clickableCards = document.querySelectorAll('.project-item, .achievement-card');
    const modal = document.getElementById('project-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const closeModal = document.querySelector('.close-button');
    const fullscreenWrapper = document.getElementById('fullscreen-wrapper');
    const fullscreenExitBtn = document.getElementById('fullscreen-exit-btn');


    clickableCards.forEach(card => {
        card.addEventListener('click', () => {
            modalImg.src = card.dataset.img;
            modalTitle.textContent = card.dataset.title;
            modalDesc.textContent = card.dataset.desc;
            modal.classList.add('active');
            body.classList.add('modal-open');
        });
    });

    const hideModal = () => { 
        modal.classList.remove('active'); 
        body.classList.remove('modal-open');
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

    // --- Fullscreen Image Logic ---
    if (modalImg && fullscreenWrapper && fullscreenExitBtn) {
        // Open fullscreen when image is clicked
        modalImg.addEventListener('click', () => {
            if (fullscreenWrapper.requestFullscreen) {
                fullscreenWrapper.requestFullscreen();
            } else if (fullscreenWrapper.webkitRequestFullscreen) { /* Safari */
                fullscreenWrapper.webkitRequestFullscreen();
            } else if (fullscreenWrapper.msRequestFullscreen) { /* IE11 */
                fullscreenWrapper.msRequestFullscreen();
            }
        });

        // Close fullscreen when the new button is clicked
        fullscreenExitBtn.addEventListener('click', () => {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) { /* Safari */
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { /* IE11 */
                document.msExitFullscreen();
            }
        });
    }

    // --- particles.js Configuration ---
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": { "number": { "value": 60, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#D9A7A0" }, "shape": { "type": "circle" }, "opacity": { "value": 0.4, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1 } }, "size": { "value": 3, "random": true }, "line_linked": { "enable": false }, "move": { "enable": true, "speed": 0.5, "direction": "none", "random": true, "out_mode": "out" } },
            "interactivity": { "events": { "onhover": { "enable": true, "mode": "bubble" }, "onclick": { "enable": false } }, "modes": { "bubble": { "distance": 200, "size": 6, "duration": 2, "opacity": 0.8 } } },
            "retina_detect": true
        });
    }
});
