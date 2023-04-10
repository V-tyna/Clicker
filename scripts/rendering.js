class Rendering {
	constructor() {
		this.root = document.getElementById('root-container');
	}

	renderLayout(className, templateFn) {
		const layout = document.createElement('div');

		layout.classList.add(className);
		layout.innerHTML = templateFn();
		this.root.appendChild(layout);
	}
}
