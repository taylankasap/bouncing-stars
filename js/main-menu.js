BouncingStars.MainMenu = function () {};

BouncingStars.MainMenu.prototype = {
	create: function () {
		this.game.stage.backgroundColor = '#2c3e50'

		// Start game text
		var text = 'Tap to begin';
		var style = {
			font: '30px Arial',
			fill: '#ecf0f1',
			align: 'center'
		};
		var t = this.game.add.text(this.game.width / 2, this.game.height / 2, text, style);
		t.anchor.set(0.5);

		// Highest score
		text = 'Highest score: ' + this.highestScore;
		style = {
			font: '15px Arial',
			fill: '#ecf0f1',
			align: 'center'
		};

		var h = this.game.add.text(this.game.width / 2, this.game.height / 2 + 50, text, style);
		h.anchor.set(0.5);
	},
	update: function () {
		if (this.game.input.activePointer.justPressed()) {
			this.game.state.start('Game');
		}
	}
};
