let wormScene = null;

var wormState = {

    preload: function() {

        wormScene = new Scene;
        wormScene.setBackground('worm')
        wormScene.setBackground('blackScreen', 'assets/blank-screens.jpg');
        wormScene.setBackground('hiddenWorm', 'assets/wormHidden.png');
        wormScene.setBackground('openEye', 'assets/wormEye.png');
        wormScene.setBackground('')
    }
};