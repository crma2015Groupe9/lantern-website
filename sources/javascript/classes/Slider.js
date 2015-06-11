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
		this.$.owlCarousel({
			items: 3
		});
	};

	return Slider;
}());