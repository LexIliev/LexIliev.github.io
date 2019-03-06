(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SmoothScroll =
/*#__PURE__*/
function () {
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
'use strict';

var _SmoothScroll = _interopRequireDefault(require("./SmoothScroll"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.body.onload = function () {
  var copyright = document.getElementById('copyright');
  copyright.innerText = "\xA9".concat(new Date().getFullYear()); // Navigation Bar

  var navbar = document.getElementById('navigation');
  var posY = navbar.offsetTop; // Back to Top button and listener

  var backToTop = document.getElementById('back-to-top');
  backToTop.addEventListener('click', function (e) {
    e.preventDefault();
    var targetId = backToTop.getAttribute('data-scroll');
    new _SmoothScroll.default().scrollTo(targetId);
  }); // Scroll to Top

  window.onscroll = function () {
    var scrollTop = window.pageYOffset;

    if (scrollTop > posY) {
      navbar.classList.add('sticky');
    } else if (scrollTop <= posY) {
      navbar.classList.remove('sticky');
    }
  }; // Contact Form Email Encryption


  var contactForm = document.getElementById('contact-form');
  contactForm.setAttribute('action', '//formspree.io/' + 'aalex.iliev' + '@' + 'gmail' + '.' + 'com'); // Hamburger Menu

  var hamburgerMenu = document.getElementById('hamburger-menu');
  var navigationWrapper = document.getElementById('navigation-wrapper');
  hamburgerMenu.addEventListener('click', function () {
    hamburgerMenu.classList.toggle('hamburger--open');
    navigationWrapper.classList.toggle('navigation--open');
  });
  navigationWrapper.addEventListener('click', function (event) {
    event.preventDefault();
    var eventNode = event.target.nodeName.toUpperCase();

    if (eventNode === 'A') {
      var targetId = event.target.getAttribute('data-scroll');
      new _SmoothScroll.default().scrollTo(targetId);
      hamburgerMenu.classList.toggle('hamburger--open');
      navigationWrapper.classList.toggle('navigation--open');
    }
  }); // No page animations on mobile version

  var breakPoint = 640;

  if (window.innerWidth > breakPoint) {
    window.addEventListener('scroll', pageAnimations);
  } // Page Animations


  var windowHeight = window.innerHeight;
  var buffer = 200;
  var elementsArr = [{
    elem: document.getElementById('bars'),
    animation: 'skill-bars--animated',
    single: true
  }, {
    elem: document.getElementsByClassName('animate'),
    animation: 'fade-in',
    single: false
  }, {
    elem: document.getElementsByClassName('timeline__content'),
    animation: 'fade-in-right',
    single: false
  }, {
    elem: document.getElementById('skills-wrapper'),
    animation: 'special-skills__wrapper--animated',
    single: true
  }, {
    elem: document.getElementsByClassName('project'),
    animation: 'fade-in-left',
    single: false
  }, {
    elem: document.getElementById('wrapper'),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9TbW9vdGhTY3JvbGwuanMiLCJhcHAvc2NyaXB0cy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7SUNBcUIsWTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnQkFDWCxHLEVBQUs7QUFDYixVQUFNLE1BQU0sR0FBRyxFQUFmO0FBQ0EsVUFBSSxNQUFNLEdBQUcsS0FBSyxnQkFBTCxFQUFiO0FBQ0EsVUFBSSxLQUFLLEdBQUcsS0FBSyxZQUFMLENBQWtCLEdBQWxCLElBQXlCLE1BQXJDO0FBQ0EsVUFBSSxRQUFRLEdBQUcsS0FBSyxHQUFHLE1BQVIsR0FBaUIsS0FBSyxHQUFHLE1BQXpCLEdBQWtDLE1BQU0sR0FBRyxLQUExRDs7QUFFQSxVQUFJLFFBQVEsR0FBRyxHQUFmLEVBQW9CO0FBQ25CLFFBQUEsUUFBUSxDQUFDLENBQUQsRUFBSSxLQUFKLENBQVI7QUFDQTtBQUNBOztBQUVELFVBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFMLENBQVcsUUFBUSxHQUFHLEdBQXRCLENBQVo7QUFFQSxVQUFJLEtBQUssSUFBSSxFQUFiLEVBQWlCLEtBQUssR0FBRyxFQUFSO0FBRWpCLFVBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFMLENBQVcsUUFBUSxHQUFHLEVBQXRCLENBQVg7QUFDQSxVQUFJLEtBQUssR0FBRyxLQUFLLEdBQUcsTUFBUixHQUFpQixNQUFNLEdBQUcsSUFBMUIsR0FBaUMsTUFBTSxHQUFHLElBQXREO0FBQ0EsVUFBSSxLQUFLLEdBQUcsQ0FBWjs7QUFFQSxVQUFJLEtBQUssR0FBRyxNQUFaLEVBQW9CO0FBQ25CLGFBQUssSUFBSSxDQUFDLEdBQUcsTUFBYixFQUFxQixDQUFDLEdBQUcsS0FBekIsRUFBZ0MsQ0FBQyxJQUFJLElBQXJDLEVBQTJDO0FBQzFDLFVBQUEsVUFBVSxDQUFDLHdCQUF3QixLQUF4QixHQUFn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LEdBQUcsWUFBWSxDQUFDLElBQWIsQ0FBa0IscUJBQWxCLEdBQ3pCLEdBREY7O0FBR0EsWUFBSSxrQkFBa0IsR0FBRyxNQUFyQixHQUE4QixZQUE5QixJQUE4QyxDQUFsRCxFQUFxRDtBQUNwRCxVQUFBLFlBQVksQ0FBQyxJQUFiLENBQWtCLFNBQWxCLENBQTRCLEdBQTVCLENBQWdDLFlBQVksQ0FBQyxTQUE3QztBQUNBO0FBQ0Q7QUFDRCxLQVhEO0FBWUE7O0FBRUQsV0FBUyxhQUFULENBQXVCLGVBQXZCLEVBQXdDLGFBQXhDLEVBQXVEO0FBQ3RELFNBQUssSUFBSSxDQUFDLEdBQUcsQ0FBYixFQUFnQixDQUFDLEdBQUcsZUFBZSxDQUFDLE1BQXBDLEVBQTRDLENBQUMsRUFBN0MsRUFBaUQ7QUFDaEQsVUFBTSxVQUFVLEdBQUcsZUFBZSxDQUFDLENBQUQsQ0FBZixDQUFtQixxQkFBbkIsR0FBMkMsR0FBOUQ7O0FBRUEsVUFBSSxVQUFVLEdBQUcsTUFBYixHQUFzQixZQUF0QixJQUFzQyxDQUExQyxFQUE2QztBQUM1QyxRQUFBLGVBQWUsQ0FBQyxDQUFELENBQWYsQ0FBbUIsU0FBbkIsQ0FBNkIsR0FBN0IsQ0FBaUMsYUFBakM7QUFDQTtBQUNEO0FBQ0Q7QUFDRCxDQS9Ic0IsRUFBdkIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTbW9vdGhTY3JvbGwge1xyXG5cdHNjcm9sbFRvKGVJRCkge1xyXG5cdFx0Y29uc3QgYnVmZmVyID0gNTA7XHJcblx0XHRsZXQgc3RhcnRZID0gdGhpcy5jdXJyZW50WVBvc2l0aW9uKCk7XHJcblx0XHRsZXQgc3RvcFkgPSB0aGlzLmVsbVlQb3NpdGlvbihlSUQpIC0gYnVmZmVyO1xyXG5cdFx0bGV0IGRpc3RhbmNlID0gc3RvcFkgPiBzdGFydFkgPyBzdG9wWSAtIHN0YXJ0WSA6IHN0YXJ0WSAtIHN0b3BZO1xyXG5cclxuXHRcdGlmIChkaXN0YW5jZSA8IDEwMCkge1xyXG5cdFx0XHRzY3JvbGxUbygwLCBzdG9wWSk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgc3BlZWQgPSBNYXRoLnJvdW5kKGRpc3RhbmNlIC8gMTAwKTtcclxuXHJcblx0XHRpZiAoc3BlZWQgPj0gMjApIHNwZWVkID0gMjA7XHJcblxyXG5cdFx0bGV0IHN0ZXAgPSBNYXRoLnJvdW5kKGRpc3RhbmNlIC8gMjUpO1xyXG5cdFx0bGV0IGxlYXBZID0gc3RvcFkgPiBzdGFydFkgPyBzdGFydFkgKyBzdGVwIDogc3RhcnRZIC0gc3RlcDtcclxuXHRcdGxldCB0aW1lciA9IDA7XHJcblxyXG5cdFx0aWYgKHN0b3BZID4gc3RhcnRZKSB7XHJcblx0XHRcdGZvciAobGV0IGkgPSBzdGFydFk7IGkgPCBzdG9wWTsgaSArPSBzdGVwKSB7XHJcblx0XHRcdFx0c2V0VGltZW91dChcIndpbmRvdy5zY3JvbGxUbygwLCBcIiArIGxlYXBZICsgXCIpXCIsIHRpbWVyICogc3BlZWQpO1xyXG5cdFx0XHRcdGxlYXBZICs9IHN0ZXA7XHJcblx0XHRcdFx0aWYgKGxlYXBZID4gc3RvcFkpIGxlYXBZID0gc3RvcFk7XHJcblx0XHRcdFx0dGltZXIrKztcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yIChsZXQgaSA9IHN0YXJ0WTsgaSA+IHN0b3BZOyBpIC09IHN0ZXApIHtcclxuXHRcdFx0c2V0VGltZW91dChcIndpbmRvdy5zY3JvbGxUbygwLCBcIiArIGxlYXBZICsgXCIpXCIsIHRpbWVyICogc3BlZWQpO1xyXG5cdFx0XHRsZWFwWSAtPSBzdGVwO1xyXG5cdFx0XHRpZiAobGVhcFkgPCBzdG9wWSkgbGVhcFkgPSBzdG9wWTtcclxuXHRcdFx0dGltZXIrKztcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGN1cnJlbnRZUG9zaXRpb24oKSB7XHJcblx0XHQvLyBGaXJlZm94LCBDaHJvbWUsIE9wZXJhLCBTYWZhcmlcclxuXHRcdGlmIChzZWxmLnBhZ2VZT2Zmc2V0KSByZXR1cm4gc2VsZi5wYWdlWU9mZnNldDtcclxuXHJcblx0XHRyZXR1cm4gMDtcclxuXHR9XHJcblxyXG5cdGVsbVlQb3NpdGlvbihlSUQpIHtcclxuXHRcdGxldCBlbG0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlSUQpO1xyXG5cdFx0bGV0IHkgPSBlbG0ub2Zmc2V0VG9wO1xyXG5cdFx0bGV0IG5vZGUgPSBlbG07XHJcblxyXG5cdFx0d2hpbGUgKG5vZGUub2Zmc2V0UGFyZW50ICYmIG5vZGUub2Zmc2V0UGFyZW50ICE9IGRvY3VtZW50LmJvZHkpIHtcclxuXHRcdFx0bm9kZSA9IG5vZGUub2Zmc2V0UGFyZW50O1xyXG5cdFx0XHR5ICs9IG5vZGUub2Zmc2V0VG9wO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB5O1xyXG5cdH1cclxufTtcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IFNtb290aFNjcm9sbCBmcm9tICcuL1Ntb290aFNjcm9sbCc7XHJcblxyXG5kb2N1bWVudC5ib2R5Lm9ubG9hZCA9IChmdW5jdGlvbigpIHtcclxuXHRjb25zdCBjb3B5cmlnaHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29weXJpZ2h0Jyk7XHJcblxyXG5cdGNvcHlyaWdodC5pbm5lclRleHQgPSBgwqkke25ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKX1gO1xyXG5cclxuXHQvLyBOYXZpZ2F0aW9uIEJhclxyXG5cdGNvbnN0IG5hdmJhciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYXZpZ2F0aW9uJyk7XHJcblx0Y29uc3QgcG9zWSA9IG5hdmJhci5vZmZzZXRUb3A7XHJcblxyXG5cdC8vIEJhY2sgdG8gVG9wIGJ1dHRvbiBhbmQgbGlzdGVuZXJcclxuXHRjb25zdCBiYWNrVG9Ub3AgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmFjay10by10b3AnKTtcclxuXHJcblx0YmFja1RvVG9wLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdGNvbnN0IHRhcmdldElkID0gYmFja1RvVG9wLmdldEF0dHJpYnV0ZSgnZGF0YS1zY3JvbGwnKTtcclxuXHRcdG5ldyBTbW9vdGhTY3JvbGwoKS5zY3JvbGxUbyh0YXJnZXRJZCk7XHJcblx0fSk7XHJcblxyXG5cdC8vIFNjcm9sbCB0byBUb3BcclxuXHR3aW5kb3cub25zY3JvbGwgPSBmdW5jdGlvbigpIHtcclxuXHRcdGNvbnN0IHNjcm9sbFRvcCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcclxuXHJcblx0XHRpZiAoc2Nyb2xsVG9wID4gcG9zWSkge1xyXG5cdFx0XHRuYXZiYXIuY2xhc3NMaXN0LmFkZCgnc3RpY2t5Jyk7XHJcblx0XHR9IGVsc2UgaWYgKHNjcm9sbFRvcCA8PSBwb3NZKSB7XHJcblx0XHRcdG5hdmJhci5jbGFzc0xpc3QucmVtb3ZlKCdzdGlja3knKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQvLyBDb250YWN0IEZvcm0gRW1haWwgRW5jcnlwdGlvblxyXG5cdGNvbnN0IGNvbnRhY3RGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhY3QtZm9ybScpO1xyXG5cdGNvbnRhY3RGb3JtLnNldEF0dHJpYnV0ZShcclxuXHRcdCdhY3Rpb24nLFxyXG5cdFx0Jy8vZm9ybXNwcmVlLmlvLycgKyAnYWFsZXguaWxpZXYnICsgJ0AnICsgJ2dtYWlsJyArICcuJyArICdjb20nLFxyXG5cdCk7XHJcblxyXG5cdC8vIEhhbWJ1cmdlciBNZW51XHJcblx0Y29uc3QgaGFtYnVyZ2VyTWVudSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoYW1idXJnZXItbWVudScpO1xyXG5cdGNvbnN0IG5hdmlnYXRpb25XcmFwcGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hdmlnYXRpb24td3JhcHBlcicpO1xyXG5cclxuXHRoYW1idXJnZXJNZW51LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG5cdFx0aGFtYnVyZ2VyTWVudS5jbGFzc0xpc3QudG9nZ2xlKCdoYW1idXJnZXItLW9wZW4nKTtcclxuXHRcdG5hdmlnYXRpb25XcmFwcGVyLmNsYXNzTGlzdC50b2dnbGUoJ25hdmlnYXRpb24tLW9wZW4nKTtcclxuXHR9KTtcclxuXHJcblx0bmF2aWdhdGlvbldyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRjb25zdCBldmVudE5vZGUgPSBldmVudC50YXJnZXQubm9kZU5hbWUudG9VcHBlckNhc2UoKTtcclxuXHJcblx0XHRpZiAoZXZlbnROb2RlID09PSAnQScpIHtcclxuXHRcdFx0Y29uc3QgdGFyZ2V0SWQgPSBldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXNjcm9sbCcpO1xyXG5cdFx0XHRuZXcgU21vb3RoU2Nyb2xsKCkuc2Nyb2xsVG8odGFyZ2V0SWQpO1xyXG5cclxuXHRcdFx0aGFtYnVyZ2VyTWVudS5jbGFzc0xpc3QudG9nZ2xlKCdoYW1idXJnZXItLW9wZW4nKTtcclxuXHRcdFx0bmF2aWdhdGlvbldyYXBwZXIuY2xhc3NMaXN0LnRvZ2dsZSgnbmF2aWdhdGlvbi0tb3BlbicpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQvLyBObyBwYWdlIGFuaW1hdGlvbnMgb24gbW9iaWxlIHZlcnNpb25cclxuXHRjb25zdCBicmVha1BvaW50ID0gNjQwO1xyXG5cclxuXHRpZiAod2luZG93LmlubmVyV2lkdGggPiBicmVha1BvaW50KSB7XHJcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgcGFnZUFuaW1hdGlvbnMpO1xyXG5cdH1cclxuXHJcblx0Ly8gUGFnZSBBbmltYXRpb25zXHJcblx0Y29uc3Qgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xyXG5cdGNvbnN0IGJ1ZmZlciA9IDIwMDtcclxuXHJcblx0Y29uc3QgZWxlbWVudHNBcnIgPSBbXHJcblx0XHR7XHJcblx0XHRcdGVsZW06IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiYXJzJyksXHJcblx0XHRcdGFuaW1hdGlvbjogJ3NraWxsLWJhcnMtLWFuaW1hdGVkJyxcclxuXHRcdFx0c2luZ2xlOiB0cnVlLFxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFx0ZWxlbTogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYW5pbWF0ZScpLFxyXG5cdFx0XHRhbmltYXRpb246ICdmYWRlLWluJyxcclxuXHRcdFx0c2luZ2xlOiBmYWxzZSxcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcdGVsZW06IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3RpbWVsaW5lX19jb250ZW50JyksXHJcblx0XHRcdGFuaW1hdGlvbjogJ2ZhZGUtaW4tcmlnaHQnLFxyXG5cdFx0XHRzaW5nbGU6IGZhbHNlLFxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFx0ZWxlbTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NraWxscy13cmFwcGVyJyksXHJcblx0XHRcdGFuaW1hdGlvbjogJ3NwZWNpYWwtc2tpbGxzX193cmFwcGVyLS1hbmltYXRlZCcsXHJcblx0XHRcdHNpbmdsZTogdHJ1ZSxcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcdGVsZW06IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3Byb2plY3QnKSxcclxuXHRcdFx0YW5pbWF0aW9uOiAnZmFkZS1pbi1sZWZ0JyxcclxuXHRcdFx0c2luZ2xlOiBmYWxzZSxcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcdGVsZW06IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3cmFwcGVyJyksXHJcblx0XHRcdGFuaW1hdGlvbjogJ2NvbnRhY3RzLXdyYXBwZXItLWFuaW1hdGVkJyxcclxuXHRcdFx0c2luZ2xlOiB0cnVlLFxyXG5cdFx0fSxcclxuXHRdO1xyXG5cclxuXHRmdW5jdGlvbiBwYWdlQW5pbWF0aW9ucygpIHtcclxuXHRcdGVsZW1lbnRzQXJyLm1hcCgoYW5pbWF0aW9uT2JqKSA9PiB7XHJcblx0XHRcdGlmICghYW5pbWF0aW9uT2JqLnNpbmdsZSkge1xyXG5cdFx0XHRcdGNoZWNrUG9zaXRpb24oYW5pbWF0aW9uT2JqLmVsZW0sIGFuaW1hdGlvbk9iai5hbmltYXRpb24pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGNvbnN0IHBvc0Zyb21Ub3BTa2lsbEJhciA9IGFuaW1hdGlvbk9iai5lbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXHJcblx0XHRcdFx0XHQudG9wO1xyXG5cclxuXHRcdFx0XHRpZiAocG9zRnJvbVRvcFNraWxsQmFyICsgYnVmZmVyIC0gd2luZG93SGVpZ2h0IDw9IDApIHtcclxuXHRcdFx0XHRcdGFuaW1hdGlvbk9iai5lbGVtLmNsYXNzTGlzdC5hZGQoYW5pbWF0aW9uT2JqLmFuaW1hdGlvbik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGNoZWNrUG9zaXRpb24oYW5pbWF0ZWRFbGVtZW50LCBhbmltYXRpb25OYW1lKSB7XHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGFuaW1hdGVkRWxlbWVudC5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRjb25zdCBwb3NGcm9tVG9wID0gYW5pbWF0ZWRFbGVtZW50W2ldLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcclxuXHJcblx0XHRcdGlmIChwb3NGcm9tVG9wICsgYnVmZmVyIC0gd2luZG93SGVpZ2h0IDw9IDApIHtcclxuXHRcdFx0XHRhbmltYXRlZEVsZW1lbnRbaV0uY2xhc3NMaXN0LmFkZChhbmltYXRpb25OYW1lKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufSkoKTtcclxuIl19
