//initiate the global variables
var textBar;
var openDoor;
let openDoorScene = null;

var openDoorState = {

    /** The initial functions to set up the scene for player interaction */

    preload: function() {
        //declare openDoorScene to be an instance of Scene
        openDoorScene = new Scene;

        //load in the background image to the state
        openDoorScene.setBackground('openDoor', 'assets/openDoorbg.png');

        //reset the global clickCount variable
        clickCount = 0;
    },

    /**Add the visual elements to the canvas, and add the first line of text to the scene*/

    create: function() {

        //check to make sure that the scene has been created
        if (openDoorScene != null) {

            //load the background and scale it
            openDoorScene.loadScene('openDoor', 0.6);

            //add the text bar (with all universal settings), with the first line of text
            openDoorScene.addTextBar("The room begins to fill with water.");

            //add a set of ellipses to the text box to indicate
            //further messages
            openDoorScene.addEllipses();

            //when the text bar is clicked, go to the changeText function
            textBar.events.onInputUp.add(this.changeText, this);
        }
    },

    /** All of the functions that change the text in the text box:
     * changeText runs through the first two lines of text */

    changeText: function() {
        //only allow clickCount to increment once
        if (clickCount < 1) {
            clickCount++;
            if (clickCount === 1) {
                //switch the text and create the button over the door
                openDoorScene.changeText("The water is now above your head," +
                    " but for some reason, you can still breathe.");
                openDoorScene.removeEllipses();

                this.doorButton();
            }
        }
    },

    /**All of the functions that create interactive buttons:
     *doorButton creates a button to switch to the next state*/

    doorButton: function() {
        //make the open door clickable. If the region is clicked, change states
        openDoor = openDoorScene.addButton(500, 100, 280, 460, 0);
        openDoor.events.onInputUp.add(this.changeState, this);
    },

    /**The function that switches to the next state*/

    changeState: function () {
        //change states to openReefState
        nextState = 'openReefState';
        game.state.start('openReefState', openReefState);
    }
};