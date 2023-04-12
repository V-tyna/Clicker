const nextLevelModalTemplate = (user) => {
	return `
    <h1>Level ${user.level - 1} completed.</h1>
    <div class="modal-text-str">
      <h3>User: &nbsp;&nbsp;</h3><p>${user.nick}</p>
    </div>
    <div class="modal-text-str">
      <h3>Total score: &nbsp;&nbsp;</h3><p>${user.totalScore}</p>
    </div>
    <div class="modal-text-str">
      <h3>Next Level: &nbsp;&nbsp;</h3><p>${user.level}</p>
    </div>
    <div class="modal-text-str">
      <h3>Health of next monster: &nbsp;&nbsp;</h3><p>${user.clicksToWin}</p>
    </div>
    <div class="proceed">
      <h4>Ready to proceed? Press button:</h4>
    </div>
    <div class="modal-btn-area ">
      <button id="next-level" class="btn"></button>
    </div>
`;
};
