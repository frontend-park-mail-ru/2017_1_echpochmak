import Settings from './settings.js'
import Konva from 'konva';

export default
class Scene {
	constructor() {
		this.state = {};
		this.settings = new Settings;

		this.gameStage = new Konva.Stage({
			container: this.settings.gameFieldId,
			width : this.settings.gameFieldElement.offsetWidth,
			height : this.settings.gameFieldElement.offsetHeight
		});

		this.gameLayer = new Konva.Layer();

		this.hintsStage = new Konva.Stage({
			container: this.settings.hintsFieldId,
			width : this.settings.hintsFieldElement.offsetWidth,
			height : this.settings.hintsFieldElement.offsetHeight
		})

		this.hintsLayer = new Konva.Layer();
	}

	setState(state) {
		this.state = state;
	}

	render() {

		let length = this.gameLayer.children.length;
		for (let i = 0; i < length; i++) {
			this.gameLayer.children[0].remove();
		}
		
		length = this.hintsLayer.children.length;
		for (let i = 0; i < length; i++) {
			this.hintsLayer.children[0].remove();
		}

		for (let i = 0; i < this.settings.mapSize; i++){
			for (let j = 0; j < this.settings.mapSize; j++){
				this.gameLayer.add(this.state.fields[i][j].field);
				if (this.state.fields[i][j].tower){
					this.gameLayer.add(this.state.fields[i][j].tower.draw);
				}
				
			}
		}
		for (let i = 0; i < this.state.fieldsNewTower.length; i++){
			this.gameLayer.add(this.state.fieldsNewTower[i].draw)
		}

		for (let i = 0; i < this.state.variantRects.length; i++) {
			this.hintsLayer.add(this.state.variantRects[i].draw);
			if (this.state.variantRects[i].text) {
				this.hintsLayer.add(this.state.variantRects[i].text);
			}
		}

		for (let i = 0; i < this.state.variantElements.length; i++){
			this.hintsLayer.add(this.state.variantElements[i].draw);
		}

		for (let i = 0; i < this.state.variantsShow.length; i++){
			this.gameLayer.add(this.state.variantsShow[i].draw);
		}

		for (let i = 0; i < this.state.enemies.length; i++){
			this.gameLayer.add(this.state.enemies[i].draw);
		}

		for (let i = 0; i < this.state.fieldsWithCircles.length; i++){
			for (let j = 0; j < this.state.fieldsWithCircles[i].tower.bulletes.length; j++){
				for (let s = 0; s < this.state.fieldsWithCircles[i].tower.bulletes[j].length; s++){
					this.gameLayer.add(this.state.fieldsWithCircles[i].tower.bulletes[j][s])
				}
			}
		}

		for (let i = 0; i < this.state.fieldsWithPentagons.length; i++) {
			if (this.state.fieldsWithPentagons[i].tower.bulletes) {
				this.gameLayer.add(this.state.fieldsWithPentagons[i].tower.bulletes);
			}
		}

		

		for (let i = 0; i < this.state.checkpoints.length ; i++) {
			this.gameLayer.add(this.state.checkpoints[i].draw);
		}

		this.gameStage.add(this.gameLayer);
		this.hintsStage.add(this.hintsLayer);
	}
}