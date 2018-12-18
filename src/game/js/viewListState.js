var listbg;

let viewListScene = null;

//initialize the state
var viewListState = {

    /**The initial function to set up the scene for player interaction*/

    preload: function() {

        //set viewListScene as a new instance of Scene
        viewListScene = new Scene;

        //load the background image into the state
        viewListScene.setBackground('fridgeDoor', 'assets/fridgeDoorbg.png');
    },

    /**Add the visual elements to the canvas*/

    create: function() {

        //check to make sure that the scene has been created
        if (viewListScene !== null) {

            //load the background and scale it
            listbg = viewListScene.loadScene('fridgeDoor', 0.53);

            //add hand cursor to background to indicate to the player that it is interactive
            listbg.input.useHandCursor = true;

            //if the background is clicked, change states
            listbg.events.onInputUp.add(this.backToKitchen, this);
        }
    },

    /**The functions that switches to the next state*/

    backToKitchen: function() {
        //change states to kitchenState
        game.state.start('kitchenState');
    }
};