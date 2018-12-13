//establish the global variables
var giftCount; //this keeps track of the number of gifts that the player has found throughout the game
var clickCount;
var textBar;
var blueDial;
var brownDial;
var redDial;
var whiteDial;
var door;
var nextState;
var buttonManager;

let doorScene = null;

//initialize the state
var doorState = {

    /** The initial functions to set up the scene for player interaction */

    preload: function() {
        //declare doorScene to be an instance of a Scene
        doorScene = new Scene;

        //load the background image into the state
        doorScene.setBackground('theDoor', 'assets/theDoorbg.png');

        //set up the global buttonManager (for puzzles)
        buttonManager = new ButtonManager();

        //reset the global clickCount variable
        clickCount = 0;

        //reset the global variable giftCount to 0
        giftCount = 0;
    },

    /**Add the visual elements to the canvas, and add the first line of text to the scene*/

    create: function() {
        //check to make sure that the scene has been created
        if (doorScene != null) {
            //load the background and scale it
            doorScene.loadScene('theDoor', 0.6);

            //add the text bar (with all universal settings), with the first line of text
            doorScene.addTextBar("You awaken in a room with nothing but a door with a dial.");

            //add a set of ellipses to the text box to indicate
            //further messages
            doorScene.addEllipses();

            //when the text bar is clicked, go to the changeText function
            textBar.events.onInputUp.add(this.changeText, this);
        }

    },

    /** All of the functions that change the text in the text box:
     * changeText runs through the first three lines of text
     * blueMessage displays when the blue panel is clicked
     * otherMessage directs the player to try another dial color (red, white, brown panels) */

    changeText: function() {
        //inquire about the dial on the door
        //only allow the clickCount to increment to 2
        if (clickCount < 2) {
            clickCount++;
            if (clickCount === 1) {
                doorScene.changeText("To what color do you turn the dial?")
            } else {
                //once this script has been run through, create the dial buttons
                doorScene.changeText("Choose a color.");
                doorScene.removeEllipses();

                this.dialButtons();
            }
        }
    },

    blueMessage: function() {
        //change the text in the text box, and create the door button
        doorScene.changeText("The door unlocks. Open the door.");
        this.doorButton();
    },

    otherMessage: function() {
        //change the text in the text box
        doorScene.changeText("The dial seems to be stuck... Choose another color.");
    },

    /** All of the functions that create interactive buttons:
     * dialButtons creates the different dial color options
     * doorButton switches states to the open door */

    dialButtons: function() {
        //make the blue part of the dial clickable. If clicked, it will call the blueMessage function
        blueDial = doorScene.addButton(540, 263, 60, 40, 0);
        blueDial.events.onInputUp.add(this.blueMessage, this);

        //make the brown part of the dial clickable. If clicked, it will call the otherMessage function
        brownDial = doorScene.addButton(584, 292, 40, 55, 0);
        brownDial.events.onInputUp.add(this.otherMessage, this);

        //make the red part of the dial clickable. If clicked, it will call the otherMessage function
        redDial = doorScene.addButton(540, 335, 60, 45, 0);
        redDial.events.onInputUp.add(this.otherMessage, this);

        //make the white part of the dial clickable. If clicked, it will call the otherMessage function
        whiteDial = doorScene.addButton(515, 292, 40, 55, 0);
        whiteDial.events.onInputUp.add(this.otherMessage, this);

    },

    doorButton: function() {
        //make the door clickable. If clicked, it will call the changeState function
        door = doorScene.addButton(450, 210, 250, 420, 0);
        door.events.onInputUp.add(this.changeState, this);
    },

    /**The function that switches to the next state*/

    changeState: function() {
        //change states to the open door
        // nextState = 'openDoorState';
        // game.state.start('openDoorState');

        //for testing:
        nextState = 'gearPuzzleState';
        game.state.start('gearPuzzleState');
    }
};
