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
	};

	ScreenGroup.prototype.onScroll = function (scroll) {
		for(var i = 0, imax = this.screens.length;i<imax;i++){
			this.screens[i].onScroll(scroll);
		}
	};

	ScreenGroup.prototype.update = function (time) {
		for(var i = 0, imax = this.screens.length;i<imax;i++){
			this.screens[i].update(time);
		}
	};

	ScreenGroup.prototype.getScreenIdentifierForScrollPosition = function (scrollPosition) {

		var identifier = this.screens[0].identifier;
		for(var i=0,imax = this.screens.length;i<imax;i++){
			var currentScreen = this.screens[i];
			var screenPosition = currentScreen.getRelativeScrollPosition(scrollPosition);

			if (screenPosition>-25) {
				identifier = currentScreen.identifier;
			}
		}

		return identifier;
	};

	return ScreenGroup;
}());