//initialize the game and the canvas
var game = new Phaser.Game(1200, 690, Phaser.AUTO, 'game');

//load in all of the states that will be entered in the game
//beginning section:
game.state.add('doorState', doorState);
game.state.add('openDoorState', openDoorState);
game.state.add('openReefState', openReefState);
game.state.add('signState', signState);
game.state.add('roadForkWGState', roadForkWGState);
game.state.add('roadForkState', roadForkState);

//optional death-by-worm route:
game.state.add('wormState', wormState);

//start of the cave section:
game.state.add('caveEntranceState', caveEntranceState);
game.state.add('caveStartState', caveStartState);

//the left tunnel (with a choice puzzle and a filler state):
game.state.add('gearPuzzleState', gearPuzzleState);
game.state.add('workshopState', workshopState);

//the right tunnel (with a filler state, a riddle puzzle, and a bonus gift state):
game.state.add('algaeHallState', algaeHallState);
game.state.add('riddleRoomState', riddleRoomState);
game.state.add('algaeDudeState', algaeDudeState);

//the converging point of the two tunnels and the beginning of another branch:
game.state.add('transitionCaveState', transitionCaveState);
game.state.add('gardenState', gardenState);

//the right cavern route (with a gem puzzle and a choice puzzle):
game.state.add('eelState', eelState);
game.state.add('gemGame2', gemGame2);
game.state.add('penguinPuzzleState', penguinPuzzleState);

//the left door route (with a three-state "find the hidden items" puzzle):
game.state.add('kitchenState', kitchenState);
game.state.add('viewListState', viewListState);
game.state.add('pantryPuzzleState', pantryPuzzleState);
game.state.add('secretRoomState', secretRoomState);

//the final encounter (with a preparatory scene, a "find santa" minigame,
//and the santa fight:
game.state.add('santaExpositionState', santaExpositionState);
game.state.add('findingSanta', findingSanta);
game.state.add('fightState', fightState);

//the death state:
game.state.add('yaDeadState', yaDeadState);

//the state that the game begins with:
game.state.start('findingSanta');

