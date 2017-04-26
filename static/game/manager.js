import SingleStrategy from './strategy.js'
import Mediator from './mediator.js'

export default
class GameManager {
	constructor(strategy) {
		this.mediator = new Mediator();

		this.mediator.subscribe('GAME START', this.start.bind(this));
		this.mediator.subscribe('GAME END', this.end.bind(this));
	}

	gameLoop() {
		this.strategy.gameStep();
		if (this.play) {
			this.requestID = requestAnimationFrame(this.gameLoop.bind(this));
		}
	}

	start() {
		this.strategy = new SingleStrategy();
		this.play = true;
		this.requestID = requestAnimationFrame(this.gameLoop.bind(this));
	}

	end() {
		this.play = false;
	}
}