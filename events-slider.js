document.addEventListener('DOMContentLoaded', () => {
    const card = document.querySelector('.events-card');
    const prevBtn = document.querySelector('.events-prev');
    const nextBtn = document.querySelector('.events-next');
    const questionsSection = document.querySelector('.questions');
    const bookBtn = document.querySelector('.event-book-btn');

    if (!card || !prevBtn || !nextBtn) return;

    let isAnimating = false;

    card.style.transition = 'opacity 0.35s ease-in-out';
    card.style.opacity = '1';

    function scrollToForm() {
        if (!questionsSection) return;

        questionsSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    function fadeSlide() {
        if (isAnimating) return;
        isAnimating = true;

        card.style.opacity = '0';

        setTimeout(() => {
            card.style.opacity = '1';

            setTimeout(() => {
                isAnimating = false;
            }, 350);
        }, 120);
    }

    prevBtn.addEventListener('click', fadeSlide);
    nextBtn.addEventListener('click', fadeSlide);

    if (bookBtn) {
        bookBtn.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToForm();
        });
    }
});