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
		this.$.height(newHeight*(subpartCount === 0 ? 1 : subpartCount+0.1));
	};

	Screen.prototype.onScroll = function (scroll) {
		if (scroll.change) {
			this.updateScrollPosition(this.getRelativeScrollPosition(scroll.position));

			for(var i=0,imax = this.subParts.length;i<imax;i++){
				this.subParts[i].onScroll(scroll);
			}
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
		/*scrollPosition > -45 */ scrollPositionInPercentage > -18 ? this.active() : this.unactive();
		scrollPositionInPercentage >= -1.5 ? this.activeBlur() : this.unactiveBlur();


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
	};

	Screen.prototype.unactive = function () {
		this.active(false);

		for(var i = 0, imax = this.backgrounds.length;i<imax;i++){
			this.backgrounds[i].$.removeClass('showed');
		}
	};

	return Screen;
}());