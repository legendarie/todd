let yaDeadScene = null;

var yaDeadState = {

    preload: function() {

        yaDeadScene = new Scene;
        yaDeadScene.setBackground('youDied', 'assets/youDied.jpg');
    },

    create: function() {
        yaDeadScene.loadScene('youDied', 2.3);
    }
};