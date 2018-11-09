//establish the global variables
var sign;
let signScene = null;

//initialize the state
var signState = {

    /**The initial functions to set up the scene for player interaction*/

    preload: function() {
        //declare signScene to be an instance of a Scene, and load in the background image to the state
        signScene = new Scene;
        signScene.setBackground('sign', 'assets/signbg.png');
    },

    create: function() {
        //check to make sure the signScene variable is not null
        if (signScene != null) {

            //load the background and scale it
            signScene.loadScene('sign', 0.9);

            //add a button to the entire screen that returns to the open reef when clicked
            this.backButton();
        }
    },

    /**All of the functions that create interactive buttons,
     * which for the sign just returns to openReefState*/

    backButton: function() {
        //make the screen itself sclickable. If clicked, it will call the changeState function
        thing = signScene.addButton(0, 0, 1500, 1000, 0);
        thing.events.onInputUp.add(this.changeState, this);
    },

    /**The function that switches to the next state, of which
     * there is only one*/

    changeState: function() {
        //change states to the next state
        game.state.start('openReefState', openReefState);
    }
};