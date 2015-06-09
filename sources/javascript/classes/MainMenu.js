var MainMenu = (function() {
	'use strict';

	function MainMenu(jqueryNode) {
		// enforces new
		if (!(this instanceof MainMenu)) {
			return new MainMenu(jqueryNode);
		}
		
		this.$ = jqueryNode;
		this.slideGroupTargetID = null;
		this.menuElements = [];
		this.underline = null;
		this.currentMenuElementIndex = 0;

		this.init();
	}

	MainMenu.prototype.init = function() {
		var self = this;

		this.slideGroupTargetID = this.$.data('screen-group-target');
		this.underline = this.$.find('.main-menu-element-underline').first();

		this.$.find('.main-menu-element').each(function (i,e) {
			var menuElement = new MainMenuElement($(e));
			menuElement.parentMenu = self;
			menuElement.index = i;
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

	MainMenu.prototype.select = function (elementIndex) {
		this.menuElement[elementIndex].select();	
	};

	return MainMenu;
}());