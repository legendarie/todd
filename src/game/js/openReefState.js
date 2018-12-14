//establish global variables
var clickCount;
var textBar;
var gift1;
var sign;
var path;

var alreadyBeenOR = false;    //boolean variable to track whether the player has visited this state before
var giftFound = false;  //boolean variable to check whether the player has clicked on the gift
var giftText = false; //boolean variable to keep track of whether the gift text has been displayed before

let openReefScene = null;

//initialize the state
var openReefState = {

    /** The initial functions to set up the scene for player interaction*/

    preload: function() {
        //declare openReefScene to be an instance of Scene
        openReefScene = new Scene;

        //load in the background image to the state
        openReefScene.setBackground('openReefbg', 'assets/openReefbg.png');

        //loads the gift sprite into the state
        openReefScene.setSprite('gift', 'assets/gift.png');

        //reset the global clickCount variable
        clickCount = 0;

    },

    /**Add the visual elements to the canvas, and add the first line of text to the scene*/

    create: function() {

        //check to make sure that the scene has been created
        if (openReefScene != null) {

            //load the background and scale it
            openReefScene.loadScene('openReefbg', 0.6);

            //if the gift hasn't been found (clicked) yet, then once it is clicked,
            //remove the gift and inform the player
            if (giftFound === false) {
                gift1 = openReefScene.addSprite(1120, 240, 'gift', 0.015);
                gift1.events.onInputUp.add(this.foundGift, this);
            }

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
                //if the player has already visited this screen, create the interactive buttons without the
                // text bar descriptions and add the gift sprite to the scene
                this.signButton();
                this.pathButton();
            }
        }
    },

    /** All of the functions that change the text in the text box:
     * changeText runs through the first three lines of text*/

    changeText: function() {
        //if the player hasn't been to this screen before,
        if (alreadyBeenOR === false) {
            //only increment the click count twice. Unnecessary to increment it more
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
    },

    /** All of the functions that create interactive buttons:
     * signButton switches states to the sign
     * pathButton switches states to the forked path*/

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

    /**All of the functions that deal with gifts:
     * foundGift removes the gift from the screen, updates giftCount, and tells the player they found a gift
     * changeGiftText tells the player how many gifts they have found so far*/

    foundGift: function() {
        //remove the old textBar object
        textBar.kill();
        text.kill();
        openReefScene.removeEllipses();

        //update the gift count and make it so the gift doesn't respawn
        gift1.kill();
        giftFound = true;
        giftCount++;

        //create a new text bar with new text
        openReefScene.addTextBar('You found a gift!');
        openReefScene.addEllipses();
        textBar.events.onInputUp.add(this.changeGiftText, this);

        return giftCount;
    },

    changeGiftText: function() {
        //tell the player how many gifts have been found if they have not already been told
        if (giftText === false) {
            openReefScene.changeText('You have found ' + giftCount + ' gift(s)');
            giftText = true;
        }
        textBar.events.onInputUp.add(this.changeText, this);
    },

    /** The functions that switch to the next state, of which there are two*/

    changeStateSign: function() {
        //change states to signState
        nextState = 'signState';
        game.state.start('signState');
    },

    changeStateFork: function() {
        //change states to roadForkState
        nextState = 'roadForkWGState';
        game.state.start('roadForkWGState');
    }
};