var BouncingStars = BouncingStars || {};

BouncingStars.Boot = function () {};

// Setting game configuration and loading the assets for the loading screen
BouncingStars.Boot.prototype = {
    preload: function () {
        // Assets we'll use in the gloading screeng
        this.load.image('logo', 'assets/logo.png');
        this.load.image('preloadbar', 'assets/preloader-bar.png');
    },
    create: function () {
        // Loading screen will have a white background
        this.game.stage.backgroundColor = '#ecf0f1';

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // Scaling options
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.minWidth = 240;
        this.scale.minHeight = 170;
        this.scale.maxWidth = 2880;
        this.scale.maxHeight = 1920;

        // Have the game centered horizontally
        this.scale.pageAlignHorizontally = true;

        this.state.start('Preload');
    }
};
