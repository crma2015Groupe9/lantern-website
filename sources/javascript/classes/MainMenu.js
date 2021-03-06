var MainMenu = (function() {
	'use strict';

	function MainMenu(jqueryNode) {
		// enforces new
		if (!(this instanceof MainMenu)) {
			return new MainMenu(jqueryNode);
		}

		this.$ = jqueryNode;
		this.menuElements = [];
		this.underline = null;
		this.currentMenuElementIndex = 0;
		this.screenGroupTarget = null;

		this.init();
		this.bindEvents();
	}

	MainMenu.prototype.init = function() {
		var self = this;

		this.underline = this.$.find('.main-menu-element-underline').first();

		this.$.find('.main-menu-element').each(function (i,e) {
			var menuElement = new MainMenuElement($(e));
			menuElement.parentMenu = self;
			menuElement.index = i;
			self.menuElements.push(menuElement);
		});
	};

	MainMenu.prototype.bindEvents = function() {
		var self = this;

		this.$.find('.main-menu-mobile').on('click', function(e) {
			e.preventDefault();

			self.openMobileMenu();
		});
	};

	MainMenu.prototype.openMobileMenu = function() {
		var $body = $('body');
		var $header = this.$.parent();
		var $menuContent = this.$.find('.menu-content');
		if ($header.hasClass('open')) {
			$menuContent.fadeOut(400, function() {
				$header.removeClass('open');
				$body.css('overflow-y', 'scroll');
			});
		}
		else {
			$header.addClass('open');
			$body.css('overflow-y', 'hidden');
			$menuContent.fadeIn();
		}
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
		this.currentMenuElementIndex = elementIndex;
		this.setUnderlineCenterOffset(this.menuElements[elementIndex].getCenterOffset());
		this.selectScreen(elementIndex);
	};

	MainMenu.prototype.selectScreen = function (screenIndex) {
		//var documentBody = document.body || document.documentElement;
		//$('html, body').css({scrollTop: this.screenGroupTarget.screens[screenIndex].$.offset().top});
		$('html, body').scrollTop(this.screenGroupTarget.screens[screenIndex].$.offset().top);
	};

	MainMenu.prototype.underlineElementMenuWithTargetID = function (targetID) {
		var elementNotFound = true;
		for (var i = 0, imax = this.menuElements.length;(i<imax && elementNotFound);i++){
			var element  = this.menuElements[i];
			if (element.screenTargetID == targetID) {
				this.currentMenuElementIndex = element.index;
				this.setUnderlineCenterOffset(element.getCenterOffset());
				elementNotFound = false;
			}
		}
	};

	MainMenu.prototype.onScroll = function (scroll) {
		if (scroll.change) {
			this.underlineElementMenuWithTargetID(this.screenGroupTarget.getScreenIdentifierForScrollPosition(scroll.position+(-(settings.screenSubPartLimitAppear)/100*$(window).height())));
		}
	};

	return MainMenu;
}());