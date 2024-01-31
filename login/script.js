const form = document.querySelector('form');

form.addEventListener('submit', function(event) {
	event.preventDefault();
	const username = document.querySelector('#username').value;
	const password = document.querySelector('#password').value;
	// Add your login validation logic here
});
