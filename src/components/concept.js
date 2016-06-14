import Component from './component';
import AnimatedPicto from './animated-picto';

export default class Concept extends Component {

    constructor(selectors) {
        super();

        self.pictos = [];
        for (let selector of selectors) {
            let animatedPicto = new AnimatedPicto(selector);
            self.pictos.push(animatedPicto);
        }
        console.log(self.pictos);
    }

    init() {
        console.log(self.pictos);
        for (let picto of self.pictos) {
            picto.init();
        }
    }
}
