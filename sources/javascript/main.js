'use strict';

var onDocumentReady = function onDocumentReady(){
	var mainMenu = new MainMenu($('.main-menu').first());
};

var main = function main() {
	'use strict';

	$(document).ready(function () {
		onDocumentReady();
	});
};
