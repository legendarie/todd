var textBar;
var openDoor;
let openDoorScene = null;

var openDoorState = {

    /**The initial functions to set up the scene for player interaction*/

    preload: function() {
        //declare openDoorScene to be an instance of a Scene, and load in the background image to the state
        openDoorScene = new Scene;
        openDoorScene.setBackground('openDoor', 'assets/openDoorbg.png');
        clickCount = 0;
    },

    create: function() {
        //check to make sure the doorScene variable is not null
        if (openDoorScene != null) {

            //load the background and scale it
            openDoorScene.loadScene('openDoor', 0.6);

            //add the text bar (with all universal settings), with the first line of text
            openDoorScene.addTextBar("The room begins to fill with water.");

            //when the text bar is clicked, go to the changeText function
            textBar.events.onInputUp.add(this.changeText, this);
        }
    },

    /**All of the functions that change the text in the text box,
     * which for this state is just the changeText function*/

    changeText: function() {
        //make sure that the text and button additions occur only once
        if (clickCount < 1) {
            clickCount++;
            if (clickCount === 1) {
            //reset the text  in the text box
            openDoorScene.changeText("The water is now above your head," +
                " but for some reason, you can still breathe.");

            //create a button to change to the next scene
            this.doorButton();
            }
        }
    },

    /**All of the functions that create interactive buttons,
     * which for this state is just the door button that calls
     * the next state*/

    doorButton: function() {
        //make the open door clickable. If the region is clicked, call the changeState function
        openDoor = openDoorScene.addButton(500, 100, 280, 460, 0);
        openDoor.events.onInputUp.add(this.changeState, this);
    },

    /**The function that switches to the next state, of which
     * there is only one*/

    changeState: function () {
      game.state.start('caveState', caveState);
    }
};