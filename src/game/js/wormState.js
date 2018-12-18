//establish the global variables
var clickCount;
var textBar;
var caveButton;
var openEyebg;
var closedMouthbg;
var happyWorm;

let wormScene = null;

//initialize the state
var wormState = {

    /** The initial function to set up the scene for player interaction */

    preload: function() {
        //declare wormScene to be a new instance of Scene
        wormScene = new Scene;

        //preload all of the backgrounds to be used in this scene
        wormScene.setBackground('worm', 'assets/hiddenWormbg.png');
        wormScene.setBackground('blackScreen', 'assets/blank-screen.jpg');
        wormScene.setBackground('openEye', 'assets/openEyebg.png');
        wormScene.setBackground('wormBite', 'assets/wormBitebg.png');
        wormScene.setBackground('happyWorm', 'assets/happyWormbg.png');
    },

    /**Add the visual elements to the canvas, and add the first line of text to the scene*/

    create: function() {

        //make sure that the scene has been created
        if (wormScene !== null) {

            //load the first background into the scene
            wormScene.loadScene('worm', 0.75);

            //add text for this part of the scene
            wormScene.addTextBar('You enter a funny-looking cave.');

            //make a button over cave entrance that changes backgrounds when clicked
            caveButton = wormScene.addButton(670, 300, 270, 250, 0);
            caveButton.events.onInputUp.add(this.enterCave, this);

        }
    },

    /** All of the functions that change the text in the text box:
     * entercave loads a black background and begins the "inside the cave" script
     * caveText finishes the death script and switches backgrounds*/

    enterCave: function() {

        //remove the text bar and the button
        textBar.kill();
        caveButton.kill();

        //initiate clickCount to 0
        clickCount = 0;

        //change background to a black screen
        wormScene.loadScene('blackScreen', 1);

        wormScene.addTextBar('You look around you. The cave is pitch black.');
        wormScene.addEllipses();
        textBar.events.onInputUp.add(this.caveText, this);

    },

    caveText: function() {
        //text sequence for this part of the scene
        if (clickCount < 5) {
            clickCount++;
            if (clickCount === 1) {
                wormScene.changeText('You feel around the walls of the cave. They\'re kind of slimy. Gross.');
            } else if (clickCount === 2) {
                wormScene.changeText('There\'s rumbling outside.');
            } else if (clickCount === 3) {
                wormScene.changeText('You spin around but the entrance is blocked!');
            } else if (clickCount === 4) {
                wormScene.changeText('*rumble rumble*');
                wormScene.removeEllipses();
            } else if (clickCount === 5) {
                //move to the next function
                this.wormEyeOpen();
            }
        }
    },

    /**All of the functions that switch the background for the "cutscene":
     * wormEyeOpen:
     * The player now sees that the cave was really a worm. The worm has its eyes open and teeth have appeared
     * wormWhump:
     * The worm closes its mouth, and the player is eaten
     * smilingWorm:
     * The worm is happy with this turn of events, and the state is changed to the death screen*/

    wormEyeOpen: function() {

        //remove the text bar
        textBar.kill();

        //change the background to the worm with the open eye
        openEyebg = wormScene.loadScene('openEye', 0.75);

        //create the hand cursor over the background so the player knows it's interactive
        openEyebg.input.useHandCursor = true;

        //clicking on the background changes the function
        openEyebg.events.onInputUp.add(this.wormWhump, this);

    },

    wormWhump: function() {

        //change the background to the worm with its mouth closed
        closedMouthbg = wormScene.loadScene('wormBite', 0.75);

        //create the hand cursor over the background so the player knows it's interactive
        closedMouthbg.input.useHandCursor = true;

        //clicking on the background changes the function
        closedMouthbg.events.onInputUp.add(this.smilingWorm, this);

    },

    smilingWorm: function() {

        //change the background to the smiling worm
        happyWorm = wormScene.loadScene('happyWorm', 0.72);

        //create the hand cursor over the background so the player knows it's interactive
        happyWorm.input.useHandCursor = true;

        //clicking on the background changes the state
        happyWorm.events.onInputUp.add(this.changeState, this);
    },

    /**The function that switches to the next state*/

    changeState: function() {
        //change states to yaDeadState
        nextState = 'roadForkState';
        game.state.start('yaDeadState');
    }

};