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
	}

	fire() {
		this.bulletes.push(new Konva.Circle({
			x: this.draw.x,
			y: this.draw.y,
			radius: 5,
			stroke: 'black',
			strokeWidth: 0,
			fill: this.draw.fill
		}));
	}
}