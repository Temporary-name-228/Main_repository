document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slider-img');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    let currentIndex = 0;
    let slideInterval; // Переменная для хранения таймера

    // Функция для смены слайда
    function updateSlider(newIndex) {
        // Убираем активный класс у текущего слайда
        slides[currentIndex].classList.remove('active');

        // Рассчитываем индекс следующего (с зацикливанием)
        if (newIndex >= slides.length) {
            currentIndex = 0;
        } else if (newIndex < 0) {
            currentIndex = slides.length - 1;
        } else {
            currentIndex = newIndex;
        }

        // Добавляем активный класс новому слайду
        slides[currentIndex].classList.add('active');
    }

    // Функция для запуска/сброса автоплея
    function startAutoplay() {
        // Очищаем предыдущий таймер, если он был
        clearInterval(slideInterval);
        // Запускаем новый таймер на 5 секунд (5000 мс)
        slideInterval = setInterval(() => {
            updateSlider(currentIndex + 1);
        }, 5000);
    }

    // Обработчики кликов (с перезапуском автоплея)
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            updateSlider(currentIndex - 1);
            startAutoplay(); // Сбрасываем 5 секунд при ручном клике
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            updateSlider(currentIndex + 1);
            startAutoplay(); // Сбрасываем 5 секунд при ручном клике
        });
    }

    // Инициализация: запускаем автоплей при загрузке
    if (slides.length > 0) {
        startAutoplay();
    }
});