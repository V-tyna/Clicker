const gameOverModalTemplate = (user) => {
	return `
    <h1>Congrats, you win!</h1>
    <div class="modal-text-str">
      <h3>User: &nbsp;&nbsp;</h3><p>${user.nick}</p>
    </div>
    <div class="modal-text-str">
      <h3>Total score: &nbsp;&nbsp;</h3><p>${user.totalScore}</p>
    </div>
    <div class="modal-text-str">
      <h3>Level: &nbsp;&nbsp;</h3><p>${user.level - 1}</p>
    </div>
    <div class="modal-text-str">
      <h3>Time: &nbsp;&nbsp;</h3><p> minutes - ${user.time.mins}, seconds - ${
		user.time.seconds
	}</p>
    </div>
  `;
};
