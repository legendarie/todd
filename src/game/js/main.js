//initialize the game and the canvas
var game = new Phaser.Game(1200, 690, Phaser.AUTO, 'game');

//load in all of the states that will be entered in the game
game.state.add('doorState', doorState);
game.state.add('openDoorState', openDoorState);

game.state.add('openReefState', openReefState);
game.state.add('signState', signState);

game.state.add('roadForkWGState', roadForkWGState);
game.state.add('roadForkState', roadForkState);
game.state.add('wormState', wormState);

game.state.add('yaDeadState', yaDeadState);

game.state.add('caveEntranceState', caveEntranceState);
game.state.add('caveStartState', caveStartState);

game.state.add('gearPuzzleState', gearPuzzleState);
game.state.add('workshopState', workshopState);

game.state.add('algaeHallState', algaeHallState);
game.state.add('algaeDudeState', algaeDudeState);

game.state.add('gardenState', gardenState);

game.state.add('penguinPuzzleState', penguinPuzzleState);

game.state.add('kitchenState', kitchenState);
game.state.add('viewListState', viewListState);
game.state.add('pantryPuzzleState', pantryPuzzleState);

game.state.add('fightState', fightState);
game.state.add('findingSanta', findingSanta);

//tell the game at which state to begin
game.state.start('doorState');
