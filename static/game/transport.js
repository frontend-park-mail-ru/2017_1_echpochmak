export default
class WebSocketService {
	constructor() {

	}

	open() {
		this.ws = new WebSocket('wss://gem-td-back.herokuapp.com/game');

		this.ws.onopen = () => { 
			console.log('open');
			this.sendObject({ 
				type: 'techpark.game.events.JoinGame',
				content: {}
			});
		};

		this.ws.onerror = (error) => {
			console.log('error ', error.message);
		};

		this.ws.onclose = (event) => {
			console.log('close');
			console.log('code: ', event.code);
			console.log('reason: ', event.reason);
		};

		this.ws.onmessage = (event) => {
			console.log(this.parseMessage(event.data));
		};
	}

	sendNewTower(coord) {
		this.sendObject({
			type: 'techpark.game.base.ClientSnap',
			content: {
				square: {
					x: coord.x,
					y: coord.y
				},
			}
		});
	}

	sendObject(message) {
		message.content = JSON.stringify(message.content);
		message = JSON.stringify(message);
		this.ws.send(message);
	}

	parseMessage(message) {
		message = JSON.parse(message);
		message.content = JSON.parse(message.content);
		return message;
	}

	parseObject(object) {
		if (object.type === 'techpark.game.base.ServerMazeSnap') {
			
		}
	}
}