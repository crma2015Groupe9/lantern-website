'use strict';

/*RequestAnimationFrame Polyfill*/
(function() {
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
								   || window[vendors[x]+'CancelRequestAnimationFrame'];
	}
	if (!window.requestAnimationFrame)
		window.requestAnimationFrame = function(callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function() { callback(currTime + timeToCall); },
			  timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};
	if (!window.cancelAnimationFrame)
		window.cancelAnimationFrame = function(id) {
			clearTimeout(id);
		};
}());

/*-------------------*/
/*-------------------*/
/*-------------------*/

var preloadImages = function preloadImages() {
	var loader = new PxLoader();
	var screenBackgrounds = ScreenBackground.list();

	var backgroundImgList = [];

	$(screenBackgrounds).each(function (i,e) {
		var bg = e.$;
		var imageLinkToLoad = bg.data('image-url');
		if (typeof imageLinkToLoad === "string") {
			if (imageLinkToLoad.length > 0) {
				backgroundImgList.push({
					bg : e,
					image :	loader.addImage(imageLinkToLoad)
				});
			}
		}
	});

	loader.addCompletionListener(function() {
		for(var i=0, imax = backgroundImgList.length;i<imax;i++){
			var background = backgroundImgList[i];
			background.bg.setBackgroundImage(background.image);
			background.bg.screenResize($(window).width(), $(window).height());
		}
	});

	loader.start();
};


var onDocumentReady = function onDocumentReady(){
	var $window = $(window);
	var $document = $(document);
	var mainMenu = new MainMenu($('.main-menu').first());
	var screenGroup = new ScreenGroup($('#main-screen-group'));

	mainMenu.screenGroupTarget = screenGroup;

	var slider = new Slider($('.slider'));

	var time = {};
	time.start = Date.now();
	time.previous = Date.now();
	time.delta = 0;

	var updateTime = function updateTime () {
		currentTime = Date.now();
		time.delta = currentTime - time.previous;
		time.previous = currentTime;
	};

	var resize = {
		both : false,
		width : false,
		height : false,
		every : false,
		size : {
			width : $window.width(),
			height : $window.height()
		}
	};

	var updateResize = function updateResize () {
		var newWidth = $window.width(),
			newHeight = $window.height();

		resize.width = (newWidth != resize.size.width);
		resize.height = (newWidth != resize.size.height);
		resize.every = (resize.width && resize.height);
		resize.both = (resize.width || resize.height);

		resize.size.width = newWidth;
		resize.size.height = newHeight;
	};

	var scroll = {
		change : false,
		toUp : false,
		toDown : false,
		position : 0
	};

	var updateScroll = function updateScroll() {
		var newScrollPosition = $document.scrollTop();
		scroll.toDown = newScrollPosition > scroll.position;
		scroll.toUp = newScrollPosition < scroll.position;
		scroll.change = (scroll.toUp || scroll.toDown);
		scroll.position = newScrollPosition;
	};

	requestAnimationFrame(function requestAnimationFrameEvent() {
		updateTime();
		updateResize();
		updateScroll();

		mainMenu.onScroll(scroll);

		screenGroup.onResize(resize);
		screenGroup.onScroll(scroll);

		requestAnimationFrame(requestAnimationFrameEvent);
	});
};

var main = function main() {
	'use strict';

	$(document).ready(function () {
		onDocumentReady();

		preloadImages();
	});
};
