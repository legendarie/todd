//establish the global variables
var clickCount;
var textBar;
var exit;
let algaeHallScene = null;

//initialize the state
var algaeHallState = {

    /** The initial functions to set up the scene for player interaction */

    preload: function() {
        //declare scene to be an instance of a Scene, and load in the background image to the state
        algaeHallScene = new Scene;
        algaeHallScene.setBackground('algaeHallbg', 'assets/algaeHallbg.png');

        //reset the global clickCount variable
        clickCount = 0;
    },

    create: function() {
        //check to make sure the scene variable is not null
        if (algaeHallScene != null) {

            //load the background and scale it
            algaeHallScene.loadScene('algaeHallbg', 0.9);

            //add the text bar (with all universal settings), with the first line of text
            algaeHallScene.addTextBar("The right tunnel twists and turns.");

            //add a set of ellipses to the text box to indicate further messages
            algaeHallScene.addEllipses();

            //when the text bar is clicked, call the changeText function
            textBar.events.onInputUp.add(this.changeText, this);
        }
    },

    /** All of the functions that change the text in the text box:
     * changeText runs through the first six lines of text */

    changeText: function() {
        //only increment the click count so many times
        if (clickCount < 4) {
            clickCount++;
            if (clickCount === 1) {
                algaeHallScene.changeText("Patches of glowing, green algae grow along the walls.")
            } else if (clickCount === 2) {
                algaeHallScene.changeText("They light your way as you walk along.")
            } else if (clickCount === 3) {
                algaeHallScene.changeText("The farther you go, the bigger the swaths become.")
            } else if (clickCount === 3) {
                algaeHallScene.changeText("They seem to buzz with a pleasant energy.")
            } else {
                //change the text in the text bar, then spawn the button to leave the scene
                algaeHallScene.changeText("It isn't long before the passage opens up.");
                algaeHallScene.removeEllipses();
                this.exitButton();
            }
        }
    },

    /** All of the functions that create interactive buttons:
     * exitButton makes the screen interactive (switching to the next scene) */

    exitButton: function() {
        //make the screen clickable. If the screen is clicked, call the changeState function
        exit = algaeHallScene.addButton(0, 0, 1500, 1000, 0.2);
        exit.events.onInputUp.add(this.changeState, this);
    },

    /**The function that switches to the next state*/

    changeState: function() {
        //change states to the next state
        game.state.start('doorState');
    }
};