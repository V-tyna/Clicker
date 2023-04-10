const clickerTemplate = () => {
	return `
    <div class="game-header">
      <p>Current score is &nbsp;&nbsp; - &nbsp;&nbsp;<span id="counter-view"></span>&nbsp;&nbsp;</p>
      <p>Click on monster &nbsp;&nbsp;<span id="clicks-number"></span>&nbsp;&nbsp; times to kill.</p>
    </div>
		<div class="game-container">
      <div class="monster-container">
        <div class="monster"></div>
      </div>
		</div>
    <div class="game-footer">
      <p>User: &nbsp;&nbsp;<span id="nickname"></span></p>
      <p>Total score: &nbsp;&nbsp;<span id="total-score"></span></p>
      <p>Level: &nbsp;&nbsp;<span id="level"></span></p>
      <p>Time: &nbsp;&nbsp;<span id="time"></span></p>
    </div>
	`;
};
