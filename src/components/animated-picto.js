import Component from './component';
import bodymovin from 'bodymovin';

export default class AnimatedPicto extends Component {

    constructor(selector) {
        super();

        this.el = document.querySelector(selector);
        this.path = this.el.dataset.path;
    }

    init() {
        bodymovin.loadAnimation({
            container: this.el,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: this.path
        })
    }

}
