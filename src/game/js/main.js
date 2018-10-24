var game = new Phaser.Game(1200, 720, Phaser.AUTO, 'phaser-example', {preload: preload, create: create,
    update: update });

game.state.add('fightState', fightState);


game.state.start('fightState');
