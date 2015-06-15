var Slider = (function() {
	'use strict';

	function Slider(jqueryNode) {
		// enforces new
		if (!(this instanceof Slider)) {
			return new Slider(jqueryNode);
		}

		this.$ = jqueryNode;

		this.init();
	}

	Slider.prototype.init = function() {
		var self = this;

		this.$.slick({
			infinite: true,
			slidesToShow: 3,
			slidesToScroll: 1,
			centerMode: true,
			autoplay: false,
			autoplaySpeed: 5000,
			speed: 750,
			pauseOnHover: false
		});

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
		});
	};

	return Slider;
}());