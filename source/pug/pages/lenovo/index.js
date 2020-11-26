import './index.sass';
import 'swiper/swiper.scss';

import {
    Swiper,
    Navigation,
    Pagination,
    Scrollbar,
    EffectCoverflow
} from 'swiper/swiper.esm.js';

console.log('Swiper', Swiper);

document.addEventListener('DOMContentLoaded', (event) => {
    let prodThumbSwiper;
    let prodMainSwiper;
    let skip = false;
    let sliderSpeed = 500;

    prodThumbSwiper = new Swiper('.prodThumbSlider', {
        slidesPerView: 3,
        spaceBetween: 10,
        speed: sliderSpeed,
        loop: true,
        setWrapperSize: true,
        watchSlidesProgress: true,
        slideToClickedSlide: true,
        on: {
            slideChange: function (swp) {
                console.log('prodThumbSwiper', swp);

                if (!skip && prodMainSwiper) {
                    skip = true;
                    prodMainSwiper.slideTo(swp.activeIndex);
                }
            },
            slideChangeTransitionEnd: function () {
                skip = false
            }
        }
    });

    prodMainSwiper = new Swiper('.prodMainSlider', {
        loop: true,
        setWrapperSize: true,
        speed: sliderSpeed,
        on: {
            slideChange: function (swp) {
                if (!skip && prodThumbSwiper) {
                    skip = true;
                    prodThumbSwiper.slideTo(swp.activeIndex);
                }
            },
            slideChangeTransitionEnd: function () {
                skip = false
            }
        }
    });

});
