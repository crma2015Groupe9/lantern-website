import Component from './component';
import TweenLite from 'gsap';
import css from 'dom-css';

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

    selectItem(event) {
        let item = event.target;
        let itemCenterX = item.offsetLeft + item.offsetWidth / 2;
        let underlineCenterX = itemCenterX - this.underline.offsetWidth / 2;
        TweenLite.to(this.underline, 0.4, {'left': underlineCenterX, ease: Power2.easeOut});
    }

}
