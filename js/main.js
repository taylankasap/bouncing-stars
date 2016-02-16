var BouncingStars = BouncingStars || {};

BouncingStars.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');

BouncingStars.game.state.add('Boot', BouncingStars.Boot);
BouncingStars.game.state.add('Preload', BouncingStars.Preload);
BouncingStars.game.state.add('MainMenu', BouncingStars.MainMenu);
BouncingStars.game.state.add('Shop', BouncingStars.Shop);
BouncingStars.game.state.add('Game', BouncingStars.Game);
BouncingStars.game.state.add('GameOver', BouncingStars.GameOver);

BouncingStars.game.state.start('Boot');
