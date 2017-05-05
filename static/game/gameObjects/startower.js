import Settings from '../settings.js'
import Konva from 'konva';

export default
class StarTower {
	constructor(name, x, y, radius) {
		this.settings = new Settings();
		this.draw = new Konva.Star({
			x: x,
			y: y,
			numPoints: 5,
			innerRadius: radius / 2,
			outerRadius: radius,
			fill: 'khaki',
			//fillRadialGradientStartPoint: 0,
			//fillRadialGradientStartRadius: 0,
			//fillRadialGradientEndPoint: 0,
			//fillRadialGradientEndRadius: radius,
			//fillRadialGradientColorStops: [0, name.colors[0], 0.5, name.colors[1], 1, name.colors[2]],
			stroke: 'black',
			strokeWidth: 0,
		});
		this.kind = name;
		this.bulletes = [];
		this.radiusFight = name.radiusFight;
	}

	//fire() {
	//	this.bulletes.push(new Konva.Circle({
	//		x: this.draw.x,
	//		y: this.draw.y,
	//		radius: 5,
	//		stroke: 'black',
	//		strokeWidth: 0,
	//		fill: 'black'
	//	}));
	//}
	fire(enemie) {
		let x1 = this.draw.getX();
		let y1 = this.draw.getY();
		let x2 = enemie.draw.getX();
		let y2 = enemie.draw.getY();
		this.bulletes = new Konva.Line({
			points: [x1, y1, x2, y2],
			stroke: this.kind.color,
			strokeWidth: this.settings.laserWidth,
			lineCap: 'round',
			lineJoin: 'round'
		});
	this.bulletes.enemie = enemie;
	enemie.health -= 2;
	}
}