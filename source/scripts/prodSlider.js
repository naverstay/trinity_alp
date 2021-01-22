import 'swiper/swiper.scss';

import {Swiper} from 'swiper/swiper.esm.js';

document.addEventListener('DOMContentLoaded', (event) => {
    let prodThumbSwiper;
    let prodMainSwiper;
    let skip = false;
    let sliderSpeed = 500;

    prodThumbSwiper = new Swiper('.prodThumbSlider', {
        loop: false,
        slidesPerView: 3,
        spaceBetween: 10,
        speed: sliderSpeed,
        setWrapperSize: true,
        watchSlidesProgress: true,
        slideToClickedSlide: true,
        on: {
            slideChange: function (swp) {
                if (!skip && prodMainSwiper) {
                    skip = true;
                    prodMainSwiper.slideTo(swp.activeIndex);
                }
            },
            slideChangeTransitionEnd: function () {
                skip = false
            },
            init: function (swp) {
                for (let i = 0; i < swp.slides.length; i++) {
                    let sld = swp.slides[i];

                    sld.onclick = function () {
                        prodMainSwiper.slideTo(+sld.getAttribute('data-slide-index'));
                    }
                }
            }
        }
    });

    prodMainSwiper = new Swiper('.prodMainSlider', {
        loop: false,
        setWrapperSize: true,
        speed: sliderSpeed,
        thumbs: {
            swiper: prodThumbSwiper
        },
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
