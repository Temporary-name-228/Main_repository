document.addEventListener('DOMContentLoaded', () => {
    // 1. Скролл к форме при нажатии "Забронировать"
    const bookBtn = document.querySelector('.event-book-btn');
    const questionsSection = document.querySelector('.questions');

    if (bookBtn && questionsSection) {
        bookBtn.addEventListener('click', (e) => {
            e.preventDefault();
            questionsSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    // 2. Скролл вверх при нажатии на логотип
    const logo = document.querySelector('.logo');

    if (logo) {
        logo.addEventListener('click', (e) => {
            // Проверяем, что ссылка ведет на главную или содержит только #
            // чтобы не перебивать переход на другие страницы, если они появятся
            if (logo.getAttribute('href') === '/' || logo.getAttribute('href') === '#') {
                e.preventDefault(); // Отменяем перезагрузку страницы
                
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }
});