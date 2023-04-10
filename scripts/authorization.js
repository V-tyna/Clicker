class Authorization extends Rendering {
	constructor(className, templateFn) {
		super(className, templateFn);
		this.user = {
			score: 0,
		};
	}

	authListeners() {
		const createUserForm = document.querySelector('.create-user-form');

		if (createUserForm) {
			createUserForm.addEventListener('submit', (e) => {
				e.preventDefault();

				let nickname = document.getElementById('nickname');
				let userName = document.getElementById('userName');
				let email = document.getElementById('email');

				this.user.name = userName.value;
				this.user.nick = nickname.value;
				this.user.email = email.value;

				nickname.innerText = '';
				userName.innerText = '';
				email.innerText = '';

				this.setDataToLocalStorage();
				window.location.reload();
			});
		}
	}

	setDataToLocalStorage() {
		localStorage.setItem('userData', JSON.stringify(this.user));
	}

	getDataFromLocalStorage() {
		const userData = localStorage.getItem('userData');
		return userData && JSON.parse(userData);
	}
}
