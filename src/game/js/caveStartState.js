//establish the global variables
var clickCount;
var textBar;
var leftCave;
var rightCave;
let caveScene = null;

//initialize the state
var caveStartState = {

    preload: function() {
        //declare caveScene to be an instance of a Scene, and load in the background image to the state
        caveScene = new Scene;
        caveScene.setBackground('cave', 'assets/caveStartbg.jpg');

        //reset the global clickCount variable
        clickCount = 0;
    },

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

    changeText: function() {
        //only increment the click count four times
        if (clickCount < 4) {
            clickCount++;
            if (clickCount === 1) {
                caveScene.changeText("Before you snake two dark tunnels.")
            } else if (clickCount === 2) {
                caveScene.changeText("To the left, you hear the rhythmic click" +
                " of metal on metal.")
            } else if (clickCount === 3) {
                caveScene.changeText("To the right, you can just barely make out a soft," +
                " green glow.")
            } else {
                //change the text in the text bar, then create the tunnel buttons
                caveScene.changeText("Which tunnel do you choose to follow?");
                caveScene.removeEllipses();
                this.caveButtons();
            }
        }
    },

    /**All of the functions that create interactive buttons,
     * which for this state are the two cave buttons that switch
     * to two separate states*/

    caveButtons: function() {
        //make the left tunnel clickable. If clicked, it will call the changeStatePuzzle function
        leftCave = caveScene.addButton(225, 250, 260, 300, 0);
        leftCave.events.onInputUp.add(this.changeStatePuzzle, this);

        //make the right tunnel clickable. If clicked, it will call the changeStateHall function
        rightCave = caveScene.addButton(625, 250, 260, 300, 0);
        rightCave.events.onInputUp.add(this.changeStateHall, this);
    },

    /**The functions that switch to the next state, of which
     * there are two; one for each of the tunnels*/

    changeStatePuzzle: function() {
        //change states to the gear puzzle
        game.state.start('gearPuzzleState', gearPuzzleState);
    },

    changeStateHall: function() {
        //change states to the algae hallway
        game.state.start('openDoorState', openDoorState);
    }
};