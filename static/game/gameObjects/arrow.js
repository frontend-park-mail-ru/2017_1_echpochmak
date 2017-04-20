import Settings from '../settings.js'

export default
class Arrow {
	constructor(row) {
		this.settings = new Settings();
		this.draw = new Konva.Arrow({
			x: this.settings.variantsX + this.settings.variantsXSize * 0.7,
			y: this.settings.variantsY + this.settings.variantsYSize * 0.5 + row * this.settings.betweenVariants,
			points: [-this.settings.variantsXSize * 0.1, 0, this.settings.variantsXSize * 0.1, 0],
			pointerLength: 20,
			pointerWidth: 20,
			fill: 'red',
			stroke: 'red',
			strokeWidth: 4
		})
	}
}