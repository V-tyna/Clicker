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

				const isValid = this.validateInputs([
					email.value,
					userName.value,
					nickname.value,
				]);

				if (isValid) {
					this.user = new User(email.value, userName.value, nickname.value);
					this.user.setDataToLocalStorage();

					nickname.innerText = '';
					userName.innerText = '';
					email.innerText = '';

					window.location.reload();
				} else {
					this.showErrorMessage(
						createUserForm,
						'Please fill all fields and try again.',
						'#E86A33'
					);
				}
			});
		}
	}

	showErrorMessage(elem, msg, color) {
		const errorMessage = document.createElement('p');
		errorMessage.innerText = msg;
		errorMessage.style.color = color;
		elem.appendChild(errorMessage);
	}

	validateInputs(inputs) {
		return inputs.every((input) => !!input.trim() === true);
	}
}
