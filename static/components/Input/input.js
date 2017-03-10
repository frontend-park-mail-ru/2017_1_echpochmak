(function () {

	'use strict';

	const BaseBlock = window.BaseBlock;

	class Input extends BaseBlock {
		constructor(labelName, className, attrs) {
			super('div', {
				'class': 'col-xs-12 col-sm-12 col-md-12 col-lg-12 line'
			});
			this.get().classList.add(className);
			this.labelBlock = new BaseBlock('label', {
				'class': 'col-xs-4 col-sm-4 col-md-4 col-lg-4 control-label'
			});
			this.labelBlock.get().innerHTML = labelName;
			this.inputBlock = new BaseBlock('div', {
				'class': 'col-xs-5 col-sm-5 col-md-5 col-lg-5'
			});
			this.input = new BaseBlock('input', attrs);
			this.input.get().classList.add('form-control', 'input-lg');
			this.errorBlock = new BaseBlock('div', {
				'class': 'col-xs-3 col-sm-3 col-md-3 col-lg-3 error-message'
			});

			this.render();
		}

		render() {
			this.get().appendChild(this.labelBlock.get());
			this.get().appendChild(this.inputBlock.get());
			this.get().appendChild(this.errorBlock.get());
			this.inputBlock.get().appendChild(this.input.get());
		}
	}

	window.Input = Input;

})();