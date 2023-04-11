class User {
	constructor(email, name, nick) {
		this.user = {
			clicksToWin: 3,
			email,
			image: 1,
			level: 1,
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

	getDataFromLocalStorage() {
		const userData = localStorage.getItem('userData');
		return userData && JSON.parse(userData);
	}
}
