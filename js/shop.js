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
		this.upgradePointsText = this.game.add.text(this.game.width / 2, 100, 'Spend Upgrade Points: ' + BouncingStars.upgradePoints);
		this.upgradePointsText.anchor.set(0.5);
		this.scaleText = this.game.add.text(this.game.width / 2, this.game.height / 2, 'Size: ' + BouncingStars.playerUpgrades.scale.toFixed(1), style);
		this.scaleText.anchor.set(0.5);
		this.scaleText.inputEnabled = true;
    	this.scaleText.events.onInputUp.add(this.increasePlayerSize, this);

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
	spendUpgrades: function () {
		BouncingStars.upgradePoints -= 1;
		this.upgradePointsText.setText('Spend Upgrade Points: ' + BouncingStars.upgradePoints);
	},
	increasePlayerSize: function () {
		if (BouncingStars.upgradePoints === 0) {
		    return;
		}

		this.spendUpgrades();
		BouncingStars.playerUpgrades.scale = parseFloat(BouncingStars.playerUpgrades.scale + 0.1);
		this.scaleText.setText('Size: ' + BouncingStars.playerUpgrades.scale.toFixed(1));
	},
	nextLevel: function () {
        this.game.state.start('Game');
	},
};
