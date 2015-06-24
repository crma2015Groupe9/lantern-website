var ScreenGroup = (function() {
	'use strict';

	function ScreenGroup(jqueryNode) {
		// enforces new
		if (!(this instanceof ScreenGroup)) {
			return new ScreenGroup(jqueryNode);
		}

		this.$ = jqueryNode;
		this.screens = [];

		this.currentScreenIndex = 0;
		this.currentFeatureID = null;
		this.previousFeatureID = null;
		this.scrollPosition = 0;

		this.numberOfScreenSubParts = 0;

		this.screenThanks = $('#screen-thanks');

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

		this.numberOfScreenSubParts = this.countScreenSubPart();
	};

	ScreenGroup.prototype.countScreenSubPart = function() {
		var count = 0;

		for(var i=0,imax = this.screens.length;i<imax;i++){
			count += this.screens[i].subParts.length;
		}

		return count;
	};

	ScreenGroup.prototype.getCurrentScreenSubPartIndex = function() {
		var currentScreenSubPartIndex = 0,
			screenIndex = this.currentScreenIndex;

		for(var i=0,imax=screenIndex;i<=imax;i++){
			currentScreenSubPartIndex += i === screenIndex ? this.screens[screenIndex].currentSupPartIndex : this.screens[i].subParts.length;
		}

		return (currentScreenSubPartIndex);
	};

	ScreenGroup.prototype.onResize = function (resize) {
		for(var i = 0, imax = this.screens.length;i<imax;i++){
			this.screens[i].onResize(resize);
		}
	};

	ScreenGroup.prototype.onWheel = function(wheel) {
		var windowHeight = $(window).height();
		var thanksScreenScroll = this.$.height()-this.scrollPosition-windowHeight;

		if (wheel.debounce(100).toDown && this.getCurrentScreenSubPartIndex() < this.numberOfScreenSubParts-1) {
			this.goToNextSubPart();
		}
		else if (wheel.debounce(100).toUp && thanksScreenScroll >= windowHeight) {
			this.goToPreviousSubPart();
		}
	};

	ScreenGroup.prototype.onScroll = function (scroll) {
		this.scrollPosition = scroll.position;
		for(var i = 0, imax = this.screens.length;i<imax;i++){
			this.screens[i].onScroll(scroll);
		}

		this.activeCurrentFeature();
	};

	ScreenGroup.prototype.getNextScreenSubPart = function() {
		var nextSubPartIndex = this.validScreenSubPartIndex(this.getCurrentScreenSubPartIndex()+1);

		//console.log(nextSubPartIndex);

		return this.$.find('.screen-sub-part').eq(nextSubPartIndex);
	};

	ScreenGroup.prototype.getCurrentScreenSubPart = function() {
		return this.$.find('.screen-sub-part').eq(this.getCurrentScreenSubPartIndex());
	};

	ScreenGroup.prototype.getPreviousScreenSubPart = function() {
		var previousSubPartIndex = this.validScreenSubPartIndex(this.getCurrentScreenSubPartIndex()-1);

		return this.$.find('.screen-sub-part').eq(previousSubPartIndex);
	};

	ScreenGroup.prototype.goToScreenSubPart = function(subpart) {
		$('html, body').scrollTop(subpart.offset().top)
	};

	ScreenGroup.prototype.stayToCurrentSubPart = function() {
		this.goToScreenSubPart(this.getCurrentScreenSubPart());
	};

	ScreenGroup.prototype.goToNextSubPart = function() {
		this.goToScreenSubPart(this.getNextScreenSubPart());
	};

	ScreenGroup.prototype.goToPreviousSubPart = function() {
		this.goToScreenSubPart(this.getPreviousScreenSubPart());
	};

	ScreenGroup.prototype.validScreenSubPartIndex = function(index) {
		return index < 0 ? 0 : (index >= this.numberOfScreenSubParts ? this.numberOfScreenSubParts-1 : index);
	};

	ScreenGroup.prototype.update = function (time) {
		for(var i = 0, imax = this.screens.length;i<imax;i++){
			this.screens[i].update(time);
		}
	};

	ScreenGroup.prototype.currentScreenSubPartIsTheLast = function() {
		return this.getCurrentScreenSubPartIndex() === this.numberOfScreenSubParts-1;
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