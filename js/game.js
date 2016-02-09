var BouncingStars = BouncingStars || {};

BouncingStars.level = 1;

BouncingStars.playerUpgrades = {
    'scale': 1
};

BouncingStars.upgradePoints = 0;

BouncingStars.baseStarVelocity = 1500 + (BouncingStars.level * 10);

BouncingStars.Game = function () {};

BouncingStars.Game.prototype = {
    create: function () {

        // Create player
        BouncingStars.Player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'dude');

        this.game.physics.arcade.enable(BouncingStars.Player);

        BouncingStars.Player.anchor.x = 0.5;
        BouncingStars.Player.anchor.y = 0.5;

        BouncingStars.Player.frame = 4;

        BouncingStars.Player.scale.setTo(BouncingStars.playerUpgrades.scale);

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

            star.body.bounce.setTo(0.5 + (BouncingStars.level * 0.01));

            star.anchor.setTo(0.5);

            star.body.angularVelocity = (200 + Math.random() * 400) * this.game.rnd.pick([-1, 1]);
        }

        this.game.time.events.add(Phaser.Timer.SECOND * 10, this.gameOver, this);
    },
    update: function () {
        this.game.physics.arcade.collide(this.stars, this.walls);
        BouncingStars.Player.x = BouncingStars.game.input.mousePointer.x;
        BouncingStars.Player.y = BouncingStars.game.input.mousePointer.y;

        this.game.physics.arcade.overlap(BouncingStars.Player, this.stars, this.collectStar, null, this);
    },
    collectStar: function (player, star) {
        BouncingStars.game.sound.play('collectSound');

        star.destroy();

        if (this.stars.children.length === 0) {
            BouncingStars.upgradePoints++;
            BouncingStars.level++;
            BouncingStars.baseStarVelocity = 1500 + (BouncingStars.level * 10);
            if (BouncingStars.level % 1 === 0) {
                this.game.state.start('Shop');
            } else {
                this.game.state.start('Game');
            }
        }
    },
    gameOver: function () {
        this.game.state.start('GameOver');
    },
};
