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
BouncingStars.baseMineVelocity = BouncingStars.baseStarVelocity * 0.01;
var emitter;

BouncingStars.Game = function () {};

BouncingStars.Game.prototype = {
    create: function () {
        this.collectedUpgradeRuneCountInThisLevel = 0;

        // Shockwave created from massive star supernova
        this.shockwaves = BouncingStars.game.add.group();
        this.shockwaves.enableBody = true;

        BouncingStars.playerVelocity = store.get('upgrades.velocity') * 1000;
        BouncingStars.baseStarVelocity = 1500 + (store.get('level') * 10);

        // Create player
        BouncingStars.Player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'dude');

        this.game.physics.arcade.enable(BouncingStars.Player);

        BouncingStars.Player.anchor.setTo(0.5, 0.5);
        BouncingStars.Player.frame = 4;
        BouncingStars.Player.scale.setTo(store.get('upgrades.scale'));

        // Create an emitter
        emitter = this.game.add.emitter(0, 0, 3000);
        emitter.makeParticles('particle');

        // Attach the emitter to the sprite
        // BouncingStars.Player.addChild(emitter);

        // Position the emitter relative to the sprite's anchor location
        emitter.x = 0;
        emitter.y = 30;

        // setup options for the emitter
        emitter.gravity = 0;
        emitter.lifespan = 500;
        emitter.minParticleSpeed = new Phaser.Point(0, 0);
        emitter.maxParticleSpeed = new Phaser.Point(0, 0);

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

        this.mines = BouncingStars.game.add.group();
        this.mines.enableBody = true;

        for (var i = 0; i < Math.ceil(store.get('level') / 5); i++) {
            var mine = this.mines.create(BouncingStars.game.world.randomX, BouncingStars.game.world.randomY, 'mine');
            mine.body.collideWorldBounds = true;

            mine.body.velocity.setTo((BouncingStars.baseMineVelocity + Math.random() * BouncingStars.baseMineVelocity) * this.game.rnd.pick([-1, 1]), (BouncingStars.baseMineVelocity + Math.random() * BouncingStars.baseMineVelocity) * this.game.rnd.pick([-1, 1]));

            var bounce = Math.min(0.5 + (store.get('level') * 0.001), 0.95);
            mine.body.bounce.setTo(bounce);

            mine.anchor.setTo(0.5);

            mine.body.angularVelocity = (200 + Math.random() * 400) * this.game.rnd.pick([-1, 1]);
        }

        // Spawn upgrade runes time to time (chances are 1/10)
        if (this.game.rnd.pick([true, false, false, false, false, false, false, false, false, false])) {
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

        // Spawn massive stars time to time
        if (this.game.rnd.pick([true])) {
            this.massiveStars = BouncingStars.game.add.group();
            this.massiveStars.enableBody = true;

            for (var i = 0; i < 1; i++) {
                var massiveStar = this.massiveStars.create(BouncingStars.game.world.centerX, BouncingStars.game.world.centerY, 'massiveStar');
                massiveStar.body.collideWorldBounds = true;

                massiveStar.body.velocity.setTo((0.3 * Math.random() * BouncingStars.baseStarVelocity) * this.game.rnd.pick([-1, 1]), (0.3 * (Math.random() * BouncingStars.baseStarVelocity)) * this.game.rnd.pick([-1, 1]));

                massiveStar.body.bounce.setTo(1);

                massiveStar.anchor.setTo(0.5);

                massiveStar.body.angularVelocity = (200 + Math.random() * 400) * this.game.rnd.pick([-1, 1]);
            }
        }

        BouncingStars.supernovaSound = BouncingStars.game.add.audio('supernovaSound');
        BouncingStars.collectSound = BouncingStars.game.add.audio('collectSound');

        this.timer = this.game.time.create();
        this.timerEvent = this.timer.add(Phaser.Timer.SECOND * store.get('upgrades.time') * 0.7, this.remainingTimeAlert, this);
        this.timerEvent = this.timer.add(Phaser.Timer.SECOND * store.get('upgrades.time'), this.gameOver, this);
        this.timer.start();

        // Remaining time
        var style = {
            fill: '#ecf0f1'
        };
        this.remainingTimeText = this.game.add.text(25, 25, 'Remaining time: ' + store.get('upgrades.time').toFixed(1), style);
    },
    update: function () {
        this.game.physics.arcade.collide(this.stars, this.walls);
        this.game.physics.arcade.collide(this.mines, this.walls);
        this.game.physics.arcade.collide(this.stars, this.shockwaves);
        this.game.physics.arcade.collide(this.upgradeRunes, this.walls);
        this.game.physics.arcade.collide(BouncingStars.Player, this.walls);

        BouncingStars.Player.rotation = this.game.physics.arcade.moveToPointer(BouncingStars.Player, BouncingStars.playerVelocity) + Math.PI / 2;
        // emitter.rotation = (this.game.physics.arcade.angleToPointer(emitter) + Math.PI / 2);
        emitter.x = BouncingStars.Player.x;
        emitter.y = BouncingStars.Player.y;

        // If it's overlapping the mouse, don't move any more
        if (Phaser.Rectangle.contains(BouncingStars.Player.body, this.game.input.x, this.game.input.y)) {
            BouncingStars.Player.body.velocity.setTo(0, 0);
        } else {
            // Emit a single particle every frame that the player is moving
            emitter.emitParticle();
        }

        this.game.physics.arcade.overlap(BouncingStars.Player, this.stars, this.collectStar, null, this);
        this.game.physics.arcade.overlap(BouncingStars.Player, this.mines, this.gameOver, null, this);
        this.game.physics.arcade.overlap(BouncingStars.Player, this.upgradeRunes, this.collectUpgradeRune, null, this);
        this.game.physics.arcade.overlap(this.massiveStars, this.walls, this.supernova, null, this);
        // this.game.physics.arcade.overlap(this.shockwaves, this.stars, this.shockwaveEffect, null, this);

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

            store.set('totalUpgradePoints', store.get('totalUpgradePoints') + 1 + this.collectedUpgradeRuneCountInThisLevel * 10);
            store.set('remainingUpgradePoints', store.get('remainingUpgradePoints') + 1 + this.collectedUpgradeRuneCountInThisLevel * 10);

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
    supernova: function (massiveStar, wall) {
        BouncingStars.supernovaSound.play();

        var shockwave = this.shockwaves.create(massiveStar.x, massiveStar.y, 'shockwave');
        shockwave.body.immovable = true;
        shockwave.body.bounce.setTo(10);
        shockwave.anchor.setTo(0.5, 0.5);
        shockwave.scale.setTo(0.1);
        shockwave.alpha = 0.1;
        console.log(shockwave);

        var tween = this.game.add.tween(shockwave.scale).to({ x: 20, y: 20 }, 10000, Phaser.Easing.Default, true);
        console.log(tween);
        tween.onComplete.add(function () {
            shockwave.destroy();
        });

        // this.stars.forEach(function (star) {
        //     var distance = BouncingStars.game.physics.arcade.distanceBetween(star, massiveStar);

        //     setTimeout(function () {
        //         // Check if star is still alive
        //         if (!star.alive) {
        //             return;
        //         }

        //         var angle = BouncingStars.game.physics.arcade.angleBetween(star, massiveStar);
        //         var force = -1000;
        //         star.body.velocity.x += Math.cos(angle) * force;
        //         star.body.velocity.y += Math.sin(angle) * force;
        //     }, distance);
        // });

        massiveStar.kill();
    },
    shockwaveEffect: function (shockwave, star) {
        // var angle = BouncingStars.game.physics.arcade.angleBetween(star, massiveStar);
        var angle = 3;
        var force = -1000;
        star.body.velocity.x += Math.cos(angle) * force;
        star.body.velocity.y += Math.sin(angle) * force;
    },
    gameOver: function () {
        this.game.state.start('Shop');
        // this.game.state.start('GameOver');
    },
    remainingTimeAlert: function () {
        this.remainingTimeText.setStyle({fill: '#ff0000'});
    }
};
