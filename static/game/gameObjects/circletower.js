import Settings from '../settings.js'

export default
class CircleTower {
	constructor(name, x, y, radius) {
		this.settings = new Settings();
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
	}

	fire(enemie) {
		this.bulletes[enemie].push(new Konva.Circle({
			x: this.draw.getX(),
			y: this.draw.getY(),
			radius: this.settings.bulletRadius,
			stroke: 'black',
			strokeWidth: 0,
			fill: this.draw.getFill()
		}));
	}
}