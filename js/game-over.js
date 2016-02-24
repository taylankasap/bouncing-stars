BouncingStars.GameOver = function () {};

BouncingStars.GameOver.prototype = {
	create: function () {
		this.game.stage.backgroundColor = '#2c3e50'

		// Start game text
		var text = 'Click to Play Again';
		var style = {
			font: '30px Arial',
			fill: '#ecf0f1',
			align: 'center'
		};
		var t = this.game.add.text(this.game.width / 2, this.game.height / 2, text, style);
		t.anchor.set(0.5);

		// Highest score
		style = {
			font: '15px Arial',
			fill: '#ecf0f1',
			align: 'center'
		};

		var s = this.game.add.text(this.game.width / 2, this.game.height / 2 + 50, 'Your score: ' + (BouncingStars.level - 1), style);
		s.anchor.set(0.5);

        var h = this.game.add.text(this.game.width / 2, this.game.height / 2 + 75, 'Highest score: ' + localStorage.highestScore, style);
        h.anchor.set(0.5);
	},
	update: function () {
		if (this.game.input.activePointer.justPressed()) {
			this.game.state.start('Game');
		}
	}
};
