export default class SmoothScroll {
	scrollTo(eID) {
		const buffer = 50;
		let startY = this.currentYPosition();
		let stopY = this.elmYPosition(eID) - buffer;
		let distance = stopY > startY ? stopY - startY : startY - stopY;

		if (distance < 100) {
			scrollTo(0, stopY);
			return;
		}

		let speed = Math.round(distance / 100);

		if (speed >= 20) speed = 20;

		let step = Math.round(distance / 25);
		let leapY = stopY > startY ? startY + step : startY - step;
		let timer = 0;

		if (stopY > startY) {
			for (let i = startY; i < stopY; i += step) {
				setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
				leapY += step;
				if (leapY > stopY) leapY = stopY;
				timer++;
			}
			return;
		}

		for (let i = startY; i > stopY; i -= step) {
			setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
			leapY -= step;
			if (leapY < stopY) leapY = stopY;
			timer++;
		}
	}

	currentYPosition() {
		// Firefox, Chrome, Opera, Safari
		if (self.pageYOffset) return self.pageYOffset;

		return 0;
	}

	elmYPosition(eID) {
		let elm = document.getElementById(eID);
		let y = elm.offsetTop;
		let node = elm;

		while (node.offsetParent && node.offsetParent != document.body) {
			node = node.offsetParent;
			y += node.offsetTop;
		}

		return y;
	}
};
