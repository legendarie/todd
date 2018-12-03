//initialize the global variable
let yaDeadScene = null;

var yaDeadState = {

    /** The initial function to set up the scene for player interaction */

    preload: function() {

        //create a new instance of scene
        yaDeadScene = new Scene;

        //load the background image
        yaDeadScene.setBackground('youDied', 'assets/youDied.jpg');

    },

    /** Add the visuals to the scene. When the background is interacted with, the game state is changed */

    create: function() {

        //make sure that yaDeadScene is not still null
        if (yaDeadScene !== null) {

            //add the background image
            var yaDeadbg = yaDeadScene.loadScene('youDied', 2.3);

            //create the hand cursor over the background so the player knows it's interactable
            yaDeadbg.input.useHandCursor = true;

            //when the background is clicked, the player returns to the roadForkState
            yaDeadbg.events.onInputUp.add(this.changeState, this);

        }
    },

    /** Checks to see what value nextState has, then changes the state to whe state indicated */

    changeState: function() {
        if (nextState != null) {
            game.state.start(nextState);
        }
    }

};