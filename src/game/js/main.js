var game = new Phaser.Game(1200, 690, Phaser.AUTO, 'game');

game.state.add('doorState', doorState);
game.state.add('openDoorState', openDoorState);
game.state.add('caveState', caveState);
game.state.add('algaeHallState', algaeHallState);
game.state.add('fightState', fightState);


game.state.start('algaeHallState');
