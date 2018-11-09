var textBar;
var openDoor;
let openDoorScene = null;

var openDoorState = {

    preload: function() {
        //declare openDoorScene to be an instance of a Scene, and load in the background image to the state
        openDoorScene = new Scene;
        openDoorScene.setBackground('scene2bg', 'assets/openDoorbg.png');

    },

    create: function() {
        //check to make sure the doorScene variable is not null
        if (openDoorScene != null) {

            //load the background and scale it
            openDoorScene.loadScene('scene2bg', 0.6);

            //add the text bar (with all universal settings), with the first line of text
            openDoorScene.addTextBar("The room begins to fill with water.");

            //when the text bar is clicked, go to the changeText function
            textBar.events.onInputUp.add(this.changeText, this);
        }

    },

    changeText: function() {
        //reset the text  in the text box
        openDoorScene.changeText("The water is now above your head," +
        " but for some reason, you can still breathe.");

        //make the open door clickable. If the region is clicked, call the changeState function
        openDoor = doorScene.addButton(500, 100, 280, 460, 0);
        openDoor.events.onInputUp.add(this.changeState, this);
    },

    changeState: function () {
      game.state.start('caveState', caveState);
    }
};