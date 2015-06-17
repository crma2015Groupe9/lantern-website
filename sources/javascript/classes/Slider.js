var Slider = (function() {
	'use strict';

	function Slider(jqueryNode) {
		// enforces new
		if (!(this instanceof Slider)) {
			return new Slider(jqueryNode);
		}

		this.$ = jqueryNode;
		this.autoplaySpeed = 5000;
		this.speed = 750;

		this.init();
		this.beforeChange();
		this.afterChange();
		this.selectItem();
	}

	Slider.prototype.init = function() {
		var self = this;

		this.$.slick({
			infinite: true,
			arrows: false,
			slidesToShow: 3,
			slidesToScroll: 1,
			centerMode: true,
			autoplay: true,
			autoplaySpeed: self.autoplaySpeed,
			speed: self.speed,
			pauseOnHover: false,
			responsive: [
				{
					breakpoint: 1280,
					settings: {
						slidesToShow: 1,
						centerPadding: '25%'
					}
				},
				{
					breakpoint: 720,
					settings: {
						slidesToShow: 1,
						centerPadding: 0
					}
				}
			]
		});

		this.animateLoader();
	};

	Slider.prototype.beforeChange = function() {
		var self = this;

		this.$.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
			var $nextSlide = $('.slider [data-slick-index='+nextSlide+']');

			var nextColor = $nextSlide.attr('data-color');
			$('#screen-animals').animate({
				backgroundColor: nextColor
			});

			var name = $nextSlide.attr('data-name');
			var $animalName = $('p.animal-name');
			$animalName.fadeOut(400, function() {
				$animalName.text(name);
				$animalName.fadeIn(400);
			});

			var $loader = $('div.loading .loader');
			var width = $loader.width();
			if (width > 0 && width < $loader.parent().width()) {
				self.resetLoader();
			}
		});
	};

	Slider.prototype.afterChange = function() {
		var self = this;

		this.$.on('afterChange', function(event, slick, currentSlide, nextSlide) {
			var $loader = $('div.loading .loader');
			var width = $loader.width();

			if (width == 0) {
				self.animateLoader(false);
			}
		});
	};

	Slider.prototype.animateLoader = function(reset) {
		var $loader = $('div.loading .loader');
		var duration = this.autoplaySpeed / 1000;

		TweenLite.to($loader, duration, {width: '100%', ease: Power1.easeInOut, onComplete: function() {
			TweenLite.to($loader, 0.5, {left: '100%', ease: Power1.easeInOut, onComplete: function() {
				$loader.css({left: 0, width: 0});
			}});
		}});
	};

	Slider.prototype.resetLoader = function() {
		var self = this;

		var $loader = $('div.loading .loader');
		TweenLite.to($loader, self.speed / 1000, {width: 0, ease: Power1.easeInOut, onComplete: function() {
			self.animateLoader(true);
		}});
	};

	Slider.prototype.selectItem = function() {
		var self = this;

		$('.slick-slide').on('click', function() {
			var currentIndex = self.$.slick('slickCurrentSlide');
			var index = $(this).attr('data-slick-index');

			if (index < currentIndex) {
				self.$.slick('slickPrev');
			}
			else if (index > currentIndex) {
				self.$.slick('slickNext');
			}
		});
	}

	return Slider;
}());