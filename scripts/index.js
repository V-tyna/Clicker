const auth = new Authorization();

const isUserData = auth.getDataFromLocalStorage();

if (!isUserData) {
	auth.renderLayout('auth-layout', authTemplate);
	auth.authListeners();
} else {
	const clickerGame = new ClickerGame(0);
	clickerGame.renderLayout('game-layout', clickerTemplate);
	clickerGame.gameEventListeners();
}

changeMainBackground();
