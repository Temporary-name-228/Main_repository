document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slider-img');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');

    let currentIndex = 0;
    let slideInterval;
    let isTransitioning = false;

    slides.forEach((slide, index) => {
        slide.style.transition = 'opacity 0.5s ease';
        slide.style.opacity = index === 0 ? '1' : '0';
    });

    function updateSlider(newIndex) {
        if (isTransitioning || slides.length === 0) return;
        isTransitioning = true;

        let nextIndex;
        if (newIndex >= slides.length) {
            nextIndex = 0;
        } else if (newIndex < 0) {
            nextIndex = slides.length - 1;
        } else {
            nextIndex = newIndex;
        }

        const currentSlide = slides[currentIndex];
        const nextSlide = slides[nextIndex];

        currentSlide.style.opacity = '0';

        setTimeout(() => {
            currentSlide.classList.remove('active');

            nextSlide.classList.add('active');
            nextSlide.style.opacity = '0';

            requestAnimationFrame(() => {
                nextSlide.style.opacity = '1';
            });

            currentIndex = nextIndex;

            setTimeout(() => {
                isTransitioning = false;
            }, 500);
        }, 150);
    }

    function startAutoplay() {
        clearInterval(slideInterval);
        slideInterval = setInterval(() => {
            updateSlider(currentIndex + 1);
        }, 5000);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            updateSlider(currentIndex - 1);
            startAutoplay();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            updateSlider(currentIndex + 1);
            startAutoplay();
        });
    }

    if (slides.length > 0) {
        startAutoplay();
    }
});