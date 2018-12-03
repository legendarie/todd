//initialize the global variables for this state
var clickCount;
var textBar;
let caveEntranceScene = null;

var caveEntranceState = {

    /** The initial functions to set up the scene for player interaction */

    preload: function() {
        //make caveEntranceScene an extension of the Scene
        caveEntranceScene = new Scene;

        //load the background image into the state
        caveEntranceScene.setBackground('caveEntranceBg', 'assets/caveEntrance.png');

        //reset the global variable clickCount to 0
        clickCount = 0;
    },

    /** Add the initial visual elements to the canvas and begin the text sequence */

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

    /** Update the text sequence as the user interacts with the text bar */

    changeText: function() {
        //only allow the clickCount to increment to 3 (unnecessary that it increments more)
        if (clickCount < 3) {
            clickCount++;
            if (clickCount === 1) {
                caveEntranceScene.changeText("You can't see what is waiting for you in the cave.");
            } else if (clickCount === 2) {
                caveEntranceScene.changeText("You're not too thrilled about the idea of venturing into the darkness.");
            } else  {
                //once the clickCount is 3, remove the ellipses to indicate that there is no more text at this
                //time. Then, call the enterCaveButton function to allow the user to enter the cave
                caveEntranceScene.changeText("But it doesn't look like you really have a choice.");
                caveEntranceScene.removeEllipses();
                this.enterCaveButton();
            }
        }
    },

    /** Create the button over the cave entrance and allow the user to interact with it. When that occurs,
     * call the changeState function */

    enterCaveButton: function() {
        var caveEntranceButton = caveEntranceScene.addButton(560, 250, 340, 350, 0);
        caveEntranceButton.events.onInputUp.add(this.changeState, this);
    },

    /** Change the game state to caveStartState */

    changeState: function() {
        game.state.start('caveStartState');
    }

};