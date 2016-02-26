BouncingStars.Shop = function () {};

BouncingStars.Shop.prototype = {
    create: function () {
        this.upgradePointsText = this.game.add.text(this.game.width / 2, 100, 'Spend Upgrade Points: ' + BouncingStars.upgradePoints);
        this.upgradePointsText.anchor.set(0.5);

        var style = {
            font: '30px Arial',
            fill: '#ecf0f1',
            align: 'center'
        };

        // Upgrade scale
        this.scaleText = this.game.add.text(this.game.width / 2, this.game.height / 2 - 200, 'Scale: ' + BouncingStars.upgrades.scale.toFixed(1), style);
        this.scaleText.anchor.set(0.5);
        this.scaleText.inputEnabled = true;
        this.scaleText.events.onInputUp.add(this.increasePlayerScale, this);

        // Upgrade velocity
        this.velocityText = this.game.add.text(this.game.width / 2, this.game.height / 2 - 100, 'Velocity: ' + BouncingStars.upgrades.velocity.toFixed(1), style);
        this.velocityText.anchor.set(0.5);
        this.velocityText.inputEnabled = true;
        this.velocityText.events.onInputUp.add(this.increasePlayerVelocity, this);

        // Upgrade time
        this.timeText = this.game.add.text(this.game.width / 2, this.game.height / 2, 'Time: ' + BouncingStars.upgrades.time.toFixed(1), style);
        this.timeText.anchor.set(0.5);
        this.timeText.inputEnabled = true;
        this.timeText.events.onInputUp.add(this.increaseTime, this);

        // Reset upgrades
        this.resetText = this.game.add.text(this.game.width / 2, this.game.height / 2 + 100, 'Reset Upgrades', style);
        this.resetText.anchor.set(0.5);
        this.resetText.inputEnabled = true;
        this.resetText.events.onInputUp.add(this.resetUpgrades, this);

        // Next level text
        var t = this.game.add.text(this.game.width / 2, this.game.height - 100, 'Next Level', style);
        t.anchor.set(0.5);
        t.inputEnabled = true;
        t.events.onInputUp.add(this.nextLevel, this);
    },
    spendUpgrades: function () {
        BouncingStars.upgradePoints -= 1;
        this.updateUpgradePointsText();
    },
    updateUpgradePointsText: function () {
        this.upgradePointsText.setText('Spend Upgrade Points: ' + BouncingStars.upgradePoints);
    },
    increasePlayerScale: function () {
        if (BouncingStars.upgradePoints === 0) {
            return;
        }

        this.spendUpgrades();
        BouncingStars.upgrades.scale = parseFloat(BouncingStars.upgrades.scale + 0.1);
        this.updateScaleText();
    },
    updateScaleText: function () {
        this.scaleText.setText('Scale: ' + BouncingStars.upgrades.scale.toFixed(1));
    },
    increasePlayerVelocity: function () {
        if (BouncingStars.upgradePoints === 0) {
            return;
        }

        this.spendUpgrades();
        BouncingStars.upgrades.velocity = parseFloat(BouncingStars.upgrades.velocity + 0.1);
        this.updateVelocityText();
    },
    updateVelocityText: function () {
        this.velocityText.setText('Velocity: ' + BouncingStars.upgrades.velocity.toFixed(1));
    },
    increaseTime: function () {
        if (BouncingStars.upgradePoints === 0) {
            return;
        }

        this.spendUpgrades();
        BouncingStars.upgrades.time = parseFloat(BouncingStars.upgrades.time + 1);
        this.updateTimeText();
    },
    updateTimeText: function () {
        this.timeText.setText('Time: ' + BouncingStars.upgrades.time.toFixed(1));
    },
    resetUpgrades: function () {
        BouncingStars.upgradePoints = BouncingStars.level - 1;

        BouncingStars.upgrades = cloneObject(BouncingStars.initialUpgrades);

        this.updateUpgradePointsText();
        this.updateScaleText();
        this.updateVelocityText();
        this.updateTimeText();
    },
    nextLevel: function () {
        this.game.state.start('Game');
    },
};
