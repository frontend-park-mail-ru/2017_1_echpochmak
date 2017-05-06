import SingleStrategy from './strategies/strategy.js'
import Mediator from './mediator.js'
import Events from './events.js'
import UserService from '../services/userservice.js'

export default
class GameManager {
	constructor(strategy) {
		this.mediator = new Mediator();
		this.strategy = strategy;

		this.mediator.subscribe(Events.PLAY_NEW_GAME, this.start.bind(this));
		this.mediator.subscribe(Events.PLAY_AGAIN, this.start.bind(this));
		this.mediator.subscribe(Events.GAME_FINISHED, this.end.bind(this));
		this.mediator.subscribe(Events.QUIT_CONFIRMED, this.end.bind(this));
	}

	gameLoop() {
		this.strategy.gameStep();
		if (this.play) {
			this.requestID = requestAnimationFrame(this.gameLoop.bind(this));
		}
	}

	start() {
		// this.strategy = new SingleStrategy();
		this.strategy.init();
		this.play = true;
		this.requestID = requestAnimationFrame(this.gameLoop.bind(this));
	}

	end(args) {
		this.play = false;
		const userService = new UserService;
		userService.setUserScore(args.score, () => {});
	}
}