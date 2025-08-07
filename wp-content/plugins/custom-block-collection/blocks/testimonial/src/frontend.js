import $ from 'jquery';
import './frontend.scss';
import 'owl.carousel';

document.addEventListener('DOMContentLoaded', () => {
    console.log('Frontend script loaded');
    console.log('jQuery available:', typeof $ !== 'undefined');
    
    const carousels = document.querySelectorAll('.testimonial-carousel');
    console.log('Found carousels:', carousels.length);

    carousels.forEach((carousel, index) => {
        console.log(`Initializing carousel ${index}:`, carousel);
        
        try {
            $(carousel).owlCarousel({
                items: 1,
                margin: 10,
                loop: true,
                nav: true,
                dots: false,
                autoplay: false,
                responsive: {
                    0: { items: 1 },
                    600: { items: 1 },
                    1000: { items: 1 }
                }
            });
            
            const $carousel = $(carousel);
            const $navButtons = $carousel.find('.owl-nav');
            const $contentBlock = $carousel.closest('.wp-block-custom-blocks-testimonial').find('.testimonial-custom-block__content');
            
            if ($navButtons.length && $contentBlock.length) {
                $navButtons.detach().appendTo($contentBlock);
                console.log(`Navigation moved to content block for carousel ${index}`);
            }
            
            console.log(`Carousel ${index} initialized successfully`);
        } catch (error) {
            console.error(`Error initializing carousel ${index}:`, error);
        }
    });
});
