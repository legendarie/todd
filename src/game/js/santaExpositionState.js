var clickCount;
var textBar;
let santaExpositionScene = null;

var santaExpositionState = {

    preload: function() {

        santaExpositionScene = new Scene;
        santaExpositionScene.setBackground('blackbg', 'assets/blank-screen.jpg');

        clickCount = 0;
    },

    create: function() {

        santaExpositionScene.loadScene('blackbg', 1);

        textBar = santaExpositionScene.addTextBar('It\'s awfully cold now. You can feel your feet slipping on ice beneath you.');
        santaExpositionScene.addEllipses();
        textBar.events.onInputUp.add(this.changeText, this);
    },

    changeText: function() {
        if (clickCount < 10) {
            clickCount++;
            if (clickCount === 1) {
                santaExpositionScene.changeText('Your footsteps echo through the pitch black tunnel.');
            } else if (clickCount === 2) {
                santaExpositionScene.changeText('You start to smell what you think is gingerbread.');
            } else if (clickCount === 3) {
                santaExpositionScene.changeText('Your heart starts to pound. You\'re not sure what you\'re' +
                    ' about to face.');
            } 
        }
    }
};