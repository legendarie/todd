//establish the global variables
var clickCount;
var textBar;
var leftCave;
var rightCave;

let caveScene = null;

//initialize the state
var caveStartState = {

    /**The initial functions to set up the scene for player interaction*/

    preload: function() {
        //declare caveScene to be an instance of Scene
        caveScene = new Scene;

        //load in the background image to the state
        caveScene.setBackground('caveStartbg', 'assets/caveStartbg.jpg');

        //reset the global clickCount variable
        clickCount = 0;
    },

    /**Add the visual elements to the canvas, and add the first line of text to the scene*/

    create: function() {
        //check to make sure that the scene has been created
        if (caveScene != null) {

            //load the background and scale it
            caveScene.loadScene('caveStartbg', 0.54);

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

    /** All of the functions that change the text in the text box:
     * changeText runs through the first five lines of text*/

    changeText: function() {
        //describe the two tunnels in the cave
        //only allow the clickCount to increment to 4
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
                //once the script has been run through, make the tunnels interactive
                caveScene.changeText("Which tunnel do you choose to follow?");
                caveScene.removeEllipses();

                this.caveButtons();
            }
        }
    },

    /** All of the functions that create interactive buttons:
     * caveButtons creates a button over each cave, to switch to either of two states*/

    caveButtons: function() {
        //make the left tunnel clickable. If clicked, it will change states to the gear puzzle
        leftCave = caveScene.addButton(250, 250, 270, 330, 0);
        leftCave.events.onInputUp.add(this.changeStatePuzzle, this);

        //make the right tunnel clickable. If clicked, it will change states to the algae hall
        rightCave = caveScene.addButton(690, 250, 270, 335, 0);
        rightCave.events.onInputUp.add(this.changeStateHall, this);
    },

    /**The functions that switch to the next state, of which there are two*/

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