var MainMenuElement = (function() {
	'use strict';

	function MainMenuElement(jqueryNode) {
		// enforces new
		if (!(this instanceof MainMenuElement)) {
			return new MainMenuElement(jsqueryNode);
		}
		
		this.$ = jqueryNode;

		this.screenTargetID = null;
		this.screenTarget = null;
		this.parentMenu = null;
		this.label = null;
		this.index = 0;

		this.init();
		this.bindEvents();
	}

	MainMenuElement.prototype.init = function() {
		this.screenTargetID = this.$.data('screen-target');
		this.screenTarget = $('#'+this.screenTargetID);

		this.label = this.$.find('.main-menu-element-label').first();
		if (!this.label.size()) {
			this.label = null;
		}

		this.$.find('a').click(function (event) {
			event.preventDefault();
		});
	};

	MainMenuElement.prototype.bindEvents = function () {
		var self = this;
		this.$.click(function (event) {
			self.click();
		});
	};

	MainMenuElement.prototype.getOffset = function () {
		return parseInt(this.$.offset().left, 10);
	};

	MainMenuElement.prototype.getWidth = function () {
		return this.$.width();
	};

	MainMenuElement.prototype.getCenterOffset = function () {
		return this.getOffset() + this.getWidth()/2;
	};

	MainMenuElement.prototype.click = function () {
		this.select();
	}

	MainMenuElement.prototype.select = function () {
		this.parentMenu.select(this.index);
	};

	return MainMenuElement;
}());