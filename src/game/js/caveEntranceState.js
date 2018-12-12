//initialize the global variables for this state
var clickCount;
var textBar;
var caveEntranceButton;

let caveEntranceScene = null;

var caveEntranceState = {

    /** The initial functions to set up the scene for player interaction*/

    preload: function() {
        //make caveEntranceScene an extension of Scene
        caveEntranceScene = new Scene;

        //load the background image into the state
        caveEntranceScene.setBackground('caveEntranceBg', 'assets/caveEntrance.png');

        //reset the global variable clickCount to 0
        clickCount = 0;
    },

    /**Add the visual elements to the canvas, and add the first line of text to the scene*/

    create: function() {
        //check to make sure that the scene has been created
        if (caveEntranceScene != null) {
            //add the background to the canvas and scale it
            caveEntranceScene.loadScene('caveEntranceBg', 0.5);

            //add the text bar (with all universal settings), with the first line of text
            caveEntranceScene.addTextBar("The path ends in a large cave entrance in the cliff.");

            //add a set of ellipses to the text box to indicate further messages
            caveEntranceScene.addEllipses();

            //when the text bar is clicked, call the changeText function
            textBar.events.onInputUp.add(this.changeText, this);
        }
    },

    /** All of the functions that change the text in the text box:
     * changeText runs through the first four lines of text*/

    changeText: function() {
        //only allow the clickCount to increment to 3
        if (clickCount < 3) {
            clickCount++;
            if (clickCount === 1) {
                caveEntranceScene.changeText("You can't see what is waiting for you in the cave.");
            } else if (clickCount === 2) {
                caveEntranceScene.changeText("You're not too thrilled about the idea of venturing into the darkness.");
            } else  {
                //once this script has been run through, make the cave mouth interactive
                caveEntranceScene.changeText("But it doesn't look like you really have a choice.");
                caveEntranceScene.removeEllipses();

                this.enterCaveButton();
            }
        }
    },

    /** All of the functions that create interactive buttons:
     * enterCaveButton creates a button over the cave mouth that switches to the next state*/

    enterCaveButton: function() {
        caveEntranceButton = caveEntranceScene.addButton(560, 250, 340, 350, 0);
        caveEntranceButton.events.onInputUp.add(this.changeState, this);
    },

    /**The function that switches to the next state*/

    changeState: function() {
        //change states to caveStartState
        nextState = 'caveStartState';
        game.state.start('caveStartState');
    }

};