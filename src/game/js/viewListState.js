let viewListScene = null;

var viewListState = {

    /** The initial function to set up the scene for player interaction */

    preload: function() {

        //create a new instance of Scene
        viewListScene = new Scene;

        //load the background image into the state
        viewListScene.setBackground('fridgeDoor', 'assets/fridgeDoorbg.png');

    },

    /** Add the visual elements to the scene; in this state, there is only a background. When the background is
     * clicked, call the next function */

    create: function() {

        //add background to the state and scale it
        var listBg = viewListScene.loadScene('fridgeDoor', 0.53);

        //add hand cursor to background to indicate to the player that it is interactable
        listBg.input.useHandCursor = true;

        //on click, the player returns to the kitchenState
        listBg.events.onInputUp.add(this.backToKitchen, this);

    },

    /** Game state changes back to the kitchenState */

    backToKitchen: function() {
        game.state.start('kitchenState');
    }
};