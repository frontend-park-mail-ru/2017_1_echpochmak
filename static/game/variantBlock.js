import Settings from './settings.js'

export default
class VariantBlock {
	constructor(number) {
		this.settings = new Settings;

		let width = this.settings.hintsFieldElement.offsetWidth;
		let height = this.settings.hintsFieldElement.offsetHeight;

		this.draw = new Konva.Rect({
				x: width * 0.05,
				y: this.settings.mapY + number * height * 0.15,
				width: width * 0.9,
				height: height * 0.1,
				fill: 'grey',
				stroke: 'black',
				strokeWidth: 2
			});
	}
};