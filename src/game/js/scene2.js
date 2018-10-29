var scene2bg;

var scene2 = {

    preload: function () {
        game.load.image('scene2bg', 'assets/scene2bg.png');
    },

    create: function() {
        scene2bg = game.add.image(0, 0, 'scene2bg');
        scene2bg.scale.setTo(0.6);
    }


};