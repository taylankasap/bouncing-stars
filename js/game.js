var BouncingStars = BouncingStars || {};

BouncingStars.level = 1;

BouncingStars.playerUpgrades = {
    'scale': 1
};

BouncingStars.upgradePoints = 0;

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

        // Finally some stars to collect
        this.stars = BouncingStars.game.add.group();

        //  We will enable physics for any star that is created in this group
        this.stars.enableBody = true;

        for (var i = 0; i < BouncingStars.level; i++) {
            var star = this.stars.create(BouncingStars.game.world.randomX, BouncingStars.game.world.randomY, 'star');
            star.body.collideWorldBounds = true;

            star.body.velocity.setTo((1500 + Math.random() * 1000) * this.game.rnd.pick([-1, 1]), (1500 + Math.random() * 1000) * this.game.rnd.pick([-1, 1]));

            star.body.bounce.setTo(0.5);

            star.anchor.setTo(0.5);

            star.body.angularVelocity = (200 + Math.random() * 400) * this.game.rnd.pick([-1, 1]);
        }
    },
    update: function () {
        BouncingStars.Player.x = BouncingStars.game.input.mousePointer.x;
        BouncingStars.Player.y = BouncingStars.game.input.mousePointer.y;

        this.game.physics.arcade.overlap(BouncingStars.Player, this.stars, this.collectStar, null, this);

        this.stars.forEach(function (star) {
            if (Math.abs(star.body.velocity.x) < 500 && Math.abs(star.body.velocity.y) < 500) {
                star.tint = 0xff5555;
            } else if (Math.abs(star.body.velocity.x) < 1000 && Math.abs(star.body.velocity.y) < 1000) {
                star.tint = 0xffaaaa;
            }
        });
    },
    collectStar: function (player, star) {
        BouncingStars.game.sound.play('collectSound');

        // Removes the star from the screen
        star.destroy();

        if (this.stars.children.length === 0) {
            BouncingStars.upgradePoints++;
            BouncingStars.level++;
            if (BouncingStars.level % 1 === 0) {
                this.game.state.start('Shop');
            } else {
                this.game.state.start('Game');
            }
        }
    },
};
