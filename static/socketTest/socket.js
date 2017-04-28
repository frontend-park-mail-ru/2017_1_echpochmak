const open_button = document.querySelector('.buttons__open');
const send_button = document.querySelector('.buttons__send');
const url = document.querySelector('.url');
const input = document.querySelector('.send__input');
const message = document.querySelector('.message__json');

let ws = null;

open_button.addEventListener('click', () => {
	ws = new WebSocket(url.value);

	ws.onopen = () => {
		input.disabled = false;
		send_button.disabled = false;
	}

	ws.onclose = () => {
		input.disabled = true;
		send_button.disabled = true;	
	}

	ws.onmessage = (event) => {
		message.innerHTML = event.data;
	}
})

send_button.addEventListener('click', () => {
	ws.send(input.value);
})