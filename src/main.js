import Menu from './components/menu';
import Concept from './components/concept';

class App {

    constructor() {
        this.menu = new Menu('nav.menu');
        this.concept = new Concept(['.concept__picto--problem', '.concept__picto--solution', '.concept__picto--lantern']);

        this.init();
    }

    init() {
        this.menu.init();
        this.concept.init();
    }

}

function createApplication() {
    new App();
}

function ready(createApplication) {
    if (document.readyState != 'loading') {
        createApplication();
    }
    else {
        document.addEventListener('DOMContentLoaded', createApplication);
    }
}

ready(createApplication);
