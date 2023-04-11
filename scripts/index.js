const auth = new Authorization();

const isUser = auth.user;
console.log(isUser);

if (!isUser) {
	auth.renderLayout('auth-layout', authTemplate);
	auth.changeBackgroundLoop('main-backgrounds', '.avif');
	auth.authListeners();
} else {
	const { nick, totalScore, clicksToWin, image, level, time } = isUser;
	const clickerGame = new ClickerGame(
		totalScore,
		clicksToWin,
		level,
		time,
		image
	);
	clickerGame.changeBackgroundOnce('game-backgrounds', 1, '.avif');
	clickerGame.runGame('game-layout', clickerTemplate, nick);
}
