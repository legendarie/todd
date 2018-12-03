//initialize the global variable
let viewListScene = null;

var viewListState = {

    /** The initial function to set up the scene for player interaction */

    preload: function() {

        //set viewListScene as a new instance of Scene
        viewListScene = new Scene;

        //load the background image into the state
        viewListScene.setBackground('fridgeDoor', 'assets/fridgeDoorbg.png');
    },

    /** Add the initial visual elements to the canvas */

    create: function() {

        //check that viewListScene is not still null
        if (viewListScene !== null) {

            //add background to the state and scale it
            var listBg = viewListScene.loadScene('fridgeDoor', 0.53);

            //add hand cursor to background to indicate to the player that it is interactable
            listBg.input.useHandCursor = true;

            //on click, the player returns to the kitchenState
            listBg.events.onInputUp.add(this.backToKitchen, this);
        }
    },

    /** Game state changes back to the kitchenState */

    backToKitchen: function() {
        game.state.start('kitchenState');
    }
};