class Rendering {
	constructor() {
		this.initialization();
	}

	initialization() {
		this.modal = document.getElementById('modalWindow');
		this.modalContent = document.querySelector('.modal-text');
		this.root = document.getElementById('root-container');
		this.intervalId = null;
		this.layout = document.createElement('div');
	}

	renderLayout(className, templateFn, auth) {
		this.layout.classList.add(className);
		this.layout.innerHTML = templateFn();
		this.root.appendChild(this.layout);
		if (auth) {
			auth.logoutListener();
		}
	}

	removeLayout() {
		this.root.removeChild(this.layout);
	}

	renderModalWindow(
		user,
		modalTemplateFn,
		btnContent,
		btnId,
		isNeededModalListeners
	) {
		this.modal.style.display = 'block';
		this.modalContent.innerHTML = modalTemplateFn(user);
		const modalBtn = document.getElementById(btnId);
		modalBtn.innerText = btnContent;

		if (isNeededModalListeners) {
			document.getElementById('close-modal-window').style.display = 'block';
			this.removeModalWindowListeners();
		}
	}

	removeModalWindowListeners() {
		const span = document.getElementById('close-modal-window');

		window.addEventListener('click', (event) => {
			if (event.target == this.modal) {
				this.modal.style.display = 'none';
			}
		});

		span.addEventListener('click', this.closeModalWindow.bind(this));
	}

	closeModalWindow() {
		this.modal.style.display = 'none';
	}

	setBackground(folder, img, resolution) {
		document.getElementById('root-container').style.backgroundImage =
			'url(./assets/' + folder + '/' + img + resolution + ')';
	}

	showErrorMessage(elem, msg, color, errorId) {
		if (!document.getElementById(errorId)) {
			const errorMessage = document.createElement('p');
			errorMessage.setAttribute('id', errorId);
			errorMessage.innerText = msg;
			errorMessage.style.color = color;
			elem.appendChild(errorMessage);
		}
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
