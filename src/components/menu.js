import Component from './component';
import TweenLite from 'gsap';
import scrollTo from 'ScrollToPlugin';

export default class Menu extends Component {

    constructor(selector) {
        super();

        this.el = document.querySelector(selector);
        this.underline = document.querySelector('.menu__underline');
        this.items = this.el.querySelectorAll('.menu__link');
    }

    init() {
        this.utils.forEach(this.items, (index,item) => {
            item.addEventListener('click', e => {
                this.selectItem(e);
            });
        });
    }

    selectItem(e) {
        e.preventDefault();

        let item = e.target;
        let itemCenterX = item.offsetLeft + item.offsetWidth / 2;
        let underlineCenterX = itemCenterX - this.underline.offsetWidth / 2;
        TweenLite.to(this.underline, 0.4, {'left': underlineCenterX, ease: Power2.easeOut});

        let target = item.dataset.target;
        let section = document.querySelector('.' + target);
        let top = section.offsetTop;
        TweenLite.to(window, 0.7, {scrollTo: {y: top}, ease: Power2.easeOut});
    }

}
