BouncingStars.Shop = function () {};

BouncingStars.Shop.prototype = {
    create: function () {
        this.upgradePointsText = this.game.add.text(this.game.width / 2, 100, 'Spend Upgrade Points: ' + store.get('remainingUpgradePoints'));
        this.upgradePointsText.anchor.set(0.5);

        var style = {
            font: '30px Arial',
            fill: '#ecf0f1',
            align: 'center'
        };

        // Upgrade scale
        this.scaleText = this.game.add.text(this.game.width / 2, this.game.height / 2 - 200, 'Scale: ' + store.get('upgrades.scale').toFixed(1), style);
        this.scaleText.anchor.set(0.5);
        this.scaleText.inputEnabled = true;
        this.scaleText.events.onInputUp.add(this.increasePlayerScale, this);

        // Upgrade velocity
        this.velocityText = this.game.add.text(this.game.width / 2, this.game.height / 2 - 100, 'Velocity: ' + store.get('upgrades.velocity').toFixed(1), style);
        this.velocityText.anchor.set(0.5);
        this.velocityText.inputEnabled = true;
        this.velocityText.events.onInputUp.add(this.increasePlayerVelocity, this);

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
        store.set('remainingUpgradePoints', store.get('remainingUpgradePoints') - 1);
        this.updateUpgradePointsText();
    },
    updateUpgradePointsText: function () {
        this.upgradePointsText.setText('Spend Upgrade Points: ' + store.get('remainingUpgradePoints'));
    },
    increasePlayerScale: function () {
        if (store.get('remainingUpgradePoints') === 0) {
            return;
        }

        this.spendUpgrades();
        store.set('upgrades.scale', parseFloat(store.get('upgrades.scale') + 0.1));
        store.get('upgrades.velocity', parseFloat(store.get('upgrades.velocity') - 0.1));
        this.updateScaleText();
        this.updateVelocityText();
    },
    updateScaleText: function () {
        this.scaleText.setText('Scale: ' + store.get('upgrades.scale').toFixed(1));
    },
    increasePlayerVelocity: function () {
        if (store.get('remainingUpgradePoints') === 0) {
            return;
        }

        this.spendUpgrades();
        store.get('upgrades.velocity') = parseFloat(store.get('upgrades.velocity') + 0.1);
        this.updateVelocityText();
    },
    updateVelocityText: function () {
        this.velocityText.setText('Velocity: ' + store.get('upgrades.velocity').toFixed(1));
    },
    resetUpgrades: function () {
        store.set('remainingUpgradePoints', store.get('totalUpgradePoints'));

        store.set('upgrades', cloneObject(BouncingStars.initialUpgrades));

        this.updateUpgradePointsText();
        this.updateScaleText();
        this.updateVelocityText();
    },
    nextLevel: function () {
        this.game.state.start('Game');
    },
};
