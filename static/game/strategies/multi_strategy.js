export default
class MultiplayerStrategy {
	constructor() {

	}

	init() {

		console.log('multi_strategy');

		this.timer = 0;

		this.ws = new WebSocket('wss://gem-td-back.herokuapp.com/game');

		this.ws.onopen = () => {
			console.log('open');
		};
		this.ws.onerror = (error) => {
			console.log('error ' + error.message);
		};
		this.ws.onclose = (event) => {
			console.log('close');
			console.log('code: ' + event.code);
			console.log('reason: ' + event.reason);
		};
		this.ws.onmessage = (event) => {
			const data = event.data;
			const message = JSON.parse(data);
	 
			console.log('message: ' + message.text)
		};
	}

	gameStep() {
		this.timer++;
		if (this.timer > 100) {
			this.ws.send(JSON.stringify({
				'techpark.game.base.ClientSnap': {
					square: {
						x: '2',
						y: '2'
					}
				},
			}));
			this.timer = 0;
		}
	}
}