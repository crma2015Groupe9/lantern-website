import Menu from './components/menu';

class App {

    constructor() {
        this.menu = new Menu('nav.menu');

        this.init();
    }

    init() {
        this.menu.init();
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
