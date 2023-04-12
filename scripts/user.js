class User {
	constructor(email, name, nick) {
		this.user = {
			clicksToWin: BASIC_NUMBER_OF_CLICKS_TO_WIN,
			email,
			image: INITIAL_IMAGE,
			level: INITIAL_LEVEL,
			name,
			nick,
			time: {
				mins: 0,
				seconds: 0,
			},
			totalScore: 0,
		};
	}

	setDataToLocalStorage() {
		localStorage.setItem('userData', JSON.stringify(this.user));
	}
}
