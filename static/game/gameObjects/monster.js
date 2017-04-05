class Monster {
	constructor(name, x, y) {
		this.draw = new Konva.RegularPolygon({
			x: x,
			y: y,
			sides: 3,
			radius: name.size,
			fill: name.color,
			stroke: 'black',
			strokeWidth: 0
		});
		this.kind = name;
		this.health = name.health;
	}
}