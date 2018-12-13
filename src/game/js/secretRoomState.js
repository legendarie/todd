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

        secretRoomScene = new Scene;

        secretRoomScene.setBackground('secretRoombg', 'assets/secretRoombg.jpg');

        secretRoomScene.setSprite('gift', 'assets/gift.png');
        secretRoomScene.setSprite('wiseGuy', 'assets/wiseGuy.png');

        //reset the global clickCount and giftText variables
        clickCount = 0;
        giftText = false;
    },

    create: function() {

        if (secretRoomScene !== null) {

            secretRoomScene.loadScene('secretRoombg', 1);

            wiseGuy = secretRoomScene.addSprite(365, 190, 'wiseGuy', 0.3);

            gift1 = secretRoomScene.addSprite(600, 460, 'gift', 0.03);
            gift2 = secretRoomScene.addSprite(590, 520, 'gift', 0.015);
            gift3 = secretRoomScene.addSprite(800, 400, 'gift', 0.02);
            gift4 = secretRoomScene.addSprite(395, 180, 'gift', 0.015);
            gift5 = secretRoomScene.addSprite(300, 560, 'gift', 0.05);

            returnButton = secretRoomScene.addChoiceButton(908, 580, 290, 85, 'Return to kitchen');

            secretRoomScene.addTextBar('\"Hello again. Good to see ya.\"');
            secretRoomScene.addEllipses();

            textBar.events.onInputUp.add(this.changeText, this);
            returnButton.getButton().events.onInputUp.add(this.returnToKitchen, this);
        }
    },

    changeText: function() {
        if (clickCount < 7) {
            clickCount++;
            if (clickCount === 1) {
                secretRoomScene.changeText('\"I\'m impressed you\'ve made it this far.\"');
            } else if (clickCount === 2) {
                secretRoomScene.changeText('\"Not that I didn\'t believe in you or anything.\"');
            } else if (clickCount === 3) {
                secretRoomScene.changeText('\"It\'s just that you\'re the first T.O.D.D. to make it here...\"');
            } else if (clickCount === 4) {
                secretRoomScene.changeText('\"Ehem. Sorry. You\'re doing great!\"');
            } else if (clickCount === 5) {
                secretRoomScene.changeText('\"As a little treat for being awesome, here\'s the last' +
                    ' five gifts.\"');
            } else if (clickCount === 6) {
                secretRoomScene.changeText('\"I\'ll get out of your hair now. You got this.\"');
                secretRoomScene.removeEllipses();
            } else {
                this.giftListeners();
            }
        }
    },

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

    /** Once the player has found the gift, remove the sprite from the screen, set giftFound to true
     * (so the gift isn't made again if the player returns to the original state), update the giftCount,
     * and tell the player that they have found a gift. **/

    foundGift: function(gift) {
        textBar.kill();
        text.kill();
        secretRoomScene.removeEllipses();

        gift.kill();
        giftCount++;

        secretRoomScene.addTextBar('You found a gift!');
        secretRoomScene.addEllipses();
        textBar.events.onInputUp.add(this.changeGiftText, this);

        return giftCount;
    },

    /** Tells the player how many gifts they have found so far. **/

    changeGiftText: function() {
        if (giftText === false) {
            secretRoomScene.changeText('You have found ' + giftCount + ' gift(s)');
            secretRoomScene.removeEllipses();
        }
    },

    /** Change the game state back to kitchenState */

    returnToKitchen: function() {
        game.state.start('kitchenState');
    }

};