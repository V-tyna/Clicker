class ClickerGame extends Rendering {
	constructor(
		initialTotalScore,
		numberOfClicksToWin,
		level,
		timeObj,
		timeStr,
		img,
		className,
		auth,
		templateFn,
		user
	) {
		super(className, templateFn, user, auth);
		this.initGameVariables(
			initialTotalScore,
			numberOfClicksToWin,
			level,
			timeObj,
			timeStr,
			img
		);
	}

	initGameVariables(
		initialTotalScore,
		numberOfClicksToWin,
		level,
		timeObj,
		timeStr,
		img
	) {
		this.clicksCounter = 0;
		this.image = img;
		this.level = level;
		this.time = timeObj;
		this.timeStr = timeStr;
		this.numberOfClicksToWin = numberOfClicksToWin;
		this.totalScore = initialTotalScore;
		this.timerId = null;
	}

	gameListeners() {
		const clicksToWin = document.getElementById('clicks-number');
		const currentScore = document.getElementById('current-score');
		const level = document.getElementById('level');
		const monster = document.querySelector('.monster');
		const monsterHealth = document.querySelector('.monster-health');
		const timer = document.getElementById('time');
		const totalScore = document.getElementById('total-score');

		if (monster) {
			clicksToWin.innerText = this.numberOfClicksToWin;
			currentScore.innerText = 0;
			level.innerText = this.level;
			totalScore.innerText = this.totalScore;

			monster.addEventListener(
				'click',
				this.monsterListener.bind(
					this,
					currentScore,
					totalScore,
					monster,
					timer,
					monsterHealth
				)
			);
		}
	}

	gameOver(monsterElem) {
		const user = this.getUserData();
		document.querySelector('.monster-container').removeChild(monsterElem);

		this.stopTimer();
		this.renderModalWindow(
			user,
			gameOverModalTemplate,
			'Start new game',
			'start-new-game',
			true
		);

		this.modalButtonListener('start-new-game', this.startNewGame);
	}

	getHumanReadableTime() {
		let seconds = this.time.seconds;
		let mins = this.time.mins;
		let secStr = '00';
		let minStr = '00';

		secStr = seconds;
		if (seconds < MIN_TWO_DIGIT_VALUE) {
			secStr = '0' + seconds;
		}
		if (seconds > MAX_SECONDS) {
			secStr = '00';
			seconds = 0;
			++mins;
		}
		if (mins < MIN_TWO_DIGIT_VALUE) {
			minStr = '0' + mins;
		}
		if (mins >= MIN_TWO_DIGIT_VALUE) {
			minStr = mins;
		}
		if (mins >= MAX_GAME_MINUTES && seconds >= MAX_SECONDS) {
			this.stopTimer();
		}
		return { secStr, minStr, seconds, mins };
	}

	getUserData() {
		const prevUserData = JSON.parse(localStorage.getItem('userData'));
		return {
			...prevUserData,
			clicksToWin: this.numberOfClicksToWin,
			image: this.image,
			level: this.level,
			time: { ...this.time },
			timeStr: this.timeStr,
			totalScore: this.totalScore,
		};
	}

	modalButtonListener(btnId, proceedFn, proceedFnArgs = []) {
		const btn = document.getElementById(btnId);
		const proceed = proceedFn.bind(this);
		if (btn) {
			btn.addEventListener('click', () => {
				this.closeModalWindow();
				proceed(...proceedFnArgs);
			});
		}
	}

	monsterListener(currentScore, totalScore, monster, timer, monsterHealth) {
		this.clicksCounter++;
		this.totalScore++;
		currentScore.innerText = this.clicksCounter;
		totalScore.innerText = this.totalScore;
		this.setMonsterHealth(monsterHealth);

		if (this.clicksCounter === this.numberOfClicksToWin && this.level === 5) {
			this.level = 5;
			this.gameOver(monster, timer);
			return;
		}

		if (this.clicksCounter >= this.numberOfClicksToWin && this.level <= 5) {
			this.image += 1;
			this.level += 1;
			this.numberOfClicksToWin *= 2;

			this.nextLevel(monster);
		}
	}

	nextLevel(monster) {
		const user = this.getUserData();
		this.updateUserDataInLS(user);
		this.clicksCounter = 0;
		this.image = user.image;
		this.totalScore = user.totalScore;
		this.level = user.level;
		this.numberOfClicksToWin = user.clicksToWin;
		this.timeStr = user.timeStr;

		this.stopTimer();
		this.removeMonster(monster);
		this.renderModalWindow(
			user,
			nextLevelModalTemplate,
			'Next level',
			'next-level',
			false
		);

		this.modalButtonListener('next-level', this.runGame, [
			'game-layout',
			clickerTemplate,
			user.nick,
			auth,
		]);
	}

	removeMonster(monster) {
		setTimeout(() => {
			monster.style.display = 'none';
		}, 1000);
	}

	renderMonster() {
		const monsterContainer = document.querySelector('.monster');
		monsterContainer.style.backgroundImage =
			'url(./assets/monsters/' + this.image + '.png)';
	}

	resetUserData() {
		const currentUser = this.getUserData();
		const initialUser = {
			...currentUser,
			clicksToWin: BASIC_NUMBER_OF_CLICKS_TO_WIN,
			image: INITIAL_IMAGE,
			level: INITIAL_LEVEL,
			time: {
				mins: 0,
				seconds: 0,
			},
			timeStr: '',
			totalScore: 0,
		};
		this.updateUserDataInLS(initialUser);
	}

	runGame(className, templateFn, nick, auth) {
		this.renderLayout(className, templateFn, auth);
		this.renderMonster();
		this.setUserNick(nick);
		this.gameListeners();
		this.startTimer();
	}

	setMonsterHealth(monsterHealth) {
		monsterHealth.style.width =
			100 -
			Math.round((this.clicksCounter * 100) / this.numberOfClicksToWin) +
			'%';
	}

	setUserNick(name) {
		const userNick = document.getElementById('nickname');
		userNick.innerText = name;
	}

	startNewGame() {
		this.resetUserData();
		this.stopTimer();
		window.location.reload();
	}

	startTimer() {
		const timer = document.getElementById('time');

		this.timerId = setInterval(() => {
			let { secStr, minStr, seconds, mins } = this.getHumanReadableTime();
			++seconds;

			this.timeStr = minStr + ':' + secStr;
			timer.innerText = this.timeStr;
			this.time.seconds = seconds;
			this.time.mins = mins;
		}, 1000);
	}

	stopTimer() {
		if (this.timerId) {
			clearInterval(this.timerId);
		}
	}

	updateUserDataInLS(user) {
		localStorage.setItem('userData', JSON.stringify(user));
	}
}
