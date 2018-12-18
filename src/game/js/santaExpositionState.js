var clickCount;
var textBar;

let santaExpositionScene = null;

var santaExpositionState = {

    /**The initial functions to set up the scene for player interaction*/

    preload: function() {
        //declare santaExpositionScene to be an instance of Scene
        santaExpositionScene = new Scene;

        //load the background image into the state
        santaExpositionScene.setBackground('blackbg', 'assets/blank-screen.jpg');

        //reset the global clickCount variable
        clickCount = 0;
    },

    /**Add the visual elements to the canvas, and add the first line of text to the scene*/

    create: function() {
        //check to make sure that the scene has been created
        if (santaExpositionState != null) {
            //load the background and scale it
            santaExpositionScene.loadScene('blackbg', 1);

            //add the text bar (with all universal settings), with the first line of text
            textBar = santaExpositionScene.addTextBar('It\'s awfully cold now. You shiver.');

            //add a set of ellipses to the text box to indicate
            //further messages
            santaExpositionScene.addEllipses();

            //when the text bar is clicked, go to the changeText function
            textBar.events.onInputUp.add(this.changeText, this);
        }
    },

    /** All of the functions that change the text in the text box:
     * changeText runs through the first eight lines of text*/

    changeText: function() {
        //only allow the clickCount to increment to 7
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

    /**The function that switches to the next state*/

    changeState: function() {
        //change states to findingSanta
        nextState = 'findingSanta';
        game.state.start('findingSanta');
    }
};