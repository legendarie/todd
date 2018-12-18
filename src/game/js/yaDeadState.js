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

    /**Add the visuals to the scene. When the background is clicked, the game state is changed*/

    create: function() {

        //make sure that yaDeadScene is not still null
        if (yaDeadScene !== null) {

            //add the background image
            var yaDeadbg = yaDeadScene.loadScene('youDied', 2.3);

            //create the hand cursor over the background so the player knows it's interactive
            yaDeadbg.input.useHandCursor = true;

            //when the background is clicked, the player returns to the state set at 'nextState'
            yaDeadbg.events.onInputUp.add(this.changeState, this);

        }
    },

    /**If nextState has been set to a state, that state is started*/

    changeState: function() {
        if (nextState != null) {
            game.state.start(nextState);
        }
    }

};