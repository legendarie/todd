//establish the global variables
var clickCount;
var textBar;
var exit;

let algaeHallScene = null;

//initialize the state
var algaeHallState = {

    /** The initial functions to set up the scene for player interaction*/

    preload: function() {
        //declare algaeHallScene to be an instance of Scene
        algaeHallScene = new Scene;

        //load the background image into the state
        algaeHallScene.setBackground('algaeHallbg', 'assets/algaeHallbg.png');

        //reset the global clickCount variable
        clickCount = 0;
    },

    /**Add the visual elements to the canvas, and add the first line of text to the scene*/

    create: function() {
        //check to make sure that the scene has been created
        if (algaeHallScene != null) {

            //load the background and scale it
            algaeHallScene.loadScene('algaeHallbg', 0.32);

            //add the text bar (with all universal settings), with the first line of text
            algaeHallScene.addTextBar("The right tunnel twists and turns.");

            //add a set of ellipses to the text box to indicate further messages
            algaeHallScene.addEllipses();

            //when the text bar is clicked, call the changeText function
            textBar.events.onInputUp.add(this.changeText, this);
        }
    },

    /** All of the functions that change the text in the text box:
     * changeText runs through the first six lines of text*/

    changeText: function() {
        //describe the algae-covered passageway
        //only allow the clickCount to increment to 5
        if (clickCount < 5) {
            clickCount++;
            if (clickCount === 1) {
                algaeHallScene.changeText("Patches of glowing, green algae grow along the walls.")
            } else if (clickCount === 2) {
                algaeHallScene.changeText("They light your way as you walk along.")
            } else if (clickCount === 3) {
                algaeHallScene.changeText("The farther you go, the bigger the swaths become.")
            } else if (clickCount === 4) {
                algaeHallScene.changeText("They seem to buzz with a pleasant energy.")
            } else {
                //once this script has been run through, spawn the button to leave the scene
                algaeHallScene.changeText("It isn't long before the passage opens up.");
                algaeHallScene.removeEllipses();
                this.exitButton();
            }
        }
    },

    /** All of the functions that create interactive buttons:
     * exitButton makes the screen interactive (switching to the next scene)*/

    exitButton: function() {
        //make the screen clickable. If the screen is clicked, call the changeState function
        exit = algaeHallScene.addButton(0, 0, 1500, 1000, 0);
        exit.events.onInputUp.add(this.changeState, this);
    },

    /**The function that switches to the next state*/

    changeState: function() {
        //change states to riddleRoomState
        nextState = 'riddleRoomState';
        game.state.start('riddleRoomState');
    }
};