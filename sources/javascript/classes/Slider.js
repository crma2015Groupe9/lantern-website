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
			infinite: false,
			slidesToShow: 3,
			slidesToScroll: 1,
			centerMode: true,
			autoplay: false,
			autoplaySpeed: 5000,
			speed: 600,
			pauseOnHover: false
		});

		this.$.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
			var nextColor = $('.slider [data-slick-index='+nextSlide+']').attr('data-color');
			$('#screen-animals').animate({
				backgroundColor: nextColor
			});
		});

		// var owl = $('.owl-carousel').data('owlCarousel');

		// $('.owl-item').click(function() {
		// 	var index = $(this).index();
		// });
	};

	return Slider;
}());