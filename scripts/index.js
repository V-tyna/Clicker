const auth = new Authorization();

const isUser = auth.user;
console.log(isUser);

if (!isUser) {
	auth.renderLayout('auth-layout', authTemplate);
	auth.changeBackgroundLoop('main-backgrounds', '.avif');
	auth.authListeners();
} else {
	const { nick, totalScore, clicksToWin, level, time } = isUser;
	const clickerGame = new ClickerGame(totalScore, clicksToWin, level, time);
	console.log('GAME: ', clickerGame);
	clickerGame.changeBackgroundOnce('game-backgrounds', 1, '.avif');
	clickerGame.renderLayout('game-layout', clickerTemplate);
	clickerGame.setUserNick(nick);
	clickerGame.renderMonster();
	clickerGame.gameListeners();
	clickerGame.startTimer();
}
