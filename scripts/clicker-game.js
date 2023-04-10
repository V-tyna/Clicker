class ClickerGame extends Rendering {
	constructor(
		initialTotalScore,
		numberOfClicksToWin,
		level,
		timeObj,
		className,
		templateFn
	) {
		super(className, templateFn);
		this.image = 1;
		this.level = level;
		this.time = timeObj;
		this.numberOfClicksToWin = numberOfClicksToWin;
		this.totalScore = initialTotalScore;
		this.timerId = null;
	}

	gameListeners() {
		let clicksCounter = 0;
		if (this.level > 5) {
			console.log('Congrats, you won!');
			// TODO render win message and remove monster container and stop time
			return;
		}
		const monster = document.querySelector('.monster');
		const counterView = document.getElementById('counter-view');
		const totalScore = document.getElementById('total-score');
		const clicksNumber = document.getElementById('clicks-number');
		const level = document.getElementById('level');

		if (monster) {
			totalScore.innerText = this.totalScore;
			counterView.innerText = clicksCounter;
			clicksNumber.innerText = this.numberOfClicksToWin;
			level.innerText = this.image;
			console.log(
				'Next level',
				'clicks to win',
				this.numberOfClicksToWin,
				this.image
			);

			monster.addEventListener('click', () => {
				clicksCounter++;
				this.totalScore++;

				if (clicksCounter >= this.numberOfClicksToWin) {
					this.numberOfClicksToWin *= 2;
					this.image += 1;
					this.level += 1;

					this.nextLevel();
				} else {
					totalScore.innerText = this.totalScore;
					counterView.innerText = clicksCounter;
				}
			});
		}
	}

	renderMonster() {
		const monsterContainer = document.querySelector('.monster');
		monsterContainer.style.backgroundImage =
			'url(./assets/monsters/' + this.image + '.png)';
	}

	getUserData() {
		const prevUserData = JSON.parse(localStorage.getItem('userData'));
		return {
			...prevUserData,
			clicksToWin: this.numberOfClicksToWin,
			level: this.level,
			time: { ...this.time },
			totalScore: this.totalScore,
		};
	}

	nextLevel() {
		const user = this.getUserData();
		this.resetUserDataInLS(user);
		this.initialTotalScore = user.totalScore;
		this.level = user.level;
		this.numberOfClicksToWin = user.clicksToWin;

		this.removeLayout();
		this.renderLayout('game-layout', clickerTemplate, this.numberOfClicksToWin);
		this.renderMonster();
		this.setUserNick(user.nick);
		this.gameListeners();
		this.startTimer();
	}

	resetUserDataInLS(user) {
		localStorage.setItem('userData', JSON.stringify(user));
	}

	startTimer() {
		let seconds = this.time.seconds;
		let mins = this.time.mins;
		let secStr = '00';
		let minStr = '00';
		const timer = document.getElementById('time');
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

	stopTimer() {
		if (this.timerId) {
			clearInterval(this.timerId);
		}
	}

	setUserNick(name) {
		const userNick = document.getElementById('nickname');
		userNick.innerText = name;
	}
}
