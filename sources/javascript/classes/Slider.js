var Slider = (function() {
	'use strict';

	function Slider(jqueryNode) {
		// enforces new
		if (!(this instanceof Slider)) {
			return new Slider(jqueryNode);
		}

		this.$ = jqueryNode;
		this.autoplaySpeed = 5000;

		this.init();
		this.beforeChange();
		this.afterChange();
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
			speed: 750,
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
		this.$.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
			var $nextSlide = $('.slider [data-slick-index='+nextSlide+']');

			var nextColor = $nextSlide.attr('data-color');
			$('#screen-animals-background-main').animate({
				backgroundColor: nextColor
			});

			var name = $nextSlide.attr('data-name');
			var $animalName = $('p.animal-name');
			$animalName.fadeOut(400, function() {
				$animalName.text(name);
				$animalName.fadeIn(400);
			});
		});
	};

	Slider.prototype.afterChange = function() {
		var self = this;

		this.$.on('afterChange', function(event, slick, currentSlide, nextSlide) {
			self.animateLoader();
		});
	};

	Slider.prototype.animateLoader = function() {
		var $loader = $('div.loading .loader');
		TweenLite.to($loader, this.autoplaySpeed / 1000, {width: '100%', ease: Power1.easeInOut, onComplete: function() {
			TweenLite.to($loader, 0.5, {left: '100%', ease: Power1.easeInOut, onComplete: function() {
				$loader.css({left: 0, width: 0});
			}});
		}});
	};

	Slider.prototype.pagination = function() {
		var self = this;

		$('.pagination button').on('click', function() {
			var index = $(this).index();

			self.$.slick('slickGoTo', index - 1);
		});
	};

	return Slider;
}());