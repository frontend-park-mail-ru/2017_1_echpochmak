import Setting from '../settings.js'
export default
class CircleTower {
	constructor(name, x, y, radius) {
		this.draw = new Konva.Circle({
			x: x,
			y: y,
			radius: radius,
			stroke: 'black',
			strokeWidth: 0,
			fill: name.color
		});
		this.kind = name;
		this.bulletes = [];
		this.radiusFight = name.radiusFight;
		//for (let i = 0; i < Setting.numberMonstersInWave; i++){
		//	this.bulletes.push(Array(numberMonstersInWave));
		//}
	}

	fire(enemie) {
		this.bulletes[enemie].push(new Konva.Circle({
			x: this.draw.getX(),
			y: this.draw.getY(),
			radius: Setting.bulletRadius,
			stroke: 'black',
			strokeWidth: 0,
			fill: this.draw.getFill()
		}));
	}
}