BouncingStars.Shop = function () {};

BouncingStars.Shop.prototype = {
	create: function () {
		// Upgrade scale
		var text = 'Size +';
		var style = {
			font: '30px Arial',
			fill: '#fff',
			align: 'center'
		};
		var t = this.game.add.text(this.game.width / 2, this.game.height / 2, text, style);
		this.game.add.text(this.game.width / 2 - 100, 100, 'Upgrades');
		t.anchor.set(0.5);
		t.inputEnabled = true;
    	t.events.onInputUp.add(this.increasePlayerSize, this);

		// Next level text
		var text = 'Next Level';
		var style = {
			font: '30px Arial',
			fill: '#fff',
			align: 'center'
		};
		var t = this.game.add.text(this.game.width / 2, this.game.height - 100, text, style);
		t.anchor.set(0.5);
		t.inputEnabled = true;
    	t.events.onInputUp.add(this.nextLevel, this);
	},
	increasePlayerSize: function () {
		BouncingStars.playerUpgrades.scale += 0.1;
	},
	nextLevel: function () {
        this.game.state.start('Game');
	},
};
