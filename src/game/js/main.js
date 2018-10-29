var game = new Phaser.Game(1200, 690, Phaser.AUTO, 'game');

game.state.add('scene1', scene1);
game.state.add('fightState', fightState);


game.state.start('scene1');
