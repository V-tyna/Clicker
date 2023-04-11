class ClickerGame extends Rendering {
	constructor(
		initialTotalScore,
		numberOfClicksToWin,
		level,
		timeObj,
		img,
		className,
		templateFn,
		user
	) {
		super(className, templateFn, user);
		this.clicksCounter = 0;
		this.image = img;
		this.level = level;
		this.time = timeObj;
		this.numberOfClicksToWin = numberOfClicksToWin;
		this.totalScore = initialTotalScore;
		this.timerId = null;
	}

	gameListeners() {
		const clicksToWin = document.getElementById('clicks-number');
		const currentScore = document.getElementById('current-score');
		const level = document.getElementById('level');
		const monster = document.querySelector('.monster');
		const timer = document.getElementById('time');
		const totalScore = document.getElementById('total-score');

		if (this.level > 5) {
			this.gameOver(monster, timer);
		}

		if (monster) {
			clicksToWin.innerText = this.numberOfClicksToWin;
			currentScore.innerText = 0;
			level.innerText = this.level;
			totalScore.innerText = this.totalScore;

			monster.addEventListener(
				'click',
				this.monsterListener.bind(this, currentScore, totalScore)
			);
		}
	}

	gameOver(monsterElem, timerElem) {
		document.querySelector('.monster-container').removeChild(monsterElem);
		document.querySelector('.timer-container').removeChild(timerElem);

		const startBtn = document.getElementById('start-new-game');

		this.stopTimer();
		const user = this.getUserData();
		this.renderModalWindow(user);

		if (startBtn) {
			startBtn.addEventListener('click', () => {
				this.closeModalWindow();
				this.startNewGame();
			});
		}
	}

	getUserData() {
		const prevUserData = JSON.parse(localStorage.getItem('userData'));
		return {
			...prevUserData,
			clicksToWin: this.numberOfClicksToWin,
			image: this.image,
			level: this.level,
			time: { ...this.time },
			totalScore: this.totalScore,
		};
	}

	monsterListener(currentScore, totalScore) {
		this.clicksCounter++;
		this.totalScore++;

		if (this.clicksCounter >= this.numberOfClicksToWin) {
			this.image += 1;
			this.level += 1;
			this.numberOfClicksToWin *= 2;
			this.nextLevel();
		} else {
			currentScore.innerText = this.clicksCounter;
			totalScore.innerText = this.totalScore;
		}
	}

	nextLevel() {
		const user = this.getUserData();
		this.updateUserDataInLS(user);
		this.initialTotalScore = user.totalScore;
		this.level = user.level;
		this.image = user.image;
		this.clicksCounter = 0;
		this.numberOfClicksToWin = user.clicksToWin;

		this.removeLayout();
		this.stopTimer();
		this.runGame('game-layout', clickerTemplate, user.nick);
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
			clicksToWin: 3,
			image: 1,
			level: 1,
			time: {
				mins: 0,
				seconds: 0,
			},
			totalScore: 0,
		};
		this.updateUserDataInLS(initialUser);
	}

	runGame(className, templateFn, nick) {
		this.renderLayout(className, templateFn);
		this.renderMonster();
		this.setUserNick(nick);
		this.gameListeners();
		this.startTimer();
	}

	setUserNick(name) {
		const userNick = document.getElementById('nickname');
		userNick.innerText = name;
	}

	startNewGame() {
		console.log('new game');
		const currentUser = this.getUserData();

		this.resetUserData();
		this.removeLayout();
		this.stopTimer();
		this.runGame('game-layout', clickerTemplate, currentUser.nick);
		window.location.reload();
	}

	startTimer() {
		const timer = document.getElementById('time');
		if (timer) {
			let seconds = this.time.seconds;
			let mins = this.time.mins;
			let secStr = '00';
			let minStr = '00';
			this.timerId = setInterval(() => {
				++seconds;
				secStr = seconds;
				if (seconds < 10) {
					secStr = '0' + seconds;
				}
				if (seconds > 59) {
					secStr = '00';
					seconds = 0;
					++mins;
				}
				if (mins < 10) {
					minStr = '0' + mins;
				}
				if (mins >= 10) {
					minStr = mins;
				}
				if (mins >= 59 && seconds >= 59) {
					this.stopTimer();
				}
				timer.innerText = minStr + ':' + secStr;
				this.time.seconds = seconds;
				this.time.mins = mins;
			}, 1000);
		}
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
