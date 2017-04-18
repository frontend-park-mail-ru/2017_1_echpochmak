export default 
class Settings {
	constructor() {

		if (Settings.__instance) {
			return Settings.__instance;
		}

		this.gameFieldId = 'game-field';
		this.hintsFieldId = 'hints-field';

		this.start = [0,0];
		this.finish = [9,9];
		this.checkpoints = [[0,9], [9,0]];

		this.mapSize = 10;
		this.mapX = window.innerWidth * 0.2;	
		this.mapY = window.innerHeight * 0.05;
		this.variantRadius = 10;
		this.bulletStep = 20;
		this.monsterStep = 10;

		this.circleRed = {
			name: 'circleRed',
			color: '#FF0000',
			power: 10,
		};

		this.circleBlue = {
			name: 'circleBlue',
			color: '#00FFFF',
			power: 15
		};

		this.circleGreen = {
			name: 'circleGreen',
			color: '#00FF00',
			power: 20
		};

		this.circleYellow = {
			name: 'circleYellow',
			color: '#FFFF00',
			power: 25
		};

		this.circlePink = {
			name: 'circlePink',
			color: '#FF00FF',
			power: 30
		};

		this.circleSad = {
			name: 'circleSad',
			color: '#0000FF',
			power: 35
		};

		this.triangl = {
			name: 'triangl',
			size: 30,
			color: '#00FF00',
			healh: 100,
		};

		this.stone = {
			name: 'stone',
			color: 'black',
		};

		this.pentagonRPS = {
			name: 'pentagonRPS',
			power: 70,
			colors: ['#FF0000', '#FF00FF', '#0000FF'],
		};

		this.pentagonSBG = {
			name: 'pentagonSBG',
			power: 80,
			colors: ['#0000FF', '#00FFFF', '#00FF00'],
		};

		this.pentagonGYR = {
			name: 'pentagonGYR',
			power: 70,
			colors: ['#00FF00', '#FFFF00', '#FF0000'],
		};

		this.star = {
			name: 'star',
			colors: ['#0000FF', '#00FF00', '#FF0000'],
			power: 100
		};

		this.circles = [
			this.circleRed, 
			this.circleGreen, 
			this.circleYellow, 
			this.circleBlue, 
			this.circleSad, 
			this.circlePink
		];

		this.pentagons = [
			this.pentagonRPS, 
			this.pentagonSBG, 
			this.pentagonGYR
		];

		this.gameFieldElement = document.getElementById(this.gameFieldId);
		this.hintsFieldElement = document.getElementById(this.hintsFieldId);

		// this.fieldSize = window.innerHeight * 0.9 / this.mapSize;
		this.fieldSize = this.gameFieldElement.offsetHeight * 0.9 / this.mapSize;

		Settings.__instance = this;
	}
}

// const Settings = {

// 	gameFieldId: 'game-field',
// 	hintsFieldId: 'hints-field',

// 	start: [0,0],
// 	finish: [9,9],
// 	checkpoints: [[0, 9], [9,0]],

// 	mapSize: 10,
// 	mapX: window.innerWidth * 0.2,	
// 	mapY: window.innerHeight * 0.05,
// 	variantRadius: 10,
// 	bulletStep: 20,
// 	monsterStep: 10,

// 	circleRed: {
// 		name: 'circleRed',
// 		color: '#FF0000',
// 		power: 10,
// 	},

// 	circleBlue: {
// 		name: 'circleBlue',
// 		color: '#00FFFF',
// 		power: 15
// 	},

// 	circleGreen: {
// 		name: 'circleGreen',
// 		color: '#00FF00',
// 		power: 20
// 	},

// 	circleYellow: {
// 		name: 'circleYellow',
// 		color: '#FFFF00',
// 		power: 25
// 	},

// 	circlePink: {
// 		name: 'circlePink',
// 		color: '#FF00FF',
// 		power: 30
// 	},

// 	circleSad: {
// 		name: 'circleSad',
// 		color: '#0000FF',
// 		power: 35
// 	},

// 	triangl: {
// 		name: 'triangl',
// 		size: 30,
// 		color: '#00FF00',
// 		healh: 100,
// 	},

// 	stone: {
// 		name: 'stone',
// 		color: 'black',
// 	},

// 	pentagonRPS: {
// 		name: 'pentagonRPS',
// 		power: 70,
// 		colors: ['#FF0000', '#FF00FF', '#0000FF'],
// 	},

// 	pentagonSBG: {
// 		name: 'pentagonSBG',
// 		power: 80,
// 		colors: ['#0000FF', '#00FFFF', '#00FF00'],
// 	},

// 	pentagonGYR: {
// 		name: 'pentagonGYR',
// 		power: 70,
// 		colors: ['#00FF00', '#FFFF00', '#FF0000'],
// 	},

// 	star: {
// 		name: 'star',
// 		colors: ['#0000FF', '#00FF00', '#FF0000'],
// 		power: 100
// 	}
// };

// // Settings.gameFieldElement = document.getElementById(Settings.gameFieldId);
// // Settings.hintsFieldElement = document.getElementById(Settings.hintsFieldId);

// // Settings.fieldSize = window.innerHeight * 0.9 / Settings.mapSize;
// // Settings.fieldSize = Settings.gameFieldElement.offsetHeight * 0.9 / Settings.mapSize;

// Settings.circles = [
// 	Settings.circleRed, 
// 	Settings.circleGreen, 
// 	Settings.circleYellow, 
// 	Settings.circleBlue, 
// 	Settings.circleSad, 
// 	Settings.circlePink
// ];

// Settings.pentagons = [
// 	Settings.pentagonRPS, 
// 	Settings.pentagonSBG, 
// 	Settings.pentagonGYR
// ];

// export default Settings;