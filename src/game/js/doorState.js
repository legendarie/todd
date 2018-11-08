//establish the global variables
var scene1bg;
var clickCount = 0;
var blueDial;
var brownDial;
var redDial;
var whiteDial;
var door;
let doorScene = null;

//initialize the state
var doorState = {

    preload: function() {
        //declare doorScene to be an instance of a Scene, and load in the background image to the state
        doorScene = new Scene;
        doorScene.setBackground('scene1bg', 'assets/scene1bg.png');

    },

    create: function() {
        //check to make sure the doorScene variable is not null
        if (doorScene != null) {

            //load the background and scale it
            doorScene.loadScene('scene1bg', 0.6);

            //add the text bar (with all universal settings), with the first line of text
            doorScene.addTextBar("You awaken in a room with nothing but a door with a dial.");

            //when the text bar is clicked, go to the changeText function
            textBar.events.onInputUp.add(this.changeText, this);
        }

    },

    changeText: function() {
        //only increment the click count twice
        if (clickCount < 2) {
            clickCount++;
            if (clickCount === 1) {
                doorScene.changeText("To what color do you turn the dial?")
            } else {
                //change the text in the text bar, then call the dialClicks function
                doorScene.changeText("Choose a color.");
                this.dialClicks();
            }
        }
    },

    dialClicks: function() {
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

    blueMessage: function() {
        //reset the text in the text box
        doorScene.changeText("The door unlocks. Open the door.");

        //make the door clickable. If the region is clicked, call the changeState function
        door = doorScene.addButton(450, 210, 250, 420, 0);
        door.events.onInputUp.add(this.changeState, this);
    },

    otherMessage: function() {
        //reset the text in the text box
        doorScene.changeText("The dial seems to be stuck... Choose another color.");
    },

    changeState: function() {
        //change states to openDoorState
        game.state.start('openDoorState', openDoorState);
    }
};