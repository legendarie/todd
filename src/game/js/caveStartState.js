//establish the global variables
var clickCount;
var textBar;
var leftCave;
var rightCave;
let caveScene = null;

//initialize the state
var caveStartState = {

    /** The initial functions to set up the scene for player interaction */

    preload: function() {
        //declare caveScene to be an instance of a Scene, and load in the background image to the state
        caveScene = new Scene;
        caveScene.setBackground('cave', 'assets/caveStartbg.jpg');

        //reset the global clickCount variable
        clickCount = 0;
    },

    /** Add the initial visual elements to the canvas, and initiate the text sequence for this state */

    create: function() {
        //check to make sure the caveScene variable is not null
        if (caveScene != null) {

            //load the background and scale it
            caveScene.loadScene('cave', 0.5);

            //add the text bar (with all universal settings), with the first line of text
            caveScene.addTextBar("The entrance of the cave is dim," +
                " but you can just make out your surroundings.");

            //add a set of ellipses to the text box to indicate
            //further messages
            caveScene.addEllipses();

            //when the text bar is clicked, go to the changeText function
            textBar.events.onInputUp.add(this.changeText, this);
        }
    },

    /** Advances the text sequence when the user interacts with the text bar */

    changeText: function() {
        //only increment the click count four times, as it is unnecessary for it to increment more
        if (clickCount < 4) {
            clickCount++;
            if (clickCount === 1) {
                caveScene.changeText("Before you snake two dark tunnels.");
            } else if (clickCount === 2) {
                caveScene.changeText("To the left, you hear the rhythmic click" +
                " of metal on metal.");
            } else if (clickCount === 3) {
                caveScene.changeText("To the right, you can just barely make out a soft," +
                " green glow.");
            } else {
                //when clickCount equals 4, remove the ellipses to indicate to the player that there is no more
                //text at this point, then call the caveButtons function
                caveScene.changeText("Which tunnel do you choose to follow?");
                caveScene.removeEllipses();
                this.caveButtons();
            }
        }
    },

    /** All of the functions that create interactive buttons, which for this state are the two cave buttons
     * that switch to two separate states depending on which button is clicked */

    caveButtons: function() {
        //make the left tunnel clickable. If clicked, it will call the changeStatePuzzle function
        leftCave = caveScene.addButton(225, 250, 260, 300, 0);
        leftCave.events.onInputUp.add(this.changeStatePuzzle, this);

        //make the right tunnel clickable. If clicked, it will call the changeStateHall function
        rightCave = caveScene.addButton(625, 250, 260, 300, 0);
        rightCave.events.onInputUp.add(this.changeStateHall, this);
    },

    /** Changes the game state either to the gearPuzzleState or the algaeHallState */

    changeStatePuzzle: function() {
        //change states to the gear puzzle
        nextState = 'gearPuzzleState';
        game.state.start('gearPuzzleState');
    },

    changeStateHall: function() {
        //change states to the algae hallway
        nextState = 'algaeHallState';
        game.state.start('algaeHallState');
    }
};