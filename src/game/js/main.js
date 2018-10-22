var game = new Phaser.Game(1200, 720, Phaser.AUTO, 'game');

game.state.add('fightState', fightState);


game.state.start('fightState');