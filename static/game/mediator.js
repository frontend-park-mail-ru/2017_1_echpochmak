(function () {

	class Mediator {
		constructor() {
			if (Mediator.__instance) {
				return Mediator.__instance;
			}

			this.messages = {};

			Mediator.__instance = this;
		}

		emit(event, args) {
			if (event in this.messages) {
				for (const callback of this.messages[event]) {
					callback(args);
				}
				return true;
			} else {
				return false;
			}
		}

		subscribe(event, callback) {
			if (event in this.messages) {
				this.messages[event].push(callback);
			} else {
				this.messages[event] = [callback];
			}
			return true;
		}
	}

	window.Mediator = Mediator;

})();
