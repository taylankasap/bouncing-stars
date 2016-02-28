var BouncingStars = BouncingStars || {};

BouncingStars.level = 1;

BouncingStars.initialUpgrades = {
    'scale': 1,
    'velocity': 1,
    'time': 10
};
function cloneObject(obj) {
    return JSON.parse(JSON.stringify(obj));
}
BouncingStars.upgrades = cloneObject(BouncingStars.initialUpgrades);

BouncingStars.upgradePoints = 0;

BouncingStars.playerVelocity = BouncingStars.upgrades.velocity * 1000;
BouncingStars.baseStarVelocity = 1500 + (BouncingStars.level * 10);

BouncingStars.Game = function () {};

BouncingStars.Game.prototype = {
    create: function () {
        BouncingStars.playerVelocity = BouncingStars.upgrades.velocity * 1000;
        BouncingStars.baseStarVelocity = 1500 + (BouncingStars.level * 10);

        // Create player
        BouncingStars.Player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'dude');

        this.game.physics.arcade.enable(BouncingStars.Player);

        BouncingStars.Player.anchor.setTo(0.5, 0.5);
        BouncingStars.Player.frame = 4;
        BouncingStars.Player.scale.setTo(BouncingStars.upgrades.scale);

        // Walls
        this.walls = BouncingStars.game.add.group();
        this.walls.enableBody = true;
        var wall = this.walls.create(0, 0, 'wall');
        wall.width = 25;
        wall.height = this.game.world.height;
        wall.body.immovable = true;
        var wall = this.walls.create(this.game.world.width - 25, 0, 'wall');
        wall.width = 25;
        wall.height = this.game.world.height;
        wall.body.immovable = true;
        var wall = this.walls.create(0, 0, 'wall');
        wall.width = this.game.world.width;
        wall.height = 25;
        wall.body.immovable = true;
        var wall = this.walls.create(0, this.game.world.height - 25, 'wall');
        wall.width = this.game.world.width;
        wall.height = 25;
        wall.body.immovable = true;

        // Finally some stars to collect
        this.stars = BouncingStars.game.add.group();

        //  We will enable physics for any star that is created in this group
        this.stars.enableBody = true;

        for (var i = 0; i < BouncingStars.level; i++) {
            var star = this.stars.create(BouncingStars.game.world.randomX, BouncingStars.game.world.randomY, 'star');
            star.body.collideWorldBounds = true;

            star.body.velocity.setTo((BouncingStars.baseStarVelocity + Math.random() * BouncingStars.baseStarVelocity) * this.game.rnd.pick([-1, 1]), (BouncingStars.baseStarVelocity + Math.random() * BouncingStars.baseStarVelocity) * this.game.rnd.pick([-1, 1]));

            var bounce = Math.min(0.5 + (BouncingStars.level * 0.001), 0.95);
            star.body.bounce.setTo(bounce);

            star.anchor.setTo(0.5);

            star.body.angularVelocity = (200 + Math.random() * 400) * this.game.rnd.pick([-1, 1]);
        }

        BouncingStars.collectSound = BouncingStars.game.add.audio('collectSound');

        this.timer = this.game.time.create();
        this.timerEvent = this.timer.add(Phaser.Timer.SECOND * BouncingStars.upgrades.time, this.gameOver, this);
        this.timer.start();

        // Remaining time
        var style = {
            fill: '#ecf0f1'
        };
        this.remainingTimeText = this.game.add.text(50, 50, 'Remaining time: ' + BouncingStars.upgrades.time.toFixed(1), style);
    },
    update: function () {
        this.game.physics.arcade.collide(this.stars, this.walls);

        BouncingStars.Player.rotation = this.game.physics.arcade.moveToPointer(BouncingStars.Player, BouncingStars.playerVelocity) + Math.PI / 2;

        // If it's overlapping the mouse, don't move any more
        if (Phaser.Rectangle.contains(BouncingStars.Player.body, this.game.input.x, this.game.input.y))
        {
            BouncingStars.Player.body.velocity.setTo(0, 0);
        }

        this.game.physics.arcade.overlap(BouncingStars.Player, this.stars, this.collectStar, null, this);

        this.remainingTimeText.setText('Remaining time: ' + ((this.timerEvent.delay - this.timer.ms) / 1000).toFixed(1));
    },
    collectStar: function (player, star) {
        BouncingStars.collectSound.play();

        star.destroy();

        if (this.stars.children.length === 0) {
            // Set new highscore
            if (BouncingStars.level > localStorage.highestScore) {
                localStorage.highestScore = BouncingStars.level;
            }
            BouncingStars.upgradePoints++;
            BouncingStars.level++;
            if (BouncingStars.level % 1 === 0) {
                this.game.state.start('Shop');
            } else {
                this.game.state.start('Game');
            }
        }
    },
    gameOver: function () {
        this.game.state.start('Shop');
        // this.game.state.start('GameOver');
    },
};
