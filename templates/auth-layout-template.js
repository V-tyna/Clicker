const authTemplate = () => {
	return `
		<div class="auth-form-container">
			<h2>Create account</h2>
			<form class="create-user-form">
				<div class="input-area">
					<label for="nickname"> Nickname: </label>
					<input type="text" id="nickname" placeholder="Enter your nickname..." />
				</div>
				<div class="input-area">
					<label for="userName"> User name: </label>
					<input type="text" id="userName" placeholder="Enter your name..." />
				</div>
				<div class="input-area">
					<label for="email"> Email: </label>
					<input type="text" id="email" placeholder="Enter your email..." />
				</div>
				<button type="submit" class="btn create-user-btn">Crete user</button>
			</form>
		</div>
	`;
};
