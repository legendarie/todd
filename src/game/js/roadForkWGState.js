//establish the global variables
var clickCount;
var sneakyWG;

let rfWGScene = null;

//initialize the state
var roadForkWGState = {

    /** The initial functions to set up the scene for player interaction */

    preload: function() {

        //declare rfWGScene to be an instance of a Scene, and load in the background image to the state
        rfWGScene = new Scene;
        rfWGScene.setBackground('roadForkWGbg', 'assets/roadForkWGbg.png');

        //reset the global clickCount variable
        clickCount = 0;
    },

    /**Add the visual elements to the canvas, and add the first line of text to the scene*/

    create: function() {
        //check to make sure that the scene has been created
        if (rfWGScene != null) {

            //load the background and scale it
            rfWGScene.loadScene('roadForkWGbg', 0.55);

            //add the text bar (with all universal settings), with the first line of text
            rfWGScene.addTextBar("Following the road, you come across a fork.");

            //create a button over the image of Wise Guy
            this.wiseGuyButton()
        }
    },

    /** All of the functions that create interactive buttons:
     * wiseGuyButton switches states to the Wise Guy conversation*/

    wiseGuyButton: function() {
        //make Wise Guy clickable. If clicked, call the changeState function
        sneakyWG = rfWGScene.addButton(450, 390, 185, 110, 0);
        sneakyWG.events.onInputUp.add(this.changeState, this);
    },

    /**The function that switches to the next state*/

    changeState: function() {
        //change states to roadForkState
        nextState = 'roadForkState';
        game.state.start('roadForkState');
    }
};