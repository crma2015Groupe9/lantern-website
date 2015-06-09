var ScreenGroup = (function() {
	'use strict';

	function ScreenGroup(jqueryNode) {
		// enforces new
		if (!(this instanceof ScreenGroup)) {
			return new ScreenGroup(jqueryNode);
		}

		this.$ = jqueryNode;
		this.screens = [];

		this.init();
	}

	ScreenGroup.prototype.init = function() {
		var self = this;

		this.$.find('.screen').each(function (i,e) {
			var screenElement = new Screen($(e));
			screenElement.parentScreenGroup = self;
			screenElement.index = i;
			self.screens.push(screenElement);
		});
	};

	ScreenGroup.prototype.onResize = function (resize) {
		for(var i = 0, imax = this.screens.length;i<imax;i++){
			this.screens[i].onResize(resize);
		}
	}

	return ScreenGroup;
}());