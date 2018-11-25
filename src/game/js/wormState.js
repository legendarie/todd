var clickCount;
var textBar;
var caveButton;
let wormScene = null;

var wormState = {

    preload: function() {

        //create a new instance of Scene
        wormScene = new Scene;

        //preload all of the backgrounds to be used in this scene
        wormScene.setBackground('worm', 'assets/hiddenWormbg.png');
        wormScene.setBackground('blackScreen', 'assets/blank-screen.jpg');
        wormScene.setBackground('openEye', 'assets/openEyebg.png');
        wormScene.setBackground('wormBite', 'assets/wormBitebg.png');
        wormScene.setBackground('happyWorm', 'assets/happyWormbg.png');

    },

    create: function() {

        //load the first background into the scene
        wormScene.loadScene('worm', 0.75);

        //add text for this part of the scene
        wormScene.addTextBar('You enter a funny-looking cave.');

        //make button over cave entrance that changes functions when clicked
        caveButton = wormScene.addButton(670, 300, 270, 250, 0);
        caveButton.events.onInputUp.add(this.enterCave, this);

    },

    enterCave: function() {

        //remove the text bar and the button
        textBar.kill();
        caveButton.kill();

        //initiate clickCount to 0
        clickCount = 0;

        //change background to a black screen
        wormScene.loadScene('blackScreen', 1);

        wormScene.addTextBar('You look around you, but this cave is pitch black.');
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

    wormEyeOpen: function() {

        //remove the text bar
        textBar.kill();

        //change the background to the worm with the open eye
        var openEyebg = wormScene.loadScene('openEye', 0.75);

        //clicking on the background changes the function
        //openEyeButton = wormScene.addButton(0, 0, 1200, 690, 0);
        openEyebg.events.onInputUp.add(this.wormWhump, this);

    },

    wormWhump: function() {

        //change the background to the worm with its mouth closed
        var closedMouthbg = wormScene.loadScene('wormBite', 0.75);

        //clicking on the background changes the function
        closedMouthbg.events.onInputUp.add(this.smilingWorm, this);

    },

    smilingWorm: function() {

        //change the background to the smiling worm
        var happyWorm = wormScene.loadScene('happyWorm', 0.72);

        //clicking on the background changes the state
        happyWorm.events.onInputUp.add(this.changeState, this);
    },

    changeState: function() {
        game.state.start('yaDeadState');
    }

};