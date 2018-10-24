var game = new Phaser.Game(1200, 720, Phaser.AUTO, 'phaser-example', { create: create , update: update});

game.state.add('fightState', fightState);


game.state.start('fightState');
