import Component from './component';
import AnimatedPicto from './animated-picto';

export default class Concept extends Component {

    constructor(selectors) {
        super();

        self.sections = [];

        selectors.forEach((selector, index) => {
            let element = document.querySelector(selector);
            let pictoElement = element.querySelector('.concept__picto');
            let picto = new AnimatedPicto(pictoElement);

            self.sections[index] = {
                'el': element,
                'picto': picto
            }
        });
    }

    init() {
        window.addEventListener('scroll', e => {
            this.onScroll(e);
        });
    }

    onScroll(e) {
        for (const section of self.sections) {
            if (window.pageYOffset >= (section.el.offsetTop - window.innerHeight / 3) && !section.picto.played) {
                section.picto.anim.play();
                section.picto.played = true;
            }
        }
    }
}
