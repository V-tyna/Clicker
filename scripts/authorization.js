class Authorization extends Rendering {
	constructor(className, templateFn) {
		super(className, templateFn);
		this.user = localStorage.getItem('userData')
			? JSON.parse(localStorage.getItem('userData'))
			: null;
	}

	authListeners() {
		const createUserForm = document.querySelector('.create-user-form');

		if (createUserForm) {
			createUserForm.addEventListener('submit', (e) => {
				e.preventDefault();

				let nickname = document.getElementById('nickname');
				let userName = document.getElementById('userName');
				let email = document.getElementById('email');

				this.user = new User(email.value, userName.value, nickname.value);
				this.user.setDataToLocalStorage();

				nickname.innerText = '';
				userName.innerText = '';
				email.innerText = '';

				window.location.reload();
			});
		}
	}
}
