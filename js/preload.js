BouncingStars.Preload = function () {};

BouncingStars.Preload.prototype = {
    preload: function () {
        // Show loader
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
        this.preloadBar.anchor.setTo(0.5);

        this.load.setPreloadSprite(this.preloadBar);

        // Load game assets
        BouncingStars.game.load.image('wall', 'assets/wall.png');
        BouncingStars.game.load.image('star', 'assets/star.png');
        BouncingStars.game.load.image('upgradeRune', 'assets/upgrade-rune.png');
        BouncingStars.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
        BouncingStars.game.load.audio('collectSound', 'assets/collect.wav');
        BouncingStars.game.load.audio('supernovaSound', 'assets/explosion.wav');
    },
    create: function () {
        this.state.start('MainMenu');
    }
};
