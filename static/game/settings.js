export default 
class Settings {
	constructor() {

		if (Settings.__instance) {
			return Settings.__instance;
		}

		this.gameFieldId = 'game-field';
		this.hintsFieldId = 'hints-field';
		this.hpCircl = 'hpCircl';

		this.gameFieldElement = document.getElementById(this.gameFieldId);
		this.hintsFieldElement = document.getElementById(this.hintsFieldId);

		this.mapSize = 15;

		this.checkpoints = [[0, 0], [0, this.mapSize - 1], [this.mapSize - 1, 0], [this.mapSize - 1, this.mapSize - 1]];

		let minSize = Math.min(this.gameFieldElement.offsetHeight, this.gameFieldElement.offsetWidth)
		this.fullMapSize = minSize * 0.9;
		this.fieldSize = (this.fullMapSize / this.mapSize) - 2;

		this.mapX = (this.gameFieldElement.offsetWidth - ((this.fieldSize + 2) * this.mapSize)) / 2;
		this.mapY = (this.gameFieldElement.offsetHeight - ((this.fieldSize + 2) * this.mapSize)) / 2;

		this.variantRadius = this.fieldSize * 0.2;
		if (this.variantRadius < 5) {
			this.variantRadius = 5;
		}
		this.bulletStep = 20;
		this.monsterStep = 10;

		this.numberTowersInStep = 3;

		this.addHPInWave = 50;
		this.numberMonstersInWave = 20;
		this.bulletRadius = 5;
		this.laserWidth = 8;
		this.numberChangesColors = 10;
		this.throneHealth = 100;
		this.damage = 1;
		this.addDamageInWave = 1;

		this.circleRed = {
			name: 'circleRed',
			color: '#FF0000',
			power: 10,
			radiusFight: 400,
		};

		this.circleBlue = {
			name: 'circleBlue',
			color: '#00FFFF',
			power: 15,
			radiusFight: 400,
		};

		this.circleGreen = {
			name: 'circleGreen',
			color: '#00FF00',
			power: 20,
			radiusFight: 400,
		};

		this.circleYellow = {
			name: 'circleYellow',
			color: '#FFFF00',
			power: 25,
			radiusFight: 400,
		};

		this.circlePink = {
			name: 'circlePink',
			color: '#FF00FF',
			power: 30,
			radiusFight: 400,
		};

		this.circleSad = {
			name: 'circleSad',
			color: '#0000FF',
			power: 35,
			radiusFight: 400,
		};

		this.triangl = {
			name: 'triangl',
			size: this.fieldSize * 0.5,
			color: '#00FF00',
			health: 100,
		};

		this.stone = {
			name: 'stone',
			color: 'black',
		};

		this.pentagonRPS = {
			name: 'pentagonRPS',
			power: 70,
			colors: ['#FF0000', '#FF00FF', '#0000FF'],
			radiusFight: 400,
			circles: ['circleRed', 'circlePink', 'circleSad']
		};

		this.pentagonSBG = {
			name: 'pentagonSBG',
			power: 80,
			colors: ['#0000FF', '#00FFFF', '#00FF00'],
			radiusFight: 400,
			circles: ['circleSad', 'circleBlue', 'circleGreen']
		};

		this.pentagonGYR = {
			name: 'pentagonGYR',
			power: 70,
			colors: ['#00FF00', '#FFFF00', '#FF0000'],
			radiusFight: 400,
			circles: ['circleGreen', 'circleYellow', 'circleRed']
		};

		this.star = {
			name: 'star',
			colors: 'khaki',
			power: 100,
			radiusFight: 400,
			numberBullets: 3,
			pentagons: ['pentagonGYR', 'pentagonRPS', 'pentagonSBG'],
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

		this.variantsX = this.hintsFieldElement.offsetWidth * 0.05;
		this.variantsY = this.mapY;
		this.variantsXSize = this.hintsFieldElement.offsetWidth * 0.9;
		this.variantsYSize = this.fullMapSize * 0.1;
		this.betweenVariants = this.fullMapSize * 0.15;

		this.variantCircls = [
			[this.circleRed, this.circlePink, this.circleSad],
			[this.circleSad, this.circleBlue, this.circleGreen],
			[this.circleGreen, this.circleYellow, this.circleRed]
		];

		Settings.__instance = this;
	}
}
