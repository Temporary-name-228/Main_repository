document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll(
        '.download-buttons a, .social-icon'
    );

    const sources = {
        'google.png': {
            hover: './img/download/google_hover.png',
            active: './img/download/google_active.png'
        },
        'app.png': {
            hover: './img/download/app_hover.png',
            active: './img/download/app_active.png'
        },
        'vk.png': {
            hover: './img/media/vk_hover.png',
            active: './img/media/vk_active.png'
        },
        'inst.png': {
            hover: './img/media/inst_hover.png',
            active: './img/media/inst_active.png'
        },
        'telega.png': {
            hover: './img/media/telega_hover.png',
            active: './img/media/telega_active.png'
        }
    };

    buttons.forEach((button) => {
        const img = button.querySelector('img');
        if (!img) return;

        const originalSrc = img.getAttribute('src');
        const fileName = originalSrc.split('/').pop();

        const hoverSrc = sources[fileName]?.hover || originalSrc;
        const activeSrc = sources[fileName]?.active || hoverSrc;

        let currentSrc = originalSrc;
        let isTransitioning = false;
        let isMouseDown = false;

        img.style.transition = 'opacity 0.2s ease';

        function preloadAndSwap(newSrc) {
            if (currentSrc === newSrc || isTransitioning) return;

            isTransitioning = true;

            const newImage = new Image();
            newImage.src = newSrc;

            newImage.onload = () => {
                img.style.opacity = '0';

                setTimeout(() => {
                    img.src = newSrc;
                    currentSrc = newSrc;
                    img.style.opacity = '1';

                    setTimeout(() => {
                        isTransitioning = false;
                    }, 200);
                }, 120);
            };

            newImage.onerror = () => {
                isTransitioning = false;
            };
        }

        button.addEventListener('mouseenter', () => {
            if (!isMouseDown) {
                preloadAndSwap(hoverSrc);
            }
        });

        button.addEventListener('mouseleave', () => {
            isMouseDown = false;
            preloadAndSwap(originalSrc);
        });

        button.addEventListener('mousedown', () => {
            isMouseDown = true;
            preloadAndSwap(activeSrc);
        });

        button.addEventListener('mouseup', () => {
            isMouseDown = false;
            preloadAndSwap(hoverSrc);
        });

        button.addEventListener('blur', () => {
            isMouseDown = false;
            preloadAndSwap(originalSrc);
        });
    });
});