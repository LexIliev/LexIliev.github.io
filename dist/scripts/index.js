(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

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

exports["default"] = SmoothScroll;
;

},{}],2:[function(require,module,exports){
'use strict';

var _SmoothScroll = _interopRequireDefault(require("./SmoothScroll"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

document.body.onload = function () {
  var copyright = document.getElementById('copyright');
  copyright.innerText = "\xA9".concat(new Date().getFullYear()); // Navigation Bar

  var navbar = document.getElementById('navigation');
  var posY = navbar.offsetTop; // Back to Top button and listener

  var backToTop = document.getElementById('back-to-top');
  backToTop.addEventListener('click', function (e) {
    e.preventDefault();
    var targetId = backToTop.getAttribute('data-scroll');
    new _SmoothScroll["default"]().scrollTo(targetId);
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
      new _SmoothScroll["default"]().scrollTo(targetId);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9TbW9vdGhTY3JvbGwuanMiLCJhcHAvc2NyaXB0cy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7SUNBcUIsWTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnQkFDWCxHLEVBQUs7QUFDYixVQUFNLE1BQU0sR0FBRyxFQUFmO0FBQ0EsVUFBSSxNQUFNLEdBQUcsS0FBSyxnQkFBTCxFQUFiO0FBQ0EsVUFBSSxLQUFLLEdBQUcsS0FBSyxZQUFMLENBQWtCLEdBQWxCLElBQXlCLE1BQXJDO0FBQ0EsVUFBSSxRQUFRLEdBQUcsS0FBSyxHQUFHLE1BQVIsR0FBaUIsS0FBSyxHQUFHLE1BQXpCLEdBQWtDLE1BQU0sR0FBRyxLQUExRDs7QUFFQSxVQUFJLFFBQVEsR0FBRyxHQUFmLEVBQW9CO0FBQ25CLFFBQUEsUUFBUSxDQUFDLENBQUQsRUFBSSxLQUFKLENBQVI7QUFDQTtBQUNBOztBQUVELFVBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFMLENBQVcsUUFBUSxHQUFHLEdBQXRCLENBQVo7QUFFQSxVQUFJLEtBQUssSUFBSSxFQUFiLEVBQWlCLEtBQUssR0FBRyxFQUFSO0FBRWpCLFVBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFMLENBQVcsUUFBUSxHQUFHLEVBQXRCLENBQVg7QUFDQSxVQUFJLEtBQUssR0FBRyxLQUFLLEdBQUcsTUFBUixHQUFpQixNQUFNLEdBQUcsSUFBMUIsR0FBaUMsTUFBTSxHQUFHLElBQXREO0FBQ0EsVUFBSSxLQUFLLEdBQUcsQ0FBWjs7QUFFQSxVQUFJLEtBQUssR0FBRyxNQUFaLEVBQW9CO0FBQ25CLGFBQUssSUFBSSxDQUFDLEdBQUcsTUFBYixFQUFxQixDQUFDLEdBQUcsS0FBekIsRUFBZ0MsQ0FBQyxJQUFJLElBQXJDLEVBQTJDO0FBQzFDLFVBQUEsVUFBVSxDQUFDLHdCQUF3QixLQUF4QixHQUFn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LEdBQUcsWUFBWSxDQUFDLElBQWIsQ0FBa0IscUJBQWxCLEdBQ3pCLEdBREY7O0FBR0EsWUFBSSxrQkFBa0IsR0FBRyxNQUFyQixHQUE4QixZQUE5QixJQUE4QyxDQUFsRCxFQUFxRDtBQUNwRCxVQUFBLFlBQVksQ0FBQyxJQUFiLENBQWtCLFNBQWxCLENBQTRCLEdBQTVCLENBQWdDLFlBQVksQ0FBQyxTQUE3QztBQUNBO0FBQ0Q7QUFDRCxLQVhEO0FBWUE7O0FBRUQsV0FBUyxhQUFULENBQXVCLGVBQXZCLEVBQXdDLGFBQXhDLEVBQXVEO0FBQ3RELFNBQUssSUFBSSxDQUFDLEdBQUcsQ0FBYixFQUFnQixDQUFDLEdBQUcsZUFBZSxDQUFDLE1BQXBDLEVBQTRDLENBQUMsRUFBN0MsRUFBaUQ7QUFDaEQsVUFBTSxVQUFVLEdBQUcsZUFBZSxDQUFDLENBQUQsQ0FBZixDQUFtQixxQkFBbkIsR0FBMkMsR0FBOUQ7O0FBRUEsVUFBSSxVQUFVLEdBQUcsTUFBYixHQUFzQixZQUF0QixJQUFzQyxDQUExQyxFQUE2QztBQUM1QyxRQUFBLGVBQWUsQ0FBQyxDQUFELENBQWYsQ0FBbUIsU0FBbkIsQ0FBNkIsR0FBN0IsQ0FBaUMsYUFBakM7QUFDQTtBQUNEO0FBQ0Q7QUFDRCxDQS9Ic0IsRUFBdkIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTbW9vdGhTY3JvbGwge1xuXHRzY3JvbGxUbyhlSUQpIHtcblx0XHRjb25zdCBidWZmZXIgPSA1MDtcblx0XHRsZXQgc3RhcnRZID0gdGhpcy5jdXJyZW50WVBvc2l0aW9uKCk7XG5cdFx0bGV0IHN0b3BZID0gdGhpcy5lbG1ZUG9zaXRpb24oZUlEKSAtIGJ1ZmZlcjtcblx0XHRsZXQgZGlzdGFuY2UgPSBzdG9wWSA+IHN0YXJ0WSA/IHN0b3BZIC0gc3RhcnRZIDogc3RhcnRZIC0gc3RvcFk7XG5cblx0XHRpZiAoZGlzdGFuY2UgPCAxMDApIHtcblx0XHRcdHNjcm9sbFRvKDAsIHN0b3BZKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRsZXQgc3BlZWQgPSBNYXRoLnJvdW5kKGRpc3RhbmNlIC8gMTAwKTtcblxuXHRcdGlmIChzcGVlZCA+PSAyMCkgc3BlZWQgPSAyMDtcblxuXHRcdGxldCBzdGVwID0gTWF0aC5yb3VuZChkaXN0YW5jZSAvIDI1KTtcblx0XHRsZXQgbGVhcFkgPSBzdG9wWSA+IHN0YXJ0WSA/IHN0YXJ0WSArIHN0ZXAgOiBzdGFydFkgLSBzdGVwO1xuXHRcdGxldCB0aW1lciA9IDA7XG5cblx0XHRpZiAoc3RvcFkgPiBzdGFydFkpIHtcblx0XHRcdGZvciAobGV0IGkgPSBzdGFydFk7IGkgPCBzdG9wWTsgaSArPSBzdGVwKSB7XG5cdFx0XHRcdHNldFRpbWVvdXQoXCJ3aW5kb3cuc2Nyb2xsVG8oMCwgXCIgKyBsZWFwWSArIFwiKVwiLCB0aW1lciAqIHNwZWVkKTtcblx0XHRcdFx0bGVhcFkgKz0gc3RlcDtcblx0XHRcdFx0aWYgKGxlYXBZID4gc3RvcFkpIGxlYXBZID0gc3RvcFk7XG5cdFx0XHRcdHRpbWVyKys7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Zm9yIChsZXQgaSA9IHN0YXJ0WTsgaSA+IHN0b3BZOyBpIC09IHN0ZXApIHtcblx0XHRcdHNldFRpbWVvdXQoXCJ3aW5kb3cuc2Nyb2xsVG8oMCwgXCIgKyBsZWFwWSArIFwiKVwiLCB0aW1lciAqIHNwZWVkKTtcblx0XHRcdGxlYXBZIC09IHN0ZXA7XG5cdFx0XHRpZiAobGVhcFkgPCBzdG9wWSkgbGVhcFkgPSBzdG9wWTtcblx0XHRcdHRpbWVyKys7XG5cdFx0fVxuXHR9XG5cblx0Y3VycmVudFlQb3NpdGlvbigpIHtcblx0XHQvLyBGaXJlZm94LCBDaHJvbWUsIE9wZXJhLCBTYWZhcmlcblx0XHRpZiAoc2VsZi5wYWdlWU9mZnNldCkgcmV0dXJuIHNlbGYucGFnZVlPZmZzZXQ7XG5cblx0XHRyZXR1cm4gMDtcblx0fVxuXG5cdGVsbVlQb3NpdGlvbihlSUQpIHtcblx0XHRsZXQgZWxtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZUlEKTtcblx0XHRsZXQgeSA9IGVsbS5vZmZzZXRUb3A7XG5cdFx0bGV0IG5vZGUgPSBlbG07XG5cblx0XHR3aGlsZSAobm9kZS5vZmZzZXRQYXJlbnQgJiYgbm9kZS5vZmZzZXRQYXJlbnQgIT0gZG9jdW1lbnQuYm9keSkge1xuXHRcdFx0bm9kZSA9IG5vZGUub2Zmc2V0UGFyZW50O1xuXHRcdFx0eSArPSBub2RlLm9mZnNldFRvcDtcblx0XHR9XG5cblx0XHRyZXR1cm4geTtcblx0fVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFNtb290aFNjcm9sbCBmcm9tICcuL1Ntb290aFNjcm9sbCc7XG5cbmRvY3VtZW50LmJvZHkub25sb2FkID0gKGZ1bmN0aW9uKCkge1xuXHRjb25zdCBjb3B5cmlnaHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29weXJpZ2h0Jyk7XG5cblx0Y29weXJpZ2h0LmlubmVyVGV4dCA9IGDCqSR7bmV3IERhdGUoKS5nZXRGdWxsWWVhcigpfWA7XG5cblx0Ly8gTmF2aWdhdGlvbiBCYXJcblx0Y29uc3QgbmF2YmFyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hdmlnYXRpb24nKTtcblx0Y29uc3QgcG9zWSA9IG5hdmJhci5vZmZzZXRUb3A7XG5cblx0Ly8gQmFjayB0byBUb3AgYnV0dG9uIGFuZCBsaXN0ZW5lclxuXHRjb25zdCBiYWNrVG9Ub3AgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmFjay10by10b3AnKTtcblxuXHRiYWNrVG9Ub3AuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0Y29uc3QgdGFyZ2V0SWQgPSBiYWNrVG9Ub3AuZ2V0QXR0cmlidXRlKCdkYXRhLXNjcm9sbCcpO1xuXHRcdG5ldyBTbW9vdGhTY3JvbGwoKS5zY3JvbGxUbyh0YXJnZXRJZCk7XG5cdH0pO1xuXG5cdC8vIFNjcm9sbCB0byBUb3Bcblx0d2luZG93Lm9uc2Nyb2xsID0gZnVuY3Rpb24oKSB7XG5cdFx0Y29uc3Qgc2Nyb2xsVG9wID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xuXG5cdFx0aWYgKHNjcm9sbFRvcCA+IHBvc1kpIHtcblx0XHRcdG5hdmJhci5jbGFzc0xpc3QuYWRkKCdzdGlja3knKTtcblx0XHR9IGVsc2UgaWYgKHNjcm9sbFRvcCA8PSBwb3NZKSB7XG5cdFx0XHRuYXZiYXIuY2xhc3NMaXN0LnJlbW92ZSgnc3RpY2t5Jyk7XG5cdFx0fVxuXHR9O1xuXG5cdC8vIENvbnRhY3QgRm9ybSBFbWFpbCBFbmNyeXB0aW9uXG5cdGNvbnN0IGNvbnRhY3RGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhY3QtZm9ybScpO1xuXHRjb250YWN0Rm9ybS5zZXRBdHRyaWJ1dGUoXG5cdFx0J2FjdGlvbicsXG5cdFx0Jy8vZm9ybXNwcmVlLmlvLycgKyAnYWFsZXguaWxpZXYnICsgJ0AnICsgJ2dtYWlsJyArICcuJyArICdjb20nLFxuXHQpO1xuXG5cdC8vIEhhbWJ1cmdlciBNZW51XG5cdGNvbnN0IGhhbWJ1cmdlck1lbnUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGFtYnVyZ2VyLW1lbnUnKTtcblx0Y29uc3QgbmF2aWdhdGlvbldyYXBwZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmF2aWdhdGlvbi13cmFwcGVyJyk7XG5cblx0aGFtYnVyZ2VyTWVudS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0XHRoYW1idXJnZXJNZW51LmNsYXNzTGlzdC50b2dnbGUoJ2hhbWJ1cmdlci0tb3BlbicpO1xuXHRcdG5hdmlnYXRpb25XcmFwcGVyLmNsYXNzTGlzdC50b2dnbGUoJ25hdmlnYXRpb24tLW9wZW4nKTtcblx0fSk7XG5cblx0bmF2aWdhdGlvbldyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGNvbnN0IGV2ZW50Tm9kZSA9IGV2ZW50LnRhcmdldC5ub2RlTmFtZS50b1VwcGVyQ2FzZSgpO1xuXG5cdFx0aWYgKGV2ZW50Tm9kZSA9PT0gJ0EnKSB7XG5cdFx0XHRjb25zdCB0YXJnZXRJZCA9IGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2Nyb2xsJyk7XG5cdFx0XHRuZXcgU21vb3RoU2Nyb2xsKCkuc2Nyb2xsVG8odGFyZ2V0SWQpO1xuXG5cdFx0XHRoYW1idXJnZXJNZW51LmNsYXNzTGlzdC50b2dnbGUoJ2hhbWJ1cmdlci0tb3BlbicpO1xuXHRcdFx0bmF2aWdhdGlvbldyYXBwZXIuY2xhc3NMaXN0LnRvZ2dsZSgnbmF2aWdhdGlvbi0tb3BlbicpO1xuXHRcdH1cblx0fSk7XG5cblx0Ly8gTm8gcGFnZSBhbmltYXRpb25zIG9uIG1vYmlsZSB2ZXJzaW9uXG5cdGNvbnN0IGJyZWFrUG9pbnQgPSA2NDA7XG5cblx0aWYgKHdpbmRvdy5pbm5lcldpZHRoID4gYnJlYWtQb2ludCkge1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBwYWdlQW5pbWF0aW9ucyk7XG5cdH1cblxuXHQvLyBQYWdlIEFuaW1hdGlvbnNcblx0Y29uc3Qgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXHRjb25zdCBidWZmZXIgPSAyMDA7XG5cblx0Y29uc3QgZWxlbWVudHNBcnIgPSBbXG5cdFx0e1xuXHRcdFx0ZWxlbTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JhcnMnKSxcblx0XHRcdGFuaW1hdGlvbjogJ3NraWxsLWJhcnMtLWFuaW1hdGVkJyxcblx0XHRcdHNpbmdsZTogdHJ1ZSxcblx0XHR9LFxuXHRcdHtcblx0XHRcdGVsZW06IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FuaW1hdGUnKSxcblx0XHRcdGFuaW1hdGlvbjogJ2ZhZGUtaW4nLFxuXHRcdFx0c2luZ2xlOiBmYWxzZSxcblx0XHR9LFxuXHRcdHtcblx0XHRcdGVsZW06IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3RpbWVsaW5lX19jb250ZW50JyksXG5cdFx0XHRhbmltYXRpb246ICdmYWRlLWluLXJpZ2h0Jyxcblx0XHRcdHNpbmdsZTogZmFsc2UsXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRlbGVtOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2tpbGxzLXdyYXBwZXInKSxcblx0XHRcdGFuaW1hdGlvbjogJ3NwZWNpYWwtc2tpbGxzX193cmFwcGVyLS1hbmltYXRlZCcsXG5cdFx0XHRzaW5nbGU6IHRydWUsXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRlbGVtOiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwcm9qZWN0JyksXG5cdFx0XHRhbmltYXRpb246ICdmYWRlLWluLWxlZnQnLFxuXHRcdFx0c2luZ2xlOiBmYWxzZSxcblx0XHR9LFxuXHRcdHtcblx0XHRcdGVsZW06IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3cmFwcGVyJyksXG5cdFx0XHRhbmltYXRpb246ICdjb250YWN0cy13cmFwcGVyLS1hbmltYXRlZCcsXG5cdFx0XHRzaW5nbGU6IHRydWUsXG5cdFx0fSxcblx0XTtcblxuXHRmdW5jdGlvbiBwYWdlQW5pbWF0aW9ucygpIHtcblx0XHRlbGVtZW50c0Fyci5tYXAoKGFuaW1hdGlvbk9iaikgPT4ge1xuXHRcdFx0aWYgKCFhbmltYXRpb25PYmouc2luZ2xlKSB7XG5cdFx0XHRcdGNoZWNrUG9zaXRpb24oYW5pbWF0aW9uT2JqLmVsZW0sIGFuaW1hdGlvbk9iai5hbmltYXRpb24pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y29uc3QgcG9zRnJvbVRvcFNraWxsQmFyID0gYW5pbWF0aW9uT2JqLmVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblx0XHRcdFx0XHQudG9wO1xuXG5cdFx0XHRcdGlmIChwb3NGcm9tVG9wU2tpbGxCYXIgKyBidWZmZXIgLSB3aW5kb3dIZWlnaHQgPD0gMCkge1xuXHRcdFx0XHRcdGFuaW1hdGlvbk9iai5lbGVtLmNsYXNzTGlzdC5hZGQoYW5pbWF0aW9uT2JqLmFuaW1hdGlvbik7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdGZ1bmN0aW9uIGNoZWNrUG9zaXRpb24oYW5pbWF0ZWRFbGVtZW50LCBhbmltYXRpb25OYW1lKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBhbmltYXRlZEVsZW1lbnQubGVuZ3RoOyBpKyspIHtcblx0XHRcdGNvbnN0IHBvc0Zyb21Ub3AgPSBhbmltYXRlZEVsZW1lbnRbaV0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuXG5cdFx0XHRpZiAocG9zRnJvbVRvcCArIGJ1ZmZlciAtIHdpbmRvd0hlaWdodCA8PSAwKSB7XG5cdFx0XHRcdGFuaW1hdGVkRWxlbWVudFtpXS5jbGFzc0xpc3QuYWRkKGFuaW1hdGlvbk5hbWUpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufSkoKTtcbiJdfQ==
