const Setting = {
	mapSize: 10,
	// fieldSize: window.innerHeight * 0.9 / Setting.mapSize,
	mapX: window.innerWidth * 0.2,	
	mapY: window.innerHeight * 0.05,
	variantRadius: 10,
	bulletStep: 10,

	circleRed: {
		name: 'circleRed',
		color: '#FF0000',
		power: 10,
	},

	circleBlue: {
		name: 'circleBlue',
		color: '#00FFFF',
		power: 15
	},

	circleGreen: {
		name: 'circleGreen',
		color: '#00FF00',
		power: 20
	},

	circleYellow: {
		name: 'circleYellow',
		color: '#FFFF00',
		power: 25
	},

	circlePink: {
		name: 'circlePink',
		color: '#FF00FF',
		power: 30
	},

	circleSad: {
		name: 'circleSad',
		color: '#0000FF',
		power: 35
	},

	triangl: {
		name: 'triangl',
		size: 30,
		color: '#00FF00',
		healh: 100,
	},

	stone: {
		name: 'stone',
		color: 'black',
	},

	// circles: [
	// 	this.circleRed, 
	// 	this.circleGreen, 
	// 	this.circleYellow, 
	// 	this.circleBlue, 
	// 	this.circleSad, 
	// 	this.circlePink
	// ],

	pentagonRPS: {
		name: 'pentagonRPS',
		power: 70,
		colors: ['#FF0000', '#FF00FF', '#0000FF'],
	},

	pentagonSBG: {
		name: 'pentagonSBG',
		power: 80,
		colors: ['#0000FF', '#00FFFF', '#00FF00'],
	},

	pentagonGYR: {
		name: 'pentagonGYR',
		power: 70,
		colors: ['#00FF00', '#FFFF00', '#FF0000'],
	},

	// pentagons: [
	// 	this.pentagonRPS, 
	// 	this.pentagonSBG, 
	// 	this.pentagonGYR
	// ],

	star: {
		name: 'star',
		colors: ['#0000FF', '#00FF00', '#FF0000'],
		power: 100
	}
};

Setting.fieldSize = window.innerHeight * 0.9 / Setting.mapSize;

Setting.circles = [
	Setting.circleRed, 
	Setting.circleGreen, 
	Setting.circleYellow, 
	Setting.circleBlue, 
	Setting.circleSad, 
	Setting.circlePink
];

Setting.pentagons = [
	Setting.pentagonRPS, 
	Setting.pentagonSBG, 
	Setting.pentagonGYR
];

export default Setting;