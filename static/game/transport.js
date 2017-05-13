import Mediator from './mediator.js'
import Authorize from '../services/authorize.js'
import Events from './events.js'

export default
class WebSocketService {
	constructor() {
		this.mediator = new Mediator();
		this.authorize = new Authorize();
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
			const object = this.parseMessage(event.data);

			console.log(object);

			this.parseObject(object);
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
		if (message.content) {
			message.content = JSON.stringify(message.content);
		}
		message = JSON.stringify(message);
		this.ws.send(message);
	}

	parseMessage(message) {
		message = JSON.parse(message);
		if (message.content) {
			message.content = JSON.parse(message.content);
		}
		return message;
	}

	parseObject(object) {
		if (object.type === 'techpark.game.base.ServerMazeSnap') {
			const obj = {};
			obj.map = object.content.map;
			if (object.content.user === this.authorize.user.username) {
				obj.myself = true;
			} else {
				obj.myself = false;
			}
			this.mediator.emit(Events.MULTIPLAYER_NEW_MAP_SNAPSHOT, obj);
		}
	}
}