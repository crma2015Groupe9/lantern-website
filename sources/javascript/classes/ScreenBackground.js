var ScreenBackground = (function() {
	'use strict';

	var ScreenBackgroundList = [];

	function getImgSize(imgSrc, screenBackground) {
	    var newImg = new Image();

	    newImg.onload = function() {
	      var height = newImg.height;
	      var width = newImg.width;

	      screenBackground.originalBackgroundImageSize = {
	      	height : height,
	      	width : width
	      };

	      screenBackground.screenResize($(window).width(), $(window).height());
	    };

	    newImg.src = imgSrc; // this must be done AFTER setting onload
	};

	function ScreenBackground(jqueryNode) {
		// enforces new
		if (!(this instanceof ScreenBackground)) {
			return new ScreenBackground(jqueryNode);
		}
		this.$ = jqueryNode;

		ScreenBackgroundList.push(this);
		this.resizeType = null;
		this.blurView = null;

		this.originalBackgroundImageSize = null;

		this.init();
	}

	ScreenBackground.prototype.init = function() {
		this.resizeType = this.$.data('resize-type');
	};

	ScreenBackground.prototype.mustBlurWhenActive = function () {
		return ($('html').hasClass('cssfilters') && this.$.hasClass('must-blur-when-active'));
	};

	ScreenBackground.prototype.setBackgroundImage = function (image) {
		this.$.append(image);
		this.$.find('img').last().addClass('simple-view');

		if (this.mustBlurWhenActive()) {
			this.$.append($(image).clone());
			this.blurView = this.$.find('img').last();
			this.blurView.addClass('blur-view');
		}
	}

	ScreenBackground.prototype.screenResize = function (width, height) {
		var imageFullScreen = this.$.find('img').first();
		this.$.height(height);
		this.$.width(width);

		var imgSrc = imageFullScreen.attr('src');

		if (typeof imgSrc === "string") {
			if(this.resizeType === 'full' ){
				if (this.originalBackgroundImageSize === null) {
					getImgSize(imgSrc, this);
				}
				else{
					var landscapeFormat = width > height;

					var ratio = width / this.originalBackgroundImageSize.width;
					var futureHeight = this.originalBackgroundImageSize.height*ratio;
					if (futureHeight >= height) {
						imageFullScreen.height('auto');
						imageFullScreen.width(width);
					}
					else{
						imageFullScreen.width('auto');
						imageFullScreen.height(height);
					}
					imageFullScreen.css('left', (width-imageFullScreen.width())/2+'px');
				}
			}
		}

		if (this.mustBlurWhenActive() && this.blurView) {
			this.blurView.width(imageFullScreen.width());
			this.blurView.height(imageFullScreen.height());
			this.blurView.css('left', (width-imageFullScreen.width())/2+'px');
		}
	}

	ScreenBackground.list = function () {
		return ScreenBackgroundList;
	};

	return ScreenBackground;
}());