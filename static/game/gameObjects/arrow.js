import Settings from '../settings.js'
import Konva from 'konva';

export default
class Arrow {
	constructor(row, type) {
		this.settings = new Settings();
		if (type == 'inVariantBlocks') {
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
		} else if (type == 'checkpoints'){
			let xp = (this.settings.checkpoints[row][0] + 1) * (this.settings.fieldSize + 2) - this.settings.fieldSize / 2 + this.settings.mapX;
			let yp = (this.settings.checkpoints[row][1] + 1) * (this.settings.fieldSize + 2) - this.settings.fieldSize / 2 + this.settings.mapY;
			this.draw = new Konva.Arrow({
				x: xp,
				y: yp,
				points: [0, -this.settings.fieldSize * 0.4, 0, this.settings.fieldSize * 0.4],
				pointerLength: this.settings.fieldSize * 0.4,
				pointerWidth: this.settings.fieldSize * 0.4,
				fill: 'lime',
				stroke: 'green',
				strokeWidth: 4,
			})
		}
		
	}
}