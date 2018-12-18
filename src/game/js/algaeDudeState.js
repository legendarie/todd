//establish the global variables
var clickCount;
var textBar;
var algaeDude;
var giftButton;
var exit;

let algaeDudeScene = null;

//initialize the state
var algaeDudeState = {

    /** The initial functions to set up the scene for player interaction */

    preload: function() {
        //declare algaeDudeScene to be an instance of Scene
        algaeDudeScene = new Scene;

        //load the background image into the state
        //(as well as the background change (mort without a present))
        algaeDudeScene.setBackground('mortGiftbg', 'assets/mortGiftbg.png');
        algaeDudeScene.setBackground('mortbg', 'assets/mortbg.png');

        //reset the global clickCount variable
        clickCount = 0;

        //reset the global variable giftFound to false
        giftFound = false;
    },

    /**Add the visual elements to the canvas, and add the first line of text to the scene*/

    create: function() {
        //check to make sure that the scene has been created
        if (algaeDudeScene != null) {

            //load the background and scale it
            algaeDudeScene.loadScene('mortGiftbg', 0.32);

            //set up a button over mort
            this.algaeDudeButton();
        }
    },

    /** All of the functions that change the text in the text box:
     * beginConvo starts up the conversation with mort if you click on him
     * convoText continues mort's conversation using the text bar*/

    beginConvo: function() {
        //start off the cryptic conversation with mort, the algae growth
        algaeDude.kill();
        algaeDudeScene.addTextBar('\"hello\"');
        algaeDudeScene.addEllipses();
        textBar.events.onInputUp.add(this.convoText, this);
    },

    convoText: function() {
        //run through mort's conversation
        //only allow the clickCount to increment to 11
        if (clickCount < 11) {
            clickCount++;
            if (clickCount === 1) {
                algaeDudeScene.changeText('\"i mort\"')
            } else if (clickCount === 2) {
                algaeDudeScene.changeText('\"mort guard cave\"')
            } else if (clickCount === 3) {
                algaeDudeScene.changeText('\"stranger after beard and hammer man, yes?\"')
            } else if (clickCount === 4) {
                algaeDudeScene.changeText('\"...\"')
            } else if (clickCount === 5) {
                algaeDudeScene.changeText('\"mort give gift\"')
            } else if (clickCount === 6) {
                algaeDudeScene.changeText('\"if stranger find five gifts,\"')
            } else if (clickCount === 7) {
                algaeDudeScene.changeText('\"surprise hidden in hammer man house\"')
            } else if (clickCount === 8) {
                algaeDudeScene.changeText('\"open secret cupboard when list is finished\"')
            } else if (clickCount === 9) {
                algaeDudeScene.changeText('\"do not tell fish man mort tell stranger these things\"')
            } else if (clickCount === 10) {
                algaeDudeScene.changeText('\"secret secret\"')
            } else {
                //once this script has been run through, make the present clickable
                algaeDudeScene.changeText('\"...take gift\"');
                algaeDudeScene.removeEllipses();

                this.presentButton();
            }
        }
    },

    /** All of the functions that create interactive buttons:
     * algaeDudeButton creates a button over mort to begin the conversation
     * presentButton creates a button over mort's gift so it can be collected
     * getGift collects the gift and calls the exitButton function
     * exitButton makes the screen interactive (switching to the next scene if clicked)*/

    algaeDudeButton: function() {
        //make mort interactive (begins the conversation when clicked)
        algaeDude = algaeDudeScene.addButton(575, 275, 100, 150, 0);
        algaeDude.events.onInputUp.add(this.beginConvo, this);
    },

    presentButton: function() {
        //make the present collectible.
        giftButton = algaeDudeScene.addButton(585, 325, 75, 75, 0);
        giftButton.events.onInputUp.add(this.getGift, this);
    },

    getGift: function() {
        //collect the gift and let the player leave the scene
        algaeDudeScene.loadScene('mortbg', 0.32);
        giftButton.kill();
        this.foundGift();
    },

    foundGift: function() {
        textBar.kill();
        text.kill();
        algaeDudeScene.removeEllipses();

        giftFound = true;
        giftCount++;

        algaeDudeScene.addTextBar('You found a gift!');
        algaeDudeScene.addEllipses();
        textBar.events.onInputUp.add(this.changeGiftText, this);

        return giftCount;
    },

    /** Tells the player how many gifts they have found so far. **/

    changeGiftText: function() {
        algaeDudeScene.changeText('You have found ' + giftCount + ' gift(s)');
        algaeDudeScene.removeEllipses();
        this.exitButton();
    },

    exitButton: function() {
        //make the screen clickable. If the screen is clicked, call the changeState function
        exit = algaeDudeScene.addButton(0, 0, 1500, 1000, 0);
        exit.events.onInputUp.add(this.changeState, this);
    },

    /** The function that switches to the next state*/

    changeState: function() {
        //change states to transitionCaveState
        nextState = 'transitionCaveState';
        game.state.start('transitionCaveState');
    }
};
