BouncingStars.Shop = function () {};

BouncingStars.Shop.prototype = {
	create: function () {
        this.upgradePointsText = this.game.add.text(this.game.width / 2, 100, 'Spend Upgrade Points: ' + BouncingStars.upgradePoints);
        this.upgradePointsText.anchor.set(0.5);

        var style = {
            font: '30px Arial',
            fill: '#fff',
            align: 'center'
        };

        // Upgrade scale
        var text = 'Scale +';
        this.scaleText = this.game.add.text(this.game.width / 2, this.game.height / 2 - 100, 'Scale: ' + BouncingStars.playerUpgrades.scale.toFixed(1), style);
        this.scaleText.anchor.set(0.5);
        this.scaleText.inputEnabled = true;
        this.scaleText.events.onInputUp.add(this.increasePlayerScale, this);

		// Upgrade velocity
		var text = 'Velocity +';
		this.velocityText = this.game.add.text(this.game.width / 2, this.game.height / 2, 'Velocity: ' + BouncingStars.playerUpgrades.velocity.toFixed(1), style);
		this.velocityText.anchor.set(0.5);
		this.velocityText.inputEnabled = true;
    	this.velocityText.events.onInputUp.add(this.increasePlayerVelocity, this);

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
    increasePlayerScale: function () {
        if (BouncingStars.upgradePoints === 0) {
            return;
        }

        this.spendUpgrades();
        BouncingStars.playerUpgrades.scale = parseFloat(BouncingStars.playerUpgrades.scale + 0.1);
        this.scaleText.setText('Scale: ' + BouncingStars.playerUpgrades.scale.toFixed(1));
    },
	increasePlayerVelocity: function () {
		if (BouncingStars.upgradePoints === 0) {
		    return;
		}

		this.spendUpgrades();
		BouncingStars.playerUpgrades.velocity = parseFloat(BouncingStars.playerUpgrades.velocity + 0.1);
		this.velocityText.setText('Velocity: ' + BouncingStars.playerUpgrades.velocity.toFixed(1));
	},
	nextLevel: function () {
        this.game.state.start('Game');
	},
};
