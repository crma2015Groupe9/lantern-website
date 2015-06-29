var AnimatedPicto = (function() {
	'use strict';

	var AnimatedPictoList = [];

	function AnimatedPicto(jqueryNode) {
		// enforces new
		if (!(this instanceof AnimatedPicto)) {
			return new AnimatedPicto(jqueryNode);
		}

		this.$ = jqueryNode;

		AnimatedPictoList.push(this);

		this.imagesFolder = null;
		this.imagesExtension = null;
		this.startNumber = 0;
		this.endNumber = 0;
		this.numberOfDigit = 2;
		this.duration = 0;
		this.currentTime = 0;
		this.numberOfStep = 0;

		this.currentIndex = 0;
		this.isPlaying = false;
		this.baseImageName = "";

		this.loaded = false;
		this.listed = false;
		this.reversed = false;
		this.removed = false;

		this.loop = false;

		this.init();

		this.imageList = [];
		this.listImages();

		//this.loadImages();

		this.setIndex(this.startNumber, true);
	}

	var stringReplaceAt = function stringReplaceAt(string, index, character) {
	    return string.substr(0, index) + character + string.substr(index+character.length);
	};


	AnimatedPicto.prototype.init = function() {
		this.imagesFolder = this.$.data('animated-images-folder');
		this.imagesExtension = this.$.data('animated-images-extension');
		this.startNumber = parseInt(this.$.data('animated-start'), 10);
		this.endNumber = parseInt(this.$.data('animated-end'), 10);
		this.numberOfDigit = parseInt(this.$.data('animated-number-of-digit'), 10);
		this.duration = parseInt(this.$.data('animated-duration'), 10);

		this.loop = (this.$.data('animation-loop') === true);

		this.numberOfStep = this.endNumber - this.startNumber;

		this.baseImageName = this.imagesFolder.substring(this.imagesFolder.lastIndexOf('/'));
	};

	AnimatedPicto.prototype.play = function () {
		this.isPlaying = true;
	};

	AnimatedPicto.prototype.getImageList = function() {
		return this.imageList;
	};

	AnimatedPicto.prototype.loadImages = function () {
		if (!this.loaded) {
			for(var i = 0,imax=this.numberOfStep;i<=imax;i++){
				this.loadImageForIndex(this.startNumber+i);
			}
			this.loaded = true;
			this.$.addClass('loaded')
		}
	};

	AnimatedPicto.prototype.listImages = function() {
		if (!this.listed) {
			for(var i = 0,imax=this.numberOfStep;i<=imax;i++){
				this.listImageForIndex(this.startNumber+i);
			}
			this.listed = true;
		}
	};

	AnimatedPicto.prototype.pause = function () {
		this.isPlaying = false;
	};

	AnimatedPicto.prototype.stop = function () {
		this.reset();
		this.pause();
	}

	AnimatedPicto.prototype.start = function () {
		this.reset();
		this.play();
	};

	AnimatedPicto.prototype.reset = function () {
		this.setTime(0);
	}

	AnimatedPicto.prototype.loadImageForIndex = function (index) {
		this.$.append('<div class="animated-picto-step '+this.getStepClassIdentifierForIndex(index)+'"></div>');
		this.getStepForIndex(index).first().css('background-image', 'url(\''+this.getImageUrlForIndex(index)+'\')');
	};

	AnimatedPicto.prototype.listImageForIndex = function(index) {
		this.imageList.push(this.getImageUrlForIndex(index));
	};

	AnimatedPicto.prototype.getStepForIndex = function (index) {
		return this.$.find('.'+this.getStepClassIdentifierForIndex(index));
	};

	AnimatedPicto.prototype.getStepClassIdentifierForIndex = function (index) {
		return 'animated-picto-step-index-'+index;
	};

	AnimatedPicto.prototype.setIndex = function (index, force) {
		if ((index >= this.startNumber && index <= this.endNumber && index !== this.currentIndex) || force === true) {
			this.currentIndex = index;
			this.$.find('.animated-picto-step.current').removeClass('current');
			this.getStepForIndex(index).addClass('current');
		}
	}

	AnimatedPicto.prototype.getImageUrlForIndex = function (index) {
		return this.imagesFolder+this.baseImageName+this.getFormatedStepIndex(index)+'.'+this.imagesExtension;
	};

	AnimatedPicto.prototype.getFormatedStepIndex = function (index) {
		var stringIndex = '';
		for(var i=0,imax =this.numberOfDigit;i<imax;i++){
			stringIndex+='0';
		}

		var currentStringIndex = ''+index;

		for(i=0,imax=currentStringIndex.length;i<imax;i++){
			var character = currentStringIndex.substr(imax-i-1, 1);
			stringIndex = stringReplaceAt(stringIndex, stringIndex.length-i-1, character);
		}

		return stringIndex;
	};

	AnimatedPicto.prototype.update = function (time) {
		if (this.removed === false) {
			var newTime = this.currentTime + (this.isPlaying ? time.delta : 0)*(this.reversed ? -1 : 1);

			this.setTime(newTime >= this.duration ? (this.loop ? 0 : this.duration) : (newTime <= 0 ? (this.loop ? this.duration : 0) : newTime));
		}
	};

	AnimatedPicto.prototype.setTime = function (newTime) {
		this.currentTime = newTime;
		
		var newIndex = parseInt(this.startNumber + this.numberOfStep*(this.currentTime/this.duration), 10);
		this.setIndex(newIndex);
	};

	AnimatedPicto.prototype.next = function () {
		this.setImageForIndex(this.currentIndex+1);
	};

	AnimatedPicto.prototype.previous = function () {
		this.setImageForIndex(this.currentIndex-1);
	};

	AnimatedPicto.prototype.reverse = function() {
		this.reversed = true;
	};

	AnimatedPicto.prototype.unreverse = function() {
		this.reversed = false;
	};

	AnimatedPicto.list = function () {
		return AnimatedPictoList;
	};

	AnimatedPicto.prototype.remove = function() {
		this.$.remove();
		this.removed = true;
	};

	return AnimatedPicto;
}());