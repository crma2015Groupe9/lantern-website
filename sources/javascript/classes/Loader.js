var Loader = (function() {
	'use strict';

	function Loader(jqueryNode) {
		// enforces new
		if (!(this instanceof Loader)) {
			return new Loader(jqueryNode);
		}

		this.$ = jqueryNode;
		this.currentProgress = -70;
		this.realProgress = 0;
		this.speedProgress = 90;

		this.indicatorValue = null;
		this.progressBar = null;

		this.top = null;
		this.bottom = null;
		this.animatedPicto = null;

		this.previousProgress = 0;
		this.removed = false;

		this.init();
	}

	function easeInOutQuart(t){
		return t<0.50 ? 8.00*t*t*t*t : 1.00-8.00*(--t)*t*t*t;
	};

	Loader.prototype.init = function() {
		this.$.height($(window).height());

		this.indicatorValue = this.$.find('.loader-progress-indicator-value').first();
		this.progressBar = this.$.find('.loader-progress-bar').first();
		this.top = this.$.find('.loader-background-part-top').first();
		this.bottom = this.$.find('.loader-background-part-bottom').first();

		this.animatedPicto = new AnimatedPicto(this.$.find('.animated-picto').first());
		this.animatedPicto.play();
	};

	Loader.prototype.updateProgress = function(percentageProgress) {
		this.realProgress = percentageProgress <= 0 ? 0 : (percentageProgress >= 100 ? 100 : percentageProgress);
	};

	Loader.prototype.update = function (time) {
		if(!this.removed){
			this.animatedPicto.update(time);
			var currentProgress = this.currentProgress;

			currentProgress += time.delta/1000 * this.speedProgress;

			if(currentProgress > 100){
				currentProgress = 100;
			}

			if(currentProgress > this.realProgress){
				currentProgress = this.realProgress;
			}

			
			this.currentProgress = parseInt(currentProgress, 10);

			if(this.currentProgress !== this.previousProgress){
				this.updateView();
			}

			this.previousProgress = this.currentProgress;

			if(this.currentProgress >= 100){
				this.loaded();
			}
		}
	};

	Loader.prototype.updateView = function() {
		this.changeProgressBarWidth(this.currentProgress);
		this.changeIndicatorValue(this.currentProgress);
	};

	Loader.prototype.changeProgressBarWidth = function (newWidth) {
		var progressBarWidth = parseInt(easeInOutQuart(newWidth/100)*100, 10);
		if(progressBarWidth <= 0 || this.currentProgress <= 0){
			progressBarWidth = 0;
		}

		//console.log(progressBarWidth)
		this.progressBar.css('width', progressBarWidth+'%');
	};

	Loader.prototype.changeIndicatorValue = function (newValue) {
		if(newValue <= 0){
			newValue = 0;
		}
		this.indicatorValue.html(newValue);	
	};

	Loader.prototype.loaded = function() {
		var self = this;
		this.$.addClass('hidden');
		this.top.addClass('hidden');
		this.bottom.addClass('hidden');

		window.setTimeout(function() {
		  self.remove();
		}, 16000);
	};

	Loader.prototype.remove = function() {
		this.removed = true;
		this.$.remove();
	};

	return Loader;
}());