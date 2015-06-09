var Screen = (function() {
	'use strict';

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

		this.init();
	}

	Screen.prototype.init = function() {
		var self = this;

		this.$.find('.screen-sub-part').each(function (i,e) {
			var subPart = new ScreenSubPart($(e));
			subPart.index = i;
			subPart.parentScreen = self;
			self.subParts.push(subPart);
		});

		this.$.find('.screen-background').each(function (i,e) {
			self.backgrounds.push($(e));
		});

		this.changeHeight($(window).height());
	};

	Screen.prototype.onResize = function (resize) {
		for(var i = 0, imax = this.subParts.length;i<imax;i++){
			this.subParts[i].onResize(resize);
		}
		if (resize.height) {
			this.changeHeight(resize.size.height);
		}
	};

	Screen.prototype.changeHeight = function (newHeight) {
		for(var i = 0, imax = this.backgrounds.length;i<imax;i++){
			this.backgrounds[i].height(newHeight);
		}
	}

	return Screen;
}());