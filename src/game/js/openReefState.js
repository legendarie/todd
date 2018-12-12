//establish global variables
var clickCount;
var textBar;
var gift1;
var sign;
var path;
var alreadyBeenOR = false;    //a boolean variable to track whether the player has visited this state before
var giftFound = false;  //a boolean variable to check whether the player has clicked on the gift
let openReefScene = null;

var openReefState = {

    /** The initial functions to set up the scene for player interaction */

    preload: function() {
        //declare openReefScene to be an instance of a Scene, and load in the background image to the state
        openReefScene = new Scene;
        openReefScene.setBackground('openReefbg', 'assets/openReefbg.png');

        openReefScene.setSprite('gift', 'assets/gift.png');

        //reset the global clickCount variable
        clickCount = 0;
    },

    /** Add the initial visual elements to the canvas, and add the first piece of text to the scene */

    create: function() {

        //check to make sure the openReefScene variable is not null
        if (openReefScene != null) {

            //load the background and scale it
            openReefScene.loadScene('openReefbg', 0.6);

            //if the player hasn't been to this screen before,
            if (alreadyBeenOR === false) {
                //add the text bar (with all universal settings), with the first line of text
                openReefScene.addTextBar("You take your first step into a whole new world.");

                //add a set of ellipses to the text box to indicate
                //further messages
                openReefScene.addEllipses();

                //when the text bar is clicked, go to the changeText function
                textBar.events.onInputUp.add(this.changeText, this);
            } else {
                //if the player has already visited this screen, create the
                //interactive buttons without the text bar descriptions
                if (giftFound === false) {
                    gift1 = openReefScene.addSprite(1120, 240, 'gift', 0.015);
                    gift1.events.onInputUp.add(this.foundGift, this);
                }
                this.signButton();
                this.pathButton();
            }
        }
    },

    /** All of the functions that change the text in the text box:
     * changeText runs through the first three lines of text */

    changeText: function() {
        //if the player hasn't been to this screen before,
        if (alreadyBeenOR === false) {
            //only increment the click count twice. Unnecessary to increment it more
            if (clickCount < 2) {
                clickCount++;
                if (clickCount === 1) {
                    openReefScene.changeText("The water feels strangely cold.")
                } else {
                    //change the text in the text bar, remove the ellipses to indicate to the player that
                    // there is no more text at this time, then create the sign and path buttons
                    openReefScene.changeText("You take a good look at your surroundings.");
                    openReefScene.removeEllipses();
                    alreadyBeenOR = true;
                    this.signButton();
                    this.pathButton();
                }
            }
        }
    },

    /** All of the functions that create interactive buttons:
     * signButton switches states to the sign
     * pathButton switches states to the forked path */

    signButton: function() {
        //make the sign clickable. If clicked, it will call the changeStateSign function
        sign = openReefScene.addButton(275, 450, 95, 105, 0);
        sign.events.onInputUp.add(this.changeStateSign, this);
    },

    pathButton: function() {
        //make the path ahead clickable. If clicked, it will call the changeStateFork function
        path = openReefScene.addButton(500, 250, 250, 200, 0);
        path.events.onInputUp.add(this.changeStateFork, this);
    },

    foundGift: function() {
        //remove the gift from the scene and update the score and tell the player how
        //many gifts they have found so far
        gift1.kill();
        giftFound = true;
        giftCount++;

        openReefScene.addTextBar('You found a gift!');
        openReefScene.addEllipses();
        textBar.events.onInputUp.add(this.changeGiftText, this);

        return giftCount;
    },

    changeGiftText: function() {
        openReefScene.changeText('You have found ' + giftCount + ' gift(s)');
        openReefScene.removeEllipses();
    },

    /** The functions that switch to the next state, of which there are two:
     * one for the sign, and one for the road, which progresses the story */

    changeStateSign: function() {
        //change states to signState
        nextState = 'signState';
        game.state.start('signState', signState);
    },

    changeStateFork: function() {
        //change states to roadForkState
        nextState = 'roadForkWGState';
        game.state.start('roadForkWGState', roadForkWGState);
    }
};