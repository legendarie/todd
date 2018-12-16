var secretRoomButton;
var textBar;
var clickCount;
var gift5;
var fridgeButton;
var pantryButton;
var kitchenButton;
var finalDoorButton;
var exitKitchenButton;
var alreadyBeenKN = false; //boolean checking if the player has been in the kitchen before

let kitchenScene = null;

var kitchenState = {

    /** The initial function to set up the scene for player interaction */

    preload: function() {
        //declare kitchenScene to be an instance of Scene
        kitchenScene = new Scene;

        //load the background image into the state
        kitchenScene.setBackground('kitchen', 'assets/kitchenbg.jpg');

        //load the gift sprite into the state
        kitchenScene.setSprite('gift', 'assets/gift.png');

        //reset the global clickCount, giftFound, and giftText variables
        clickCount = 0;
        if (alreadyBeenKN === false) {
            giftFound = false;
        }
        giftText = false;
    },

    /** Add the initial visual elements to the canvas, and add the beginning text to the scene */

    create: function() {
        //check to make sure that the scene has been created
        if (kitchenScene !== null) {
            //add background to the state and scale it
            kitchenScene.loadScene('kitchen', 1.3);

            //load the gift sprite and scale it
            if (giftFound === false) {
                gift5 = gardenScene.addSprite(120, 145, 'gift', 0.013);
                gift5.events.onInputUp.add(this.foundGift, this);
            }

            //if it's the player's first time in the kitchen,
            if (alreadyBeenKN === false) {
                //add explanatory text and ellipses
                kitchenScene.addTextBar('You step into someone\'s kitchen. You wonder whose it is.');
                kitchenScene.addEllipses();

                //when the text bar is clicked, call the changeText function
                textBar.events.onInputUp.add(this.changeText, this);

                //set alreadyBeenKN to true, so the player does not have to read the explanatory text again
                alreadyBeenKN = true;
            } else {
                //if the player has already entered the state,
                //then skip the text and add the buttons
                this.addButtons();
            }
        }
    },

    /** All of the functions that create interactive buttons:
     * addButtons creates the buttons over the fridge, pantry, and hidden cabinet
     * finalDoorChoice creates the post-puzzle options to leave the kitchen, or to stay
     * throughFinalDoor removes the choice buttons, and creates a screen-wide button to switch states*/

    addButtons: function() {
        //add the button on the fridge
        fridgeButton = kitchenScene.addButton(80, 200, 100, 440, 0);

        //add the button on the pantry
        pantryButton = kitchenScene.addButton(280, 80, 150, 350, 0);

        if (giftCount === 5) {
            //add the button on the cabinet that leads to the secret gift room
            secretRoomButton = kitchenScene.addButton(845, 390, 60, 110, 0);
        }

        //if all of the hidden items have been found in the pantry puzzle,
        if (allItemsFound === true) {

            //reset clickCount
            clickCount = 0;

            //add the first piece of text, and add ellipses to indicate to the player that there is more text
            kitchenScene.addTextBar('You hear a loud click as a door you didn\'t notice before'
                + ' unlocks to your right.');
            kitchenScene.addEllipses();

            //when the text bar is clicked, run the end-of-scene script
            textBar.events.onInputUp.add(this.beatPuzzleText, this);

            //if the hidden cabinet button is clicked, prepare to change states
            if (secretRoomButton != null) {
                secretRoomButton.events.onInputUp.add(this.secretRoomTextStart, this);
            }

        } else {
            //if there are still items that have not been found, add listeners

            //when the fridgeButton is pressed, change states
            fridgeButton.events.onInputUp.add(this.changeStateList, this);

            //when the pantryButton is pressed, change states
            pantryButton.events.onInputUp.add(this.changeStatePantry, this);

            //if the secretRoomButton is clicked, change states
            if (secretRoomButton != null) {
                secretRoomButton.events.onInputUp.add(this.secretRoomTextStart, this);
            }
        }
    },

    /** Once the player has found the gift, remove the sprite from the screen, set giftFound to true
     * (so the gift isn't made again if the player returns to the original state), update the giftCount,
     * and tell the player that they have found a gift. **/

    foundGift: function() {
        textBar.kill();
        text.kill();
        kitchenScene.removeEllipses();

        gift5.kill();
        giftFound = true;
        giftCount++;

        kitchenScene.addTextBar('You found a gift!');
        kitchenScene.addEllipses();
        textBar.events.onInputUp.add(this.changeGiftText, this);

        return giftCount;
    },

    /** Tells the player how many gifts they have found so far. **/

    changeGiftText: function() {
        if (giftText === false) {
            kitchenScene.changeText('You have found ' + giftCount + ' gift(s)');
            giftText = true;
            textBar.events.onInputUp.add(this.changeText, this);
        }

    },

    /** All of the functions that change the text in the text box:
     * changeText runs through the first two lines of text
     * beatPuzzleText runs through the script after finding all of the items in the pantry
     * stayInKitchen kills the textbar and text if the player chooses to stay
     * secretRoomTextStart begins the script for finding the secret room
     * secretRoomText runs through the full script for the secret room*/

    changeText: function() {
        //add text then remove the ellipses to indicate to the player there is no more text at this time
        kitchenScene.changeText('There\'s a list on the fridge door, and the pantry door seems '
            + 'to be unlocked.');
        kitchenScene.removeEllipses();

        //put buttons over the fridge, pantry, and cabinet doors
        this.addButtons();
    },

    beatPuzzleText: function() {
        //describe the newly opened doors
        //only allow the clickCount to increment to 3
        if (clickCount < 3) {
            clickCount++;
            if (clickCount === 1) {
                kitchenScene.changeText('You peer through the door but see nothing but darkness.');
            } else if (clickCount === 2) {
                kitchenScene.changeText('There\'s a chilly draft coming from the other side of the door.');
            } else if (clickCount === 3) {
                kitchenScene.changeText('What do you want to do?');
                kitchenScene.removeEllipses();

                //create the "leave or stay" choice buttons
                this.finalDoorChoice();
            }
        }
    },

    stayInKitchen: function() {
        //remove the text bar and its text from the scene (choice buttons remain)
        textBar.kill();
        text.kill();
    },

    secretRoomTextStart: function() {
        //remove the text bar and its text
        textBar.kill();
        text.kill();

        //if the player happens to click on the cabinet after the kitchenButton and finalDoorButton appear,
        //remove the buttons from the scene
        if (kitchenButton !== undefined) {
            kitchenButton.kill();
            finalDoorButton.kill();
        }

        //reset the clickCount to 0
        clickCount = 0;

        //add a new text bar and listener to to set up for the new cycle of text. When the new text bar is clicked,
        //the secretRoomText function is called
        kitchenScene.addTextBar('Huh. This cabinet door is the only one that is unlocked.');
        kitchenScene.addEllipses();
        textBar.events.onInputUp.add(this.secretRoomText, this);
    },

    secretRoomText: function() {

        if (clickCount < 5) {
            clickCount++;
            if (clickCount === 1) {
                kitchenScene.changeText('You crouch down and peer into the cabinet.');
            } else if (clickCount === 2) {
                kitchenScene.changeText('There\'s a tunnel carved through the cabinet!');
            } else if (clickCount === 3) {
                kitchenScene.changeText('You crawl into the tunnel.');
            } else if (clickCount === 4) {
                kitchenScene.changeText('As your eyes adjust, you can see a warm light ahead...');
            } else if (clickCount === 5) {
                //enter the secret room
                this.changeStateSecret();
            }
        }

    },

    finalDoorChoice: function() {
        //add choice buttons for staying in the kitchen and going through the door (leaving the kitchen)
        kitchenButton = kitchenScene.addChoiceButton(200, 500, 350, 80, 'Stay in the kitchen');
        finalDoorButton = kitchenScene.addChoiceButton(700, 500, 350, 80, 'Go through the door');

        //add listeners to the choice buttons
        kitchenButton.getButton().events.onInputUp.add(this.stayInKitchen, this);
        finalDoorButton.getButton().events.onInputUp.add(this.throughFinalDoor, this);
    },

    throughFinalDoor: function() {
        //remove the kitchenButton and the finalDoorButton from the scene
        kitchenButton.kill();
        finalDoorButton.kill();

        //add the last bit of text for this state
        kitchenScene.changeText('You step out of the kitchen into the darkness...');

        //create a button over the entire background and a listener for the player to click on the button.
        //When the player clicks the button (background), change states
        exitKitchenButton = kitchenScene.addButton(0, 0, 1200, 690, 0);
        exitKitchenButton.events.onInputUp.add(this.changeStateExposition, this);
    },

    /**The functions that switch to the next state, of which there are four*/

    changeStateList: function() {
        //change states to viewListState
        game.state.start('viewListState');
    },

    changeStatePantry: function() {
        //change states to pantryPuzzleState
        game.state.start('pantryPuzzleState');
    },

    changeStateExposition: function() {
        //change states to santaExpositionState
        nextState = 'fightState';
        game.state.start('santaExpositionState');
    },

    changeStateSecret: function() {
        //change states to secretRoomState
        game.state.start('secretRoomState');
    }
};