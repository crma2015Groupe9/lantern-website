var MainMenuElement = (function() {
	'use strict';

	function MainMenuElement(jqueryNode) {
		// enforces new
		if (!(this instanceof MainMenuElement)) {
			return new MainMenuElement(jsqueryNode);
		}
		
		this.node = jqueryNode;

		this.screenTargetID = null;
		this.screenTarget = null;
		this.parentMenu = null;
		this.label = null;

		this.init();
		this.bindEvents();
	}

	MainMenuElement.prototype.init = function() {
		this.screenTargetID = this.node.data('screen-target');
		this.screenTarget = $('#'+this.screenTargetID);

		this.label = this.node.find('.main-menu-element-label').first();
		if (!this.label.size()) {
			this.label = null;
		}
	};

	MainMenuElement.prototype.bindEvents = function () {
		var self = this;
		this.node.click(function (event) {
			self.select();
		});
	}

	MainMenuElement.prototype.setParentMenu = function (parentMenu) {
		this.parentMenu = parentMenu;
	}

	MainMenuElement.prototype.getOffset = function () {
		return parseInt(this.node.offset().left, 10);
	}

	MainMenuElement.prototype.getWidth = function () {
		return this.node.width();
	}

	MainMenuElement.prototype.getCenterOffset = function () {
		return this.getOffset() + this.getWidth()/2;
	}

	MainMenuElement.prototype.select = function () {
		this.parentMenu.setUnderlineCenterOffset(this.getCenterOffset());
	}

	return MainMenuElement;
}());