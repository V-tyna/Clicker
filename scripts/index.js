const rootContainer = document.getElementById('root-container');
const clickButton = document.getElementById('main-btn');
const counterView = document.getElementById('counter-view');

let counter = 0;
counterView.innerHTML = counter;

clickButton.addEventListener('click', () => {
	counter++;
	counterView.innerHTML = counter;
	console.log('Works, counter');
});
