const setBackground = (img, resolution) => {
	document.getElementById('root-container').style.backgroundImage =
		'url(./assets/main-background/' + img + resolution + ')';
};

const changeMainBackground = () => {
	let resolutionUrl = '.avif';
	let image = 1;

	setInterval(() => {
		if (image < 5) {
			++image;
			setBackground(image, resolutionUrl);
		} else {
			image = 1;
			setBackground(image, resolutionUrl);
		}
	}, 5000);
};
