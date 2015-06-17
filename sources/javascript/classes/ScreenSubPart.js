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
		this.featureID = null;
		this.elementsToActive = null;

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

		var feature = this.$.find('.feature').first();
		if (feature.size()) {
			this.featureID = feature.attr('id');

			if (typeof this.featureID === 'string') {
				if (this.featureID.length > 0) {
					this.elementsToActive = $('[data-trigger-feature-id="'+this.featureID+'"]');
				}
			}
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

				/*if(this.animatedPicto){
					this.animatedPicto.stop();
				}	*/

				if (this.elementsToActive) {
					this.elementsToActive.removeClass('active');
					this.elementsToActive.addClass('unactive');
				}
			}
			else if (scrollPositionInPercentage > this.scrollLimitAppear) {
				this.$.removeClass('hidden-on-top');
				this.$.addClass('showed');
				if (this.elementsToActive) {
					this.elementsToActive.removeClass('unactive');
					this.elementsToActive.addClass('active');
				}
				//this.innerWrapper.css('top', scrollPosition+'px');
			}
			else{
				this.$.removeClass('hidden-on-top');
				this.$.removeClass('showed');
				if (this.elementsToActive) {
					this.elementsToActive.removeClass('unactive');
					this.elementsToActive.removeClass('active');
				}

				/*if(this.animatedPicto){
					this.animatedPicto.stop();
				}	*/
			}

			if(this.animatedPicto){
				if (scrollPositionInPercentage >= 98) {
					this.animatedPicto.stop();
				}
				else if(scrollPositionInPercentage >= -16){
					this.animatedPicto.play();
				}
				else if(scrollPositionInPercentage <= -55){
					this.animatedPicto.stop();
				}
			}

			if(scrollPositionInPercentage >= -18){
				if(typeof this.featureID === "string"){
					$('[data-related-feature-id]').removeClass('current');
					$('[data-active-for-feature-id]').removeClass('active');

					if (this.featureID.length > 0) {
						$('[data-related-feature-id="'+this.featureID+'"]').addClass('current');
						$('[data-active-for-feature-id="'+this.featureID+'"]').addClass('active');
					}
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