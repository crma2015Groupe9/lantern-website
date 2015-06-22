var Screen = (function() {
	'use strict';

	var screenSize = 0;

	function Screen(jqueryNode) {
		// enforces new
		if (!(this instanceof Screen)) {
			return new Screen(jqueryNode);
		}
		this.$ = jqueryNode;

		this.index = 0;
		this.parentScreenGroup = null;
		this.backgrounds = [];

		this.subParts = [];
		this.identifier = null;

		this.scrollLimitDisappear = 100;
		this.scrollLimitAppear = 0;

		this.currentFeatureID = null;

		this.init();
	}

	Screen.prototype.init = function() {
		var self = this;

		this.identifier = this.$.attr('id');

		this.$.find('.screen-sub-part').each(function (i,e) {
			var subPart = new ScreenSubPart($(e));
			subPart.index = i;
			subPart.parentScreen = self;
			self.subParts.push(subPart);
		});

		this.$.find('.screen-background').each(function (i,e) {
			self.backgrounds.push(new ScreenBackground($(e)));
		});

		this.scrollLimitAppear = this.$.data('scroll-limit-appear') || settings.screenLimitAppear;
		this.scrollLimitDisappear = this.$.data('scroll-limit-disappear') || settings.screenLimitDisappear;

		this.changeHeight($(window).height());
		this.updateScrollPosition(this.getRelativeScrollPosition($(document).scrollTop()));
	};

	Screen.prototype.onResize = function (resize) {
		for(var i = 0, imax = this.subParts.length;i<imax;i++){
			this.subParts[i].onResize(resize);
		}
		if (resize.height) {
			this.changeHeight(resize.size.height);
		}
		if (resize.width) {
			this.changeWidth(resize.size.width);
		}

		if (resize.both) {
			for(var i = 0, imax = this.backgrounds.length;i<imax;i++){
				var background = this.backgrounds[i];
				background.screenResize(resize.size.width, resize.size.height);
			}
		}
	};

	Screen.prototype.changeWidth = function (newWidth) {
		this.$.width(newWidth);
		//this.$.find('.screen-common-elements').width(newWidth);
	};

	Screen.prototype.changeHeight = function (newHeight) {
		var subpartCount = this.subParts.length;
		this.$.height(newHeight*(subpartCount === 0 ? 1 : subpartCount));
	};

	Screen.prototype.onScroll = function (scroll) {
		if (scroll.change) {
			this.updateScrollPosition(this.getRelativeScrollPosition(scroll.position));
			//this.unactive();
			for(var i=0,imax = this.subParts.length;i<imax;i++){
				this.subParts[i].onScroll(scroll);
			}

			this.parentScreenGroup.currentFeatureID = this.currentFeatureID || this.parentScreenGroup.currentFeatureID;
		}
	};

	Screen.prototype.update = function (time) {
		for(var i=0,imax = this.subParts.length;i<imax;i++){
			this.subParts[i].update(time);
		}
	};

	Screen.prototype.getRelativeScrollPosition = function (scrollPosition) {
		var currentPosition = this.$.offset().top;
		return scrollPosition - currentPosition;
	};

	Screen.prototype.updateScrollPosition = function (scrollPosition) {
		var scrollPositionInPercentage = scrollPosition/this.$.height()*100;
		/*scrollPosition > -45 */ //scrollPositionInPercentage > this.scrollLimitAppear ? this.active() : this.unactive();
		scrollPositionInPercentage >= this.scrollLimitAppear+15 ? this.activeBlur() : this.unactiveBlur();


		//for(var i = 0, imax = this.backgrounds.length;i<imax;i++){
			//this.backgrounds[i].$.css('top', (scrollPosition > 0 ? scrollPosition : 0)+'px');
		//}
	};

	Screen.prototype.activeBlur = function (active) {
		active === false ? this.$.removeClass('active-blur') : this.$.addClass('active-blur');
	};

	Screen.prototype.unactiveBlur = function () {
		this.activeBlur(false);
	};

	Screen.prototype.active = function (active) {
		active === false ? this.$.removeClass('active') : this.$.addClass('active');
		for(var i = 0, imax = this.backgrounds.length;i<imax;i++){
			this.backgrounds[i].$.addClass('showed');
		}

		//active === false ? this.unmoveToUpNextScreen() : this.moveToUpNextScreen();
		
	};

	Screen.prototype.unactive = function () {
		this.currentFeatureID = null;
		this.active(false);

		for(var i = 0, imax = this.backgrounds.length;i<imax;i++){
			this.backgrounds[i].$.removeClass('showed');
		}
	};

	Screen.prototype.nextScreen = function() {
		var nextIndex = this.index + 1,
			siblings = this.parentScreenGroup.screens,
			nextScreen = siblings[nextIndex];

		return nextScreen;
	};

	/*Screen.prototype.moveToUpNextScreen = function() {
		var nextScreen = this.nextScreen();
		if (nextScreen) {
			nextScreen.moveToUp();
		}
	};


	Screen.prototype.unmoveToUpNextScreen = function () {
		var nextScreen = this.nextScreen();
		if (nextScreen) {
			nextScreen.unmoveToUp();
		}
	};

	Screen.prototype.moveToUp = function() {
		this.$.addClass('moved-to-up');
	};

	Screen.prototype.unmoveToUp = function() {
		this.$.removeClass('moved-to-up');
	};*/

	return Screen;
}());