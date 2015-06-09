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
	};

	MainMenuElement.prototype.bindEvents = function () {
		var self = this;
		this.$.click(function (event) {
			self.select();
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

	MainMenuElement.prototype.select = function () {
		this.parentMenu.currentMenuElementIndex = 0;
		this.parentMenu.setUnderlineCenterOffset(this.getCenterOffset());
	};

	return MainMenuElement;
}());