var ScreenSubPart = (function() {
	'use strict';

	function ScreenSubPart(jqueryNode) {
		// enforces new
		if (!(this instanceof ScreenSubPart)) {
			return new ScreenSubPart(jqueryNode);
		}
		
		this.$ = jqueryNode;

		this.index = 0;
		this.parentScreen = null;

		this.init();
	}

	ScreenSubPart.prototype.init = function() {
		// method body
		this.changeHeight($(window).height());
	};

	ScreenSubPart.prototype.onResize = function (resize) {
		if (resize.height) {
			this.changeHeight(resize.size.height);
		}
	}

	ScreenSubPart.prototype.changeHeight = function (newHeight) {
		this.$.height(newHeight);
	}

	return ScreenSubPart;
}());