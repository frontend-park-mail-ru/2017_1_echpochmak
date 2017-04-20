import Setting from '../settings.js'

export default
class Arrow {
	constructor(row){
		this.draw = new Konva.Arrow({
			x: Setting.variantsX + Setting.variantsXSize * 0.7,
			y: Setting.variantsY + Setting.variantsYSize * 0.5 + row * Setting.betweenVariants,
			points: [-Setting.variantsXSize * 0.1, 0, Setting.variantsXSize * 0.1, 0],
			pointerLength: 20,
			pointerWidth: 20,
			fill: 'red',
			stroke: 'red',
			strokeWidth: 4
		})
	}
}