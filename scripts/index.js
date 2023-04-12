const auth = new Authorization();

const isUser = auth.user;

if (!isUser) {
	auth.renderLayout('auth-layout', authTemplate);
	auth.changeBackgroundLoop('main-backgrounds', '.avif');
	auth.authListeners();
} else {
	const { nick, totalScore, clicksToWin, image, level, time, timeStr } = isUser;
	const clickerGame = new ClickerGame(
		totalScore,
		clicksToWin,
		level,
		time,
		timeStr,
		image
	);
	clickerGame.changeBackgroundOnce('game-backgrounds', INITIAL_IMAGE, '.avif');
	clickerGame.runGame('game-layout', clickerTemplate, nick, auth);
}
