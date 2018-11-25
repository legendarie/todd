let yaDeadScene = null;

var yaDeadState = {

    preload: function() {

        //create a new instance of scene
        yaDeadScene = new Scene;

        //load the background image
        yaDeadScene.setBackground('youDied', 'assets/youDied.jpg');

    },

    create: function() {

        //add the background image
        var yaDeadbg = yaDeadScene.loadScene('youDied', 2.3);

        //when the background is clicked, the player returns to the roadForkState
        yaDeadbg.events.onInputUp.add(this.changeState, this);

    },

    changeState: function() {
        game.state.start('roadForkState');
    }

};