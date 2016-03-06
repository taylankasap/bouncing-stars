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
        this.resetUpgradesText = this.game.add.text(this.game.width / 2, this.game.height / 2 + 100, 'Reset Upgrades', style);
        this.resetUpgradesText.anchor.set(0.5);
        this.resetUpgradesText.inputEnabled = true;
        this.resetUpgradesText.events.onInputUp.add(this.resetUpgrades, this);

        var dangerStyle = {
            font: '30px Arial',
            fill: '#c0392b',
            align: 'center'
        };

        // Reset game progress
        this.resetProgressText = this.game.add.text(this.game.width / 2, this.game.height / 2 + 200, 'Reset Progress', style);
        this.resetProgressText.anchor.set(0.5);
        this.resetProgressText.inputEnabled = true;
        this.resetProgressText.events.onInputUp.add(this.resetProgress, this);

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
        store.set('upgrades.velocity', parseFloat(store.get('upgrades.velocity') - 0.1));
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
        store.set('upgrades.velocity', parseFloat(store.get('upgrades.velocity') + 0.1));
        this.updateVelocityText();
    },
    updateVelocityText: function () {
        this.velocityText.setText('Velocity: ' + store.get('upgrades.velocity').toFixed(1));
    },
    resetUpgrades: function () {
        store.set('remainingUpgradePoints', store.get('totalUpgradePoints'));

        store.set('upgrades.scale', 1);
        store.set('upgrades.velocity', 1);
        store.set('upgrades.time', 10);

        this.updateUpgradePointsText();
        this.updateScaleText();
        this.updateVelocityText();
    },
    resetProgress: function () {
        store.clear();
        window.location.reload();
    },
    nextLevel: function () {
        this.game.state.start('Game');
    },
};
