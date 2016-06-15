import Component from './component';
import TweenLite from 'gsap';
import $ from 'jquery';
import slick from '../vendors/slick';

export default class Animals extends Component {

    constructor(selector) {
        super();

        this.selector = selector;
        this.el = document.querySelector(this.selector);
        this.autoplaySpeed = 5000;
        this.speed = 750;
        this.slider = $('.animals__slider');
        this.loader = this.el.querySelector('.animals__loader');
    }

    init() {
        this.createSlider();
        this.animateLoader();
        this.slider.on('beforeChange', (event, slick, currentSlide, nextSlide) => {
            console.log('test');
            this.sliderBeforeChange(event, slick, currentSlide, nextSlide);
        });
        this.slider.on('afterChange', (event, slick, currentSlide, nextSlide) => {
            this.sliderAfterChange(event, slick, currentSlide, nextSlide);
        });
        this.selectItem();
    }

    createSlider() {
        this.slider.slick({
            infinite: true,
            arrows: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            centerMode: true,
            autoplay: true,
            autoplaySpeed: this.autoplaySpeed,
            speed: this.speed,
            pauseOnHover: false,
            responsive: [
                {
                    breakpoint: 1280,
                    settings: {
                        slidesToShow: 1,
                        centerPadding: '25%'
                    }
                },
                {
                    breakpoint: 720,
                    settings: {
                        slidesToShow: 1,
                        centerPadding: 0
                    }
                }
            ]
        });
    }

    animateLoader() {
        TweenLite.to(this.loader, this.autoplaySpeed / 1000, {width: '100%', ease: Power1.easeInOut, onComplete: () => {
            TweenLite.to(this.loader, 0.5, {left: '100%', ease: Power1.easeInOut, onComplete: () => {
                $('.animals__loader').css({left: 0, width: 0});
            }});
        }});
    }

    resetLoader() {
        TweenLite.to(this.loader, this.speed / 1000, {width: 0, ease: Power1.easeInOut, onComplete: () => {
            this.animateLoader();
        }});
    }

    sliderBeforeChange(event, slick, currentSlide, nextSlide) {
        let nextSlideEl = this.el.querySelector('[data-slick-index="'+nextSlide+'"]');

        let nextColor = nextSlideEl.dataset.color;
        $(this.selector).animate({
            backgroundColor: nextColor
        });;

        let name = nextSlideEl.dataset.name;
        let animalName = $('.animals__animal-name');
        animalName.fadeOut(400, () => {
            animalName.text(name);
            animalName.fadeIn(400);
        });

        var width = this.loader.offsetWidth;
        if (width > 0 && width < this.loader.parentElement.offsetWidth) {
            this.resetLoader();
        }
    }

    sliderAfterChange(event, slick, currentSlide, nextSlide) {
        if (this.loader.offsetWidth == 0) {
            this.animateLoader();
        }
    }

    selectItem() {
        $('.slick-slide').on('click', e => {
            let element = e.currentTarget;
            let currentIndex = this.slider.slick('slickCurrentSlide');
            let index = $(element).attr('data-slick-index');

            if (index < currentIndex) {
                this.slider.slick('slickPrev');
            }
            else if (index > currentIndex) {
                this.slider.slick('slickNext');
            }
        });
    }
}
