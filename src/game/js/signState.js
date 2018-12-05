//establish the global variables
var back;
let signScene = null;

//initialize the state
var signState = {

    /** The initial functions to set up the scene for player interaction */

    preload: function() {

        //declare signScene to be an instance of a Scene, and load in the background image to the state
        signScene = new Scene;
        signScene.setBackground('sign', 'assets/signbg.png');
    },

    /** Add the initial visual elements to the canvas */

    create: function() {

        //check to make sure the signScene variable is not null
        if (signScene != null) {

            //load the background and scale it
            signScene.loadScene('sign', 0.5);

            //add a button to the entire screen that returns to the open reef when clicked
            this.backButton();
        }
    },

    /** All of the functions that create interactive buttons:
     * backButton switches states to the first reef scene */

    backButton: function() {

        //make the screen itself clickable. If clicked, it will call the changeState function
        back = signScene.addButton(0, 0, 1500, 1000, 0);
        back.events.onInputUp.add(this.changeState, this);
    },

    /** Change game state to openReefState */

    changeState: function() {

        game.state.start('openReefState');
    }
};