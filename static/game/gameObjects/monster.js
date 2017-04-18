import Settings from '../settings.js'
export default
class Monster {
	constructor(name) {
		this.settings = new Settings();
		this.draw = new Konva.RegularPolygon({
			x: this.settings.mapX,
			y: this.settings.mapY,
			sides: 3,
			radius: name.size,
			fill: name.color,
			stroke: 'black',
			strokeWidth: 0
		});
		this.kind = name;
		this.health = name.health;
		this.numberTurns = 0;
	}
}