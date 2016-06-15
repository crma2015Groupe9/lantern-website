import Menu from './components/menu';
import Concept from './components/concept';
import Animals from './components/animals';

class App {

    constructor() {
        this.menu = new Menu('nav.menu');
        this.concept = new Concept(['.concept-problem', '.concept-solution', '.concept-lantern']);
        this.animals = new Animals('.animals');

        this.init();
    }

    init() {
        this.menu.init();
        this.concept.init();
        this.animals.init();
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

// window.requestAnimationFrame(function() {
//       doSomething(last_known_scroll_position);
//       ticking = false;
//     });
