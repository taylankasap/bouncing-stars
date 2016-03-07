var BouncingStars = BouncingStars || {};

if (typeof store.get('level') === 'undefined') {
    store.set('level', 1);
}

if (typeof store.get('upgrades.scale') === 'undefined') {
    store.set('upgrades.scale', 1);
}

if (typeof store.get('upgrades.velocity') === 'undefined') {
    store.set('upgrades.velocity', 1);
}

if (typeof store.get('upgrades.time') === 'undefined') {
    store.set('upgrades.time', 10);
}

if (typeof store.get('totalUpgradePoints') === 'undefined') {
    store.set('totalUpgradePoints', 0);
}

if (typeof store.get('remainingUpgradePoints') === 'undefined') {
    store.set('remainingUpgradePoints', 0);
}

BouncingStars.playerVelocity = store.get('upgrades.velocity') * 1000;
BouncingStars.baseStarVelocity = 1500 + (store.get('level') * 10);

BouncingStars.Game = function () {};

BouncingStars.Game.prototype = {
    create: function () {
        this.collectedUpgradeRuneCountInThisLevel = 0;

        BouncingStars.playerVelocity = store.get('upgrades.velocity') * 1000;
        BouncingStars.baseStarVelocity = 1500 + (store.get('level') * 10);

        // Create player
        BouncingStars.Player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'dude');

        this.game.physics.arcade.enable(BouncingStars.Player);

        BouncingStars.Player.anchor.setTo(0.5, 0.5);
        BouncingStars.Player.frame = 4;
        BouncingStars.Player.scale.setTo(store.get('upgrades.scale'));

        // Walls
        // We need to make walls thick so the sprites won't come too close to world bounds
        // It causes some issues https://github.com/taylankasap/phaserjs-bounce-issue
        this.walls = BouncingStars.game.add.group();
        this.walls.enableBody = true;
        var wall = this.walls.create(-175, 0, 'wall');
        wall.width = 250;
        wall.height = this.game.world.height;
        wall.body.immovable = true;
        var wall = this.walls.create(this.game.world.width - 75, 0, 'wall');
        wall.width = 250;
        wall.height = this.game.world.height;
        wall.body.immovable = true;
        var wall = this.walls.create(0, -175, 'wall');
        wall.width = this.game.world.width;
        wall.height = 250;
        wall.body.immovable = true;
        var wall = this.walls.create(0, this.game.world.height - 75, 'wall');
        wall.width = this.game.world.width;
        wall.height = 250;
        wall.body.immovable = true;

        // Finally some stars to collect
        this.stars = BouncingStars.game.add.group();

        // We will enable physics for any star that is created in this group
        this.stars.enableBody = true;

        for (var i = 0; i < store.get('level'); i++) {
            var star = this.stars.create(BouncingStars.game.world.randomX, BouncingStars.game.world.randomY, 'star');
            star.body.collideWorldBounds = true;

            star.body.velocity.setTo((BouncingStars.baseStarVelocity + Math.random() * BouncingStars.baseStarVelocity) * this.game.rnd.pick([-1, 1]), (BouncingStars.baseStarVelocity + Math.random() * BouncingStars.baseStarVelocity) * this.game.rnd.pick([-1, 1]));

            var bounce = Math.min(0.5 + (store.get('level') * 0.001), 0.95);
            star.body.bounce.setTo(bounce);

            star.anchor.setTo(0.5);

            star.body.angularVelocity = (200 + Math.random() * 400) * this.game.rnd.pick([-1, 1]);
        }

        // Spawn upgrade runes every n levels
        if (store.get('level') % 1 === 0) {
            this.upgradeRunes = BouncingStars.game.add.group();
            this.upgradeRunes.enableBody = true;

            for (var i = 0; i < 1; i++) {
                var upgradeRune = this.upgradeRunes.create(BouncingStars.game.world.randomX, BouncingStars.game.world.randomY, 'upgradeRune');
                upgradeRune.body.collideWorldBounds = true;

                upgradeRune.body.velocity.setTo((BouncingStars.baseStarVelocity + Math.random() * BouncingStars.baseStarVelocity) * this.game.rnd.pick([-1, 1]), (BouncingStars.baseStarVelocity + Math.random() * BouncingStars.baseStarVelocity) * this.game.rnd.pick([-1, 1]));

                upgradeRune.body.bounce.setTo(1);

                upgradeRune.anchor.setTo(0.5);

                upgradeRune.body.angularVelocity = (200 + Math.random() * 400) * this.game.rnd.pick([-1, 1]);
            }
        }

        BouncingStars.collectSound = BouncingStars.game.add.audio('collectSound');

        this.timer = this.game.time.create();
        this.timerEvent = this.timer.add(Phaser.Timer.SECOND * store.get('upgrades.time'), this.gameOver, this);
        this.timer.start();

        // Remaining time
        var style = {
            fill: '#ecf0f1'
        };
        this.remainingTimeText = this.game.add.text(50, 50, 'Remaining time: ' + store.get('upgrades.time').toFixed(1), style);
    },
    update: function () {
        this.game.physics.arcade.collide(this.stars, this.walls);
        this.game.physics.arcade.collide(this.upgradeRunes, this.walls);

        BouncingStars.Player.rotation = this.game.physics.arcade.moveToPointer(BouncingStars.Player, BouncingStars.playerVelocity) + Math.PI / 2;

        // If it's overlapping the mouse, don't move any more
        if (Phaser.Rectangle.contains(BouncingStars.Player.body, this.game.input.x, this.game.input.y))
        {
            BouncingStars.Player.body.velocity.setTo(0, 0);
        }

        this.game.physics.arcade.overlap(BouncingStars.Player, this.stars, this.collectStar, null, this);
        this.game.physics.arcade.overlap(BouncingStars.Player, this.upgradeRunes, this.collectUpgradeRune, null, this);

        this.remainingTimeText.setText('Remaining time: ' + ((this.timerEvent.delay - this.timer.ms) / 1000).toFixed(1));
    },
    collectStar: function (player, star) {
        BouncingStars.collectSound.play();

        star.destroy();

        if (this.stars.children.length === 0) {
            // Set new highscore
            if (store.get('level') > store.get('highestScore')) {
                store.set('highestScore', store.get('level'));
            }

            store.set('totalUpgradePoints', store.get('totalUpgradePoints') + 1 + this.collectedUpgradeRuneCountInThisLevel);
            store.set('remainingUpgradePoints', store.get('remainingUpgradePoints') + 1 + this.collectedUpgradeRuneCountInThisLevel);

            store.set('level', store.get('level') + 1);
            if (store.get('level') % 1 === 0) {
                this.game.state.start('Shop');
            } else {
                this.game.state.start('Game');
            }
        }
    },
    collectUpgradeRune: function (player, upgradeRune) {
        this.collectedUpgradeRuneCountInThisLevel++;
        BouncingStars.collectSound.play();

        upgradeRune.destroy();
    },
    gameOver: function () {
        this.game.state.start('Shop');
        // this.game.state.start('GameOver');
    },
};
