var BouncingStars = BouncingStars || {};

// BouncingStars.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '', { preload: preload, create: create, update: update });
BouncingStars.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');

BouncingStars.game.state.add('Boot', BouncingStars.Boot);
BouncingStars.game.state.add('Preload', BouncingStars.Preload);
BouncingStars.game.state.add('MainMenu', BouncingStars.MainMenu);
BouncingStars.game.state.add('Shop', BouncingStars.Shop);
BouncingStars.game.state.add('Game', BouncingStars.Game);
BouncingStars.game.state.add('GameOver', BouncingStars.GameOver);

BouncingStars.game.state.start('Boot');


// function preload() {
//     BouncingStars.game.load.image('sky', 'assets/sky.png');
//     BouncingStars.game.load.image('ground', 'assets/platform.png');
//     BouncingStars.game.load.image('star', 'assets/star.png');
//     BouncingStars.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
//     BouncingStars.game.load.spritesheet('kaboom', 'assets/explosion.png', 128, 128);
//     BouncingStars.game.load.audio('explosionSound', 'assets/explosion.wav');
// }

// var player;
// var platforms;
// var cursors;
// var stars;
// var explosions;

// var score = 0;
// var scoreText;

// function create() {
//     //  We're going to be using physics, so enable the Arcade Physics system
//     BouncingStars.game.physics.startSystem(Phaser.Physics.ARCADE);

//     //  A simple background for our BouncingStars.game
//     var sky = BouncingStars.game.add.sprite(0, 0, 'sky');

//     sky.width = BouncingStars.game.width;
//     sky.scale.y = sky.scale.x;

//     // The player and its settings
//     player = BouncingStars.game.add.sprite(32, BouncingStars.game.world.height - 150, 'dude');

//     player.anchor.x = 0.5;
//     player.anchor.y = 0.5;

//     player.frame = 4;

//     //  Finally some stars to collect
//     stars = BouncingStars.game.add.group();

//     //  We will enable physics for any star that is created in this group
//     stars.enableBody = true;

//     for (var i = 0; i < 2; i++)
//     {
//         //  Create a star inside of the 'stars' group
//         var star = stars.create(BouncingStars.game.world.randomX, BouncingStars.game.world.randomY, 'star');
//         star.body.collideWorldBounds = true;

//         //  Let velocity do its thing
//         star.body.velocity.x = 2500;
//         star.body.velocity.y = 2500;

//         //  This just gives each star a slightly random bounce value
//         star.body.bounce.x = 0.97;
//         star.body.bounce.y = 0.97;
//     }

//     //  The score
//     scoreText = BouncingStars.game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

//     //  An explosion pool
//     explosions = BouncingStars.game.add.group();
//     explosions.createMultiple(30, 'kaboom');
//     explosions.forEach(setupStar, this);
// }

// function update() {
//     player.x = BouncingStars.game.input.mousePointer.x;
//     player.y = BouncingStars.game.input.mousePointer.y;

//     stars.forEach(function (star) {
//         if (checkOverlap(player, star)) {
//             collectStar(player, star);
//         }
//     });
// }

// function collectStar(player, star) {
//     var explosion = explosions.getFirstExists(false);
//     explosion.reset(star.body.x, star.body.y);
//     explosion.play('kaboom', 30, false, true);
//     BouncingStars.game.sound.play('explosionSound');

//     // Removes the star from the screen
//     star.destroy();

//     //  Add and update the score
//     score += 10;
//     scoreText.text = 'Score: ' + score;
// }

// function setupStar (star) {
//     star.anchor.x = 0.5;
//     star.anchor.y = 0.5;
//     star.animations.add('kaboom');
// }

// function checkOverlap(spriteA, spriteB) {
//     if (!spriteA || !spriteB) {
//         return false;
//     }

//     var boundsA = spriteA.getBounds();
//     var boundsB = spriteB.getBounds();

//     return Phaser.Rectangle.intersects(boundsA, boundsB);
// }

