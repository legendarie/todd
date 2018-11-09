//establish the global variables
var clickCount;
var textBar;
var blueDial;
var brownDial;
var redDial;
var whiteDial;
var door;
let doorScene = null;

//initialize the state
var doorState = {

    /**The initial functions to set up the scene for player interaction*/

    preload: function() {
        //declare doorScene to be an instance of a Scene, and load in the background image to the state
        doorScene = new Scene;
        doorScene.setBackground('theDoor', 'assets/theDoorbg.png');
        //reset the global clickCount variable
        clickCount = 0;
    },

    create: function() {
        //check to make sure the doorScene variable is not null
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

    /**All of the functions that change the text in the text box,
     * including the initial changeText function, as well as the
     * different messages for clicking on different parts of the dial*/

    changeText: function() {
        //only increment the click count twice
        if (clickCount < 2) {
            clickCount++;
            if (clickCount === 1) {
                doorScene.changeText("To what color do you turn the dial?")
            } else {
                //change the text in the text bar, then create the dial buttons
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

    /**All of the functions that create interactive buttons,
     * including the dial buttons and the door button, which
     * calls the next state*/

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

    /**The function that switches to the next state, of which
     * there is only one*/

    changeState: function() {
        //change states to the open door
        game.state.start('openDoorState', openDoorState);
    }
};