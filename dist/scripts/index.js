(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SmoothScroll = function () {
	function SmoothScroll() {
		_classCallCheck(this, SmoothScroll);
	}

	_createClass(SmoothScroll, [{
		key: "scrollTo",
		value: function (_scrollTo) {
			function scrollTo(_x) {
				return _scrollTo.apply(this, arguments);
			}

			scrollTo.toString = function () {
				return _scrollTo.toString();
			};

			return scrollTo;
		}(function (eID) {
			var buffer = 50;
			var startY = this.currentYPosition();
			var stopY = this.elmYPosition(eID) - buffer;
			var distance = stopY > startY ? stopY - startY : startY - stopY;

			if (distance < 100) {
				scrollTo(0, stopY);
				return;
			}

			var speed = Math.round(distance / 100);

			if (speed >= 20) speed = 20;

			var step = Math.round(distance / 25);
			var leapY = stopY > startY ? startY + step : startY - step;
			var timer = 0;

			if (stopY > startY) {
				for (var i = startY; i < stopY; i += step) {
					setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
					leapY += step;
					if (leapY > stopY) leapY = stopY;
					timer++;
				}
				return;
			}

			for (var _i = startY; _i > stopY; _i -= step) {
				setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
				leapY -= step;
				if (leapY < stopY) leapY = stopY;
				timer++;
			}
		})
	}, {
		key: "currentYPosition",
		value: function currentYPosition() {
			// Firefox, Chrome, Opera, Safari
			if (self.pageYOffset) return self.pageYOffset;

			return 0;
		}
	}, {
		key: "elmYPosition",
		value: function elmYPosition(eID) {
			var elm = document.getElementById(eID);
			var y = elm.offsetTop;
			var node = elm;

			while (node.offsetParent && node.offsetParent != document.body) {
				node = node.offsetParent;
				y += node.offsetTop;
			}

			return y;
		}
	}]);

	return SmoothScroll;
}();

exports.default = SmoothScroll;
;

},{}],2:[function(require,module,exports){
"use strict";

var _SmoothScroll = require("./SmoothScroll");

var _SmoothScroll2 = _interopRequireDefault(_SmoothScroll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.body.onload = function () {
	// Navigation Bar
	var navbar = document.getElementById("navigation");
	var posY = navbar.offsetTop;

	// Back to Top button and listener
	var backToTop = document.getElementById("back-to-top");

	backToTop.addEventListener("click", function (e) {
		e.preventDefault();

		var targetId = backToTop.getAttribute("data-scroll");
		new _SmoothScroll2.default().scrollTo(targetId);
	});

	// Scroll to Top
	window.onscroll = function () {
		var scrollTop = window.pageYOffset;

		if (scrollTop > posY) {
			navbar.classList.add("sticky");
		} else if (scrollTop <= posY) {
			navbar.classList.remove("sticky");
		}
	};

	// Contact Form Email Encryption
	var contactForm = document.getElementById("contact-form");
	contactForm.setAttribute("action", "//formspree.io/" + "aalex.iliev" + "@" + "gmail" + "." + "com");

	// Hamburger Menu
	var hamburgerMenu = document.getElementById("hamburger-menu");
	var navigationWrapper = document.getElementById("navigation-wrapper");

	hamburgerMenu.addEventListener("click", function () {
		hamburgerMenu.classList.toggle("hamburger--open");
		navigationWrapper.classList.toggle("navigation--open");
	});

	navigationWrapper.addEventListener("click", function (event) {
		event.preventDefault();
		var eventNode = event.target.nodeName.toUpperCase();

		if (eventNode === "A") {
			var targetId = event.target.getAttribute("data-scroll");
			new _SmoothScroll2.default().scrollTo(targetId);

			hamburgerMenu.classList.toggle("hamburger--open");
			navigationWrapper.classList.toggle("navigation--open");
		}
	});

	// No page animations on mobile version
	var breakPoint = 640;

	if (window.innerWidth > breakPoint) {
		window.addEventListener("scroll", pageAnimations);
	}

	// Page Animations
	var windowHeight = window.innerHeight;
	var buffer = 200;

	var elementsArr = [{
		elem: document.getElementById("bars"),
		animation: 'skill-bars--animated',
		single: true
	}, {
		elem: document.getElementsByClassName("animate"),
		animation: 'fade-in',
		single: false
	}, {
		elem: document.getElementsByClassName("timeline__content"),
		animation: 'fade-in-right',
		single: false
	}, {
		elem: document.getElementById("skills-wrapper"),
		animation: 'special-skills__wrapper--animated',
		single: true
	}, {
		elem: document.getElementsByClassName("project"),
		animation: 'fade-in-left',
		single: false
	}, {
		elem: document.getElementById("wrapper"),
		animation: 'contacts-wrapper--animated',
		single: true
	}];

	function pageAnimations() {
		elementsArr.map(function (animationObj) {
			if (!animationObj.single) {
				checkPosition(animationObj.elem, animationObj.animation);
			} else {
				var posFromTopSkillBar = animationObj.elem.getBoundingClientRect().top;

				if (posFromTopSkillBar + buffer - windowHeight <= 0) {
					animationObj.elem.classList.add(animationObj.animation);
				}
			}
		});
	}

	function checkPosition(animatedElement, animationName) {
		for (var i = 0; i < animatedElement.length; i++) {
			var posFromTop = animatedElement[i].getBoundingClientRect().top;

			if (posFromTop + buffer - windowHeight <= 0) {
				animatedElement[i].classList.add(animationName);
			}
		}
	}
}();

},{"./SmoothScroll":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9TbW9vdGhTY3JvbGwuanMiLCJhcHAvc2NyaXB0cy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7SUNBcUIsWTs7Ozs7Ozs7Ozs7Ozs7Ozs7Y0FDWCxHLEVBQUs7QUFDYixPQUFNLFNBQVMsRUFBZjtBQUNBLE9BQUksU0FBUyxLQUFLLGdCQUFMLEVBQWI7QUFDQSxPQUFJLFFBQVEsS0FBSyxZQUFMLENBQWtCLEdBQWxCLElBQXlCLE1BQXJDO0FBQ0EsT0FBSSxXQUFXLFFBQVEsTUFBUixHQUFpQixRQUFRLE1BQXpCLEdBQWtDLFNBQVMsS0FBMUQ7O0FBRUEsT0FBSSxXQUFXLEdBQWYsRUFBb0I7QUFDbkIsYUFBUyxDQUFULEVBQVksS0FBWjtBQUNBO0FBQ0E7O0FBRUQsT0FBSSxRQUFRLEtBQUssS0FBTCxDQUFXLFdBQVcsR0FBdEIsQ0FBWjs7QUFFQSxPQUFJLFNBQVMsRUFBYixFQUFpQixRQUFRLEVBQVI7O0FBRWpCLE9BQUksT0FBTyxLQUFLLEtBQUwsQ0FBVyxXQUFXLEVBQXRCLENBQVg7QUFDQSxPQUFJLFFBQVEsUUFBUSxNQUFSLEdBQWlCLFNBQVMsSUFBMUIsR0FBaUMsU0FBUyxJQUF0RDtBQUNBLE9BQUksUUFBUSxDQUFaOztBQUVBLE9BQUksUUFBUSxNQUFaLEVBQW9CO0FBQ25CLFNBQUssSUFBSSxJQUFJLE1BQWIsRUFBcUIsSUFBSSxLQUF6QixFQUFnQyxLQUFLLElBQXJDLEVBQTJDO0FBQzFDLGdCQUFXLHdCQUF3QixLQUF4QixHQUFnQyxHQUEzQyxFQUFnRCxRQUFRLEtBQXhEO0FBQ0EsY0FBUyxJQUFUO0FBQ0EsU0FBSSxRQUFRLEtBQVosRUFBbUIsUUFBUSxLQUFSO0FBQ25CO0FBQ0E7QUFDRDtBQUNBOztBQUVELFFBQUssSUFBSSxLQUFJLE1BQWIsRUFBcUIsS0FBSSxLQUF6QixFQUFnQyxNQUFLLElB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Z0MsYUFBYSxTQUE3QztBQUNBO0FBQ0Q7QUFDRCxHQVZEO0FBV0E7O0FBRUQsVUFBUyxhQUFULENBQXVCLGVBQXZCLEVBQXdDLGFBQXhDLEVBQXVEO0FBQ3RELE9BQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxnQkFBZ0IsTUFBcEMsRUFBNEMsR0FBNUMsRUFBaUQ7QUFDaEQsT0FBTSxhQUFhLGdCQUFnQixDQUFoQixFQUFtQixxQkFBbkIsR0FBMkMsR0FBOUQ7O0FBRUEsT0FBSSxhQUFhLE1BQWIsR0FBc0IsWUFBdEIsSUFBc0MsQ0FBMUMsRUFBNkM7QUFDNUMsb0JBQWdCLENBQWhCLEVBQW1CLFNBQW5CLENBQTZCLEdBQTdCLENBQWlDLGFBQWpDO0FBQ0E7QUFDRDtBQUNEO0FBQ0QsQ0ExSHNCLEVBQXZCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU21vb3RoU2Nyb2xsIHtcblx0c2Nyb2xsVG8oZUlEKSB7XG5cdFx0Y29uc3QgYnVmZmVyID0gNTA7XG5cdFx0bGV0IHN0YXJ0WSA9IHRoaXMuY3VycmVudFlQb3NpdGlvbigpO1xuXHRcdGxldCBzdG9wWSA9IHRoaXMuZWxtWVBvc2l0aW9uKGVJRCkgLSBidWZmZXI7XG5cdFx0bGV0IGRpc3RhbmNlID0gc3RvcFkgPiBzdGFydFkgPyBzdG9wWSAtIHN0YXJ0WSA6IHN0YXJ0WSAtIHN0b3BZO1xuXG5cdFx0aWYgKGRpc3RhbmNlIDwgMTAwKSB7XG5cdFx0XHRzY3JvbGxUbygwLCBzdG9wWSk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0bGV0IHNwZWVkID0gTWF0aC5yb3VuZChkaXN0YW5jZSAvIDEwMCk7XG5cblx0XHRpZiAoc3BlZWQgPj0gMjApIHNwZWVkID0gMjA7XG5cblx0XHRsZXQgc3RlcCA9IE1hdGgucm91bmQoZGlzdGFuY2UgLyAyNSk7XG5cdFx0bGV0IGxlYXBZID0gc3RvcFkgPiBzdGFydFkgPyBzdGFydFkgKyBzdGVwIDogc3RhcnRZIC0gc3RlcDtcblx0XHRsZXQgdGltZXIgPSAwO1xuXG5cdFx0aWYgKHN0b3BZID4gc3RhcnRZKSB7XG5cdFx0XHRmb3IgKGxldCBpID0gc3RhcnRZOyBpIDwgc3RvcFk7IGkgKz0gc3RlcCkge1xuXHRcdFx0XHRzZXRUaW1lb3V0KFwid2luZG93LnNjcm9sbFRvKDAsIFwiICsgbGVhcFkgKyBcIilcIiwgdGltZXIgKiBzcGVlZCk7XG5cdFx0XHRcdGxlYXBZICs9IHN0ZXA7XG5cdFx0XHRcdGlmIChsZWFwWSA+IHN0b3BZKSBsZWFwWSA9IHN0b3BZO1xuXHRcdFx0XHR0aW1lcisrO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGZvciAobGV0IGkgPSBzdGFydFk7IGkgPiBzdG9wWTsgaSAtPSBzdGVwKSB7XG5cdFx0XHRzZXRUaW1lb3V0KFwid2luZG93LnNjcm9sbFRvKDAsIFwiICsgbGVhcFkgKyBcIilcIiwgdGltZXIgKiBzcGVlZCk7XG5cdFx0XHRsZWFwWSAtPSBzdGVwO1xuXHRcdFx0aWYgKGxlYXBZIDwgc3RvcFkpIGxlYXBZID0gc3RvcFk7XG5cdFx0XHR0aW1lcisrO1xuXHRcdH1cblx0fVxuXG5cdGN1cnJlbnRZUG9zaXRpb24oKSB7XG5cdFx0Ly8gRmlyZWZveCwgQ2hyb21lLCBPcGVyYSwgU2FmYXJpXG5cdFx0aWYgKHNlbGYucGFnZVlPZmZzZXQpIHJldHVybiBzZWxmLnBhZ2VZT2Zmc2V0O1xuXG5cdFx0cmV0dXJuIDA7XG5cdH1cblxuXHRlbG1ZUG9zaXRpb24oZUlEKSB7XG5cdFx0bGV0IGVsbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVJRCk7XG5cdFx0bGV0IHkgPSBlbG0ub2Zmc2V0VG9wO1xuXHRcdGxldCBub2RlID0gZWxtO1xuXG5cdFx0d2hpbGUgKG5vZGUub2Zmc2V0UGFyZW50ICYmIG5vZGUub2Zmc2V0UGFyZW50ICE9IGRvY3VtZW50LmJvZHkpIHtcblx0XHRcdG5vZGUgPSBub2RlLm9mZnNldFBhcmVudDtcblx0XHRcdHkgKz0gbm9kZS5vZmZzZXRUb3A7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHk7XG5cdH1cbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbmltcG9ydCBTbW9vdGhTY3JvbGwgZnJvbSBcIi4vU21vb3RoU2Nyb2xsXCI7XHJcblxyXG5kb2N1bWVudC5ib2R5Lm9ubG9hZCA9IChmdW5jdGlvbigpIHtcclxuXHQvLyBOYXZpZ2F0aW9uIEJhclxyXG5cdGNvbnN0IG5hdmJhciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmF2aWdhdGlvblwiKTtcclxuXHRjb25zdCBwb3NZID0gbmF2YmFyLm9mZnNldFRvcDtcclxuXHJcblx0Ly8gQmFjayB0byBUb3AgYnV0dG9uIGFuZCBsaXN0ZW5lclxyXG5cdGNvbnN0IGJhY2tUb1RvcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmFjay10by10b3BcIik7XHJcblxyXG5cdGJhY2tUb1RvcC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdGNvbnN0IHRhcmdldElkID0gYmFja1RvVG9wLmdldEF0dHJpYnV0ZShcImRhdGEtc2Nyb2xsXCIpO1xyXG5cdFx0bmV3IFNtb290aFNjcm9sbCgpLnNjcm9sbFRvKHRhcmdldElkKTtcclxuXHR9KTtcclxuXHJcblx0Ly8gU2Nyb2xsIHRvIFRvcFxyXG5cdHdpbmRvdy5vbnNjcm9sbCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0Y29uc3Qgc2Nyb2xsVG9wID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xyXG5cclxuXHRcdGlmIChzY3JvbGxUb3AgPiBwb3NZKSB7XHJcblx0XHRcdG5hdmJhci5jbGFzc0xpc3QuYWRkKFwic3RpY2t5XCIpO1xyXG5cdFx0fSBlbHNlIGlmIChzY3JvbGxUb3AgPD0gcG9zWSkge1xyXG5cdFx0XHRuYXZiYXIuY2xhc3NMaXN0LnJlbW92ZShcInN0aWNreVwiKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQvLyBDb250YWN0IEZvcm0gRW1haWwgRW5jcnlwdGlvblxyXG5cdGNvbnN0IGNvbnRhY3RGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250YWN0LWZvcm1cIik7XHJcblx0Y29udGFjdEZvcm0uc2V0QXR0cmlidXRlKFxyXG5cdFx0XCJhY3Rpb25cIixcclxuXHRcdFwiLy9mb3Jtc3ByZWUuaW8vXCIgKyBcImFhbGV4LmlsaWV2XCIgKyBcIkBcIiArIFwiZ21haWxcIiArIFwiLlwiICsgXCJjb21cIlxyXG5cdCk7XHJcblxyXG5cdC8vIEhhbWJ1cmdlciBNZW51XHJcblx0Y29uc3QgaGFtYnVyZ2VyTWVudSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGFtYnVyZ2VyLW1lbnVcIik7XHJcblx0Y29uc3QgbmF2aWdhdGlvbldyYXBwZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hdmlnYXRpb24td3JhcHBlclwiKTtcclxuXHJcblx0aGFtYnVyZ2VyTWVudS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG5cdFx0aGFtYnVyZ2VyTWVudS5jbGFzc0xpc3QudG9nZ2xlKFwiaGFtYnVyZ2VyLS1vcGVuXCIpO1xyXG5cdFx0bmF2aWdhdGlvbldyYXBwZXIuY2xhc3NMaXN0LnRvZ2dsZShcIm5hdmlnYXRpb24tLW9wZW5cIik7XHJcblx0fSk7XHJcblxyXG5cdG5hdmlnYXRpb25XcmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBldmVudCA9PiB7XHJcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0Y29uc3QgZXZlbnROb2RlID0gZXZlbnQudGFyZ2V0Lm5vZGVOYW1lLnRvVXBwZXJDYXNlKCk7XHJcblxyXG5cdFx0aWYgKGV2ZW50Tm9kZSA9PT0gXCJBXCIpIHtcclxuXHRcdFx0Y29uc3QgdGFyZ2V0SWQgPSBldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1zY3JvbGxcIik7XHJcblx0XHRcdG5ldyBTbW9vdGhTY3JvbGwoKS5zY3JvbGxUbyh0YXJnZXRJZCk7XHJcblxyXG5cdFx0XHRoYW1idXJnZXJNZW51LmNsYXNzTGlzdC50b2dnbGUoXCJoYW1idXJnZXItLW9wZW5cIik7XHJcblx0XHRcdG5hdmlnYXRpb25XcmFwcGVyLmNsYXNzTGlzdC50b2dnbGUoXCJuYXZpZ2F0aW9uLS1vcGVuXCIpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvLyBObyBwYWdlIGFuaW1hdGlvbnMgb24gbW9iaWxlIHZlcnNpb25cclxuXHRjb25zdCBicmVha1BvaW50ID0gNjQwO1xyXG5cclxuXHRpZiAod2luZG93LmlubmVyV2lkdGggPiBicmVha1BvaW50KSB7XHJcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBwYWdlQW5pbWF0aW9ucyk7XHJcblx0fVxyXG5cclxuXHQvLyBQYWdlIEFuaW1hdGlvbnNcclxuXHRjb25zdCB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcblx0Y29uc3QgYnVmZmVyID0gMjAwO1xyXG5cclxuXHRjb25zdCBlbGVtZW50c0FyciA9IFtcclxuXHRcdHtcclxuXHRcdFx0ZWxlbTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJiYXJzXCIpLFxyXG5cdFx0XHRhbmltYXRpb246ICdza2lsbC1iYXJzLS1hbmltYXRlZCcsXHJcblx0XHRcdHNpbmdsZTogdHJ1ZSxcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcdGVsZW06IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJhbmltYXRlXCIpLFxyXG5cdFx0XHRhbmltYXRpb246ICdmYWRlLWluJyxcclxuXHRcdFx0c2luZ2xlOiBmYWxzZSxcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcdGVsZW06IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ0aW1lbGluZV9fY29udGVudFwiKSxcclxuXHRcdFx0YW5pbWF0aW9uOiAnZmFkZS1pbi1yaWdodCcsXHJcblx0XHRcdHNpbmdsZTogZmFsc2UsXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XHRlbGVtOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNraWxscy13cmFwcGVyXCIpLFxyXG5cdFx0XHRhbmltYXRpb246ICdzcGVjaWFsLXNraWxsc19fd3JhcHBlci0tYW5pbWF0ZWQnLFxyXG5cdFx0XHRzaW5nbGU6IHRydWUsXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XHRlbGVtOiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicHJvamVjdFwiKSxcclxuXHRcdFx0YW5pbWF0aW9uOiAnZmFkZS1pbi1sZWZ0JyxcclxuXHRcdFx0c2luZ2xlOiBmYWxzZSxcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcdGVsZW06IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid3JhcHBlclwiKSxcclxuXHRcdFx0YW5pbWF0aW9uOiAnY29udGFjdHMtd3JhcHBlci0tYW5pbWF0ZWQnLFxyXG5cdFx0XHRzaW5nbGU6IHRydWUsXHJcblx0XHR9XHJcblx0XTtcclxuXHJcblx0ZnVuY3Rpb24gcGFnZUFuaW1hdGlvbnMoKSB7XHJcblx0XHRlbGVtZW50c0Fyci5tYXAoKGFuaW1hdGlvbk9iaikgPT4ge1xyXG5cdFx0XHRpZiAoIWFuaW1hdGlvbk9iai5zaW5nbGUpIHtcclxuXHRcdFx0XHRjaGVja1Bvc2l0aW9uKGFuaW1hdGlvbk9iai5lbGVtLCBhbmltYXRpb25PYmouYW5pbWF0aW9uKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRjb25zdCBwb3NGcm9tVG9wU2tpbGxCYXIgPSBhbmltYXRpb25PYmouZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XHJcblxyXG5cdFx0XHRcdGlmIChwb3NGcm9tVG9wU2tpbGxCYXIgKyBidWZmZXIgLSB3aW5kb3dIZWlnaHQgPD0gMCkge1xyXG5cdFx0XHRcdFx0YW5pbWF0aW9uT2JqLmVsZW0uY2xhc3NMaXN0LmFkZChhbmltYXRpb25PYmouYW5pbWF0aW9uKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gY2hlY2tQb3NpdGlvbihhbmltYXRlZEVsZW1lbnQsIGFuaW1hdGlvbk5hbWUpIHtcclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgYW5pbWF0ZWRFbGVtZW50Lmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGNvbnN0IHBvc0Zyb21Ub3AgPSBhbmltYXRlZEVsZW1lbnRbaV0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xyXG5cclxuXHRcdFx0aWYgKHBvc0Zyb21Ub3AgKyBidWZmZXIgLSB3aW5kb3dIZWlnaHQgPD0gMCkge1xyXG5cdFx0XHRcdGFuaW1hdGVkRWxlbWVudFtpXS5jbGFzc0xpc3QuYWRkKGFuaW1hdGlvbk5hbWUpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59KSgpO1xyXG4iXX0=
