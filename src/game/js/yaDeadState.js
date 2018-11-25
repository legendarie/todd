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

        //add the background image
        var yaDeadbg = yaDeadScene.loadScene('youDied', 2.3);

        //create the hand cursor over the background so the player knows it's interactable
        yaDeadbg.input.useHandCursor = true;

        //when the background is clicked, the player returns to the roadForkState
        yaDeadbg.events.onInputUp.add(this.changeState, this);

    },

    /** Change the game state back to roadForkState (alreadyBeen will have been set to true) */

    changeState: function() {
        game.state.start('roadForkState');
    }

};