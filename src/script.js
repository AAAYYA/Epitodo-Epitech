const input = document.querySelector('input');
const ul = document.querySelector('ul');

input.addEventListener('keypress', function(event) {
	if (event.keyCode === 13 && input.value !== '') {
		addTask(input.value);
		input.value = '';
	}
});

function addTask(task) {
	const li = document.createElement('li');
	const checkbox = document.createElement('input');
	const span = document.createElement('span');
	const button = document.createElement('button');
	
	checkbox.type = 'checkbox';
	span.textContent = task;
	button.textContent = 'Delete';

	button.addEventListener('click', function() {
		li.remove();
	});
	
	li.appendChild(checkbox);
	li.appendChild(span);
	li.appendChild(button);
	
	ul.appendChild(li);
}
