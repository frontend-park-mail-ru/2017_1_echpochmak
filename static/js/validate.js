'use strict';

(function () = {

	const Validation = {

		validate_registration: () => {
			const regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/;

			const login = registration_form.querySelector('.login-input input');
			const login_error = registration_form.querySelector('.login-input .error-message');
			const email = registration_form.querySelector('.email-input input');
			const email_error = registration_form.querySelector('.email-input .error-message');
			const pass = registration_form.querySelectorAll('.password-input input')[0];
			const pass_error = registration_form.querySelectorAll('.password-input .error-message')[0];
			const pass_repeat = registration_form.querySelectorAll('.password-input input')[1];
			const pass_repeat_error = registration_form.querySelectorAll('.password-input .error-message')[1];	

			login_error.textContent = "";
			email_error.textContent = "";
			pass_error.textContent = "";
			pass_repeat_error.textContent = "";

			let result = true;

			if (!regexp.test(email.value)) {
				email_error.textContent = "Введенный вами E-mail некорректен";
				result = false;
			} 
			if (login.value.length > 15 || login.value.length < 5) {
				login_error.textContent = "Ваш логин должен содержать от 5 до 15 символов";
				result = false;
			} 
			if (pass.value.length < 5) {
				pass_error.textContent = "Ваш пароль должен содержать не менее 5 символов";
				result = false;
			}
			if (pass.value != pass_repeat.value) {
				pass_repeat_error.textContent = "Пароли не совпадают";
				result = false;
			} 

			if (!result) {
				pass.value = pass_repeat.value = "";
			}
			
			return result;
		},

		validate_login: () => {
			const input = login_form.querySelector('.login-input');
			
			return true;
		}
	};

	window.Validation = Validation;

})();