class ClickerGame extends Rendering {
	constructor(initialCounterValue = 0, className, templateFn) {
		super(className, templateFn);
		this.initialCounterValue = initialCounterValue;
	}

	gameEventListeners() {
		const clickButton = document.querySelector('.click-btn');
		const counterView = document.getElementById('counter-view');

		let counter = this.initialCounterValue;

		if (clickButton && counterView) {
			counterView.innerHTML = counter;

			clickButton.addEventListener('click', () => {
				counter++;
				counterView.innerHTML = counter;
				console.log('Works, counter', counter);
			});
		}
	}
}
