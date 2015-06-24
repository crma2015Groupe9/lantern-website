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

var loader = null;

var preloadImages = function preloadImages() {
	var imgLoader = new PxLoader();
	var screenBackgrounds = ScreenBackground.list();

	var backgroundImgList = [];

	$(screenBackgrounds).each(function (i,e) {
		var bg = e.$;
		var imageLinkToLoad = bg.data('image-url');
		var imageBluredToLoad = bg.data('image-blured-url');
		if (typeof imageLinkToLoad === "string") {
			if (imageLinkToLoad.length > 0) {
				var toLoad = {
					bg : e,
					image :	imgLoader.addImage(imageLinkToLoad)
				};

				if (typeof imageBluredToLoad === "string") {
					if (imageBluredToLoad.length > 0) {
						toLoad.imageBlured = imgLoader.addImage(imageBluredToLoad);
					}
				}

				backgroundImgList.push(toLoad);
			}
		}
	});

	imgLoader.addCompletionListener(function() {
		for(var i=0, imax = backgroundImgList.length;i<imax;i++){
			var background = backgroundImgList[i];
			background.bg.setBackgroundImage(background.image);
			if (background.imageBlured) {
				background.bg.setBackgroundImageBlured(background.imageBlured);
			}
			background.bg.screenResize($(window).width(), $(window).height());
		}
	});

	imgLoader.addProgressListener(function(e) {
		loader.updateProgress(e.completedCount/e.totalCount*100)
	});

	imgLoader.start();
};


var onDocumentReady = function onDocumentReady(){
	var $window = $(window);
	var $document = $(document);
	var mainMenu = new MainMenu($('.main-menu').first());
	var screenGroup = new ScreenGroup($('#main-screen-group'));

	mainMenu.screenGroupTarget = screenGroup;

	var slider = new Slider($('.slider'));

	var objectFXSounds = $('#object-fx-sounds'),
		objectFXLights = $('#object-fx-lights');

	var updateObjectFX = function updateObjectFX(deltaTime, resizeChange) {
		if(resizeChange){
			/*objectFXSounds.height(objectFXSounds.width());
			objectFXLights.height(objectFXLights.width());*/
		}
	};

	updateObjectFX(0, true);

	/*-----------------------*/

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
		if(resize.both){
			scroll.change = true;
		}
	};

	requestAnimationFrame(function requestAnimationFrameEvent() {
		updateTime();
		updateResize();
		//updateScroll();

		//mainMenu.onScroll(scroll);

		screenGroup.onResize(resize);
		//screenGroup.onScroll(scroll);

		screenGroup.update(time);
		if(loader){
			loader.update(time);
		}

		updateObjectFX(time.delta, resize.both);

		requestAnimationFrame(requestAnimationFrameEvent);
	});

	$( window ).scroll(function() {
		updateScroll();
		mainMenu.onScroll(scroll);
		screenGroup.onScroll(scroll);
	});

	updateScroll();
	mainMenu.onScroll(scroll);
	screenGroup.onScroll(scroll);
};

var main = function main() {
	'use strict';

	$(document).ready(function () {
		loader = new Loader($('.loader-website'));

		onDocumentReady();

		preloadImages();
	});
};
