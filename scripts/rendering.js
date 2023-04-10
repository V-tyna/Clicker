class Rendering {
	constructor() {
		this.root = document.getElementById('root-container');
		this.intervalId = null;
		this.layout = document.createElement('div');
	}

	renderLayout(className, templateFn) {
		this.layout.classList.add(className);
		this.layout.innerHTML = templateFn();
		this.root.appendChild(this.layout);
	}

	removeLayout() {
		this.root.removeChild(this.layout);
	}

	setBackground(folder, img, resolution) {
		document.getElementById('root-container').style.backgroundImage =
			'url(./assets/' + folder + '/' + img + resolution + ')';
	}

	changeBackgroundLoop(folder, resolution) {
		let resolutionUrl = resolution;
		let image = 1;
		this.setBackground(folder, image, resolutionUrl);

		this.intervalId = setInterval(() => {
			if (image < 5) {
				++image;
				this.setBackground(folder, image, resolutionUrl);
			} else {
				image = 1;
				this.setBackground(folder, image, resolutionUrl);
			}
		}, 5000);
	}

	changeBackgroundOnce(folder, image, resolutionUrl) {
		if (this.intervalId) {
			clearInterval(this.intervalId);
		}
		this.setBackground(folder, image, resolutionUrl);
	}
}
