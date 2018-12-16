//initialize global variables
var eelSprite;
var singleGem;
var textBar;
var alreadyBeenES = false; //boolean to check whether the player has been to this state or not

let eelScene = null;

//initialize the state
var eelState = {

    /** The initial functions to set up the scene for player interaction */

    preload: function() {

        //create new instance of the Scene class
        eelScene = new Scene;

        //load in all of the images to the state
        eelScene.setBackground('eelCavebg', 'assets/eelCavebg.png');
        eelScene.setSprite('eelWithAGun', 'assets/eelWithAGun.png');
        eelScene.setSprite('singleGem', 'assets/singleGem.png');

        //reset global clickCount variable to 0
        clickCount = 0;

    },

    /** Add the visual elements to the canvas, and add the first line of text to the scene */

    create: function() {

        //add the background and the sprites to the scene
        eelScene.loadScene('eelCavebg', 0.477);
        eelSprite = eelScene.addStaticSprite(650, 240, 'eelWithAGun', 0.3, 0, 0);
        singleGem = eelScene.addSprite(285, 420, 'singleGem', 2.5);

        //checks to see if the player has already entered the state
        if (alreadyBeenES === false) {
            alreadyBeenES = true;

            eelScene.addTextBar('\"Howdy.\"');
            eelScene.addEllipses();
            textBar.events.onInputUp.add(this.changeText, this);
        } else {
            eelScene.addTextBar('\"I declare!\"');
            eelScene.addEllipses();
            textBar.events.onInputUp.add(this.afterGameText, this);
        }

    },

    /** Runs through the player's conversation with Eel with a Gun */

    changeText: function() {
        if (clickCount < 9) {
            clickCount++;
            if (clickCount === 1) {
                eelScene.changeText('\"I don\'t see many folks \'round these parts.\"');
            } else if (clickCount === 2) {
                eelScene.changeText('\"\'Specially since that rabble-rousing varmint showed up.\"');
            } else if (clickCount === 3) {
                eelScene.changeText('\"That fella was madder than a wet hen when he showed up...\"');
            } else if (clickCount === 4) {
                eelScene.changeText('\"I reckon yer fixin\' to find \'im, huh?\"');
            } else if (clickCount === 5) {
                eelScene.changeText('\"Well, as you prolly figured, I can\'t just letcha skeddadle.\"');
            } else if (clickCount === 6) {
                eelScene.changeText('\"I gotta make for certain yer fit as a fiddle.\"');
            } else if(clickCount === 7) {
                eelScene.changeText('\"If you can nix 150 gems in my puzzle, I\'ll letcha pass.\"');
            } else if (clickCount === 8) {
                eelScene.changeText('\"Move a gem up, down, left, or right to match three or more.\"');
            }else {
                eelScene.changeText('\"Go ahead and head on up to the gem to get started.\"');
                eelScene.removeEllipses();
                singleGem.events.onInputUp.add(this.goToGame, this);
            }
        }
    },

    /** Runs through the rest of the player's conversation with Eel with a Gun. Only appears
     * after the player has beaten the gem game */

    afterGameText: function() {
        if (clickCount < 8) {
            clickCount++;
            if (clickCount === 1) {
                eelScene.changeText('\"Well, stranger, I must say I\'m impressed with you.\"');
            } else if (clickCount === 2) {
                eelScene.changeText('\"You finished that puzzle like water off a duck\'s back.\"');
            } else if (clickCount === 3) {
                eelScene.changeText('\"Now it\'s plain as day that yer ready your feud.\"')
            } else if (clickCount === 4) {
                eelScene.changeText('\"Lemme take out this gem for ya, so you can get on with it.\"');
            } else if (clickCount === 5) {
                eelScene.changeText('With a sharp pop, the eel shoots the gem blocking the cave, shattering it.');
            } else if (clickCount === 6) {
                singleGem.kill();
                eelScene.changeText('\"Good luck, stranger. Also, could you give that varmint' +
                    ' a message for me?\"');
            } else if (clickCount === 7) {
                eelScene.changeText('\"Tell \'im he can stick that hammer of his where the sun don\'t shine!\"');
            } else {
                eelScene.changeText('\"Thanks, pardner.\"');
                eelScene.removeEllipses();
                this.exitButton();
            }
        }
    },

    /** Creates the button on the cave entrance. When it is clicked, the changeState function is called */

    exitButton: function() {
        var caveButton = eelScene.addButton(285, 375, 170, 180, 0);
        caveButton.events.onInputUp.add(this.changeState, this);
    },

    /** Change the state to the gem game */

    goToGame: function() {
        game.state.start('gemGame2');
    },

    /** Change the state to the penguin puzzle */

    changeState: function() {
        game.state.start('penguinPuzzleState');
    }

};