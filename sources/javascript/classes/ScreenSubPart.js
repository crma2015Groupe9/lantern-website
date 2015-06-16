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
		this.movableOuterWrapper = null;
		this.innerWrapper = null;

		this.scrollLimitDisappear = 82;
		this.scrollLimitAppear = -18;

		this.animatedPicto = null;

		this.init();
	}

	ScreenSubPart.prototype.init = function() {
		var self = this;
		this.changeHeight($(window).height());
		this.movableOuterWrapper = this.$.find('.screen-sub-part-outer-wrapper.movable').first();
		this.innerWrapper = this.movableOuterWrapper.find('.screen-sub-part-inner-wrapper').first();

		this.scrollLimitAppear = this.$.data('scroll-limit-appear') || -18;
		this.scrollLimitDisappear = this.$.data('scroll-limit-disappear') || 82;

		this.scrollLimitAppear = parseInt(this.scrollLimitAppear, 10);
		this.scrollLimitDisappear = parseInt(this.scrollLimitDisappear, 10);

		var animatedPicto = this.$.find('.animated-picto').first();
		if (animatedPicto.size()) {
			this.animatedPicto = new AnimatedPicto(animatedPicto);
		}
	};

	ScreenSubPart.prototype.update = function (time) {
		if (this.animatedPicto) {
			this.animatedPicto.update(time);
		}
	};

	ScreenSubPart.prototype.onResize = function (resize) {
		if (resize.height) {
			this.changeHeight(resize.size.height);
		}
	};

	ScreenSubPart.prototype.getRelativeScrollPosition = function (scrollPosition) {
		var currentPosition = this.$.offset().top;
		return scrollPosition - currentPosition;
	};

	ScreenSubPart.prototype.onScroll = function (scroll) {
		if (scroll.change) {
			var scrollPosition = this.getRelativeScrollPosition(scroll.position);
			var scrollPositionInPercentage = scrollPosition/this.$.height()*100;

			if (scrollPositionInPercentage > this.scrollLimitDisappear) {
				this.$.addClass('hidden-on-top');
				this.$.removeClass('showed');
			}
			else if (scrollPositionInPercentage > this.scrollLimitAppear) {
				this.$.removeClass('hidden-on-top');
				this.$.addClass('showed');

				this.innerWrapper.css('top', scrollPosition+'px');
			}
			else{
				this.$.removeClass('hidden-on-top');
				this.$.removeClass('showed');
			}

			if(scrollPositionInPercentage >= -5){
				if(this.animatedPicto){
					this.animatedPicto.play();
				}
			}
		}
	};

	ScreenSubPart.prototype.changeHeight = function (newHeight) {
		this.$.height(newHeight);
		if (this.movableOuterWrapper) {
			this.movableOuterWrapper.height(newHeight);
		};

		if(this.innerWrapper){
			this.innerWrapper.height(newHeight);
		}
	};

	ScreenSubPart.prototype.getHeight = function () {
		return this.$.height();
	}

	return ScreenSubPart;
}());