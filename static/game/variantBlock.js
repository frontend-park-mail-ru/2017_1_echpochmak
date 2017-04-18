import Settings from './settings.js'

export default
class VariantBlock {
	constructor(number) {
		this.settings = new Settings;
		this.draw = new Konva.Rect({
				x: window.innerWidth * 0.72,
				y: this.settings.mapY + number * 120,
				width: window.innerWidth * 0.25,
				height: window.innerHeight * 0.1,
				fill: 'grey',
				stroke: 'black',
				strokeWidth: 2
			});
	}
};