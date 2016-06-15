import Menu from './components/menu';
import Concept from './components/concept';

class App {

    constructor() {
        this.menu = new Menu('nav.menu');
        this.concept = new Concept(['.concept-problem', '.concept-solution', '.concept-lantern']);

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

// window.requestAnimationFrame(function() {
//       doSomething(last_known_scroll_position);
//       ticking = false;
//     });
