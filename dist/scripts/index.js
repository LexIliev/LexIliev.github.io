(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var SmoothScroll = /*#__PURE__*/function () {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9TbW9vdGhTY3JvbGwuanMiLCJhcHAvc2NyaXB0cy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7SUNBcUIsWTs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFDcEIsVUFBUyxHQUFULEVBQWM7QUFDYixVQUFNLE1BQU0sR0FBRyxFQUFmO0FBQ0EsVUFBSSxNQUFNLEdBQUcsS0FBSyxnQkFBTCxFQUFiO0FBQ0EsVUFBSSxLQUFLLEdBQUcsS0FBSyxZQUFMLENBQWtCLEdBQWxCLElBQXlCLE1BQXJDO0FBQ0EsVUFBSSxRQUFRLEdBQUcsS0FBSyxHQUFHLE1BQVIsR0FBaUIsS0FBSyxHQUFHLE1BQXpCLEdBQWtDLE1BQU0sR0FBRyxLQUExRDs7QUFFQSxVQUFJLFFBQVEsR0FBRyxHQUFmLEVBQW9CO0FBQ25CLFFBQUEsUUFBUSxDQUFDLENBQUQsRUFBSSxLQUFKLENBQVI7QUFDQTtBQUNBOztBQUVELFVBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFMLENBQVcsUUFBUSxHQUFHLEdBQXRCLENBQVo7QUFFQSxVQUFJLEtBQUssSUFBSSxFQUFiLEVBQWlCLEtBQUssR0FBRyxFQUFSO0FBRWpCLFVBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFMLENBQVcsUUFBUSxHQUFHLEVBQXRCLENBQVg7QUFDQSxVQUFJLEtBQUssR0FBRyxLQUFLLEdBQUcsTUFBUixHQUFpQixNQUFNLEdBQUcsSUFBMUIsR0FBaUMsTUFBTSxHQUFHLElBQXREO0FBQ0EsVUFBSSxLQUFLLEdBQUcsQ0FBWjs7QUFFQSxVQUFJLEtBQUssR0FBRyxNQUFaLEVBQW9CO0FBQ25CLGFBQUssSUFBSSxDQUFDLEdBQUcsTUFBYixFQUFxQixDQUFDLEdBQUcsS0FBekIsRUFBZ0MsQ0FBQyxJQUFJLElBQXJDLEVBQTJDO0FBQzFDLFVBQUEsVUFBVSxDQUFDLHdCQUF3QixLQUF4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QUVPO0FBQ04sWUFBTSxrQkFBa0IsR0FBRyxZQUFZLENBQUMsSUFBYixDQUFrQixxQkFBbEIsR0FDekIsR0FERjs7QUFHQSxZQUFJLGtCQUFrQixHQUFHLE1BQXJCLEdBQThCLFlBQTlCLElBQThDLENBQWxELEVBQXFEO0FBQ3BELFVBQUEsWUFBWSxDQUFDLElBQWIsQ0FBa0IsU0FBbEIsQ0FBNEIsR0FBNUIsQ0FBZ0MsWUFBWSxDQUFDLFNBQTdDO0FBQ0E7QUFDRDtBQUNELEtBWEQ7QUFZQTs7QUFFRCxXQUFTLGFBQVQsQ0FBdUIsZUFBdkIsRUFBd0MsYUFBeEMsRUFBdUQ7QUFDdEQsU0FBSyxJQUFJLENBQUMsR0FBRyxDQUFiLEVBQWdCLENBQUMsR0FBRyxlQUFlLENBQUMsTUFBcEMsRUFBNEMsQ0FBQyxFQUE3QyxFQUFpRDtBQUNoRCxVQUFNLFVBQVUsR0FBRyxlQUFlLENBQUMsQ0FBRCxDQUFmLENBQW1CLHFCQUFuQixHQUEyQyxHQUE5RDs7QUFFQSxVQUFJLFVBQVUsR0FBRyxNQUFiLEdBQXNCLFlBQXRCLElBQXNDLENBQTFDLEVBQTZDO0FBQzVDLFFBQUEsZUFBZSxDQUFDLENBQUQsQ0FBZixDQUFtQixTQUFuQixDQUE2QixHQUE3QixDQUFpQyxhQUFqQztBQUNBO0FBQ0Q7QUFDRDtBQUNELENBL0hzQixFQUF2QiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNtb290aFNjcm9sbCB7XG5cdHNjcm9sbFRvKGVJRCkge1xuXHRcdGNvbnN0IGJ1ZmZlciA9IDUwO1xuXHRcdGxldCBzdGFydFkgPSB0aGlzLmN1cnJlbnRZUG9zaXRpb24oKTtcblx0XHRsZXQgc3RvcFkgPSB0aGlzLmVsbVlQb3NpdGlvbihlSUQpIC0gYnVmZmVyO1xuXHRcdGxldCBkaXN0YW5jZSA9IHN0b3BZID4gc3RhcnRZID8gc3RvcFkgLSBzdGFydFkgOiBzdGFydFkgLSBzdG9wWTtcblxuXHRcdGlmIChkaXN0YW5jZSA8IDEwMCkge1xuXHRcdFx0c2Nyb2xsVG8oMCwgc3RvcFkpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGxldCBzcGVlZCA9IE1hdGgucm91bmQoZGlzdGFuY2UgLyAxMDApO1xuXG5cdFx0aWYgKHNwZWVkID49IDIwKSBzcGVlZCA9IDIwO1xuXG5cdFx0bGV0IHN0ZXAgPSBNYXRoLnJvdW5kKGRpc3RhbmNlIC8gMjUpO1xuXHRcdGxldCBsZWFwWSA9IHN0b3BZID4gc3RhcnRZID8gc3RhcnRZICsgc3RlcCA6IHN0YXJ0WSAtIHN0ZXA7XG5cdFx0bGV0IHRpbWVyID0gMDtcblxuXHRcdGlmIChzdG9wWSA+IHN0YXJ0WSkge1xuXHRcdFx0Zm9yIChsZXQgaSA9IHN0YXJ0WTsgaSA8IHN0b3BZOyBpICs9IHN0ZXApIHtcblx0XHRcdFx0c2V0VGltZW91dChcIndpbmRvdy5zY3JvbGxUbygwLCBcIiArIGxlYXBZICsgXCIpXCIsIHRpbWVyICogc3BlZWQpO1xuXHRcdFx0XHRsZWFwWSArPSBzdGVwO1xuXHRcdFx0XHRpZiAobGVhcFkgPiBzdG9wWSkgbGVhcFkgPSBzdG9wWTtcblx0XHRcdFx0dGltZXIrKztcblx0XHRcdH1cblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRmb3IgKGxldCBpID0gc3RhcnRZOyBpID4gc3RvcFk7IGkgLT0gc3RlcCkge1xuXHRcdFx0c2V0VGltZW91dChcIndpbmRvdy5zY3JvbGxUbygwLCBcIiArIGxlYXBZICsgXCIpXCIsIHRpbWVyICogc3BlZWQpO1xuXHRcdFx0bGVhcFkgLT0gc3RlcDtcblx0XHRcdGlmIChsZWFwWSA8IHN0b3BZKSBsZWFwWSA9IHN0b3BZO1xuXHRcdFx0dGltZXIrKztcblx0XHR9XG5cdH1cblxuXHRjdXJyZW50WVBvc2l0aW9uKCkge1xuXHRcdC8vIEZpcmVmb3gsIENocm9tZSwgT3BlcmEsIFNhZmFyaVxuXHRcdGlmIChzZWxmLnBhZ2VZT2Zmc2V0KSByZXR1cm4gc2VsZi5wYWdlWU9mZnNldDtcblxuXHRcdHJldHVybiAwO1xuXHR9XG5cblx0ZWxtWVBvc2l0aW9uKGVJRCkge1xuXHRcdGxldCBlbG0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlSUQpO1xuXHRcdGxldCB5ID0gZWxtLm9mZnNldFRvcDtcblx0XHRsZXQgbm9kZSA9IGVsbTtcblxuXHRcdHdoaWxlIChub2RlLm9mZnNldFBhcmVudCAmJiBub2RlLm9mZnNldFBhcmVudCAhPSBkb2N1bWVudC5ib2R5KSB7XG5cdFx0XHRub2RlID0gbm9kZS5vZmZzZXRQYXJlbnQ7XG5cdFx0XHR5ICs9IG5vZGUub2Zmc2V0VG9wO1xuXHRcdH1cblxuXHRcdHJldHVybiB5O1xuXHR9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgU21vb3RoU2Nyb2xsIGZyb20gJy4vU21vb3RoU2Nyb2xsJztcblxuZG9jdW1lbnQuYm9keS5vbmxvYWQgPSAoZnVuY3Rpb24oKSB7XG5cdGNvbnN0IGNvcHlyaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb3B5cmlnaHQnKTtcblxuXHRjb3B5cmlnaHQuaW5uZXJUZXh0ID0gYMKpJHtuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCl9YDtcblxuXHQvLyBOYXZpZ2F0aW9uIEJhclxuXHRjb25zdCBuYXZiYXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmF2aWdhdGlvbicpO1xuXHRjb25zdCBwb3NZID0gbmF2YmFyLm9mZnNldFRvcDtcblxuXHQvLyBCYWNrIHRvIFRvcCBidXR0b24gYW5kIGxpc3RlbmVyXG5cdGNvbnN0IGJhY2tUb1RvcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiYWNrLXRvLXRvcCcpO1xuXG5cdGJhY2tUb1RvcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRjb25zdCB0YXJnZXRJZCA9IGJhY2tUb1RvcC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2Nyb2xsJyk7XG5cdFx0bmV3IFNtb290aFNjcm9sbCgpLnNjcm9sbFRvKHRhcmdldElkKTtcblx0fSk7XG5cblx0Ly8gU2Nyb2xsIHRvIFRvcFxuXHR3aW5kb3cub25zY3JvbGwgPSBmdW5jdGlvbigpIHtcblx0XHRjb25zdCBzY3JvbGxUb3AgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XG5cblx0XHRpZiAoc2Nyb2xsVG9wID4gcG9zWSkge1xuXHRcdFx0bmF2YmFyLmNsYXNzTGlzdC5hZGQoJ3N0aWNreScpO1xuXHRcdH0gZWxzZSBpZiAoc2Nyb2xsVG9wIDw9IHBvc1kpIHtcblx0XHRcdG5hdmJhci5jbGFzc0xpc3QucmVtb3ZlKCdzdGlja3knKTtcblx0XHR9XG5cdH07XG5cblx0Ly8gQ29udGFjdCBGb3JtIEVtYWlsIEVuY3J5cHRpb25cblx0Y29uc3QgY29udGFjdEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFjdC1mb3JtJyk7XG5cdGNvbnRhY3RGb3JtLnNldEF0dHJpYnV0ZShcblx0XHQnYWN0aW9uJyxcblx0XHQnLy9mb3Jtc3ByZWUuaW8vJyArICdhYWxleC5pbGlldicgKyAnQCcgKyAnZ21haWwnICsgJy4nICsgJ2NvbScsXG5cdCk7XG5cblx0Ly8gSGFtYnVyZ2VyIE1lbnVcblx0Y29uc3QgaGFtYnVyZ2VyTWVudSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoYW1idXJnZXItbWVudScpO1xuXHRjb25zdCBuYXZpZ2F0aW9uV3JhcHBlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYXZpZ2F0aW9uLXdyYXBwZXInKTtcblxuXHRoYW1idXJnZXJNZW51LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHRcdGhhbWJ1cmdlck1lbnUuY2xhc3NMaXN0LnRvZ2dsZSgnaGFtYnVyZ2VyLS1vcGVuJyk7XG5cdFx0bmF2aWdhdGlvbldyYXBwZXIuY2xhc3NMaXN0LnRvZ2dsZSgnbmF2aWdhdGlvbi0tb3BlbicpO1xuXHR9KTtcblxuXHRuYXZpZ2F0aW9uV3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0Y29uc3QgZXZlbnROb2RlID0gZXZlbnQudGFyZ2V0Lm5vZGVOYW1lLnRvVXBwZXJDYXNlKCk7XG5cblx0XHRpZiAoZXZlbnROb2RlID09PSAnQScpIHtcblx0XHRcdGNvbnN0IHRhcmdldElkID0gZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1zY3JvbGwnKTtcblx0XHRcdG5ldyBTbW9vdGhTY3JvbGwoKS5zY3JvbGxUbyh0YXJnZXRJZCk7XG5cblx0XHRcdGhhbWJ1cmdlck1lbnUuY2xhc3NMaXN0LnRvZ2dsZSgnaGFtYnVyZ2VyLS1vcGVuJyk7XG5cdFx0XHRuYXZpZ2F0aW9uV3JhcHBlci5jbGFzc0xpc3QudG9nZ2xlKCduYXZpZ2F0aW9uLS1vcGVuJyk7XG5cdFx0fVxuXHR9KTtcblxuXHQvLyBObyBwYWdlIGFuaW1hdGlvbnMgb24gbW9iaWxlIHZlcnNpb25cblx0Y29uc3QgYnJlYWtQb2ludCA9IDY0MDtcblxuXHRpZiAod2luZG93LmlubmVyV2lkdGggPiBicmVha1BvaW50KSB7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHBhZ2VBbmltYXRpb25zKTtcblx0fVxuXG5cdC8vIFBhZ2UgQW5pbWF0aW9uc1xuXHRjb25zdCB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cdGNvbnN0IGJ1ZmZlciA9IDIwMDtcblxuXHRjb25zdCBlbGVtZW50c0FyciA9IFtcblx0XHR7XG5cdFx0XHRlbGVtOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmFycycpLFxuXHRcdFx0YW5pbWF0aW9uOiAnc2tpbGwtYmFycy0tYW5pbWF0ZWQnLFxuXHRcdFx0c2luZ2xlOiB0cnVlLFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0ZWxlbTogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYW5pbWF0ZScpLFxuXHRcdFx0YW5pbWF0aW9uOiAnZmFkZS1pbicsXG5cdFx0XHRzaW5nbGU6IGZhbHNlLFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0ZWxlbTogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndGltZWxpbmVfX2NvbnRlbnQnKSxcblx0XHRcdGFuaW1hdGlvbjogJ2ZhZGUtaW4tcmlnaHQnLFxuXHRcdFx0c2luZ2xlOiBmYWxzZSxcblx0XHR9LFxuXHRcdHtcblx0XHRcdGVsZW06IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdza2lsbHMtd3JhcHBlcicpLFxuXHRcdFx0YW5pbWF0aW9uOiAnc3BlY2lhbC1za2lsbHNfX3dyYXBwZXItLWFuaW1hdGVkJyxcblx0XHRcdHNpbmdsZTogdHJ1ZSxcblx0XHR9LFxuXHRcdHtcblx0XHRcdGVsZW06IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3Byb2plY3QnKSxcblx0XHRcdGFuaW1hdGlvbjogJ2ZhZGUtaW4tbGVmdCcsXG5cdFx0XHRzaW5nbGU6IGZhbHNlLFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0ZWxlbTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dyYXBwZXInKSxcblx0XHRcdGFuaW1hdGlvbjogJ2NvbnRhY3RzLXdyYXBwZXItLWFuaW1hdGVkJyxcblx0XHRcdHNpbmdsZTogdHJ1ZSxcblx0XHR9LFxuXHRdO1xuXG5cdGZ1bmN0aW9uIHBhZ2VBbmltYXRpb25zKCkge1xuXHRcdGVsZW1lbnRzQXJyLm1hcCgoYW5pbWF0aW9uT2JqKSA9PiB7XG5cdFx0XHRpZiAoIWFuaW1hdGlvbk9iai5zaW5nbGUpIHtcblx0XHRcdFx0Y2hlY2tQb3NpdGlvbihhbmltYXRpb25PYmouZWxlbSwgYW5pbWF0aW9uT2JqLmFuaW1hdGlvbik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjb25zdCBwb3NGcm9tVG9wU2tpbGxCYXIgPSBhbmltYXRpb25PYmouZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXHRcdFx0XHRcdC50b3A7XG5cblx0XHRcdFx0aWYgKHBvc0Zyb21Ub3BTa2lsbEJhciArIGJ1ZmZlciAtIHdpbmRvd0hlaWdodCA8PSAwKSB7XG5cdFx0XHRcdFx0YW5pbWF0aW9uT2JqLmVsZW0uY2xhc3NMaXN0LmFkZChhbmltYXRpb25PYmouYW5pbWF0aW9uKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0ZnVuY3Rpb24gY2hlY2tQb3NpdGlvbihhbmltYXRlZEVsZW1lbnQsIGFuaW1hdGlvbk5hbWUpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGFuaW1hdGVkRWxlbWVudC5sZW5ndGg7IGkrKykge1xuXHRcdFx0Y29uc3QgcG9zRnJvbVRvcCA9IGFuaW1hdGVkRWxlbWVudFtpXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG5cblx0XHRcdGlmIChwb3NGcm9tVG9wICsgYnVmZmVyIC0gd2luZG93SGVpZ2h0IDw9IDApIHtcblx0XHRcdFx0YW5pbWF0ZWRFbGVtZW50W2ldLmNsYXNzTGlzdC5hZGQoYW5pbWF0aW9uTmFtZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59KSgpO1xuIl19
