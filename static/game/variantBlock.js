import Setting from './settings.js'

export default
class VariantBlock {
	constructor(number, text) {
		if (text) {
			this.text = new Konva.Text({
				x: Setting.variantsX,
				y: Setting.variantsY + number * Setting.betweenVariants,
				width: variantsXSize,
				text: text,
				fontSize: 18,
				fill: 'red',
				padding: 15,
				align: 'center',
			});
		};
		this.draw = new Konva.Rect({
			x: Setting.variantsX,
			y: Setting.variantsY + number * Setting.betweenVariants,
			width: Setting.variantsXSize,
			height: (text ? this.text.getHeight() : Setting.variantsYSize),
			fill: 'grey',
			stroke: 'black',
			strokeWidth: 2
		});
	};
};
