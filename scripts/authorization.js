class Authorization extends Rendering {
	constructor(className, templateFn) {
		super(className, templateFn);
		this.getUser();
	}

	authListeners() {
		const createUserForm = document.querySelector('.create-user-form');

		if (createUserForm) {
			createUserForm.addEventListener('submit', (e) => {
				e.preventDefault();

				let nickname = document.getElementById('nickname');
				let userName = document.getElementById('userName');
				let email = document.getElementById('email');

				const isNotEmpty = this.validateInputs([
					email.value,
					userName.value,
					nickname.value,
				]);

				const isEmailValid = this.validateEmail(email.value);

				if (isNotEmpty && isEmailValid) {
					this.user = new User(email.value, userName.value, nickname.value);
					this.user.setDataToLocalStorage();

					nickname.innerText = '';
					userName.innerText = '';
					email.innerText = '';

					window.location.reload();
				} else {
					const errorMsg = !isNotEmpty
						? 'Please fill all fields and try again.'
						: 'Email is not valid.';
					this.showErrorMessage(
						createUserForm,
						errorMsg,
						'#E86A33',
						'error-message'
					);
				}
			});
		}
	}

	getUser() {
		this.user = localStorage.getItem('userData')
			? JSON.parse(localStorage.getItem('userData'))
			: null;
	}

	logoutListener() {
		const logoutBtn = document.querySelector('.logout-btn');
		logoutBtn.addEventListener('click', () => {
			localStorage.removeItem('userData');
			window.location.reload();
		});
	}

	validateEmail(email) {
		const validExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		return email.match(validExp);
	}

	validateInputs(inputs) {
		return inputs.every((input) => !!input.trim() === true);
	}
}
