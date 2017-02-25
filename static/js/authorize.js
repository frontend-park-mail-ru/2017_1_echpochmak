let is_login = 0;

signup_form.addEventListener('click', function() {
	registration.classList.add('hidden');
	divback.classList.add('hidden');
	menu.classList.remove('hidden');
	divbut2.classList.remove('hidden');
	divtxt.classList.remove('hidden');
	divtxt.children[1].textContent = '';
	is_login = 1;
});

login_form.addEventListener('click', function() {
	login.classList.add('hidden');
	divback.classList.add('hidden');
	menu.classList.remove('hidden');
	divbut2.classList.remove('hidden');
	divtxt.classList.remove('hidden');
	divtxt.children[1].textContent = '';
	is_login = 1;
});

exit.addEventListener('click', function() {
	divbut2.classList.add('hidden');
	divbut.classList.remove('hidden');
	divtxt.children[1].textContent = 'Гость';
	is_login = 0;
});