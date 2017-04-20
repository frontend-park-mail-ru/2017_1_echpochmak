const Setting = {
	mapSize: 10,
	// fieldSize: window.innerHeight * 0.9 / Setting.mapSize,
	mapX: window.innerWidth * 0.2,	
	mapY: window.innerHeight * 0.05,
	variantRadius: 10,
	bulletStep: 20,
	monsterStep: 10,
	numberMonstersInWave: 20,
	bulletRadius: 5,

	circleRed: {
		name: 'circleRed',
		color: '#FF0000',
		power: 10,
		radiusFight: 400,
	},

	circleBlue: {
		name: 'circleBlue',
		color: '#00FFFF',
		power: 15,
		radiusFight: 400,
	},

	circleGreen: {
		name: 'circleGreen',
		color: '#00FF00',
		power: 20,
		radiusFight: 400,
	},

	circleYellow: {
		name: 'circleYellow',
		color: '#FFFF00',
		power: 25,
		radiusFight: 400,
	},

	circlePink: {
		name: 'circlePink',
		color: '#FF00FF',
		power: 30,
		radiusFight: 400,
	},

	circleSad: {
		name: 'circleSad',
		color: '#0000FF',
		power: 35,
		radiusFight: 400,
	},

	triangl: {
		name: 'triangl',
		size: 30,
		color: '#00FF00',
		health: 10,
	},

	stone: {
		name: 'stone',
		color: 'black',
	},

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

	star: {
		name: 'star',
		colors: ['#0000FF', '#00FF00', '#FF0000'],
		power: 100
	}
};

Setting.pentagonGYR.circles = ['circleGreen', 'circleYellow', 'circleRed'];
Setting.pentagonSBG.circles = ['circleSad', 'circleBlue', 'circleGreen'];
Setting.pentagonRPS.circles = ['circleRed', 'circlePink', 'circleSad'];

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

Setting.variantsX = window.innerWidth * 0.72;
Setting.variantsY = Setting.mapY;
Setting.variantsXSize = window.innerWidth * 0.25;
Setting.variantsYSize = window.innerHeight * 0.1;
Setting.betweenVariants = 120;

Setting.variantCircls = [[Setting.circleRed, Setting.circlePink, Setting.circleSad],
						[Setting.circleSad, Setting.circleBlue, Setting.circleGreen],
						[Setting.circleGreen, Setting.circleYellow, Setting.circleRed]];


export default Setting;