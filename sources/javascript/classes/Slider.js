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
			arrows: false,
			slidesToShow: 3,
			slidesToScroll: 1,
			centerMode: true,
			centerPadding: '300px',
			autoplay: false,
			autoplaySpeed: 5000,
			speed: 750,
			pauseOnHover: false
			// responsive: [
			// 	{
			// 		breakpoint: 1280,
			// 		settings: {
			// 			centerPadding: '50%'
			// 		}
			// 	}
			// ]
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

		$('.pagination button').on('click', function() {
			var index = $(this).index();

			self.$.slick('slickGoTo', index - 1);
		});
	};

	return Slider;
}());