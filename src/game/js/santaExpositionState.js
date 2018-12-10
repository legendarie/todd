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

        textBar = santaExpositionScene.addTextBar('It\'s awfully cold now. You shiver.');
        santaExpositionScene.addEllipses();
        textBar.events.onInputUp.add(this.changeText, this);
    },

    changeText: function() {
        if (clickCount < 7) {
            clickCount++;
            if (clickCount === 1) {
                santaExpositionScene.changeText('Your footsteps echo through the pitch black tunnel.');
            } else if (clickCount === 2) {
                santaExpositionScene.changeText('You slip a little bit on a patch of ice. You start to ' +
                    'walk more lightly.');
            } else if (clickCount === 3) {
                santaExpositionScene.changeText('You start to smell what you think is gingerbread.');
            } else if (clickCount === 4) {
                santaExpositionScene.changeText('Your heart pounds. You\'re not sure what you\'re' +
                    ' about to face.');
            } else if (clickCount === 5) {
                santaExpositionScene.changeText('You see a light ahead. You speed up.');
            } else if (clickCount === 6) {
                santaExpositionScene.changeText('You hear a menacing \"ho, ho, ho.\"');
                santaExpositionScene.removeEllipses();
            } else if (clickCount === 7) {
                this.changeState();
            }
        }
    },

    changeState: function() {
        game.state.start('findingSanta');
    }
};