import Settings from '../settings.js'

export default
class PentagonTower {
	constructor(name, x, y, radius) {
		this.settings = new Settings();
		this.draw = new Konva.RegularPolygon({
			x: x,
			y: y,
			sides: 5,
			radius: radius,
			fillRadialGradientStartPoint: 0,
			fillRadialGradientStartRadius: 0,
			fillRadialGradientEndPoint: 0,
			fillRadialGradientEndRadius: radius,
			fillRadialGradientColorStops: [0, name.colors[0], 0.5, name.colors[1], 1, name.colors[2]],
			stroke: 'black',
			strokeWidth: 0
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
			fill: this.kind.colors[0],
		}));
	}
}