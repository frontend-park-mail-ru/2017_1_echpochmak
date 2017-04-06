class Monster {
	constructor(name) {
		this.draw = new Konva.RegularPolygon({
			x: mapX,
			y: mapY,
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