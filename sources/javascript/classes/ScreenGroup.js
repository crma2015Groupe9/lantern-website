var ScreenGroup = (function() {
	'use strict';

	function ScreenGroup(jqueryNode) {
		// enforces new
		if (!(this instanceof ScreenGroup)) {
			return new ScreenGroup(jqueryNode);
		}

		this.$ = jqueryNode;
		this.screens = [];

		this.currentFeatureID = null;
		this.previousFeatureID = null;

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

		this.activeCurrentFeature();
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

			if (screenPosition>=0) {
				identifier = currentScreen.identifier;
			}
		}



		return identifier;
	};

	ScreenGroup.prototype.activeCurrentFeature = function() {
		if (this.currentFeatureID !== this.previousFeatureID) {
			$('[data-related-feature-id]').removeClass('current');
			$('[data-active-for-feature-id]').removeClass('active');

			$('[data-related-feature-id="'+this.currentFeatureID+'"]').addClass('current');
			$('[data-active-for-feature-id="'+this.currentFeatureID+'"]').addClass('active');

			this.previousFeatureID = this.currentFeatureID;
		}
	};

	return ScreenGroup;
}());