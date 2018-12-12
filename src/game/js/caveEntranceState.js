//initialize the global variables for this state
var textBar;
var gift2;
let caveEntranceScene = null;

var caveEntranceState = {

    /** The initial functions to set up the scene for player interaction */

    preload: function() {
        //make caveEntranceScene an extension of the Scene
        caveEntranceScene = new Scene;

        //load the background image into the state
        caveEntranceScene.setBackground('caveEntranceBg', 'assets/caveEntrance.png');

        //load the gift sprite into the state
        caveEntranceScene.setSprite('gift', 'assets/gift.png');

        //reset the global variable clickCount to 0
        clickCount = 0;

        //reset the global variable giftFound to false
        giftFound = false;
    },

    /** Add the initial visual elements to the canvas and begin the text sequence */

    create: function() {
        //check to make sure that the scene has been created
        if (caveEntranceScene != null) {
            //add the background to the canvas and scale it
            caveEntranceScene.loadScene('caveEntranceBg', 0.5);

            if (giftFound === false) {
                gift2 = openReefScene.addSprite(1120, 240, 'gift', 0.015);
                gift2.events.onInputUp.add(this.foundGift, this);
            }

            //add the text bar (with all universal settings), with the first line of text
            caveEntranceScene.addTextBar("The path ends in a large cave entrance in the cliff.");

            //add a set of ellipses to the text box to indicate further messages
            caveEntranceScene.addEllipses();

            //when the text bar is clicked, call the changeText function
            textBar.events.onInputUp.add(this.changeText, this);
        }
    },

    /** Once the player has found the gift, remove the sprite from the screen, set giftFound to true
     * (so the gift isn't made again if the player returns to the original state), update the giftCount,
     * and tell the player that they have found a gift. **/

    foundGift: function() {
        textBar.kill();
        text.kill();
        caveEntranceScene.removeEllipses();

        gift2.kill();
        giftFound = true;
        giftCount++;

        caveEntranceScene.addTextBar('You found a gift!');
        caveEntranceScene.addEllipses();
        textBar.events.onInputUp.add(this.changeGiftText, this);

        return giftCount;
    },

    /** Tells the player how many gifts they have found so far. **/

    changeGiftText: function() {
        caveEntranceScene.changeText('You have found ' + giftCount + ' gift(s)');
        textBar.events.onInputUp.add(this.changeText, this);
    },

    /** Update the text sequence as the user interacts with the text bar */

    changeText: function() {
        //only allow the clickCount to increment to 3 (unnecessary that it increments more)
        if (clickCount < 4) {
            clickCount++;
            if (clickCount === 1) {
                caveEntranceScene.changeText("You can't see what is waiting for you in the cave.");
                if (circle1 === null) {
                }
            } else if (clickCount === 2) {
                caveEntranceScene.changeText("You're not too thrilled about the idea of venturing into the darkness.");
            } else if (clickCount === 3) {
                //once the clickCount is 3, remove the ellipses to indicate that there is no more text at this
                //time. Then, call the enterCaveButton function to allow the user to enter the cave
                caveEntranceScene.changeText("But it doesn't look like you really have a choice.");
            } else {
                caveEntranceScene.removeEllipses();
                textBar.kill();
                text.kill();
                this.enterCaveButton();
            }
        }
    },

    /** Create the button over the cave entrance and allow the user to interact with it. When that occurs,
     * call the changeState function */

    enterCaveButton: function() {
        var caveEntranceButton = caveEntranceScene.addButton(560, 250, 340, 350, 0);
        caveEntranceButton.events.onInputUp.add(this.changeState, this);
    },

    /** Change the game state to caveStartState */

    changeState: function() {
        game.state.start('caveStartState');
    }

};