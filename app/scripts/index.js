'use strict';

import SmoothScroll from './SmoothScroll';

document.body.onload = (function() {
	const copyright = document.getElementById('copyright');

	copyright.innerText = `©${new Date().getFullYear()}`;

	// Navigation Bar
	const navbar = document.getElementById('navigation');
	const posY = navbar.offsetTop;

	// Back to Top button and listener
	const backToTop = document.getElementById('back-to-top');

	backToTop.addEventListener('click', function(e) {
		e.preventDefault();

		const targetId = backToTop.getAttribute('data-scroll');
		new SmoothScroll().scrollTo(targetId);
	});

	// Scroll to Top
	window.onscroll = function() {
		const scrollTop = window.pageYOffset;

		if (scrollTop > posY) {
			navbar.classList.add('sticky');
		} else if (scrollTop <= posY) {
			navbar.classList.remove('sticky');
		}
	};

	// Contact Form Email Encryption
	const contactForm = document.getElementById('contact-form');
	contactForm.setAttribute(
		'action',
		'//formspree.io/' + 'aalex.iliev' + '@' + 'gmail' + '.' + 'com',
	);

	// Hamburger Menu
	const hamburgerMenu = document.getElementById('hamburger-menu');
	const navigationWrapper = document.getElementById('navigation-wrapper');

	hamburgerMenu.addEventListener('click', () => {
		hamburgerMenu.classList.toggle('hamburger--open');
		navigationWrapper.classList.toggle('navigation--open');
	});

	navigationWrapper.addEventListener('click', (event) => {
		event.preventDefault();
		const eventNode = event.target.nodeName.toUpperCase();

		if (eventNode === 'A') {
			const targetId = event.target.getAttribute('data-scroll');
			new SmoothScroll().scrollTo(targetId);

			hamburgerMenu.classList.toggle('hamburger--open');
			navigationWrapper.classList.toggle('navigation--open');
		}
	});

	// No page animations on mobile version
	const breakPoint = 640;

	if (window.innerWidth > breakPoint) {
		window.addEventListener('scroll', pageAnimations);
	}

	// Page Animations
	const windowHeight = window.innerHeight;
	const buffer = 200;

	const elementsArr = [
		{
			elem: document.getElementById('bars'),
			animation: 'skill-bars--animated',
			single: true,
		},
		{
			elem: document.getElementsByClassName('animate'),
			animation: 'fade-in',
			single: false,
		},
		{
			elem: document.getElementsByClassName('timeline__content'),
			animation: 'fade-in-right',
			single: false,
		},
		{
			elem: document.getElementById('skills-wrapper'),
			animation: 'special-skills__wrapper--animated',
			single: true,
		},
		{
			elem: document.getElementsByClassName('project'),
			animation: 'fade-in-left',
			single: false,
		},
		{
			elem: document.getElementById('wrapper'),
			animation: 'contacts-wrapper--animated',
			single: true,
		},
	];

	function pageAnimations() {
		elementsArr.map((animationObj) => {
			if (!animationObj.single) {
				checkPosition(animationObj.elem, animationObj.animation);
			} else {
				const posFromTopSkillBar = animationObj.elem.getBoundingClientRect()
					.top;

				if (posFromTopSkillBar + buffer - windowHeight <= 0) {
					animationObj.elem.classList.add(animationObj.animation);
				}
			}
		});
	}

	function checkPosition(animatedElement, animationName) {
		for (let i = 0; i < animatedElement.length; i++) {
			const posFromTop = animatedElement[i].getBoundingClientRect().top;

			if (posFromTop + buffer - windowHeight <= 0) {
				animatedElement[i].classList.add(animationName);
			}
		}
	}
})();
