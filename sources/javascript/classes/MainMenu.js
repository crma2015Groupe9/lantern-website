var MainMenu = (function() {
	'use strict';

	function MainMenu(jqueryNode) {
		// enforces new
		if (!(this instanceof MainMenu)) {
			return new MainMenu(jqueryNode);
		}
		
		this.node = jqueryNode;
		this.slideGroupTargetID = null;
		this.menuElements = [];
		this.underline = null;

		this.init();
	}

	MainMenu.prototype.init = function() {
		var self = this;

		this.slideGroupTargetID = this.node.data('screen-group-target');
		this.underline = this.node.find('.main-menu-element-underline').first();

		this.node.find('.main-menu-element').each(function (i,e) {
			var menuElement = new MainMenuElement($(e));
			menuElement.setParentMenu(self);
			self.menuElements.push(menuElement);
		});
	};

	MainMenu.prototype.getUnderlineWidth = function () {
		return this.underline.width();
	};

	MainMenu.prototype.setUnderlineCenterOffset = function (centerOffset) {
		this.setUnderlineOffset(centerOffset-this.getUnderlineWidth()/2);
	};

	MainMenu.prototype.setUnderlineOffset = function (offset) {
		this.underline.css('left', offset+'px');
	};

	return MainMenu;
}());