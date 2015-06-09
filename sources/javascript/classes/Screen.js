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
	};

	Screen.prototype.changeHeight = function (newHeight) {
		this.$.height(newHeight);
		
	};

	Screen.prototype.onScroll = function (scroll) {
		if (scroll.change) {
			this.updateScrollPosition(this.getRelativeScrollPosition(scroll.position));
		}
	};

	Screen.prototype.getRelativeScrollPosition = function (scrollPosition) {
		var currentPosition = this.$.offset().top;
		return scrollPosition - currentPosition;
	};

	Screen.prototype.updateScrollPosition = function (scrollPosition) {
		if (scrollPosition > 12) {
			this.$.addClass('active');
		};
		for(var i = 0, imax = this.backgrounds.length;i<imax;i++){
			this.backgrounds[i].$.css('top', (scrollPosition > 0 ? scrollPosition : 0)+'px');
		}
	};

	return Screen;
}());