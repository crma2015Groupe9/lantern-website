import Component from './component';
import bodymovin from 'bodymovin';

export default class AnimatedPicto extends Component {

    constructor(element) {
        super();

        this.el = element;
        this.path = this.el.dataset.path;
        this.played = false;
        this.anim = bodymovin.loadAnimation({
            container: this.el,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: this.path
        });
    }

    init() {

    }

}
