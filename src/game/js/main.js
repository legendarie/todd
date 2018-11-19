var game = new Phaser.Game(1200, 690, Phaser.AUTO, 'game');

game.state.add('doorState', doorState);
game.state.add('openDoorState', openDoorState);
game.state.add('openReefState', openReefState);
game.state.add('signState', signState);
game.state.add('roadForkWGState', roadForkWGState);
game.state.add('roadForkState', roadForkState);
game.state.add('caveStartState', caveStartState);
game.state.add('gearPuzzleState', gearPuzzleState);
game.state.add('fightState', fightState);
game.state.add('findingSanta', findingSanta);

<<<<<<< HEAD
game.state.start('fightState');
=======
game.state.start('roadForkWGState');
>>>>>>> af1b15c6c2c9ed2b7f8fbf7b7fd5fd559d935e86
