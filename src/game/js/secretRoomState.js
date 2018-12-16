let secretRoomScene = null;
var wiseGuy;
var textBar;
var returnButton;
var gift1;
var gift2;
var gift3;
var gift4;
var gift5;

var secretRoomState = {

    /** The initial function to set up the scene for player interaction */

    preload: function() {
        //declare secretRoomScene to be an instance of Scene
        secretRoomScene = new Scene;

        //load the background images into the state
        secretRoomScene.setBackground('secretRoombg', 'assets/secretRoombg.jpg');

        //load the sprites of Wise Guy and the gift(s)
        secretRoomScene.setSprite('gift', 'assets/gift.png');
        secretRoomScene.setSprite('wiseGuy', 'assets/wiseGuy.png');

        //reset the global clickCount and giftText variables
        clickCount = 0;
        giftText = false;
    },

    create: function() {
        //check to make sure that the scene has been created
        if (secretRoomScene !== null) {
            //load the background and scale it
            secretRoomScene.loadScene('secretRoombg', 1);

            //add all sprites to the window
            wiseGuy = secretRoomScene.addSprite(365, 190, 'wiseGuy', 0.3);

            gift1 = secretRoomScene.addSprite(600, 460, 'gift', 0.03);
            gift2 = secretRoomScene.addSprite(590, 520, 'gift', 0.015);
            gift3 = secretRoomScene.addSprite(800, 400, 'gift', 0.02);
            gift4 = secretRoomScene.addSprite(395, 180, 'gift', 0.015);
            gift5 = secretRoomScene.addSprite(300, 560, 'gift', 0.05);

            //add a button to return to the kitchen
            returnButton = secretRoomScene.addChoiceButton(908, 580, 290, 85, 'Return to kitchen');

            //begin Wise Guy's conversation
            secretRoomScene.addTextBar('\"Hello again. Good to see ya.\"');
            secretRoomScene.addEllipses();

            textBar.events.onInputUp.add(this.changeText, this);
            returnButton.getButton().events.onInputUp.add(this.returnToKitchen, this);
        }
    },

    /** All of the functions that change the text in the text box:
     * changeText runs through the first seven lines of text*/

    changeText: function() {
        //only allow the clickCount to increment to 17
        if (clickCount < 18) {
            clickCount++;
            if (clickCount === 1) {
                secretRoomScene.changeText('\"I\'m impressed you\'ve made it this far.\"');
            } else if (clickCount === 2) {
                secretRoomScene.changeText('\"...Not that I didn\'t believe you could.\"');
            } else if (clickCount === 3) {
                secretRoomScene.changeText('\"You certainly are the most proficient T.O.D.D. ' +
                    'to pass through here, though.\"');
            } else if (clickCount === 4) {
                secretRoomScene.changeText('\"Hm?\"');
            } else if (clickCount === 5) {
                secretRoomScene.changeText('\"Oh. Yes, of course. There have been others.\"');
            } else if (clickCount === 6) {
                secretRoomScene.changeText('\"You guys certainly are persistent.\"');
            } else if (clickCount === 7) {
                secretRoomScene.changeText('\"As soon as one of you is knocked down...\"');
            } else if (clickCount === 8) {
                secretRoomScene.changeText('\"...another comes waltzing out that door.\"');
            } else if (clickCount === 9) {
                secretRoomScene.changeText('\"You\'re certainly living up to your title.\"');
            } else if (clickCount === 10) {
                secretRoomScene.changeText('\"\"Travellers of the Doorth Dimension\", right?\"');
            } else if (clickCount === 11) {
                secretRoomScene.changeText('\"Protectors of the Realms, and all that.\"');
            } else if (clickCount === 12) {
                secretRoomScene.changeText('\"But I have to ask...how do you think you\'re gonna do it?\"');
            } else if (clickCount === 13) {
                secretRoomScene.changeText('\"Defeat all evil? In every realm?\"');
            } else if (clickCount === 14) {
                secretRoomScene.changeText('\"I guess that\'s a bit of a heavy question.\"');
            } else if (clickCount === 15) {
                secretRoomScene.changeText('\"Nevermind. I\'ll leave you to your hunt.\"');
            } else if (clickCount === 16) {
                secretRoomScene.changeText('\"As a little treat for you, here\'s some' +
                    ' more gifts. On me.\"');
            } else if (clickCount === 17) {
                secretRoomScene.changeText('\"I\'ll get out of your hair now. You got this.\"');
                secretRoomScene.removeEllipses();
            } else {
                this.giftListeners();
            }
        }
    },

    /**All of the functions that create interactive buttons:
     * giftListeners adds listeners to the gift sprites to collect them*/

    giftListeners: function() {
        wiseGuy.kill();
        gift4.kill();

        gift4 = secretRoomScene.addSprite(395, 450, 'gift', 0.015);

        gift1.events.onInputUp.add(this.foundGift, this);
        gift2.events.onInputUp.add(this.foundGift, this);
        gift3.events.onInputUp.add(this.foundGift, this);
        gift4.events.onInputUp.add(this.foundGift, this);
        gift5.events.onInputUp.add(this.foundGift, this);
    },

    /**All of the functions that deal with gifts:
     * foundGift removes the gift from the screen, updates giftCount, and tells the player they found a gift
     * changeGiftText tells the player how many gifts they have found so far*/

    foundGift: function(gift) {
        //remove the old textBar object
        textBar.kill();
        text.kill();
        secretRoomScene.removeEllipses();

        //update the gift count and make it so the gift doesn't respawn
        gift.kill();
        giftCount++;

        //create a new text bar with new text
        secretRoomScene.addTextBar('You found a gift!');
        secretRoomScene.addEllipses();
        textBar.events.onInputUp.add(this.changeGiftText, this);

        return giftCount;
    },

    changeGiftText: function() {
        if (giftText === false) {
            secretRoomScene.changeText('You have found ' + giftCount + ' gift(s)');
            secretRoomScene.removeEllipses();
        }
    },

    /**The function that switches to the next state*/

    returnToKitchen: function() {
        //change states to kitchenState
        game.state.start('kitchenState');
    }

};