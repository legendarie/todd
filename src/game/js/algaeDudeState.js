//establish the global variables
var clickCount;
var textBar;
var exit;
var algaeDude;
var gift;
var giftButton;
var arms;
let algaeDudeScene = null;

//initialize the state
var algaeDudeState = {

    /** The initial functions to set up the scene for player interaction */

    preload: function() {
        //declare algaeDudeScene to be an instance of a Scene, and load in the background image to the state
        algaeDudeScene = new Scene;
        algaeDudeScene.setBackground('algaeDudebg', 'assets/algaeDudebg.png');

        //add Algae Dude sprite to the state
        algaeDudeScene.setSprite("present", "assets/santa.png");
        algaeDudeScene.setSprite("arms", "assets/santa.png");

        //reset the global clickCount variable
        clickCount = 0;
    },

    /** Add the starting visual features to the game canvas */

    create: function() {
        //check to make sure the algaeDudeScene variable is not null
        if (algaeDudeScene != null) {

            //load the background and scale it
            algaeDudeScene.loadScene('algaeDudebg', 0.9);

            //add the text bar (with all universal settings), with the first line of text
            algaeDudeScene.addTextBar("...");

            //give mort his arms and the gift he holds
            gift = algaeDudeScene.addStaticSprite(0, 0, "present", 1.0);
            arms = algaeDudeScene.addSprite(0, 0, "arms", 1.0);

            //set up mort as a button
            this.algaeDudeButton();
        }
    },

    /** All of the functions that change the text in the text box:
     * beginConvo starts up the conversation with mort if you click on him
     * convoText continues mort's conversation using the text bar */

    beginConvo: function() {
        //start off the cryptic conversation with mort, the algae growth
        algaeDude.kill();
        algaeDudeScene.addEllipses();
        algaeDudeScene.changeText('\"hello\"');
        textBar.events.onInputUp.add(this.convoText, this);
    },

    convoText: function() {
        //only increment the click count so many times
        if (clickCount < 10) {
            clickCount++;
            if (clickCount === 1) {
                algaeDudeScene.changeText('\"i mort\"')
            } else if (clickCount === 2) {
                algaeDudeScene.changeText('\"mort guard cave\"')
            } else if (clickCount === 3) {
                algaeDudeScene.changeText('\"stranger after beard and hammer man, yes?\"')
            } else if (clickCount === 4) {
                algaeDudeScene.changeText('\"mort give gift\"')
            } else if (clickCount === 5) {
                algaeDudeScene.changeText('\"if stranger find five gifts,\"')
            } else if (clickCount === 6) {
                algaeDudeScene.changeText('\"surprise hidden in hammer man house\"')
            } else if (clickCount === 7) {
                algaeDudeScene.changeText('\"open secret cupboard when list is finished\"')
            } else if (clickCount === 8) {
                algaeDudeScene.changeText('\"do not tell fish man mort tell stranger these things\"')
            } else if (clickCount === 9) {
                algaeDudeScene.changeText('\"secret secret\"')
            } else {
                //change the text in the text bar, then further the plot somehow
                algaeDudeScene.changeText('\"...take gift\"');
                algaeDudeScene.removeEllipses();
                this.presentButton();
            }
        }
    },

    /** All of the functions that create interactive buttons:
     * algaeDudeButton creates a button over mort
     * presentButton creates a button over mort's gift
     * getGift collects the gift and calls the exitButton function
     * exitButton makes the screen interactive (switching to the next scene) */

    algaeDudeButton: function() {
        //make mort interactive (begins the conversation when clicked)
        algaeDude = algaeDudeScene.addButton(575, 250, 100, 100, 0.2);
        algaeDude.events.onInputUp.add(this.beginConvo, this);
    },

    presentButton: function() {
        //make the present collectible.
        giftButton = algaeDudeScene.addButton(575, 250, 100, 100, 0.2);
        giftButton.events.onInputUp.add(this.getGift, this);
    },

    getGift: function() {
        //collect the gift and let the player leave the scene
        gift.kill();
        giftButton.kill();
        this.exitButton();
    },

    exitButton: function() {
        //make the screen clickable. If the screen is clicked, call the changeState function
        exit = algaeDudeScene.addButton(0, 0, 1500, 1000, 0.2);
        exit.events.onInputUp.add(this.changeState, this);
    },

    /** The function that switches to the next state */

    changeState: function() {
        //change states to the next state
        game.state.start('doorState');
    }
};