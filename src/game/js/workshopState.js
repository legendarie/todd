//establish the global variables
var clickCount;
var textBar;
var gift3;
var door;
let workshopScene = null;

//a declaration for the next state
var hasDiedGarden;

//initialize the state
var workshopState = {

    /**The initial functions to set up the scene for player interaction*/

    preload: function() {
        //declare scene to be an instance of a Scene, and load in the background image to the state
        workshopScene = new Scene;
        workshopScene.setBackground('workshopbg', 'assets/workshopbg.png');

        //load the gift sprite into the scene
        workshopScene.setSprite('gift', 'assets/gift.png');

        //reset the global clickCount, giftFound, and giftText variables
        clickCount = 0;
        giftFound = false;
        giftText = false;
    },

    create: function() {
        //check to make sure the scene variable is not null
        if (workshopScene != null) {

            //load the background and scale it
            workshopScene.loadScene('workshopbg', 0.32);

            //add the gift to the scene
            if (giftFound === false) {
                gift3 = workshopScene.addSprite(50, 260, 'gift', 0.015);
                gift3.events.onInputUp.add(this.foundGift, this);
            }

            //add the text bar (with all universal settings), with the first line of text
            workshopScene.addTextBar("As you enter the workshop, you lift the lever by the door.");

            //add a set of ellipses to the text box to indicate
            //further messages
            workshopScene.addEllipses();

            //when the text bar is clicked, go to the changeText function
            textBar.events.onInputUp.add(this.changeText, this);
        }
    },

    /** Once the player has found the gift, remove the sprite from the screen, set giftFound to true
     * (so the gift isn't made again if the player returns to the original state), update the giftCount,
     * and tell the player that they have found a gift. **/

    foundGift: function() {
        textBar.kill();
        text.kill();
        workshopScene.removeEllipses();

        gift3.kill();
        giftFound = true;
        giftCount++;

        workshopScene.addTextBar('You found a gift!');
        workshopScene.addEllipses();
        textBar.events.onInputUp.add(this.changeGiftText, this);

        return giftCount;
    },

    /** Tells the player how many gifts they have found so far. **/

    changeGiftText: function() {
        if (giftText === false) {
            workshopScene.changeText('You have found ' + giftCount + ' gift(s)');
            giftText = true;
        }
        textBar.events.onInputUp.add(this.changeText, this);
    },

    /**All of the functions that change the text in the text box:
     * changeText runs through the first 5 lines of text*/

    changeText: function() {
        //only increment the click count so many times
        if (clickCount < 5) {
            clickCount++;
            if (clickCount === 1) {
                workshopScene.changeText("The pounding of the machine slows to a halt.")
            } else if (clickCount === 2) {
                workshopScene.changeText("The room goes eerily quiet.")
            } else if (clickCount === 3) {
                workshopScene.changeText("The shop looks abandoned.")
            } else if (clickCount === 4) {
                workshopScene.changeText("There's just one door out of here.")
            } else {
                //change the text in the text bar, then further the plot somehow
                workshopScene.changeText("You should leave before anyone comes.");
                workshopScene.removeEllipses();
                this.doorButton();
            }
        }
    },

    /**All of the functions that create interactive buttons:
     * doorButton creates a button over the doorway to switch scenes*/

    doorButton: function() {
        //make something clickable. If the exit is clicked, call the changeState function
        door = workshopScene.addButton(675, 125, 115, 230, 0);
        door.events.onInputUp.add(this.changeState, this);
    },

    /**The function that switches to the next state*/

    changeState: function() {
        //change states to the next state
        nextState = 'gardenState';
        game.state.start('transitionCaveState');
    }
};