var secretRoomButton;
var textBar;
var clickCount;
var kitchenButton;
var finalDoorButton;
var alreadyBeenKN = false;    //boolean variable to check to see if the player has already entered the state
let kitchenScene = null;

var kitchenState = {

    /** The initial function to set up the scene for player interaction */

    preload: function() {

        //create a new instance of Scene
        kitchenScene = new Scene;

        //load the background image into the state
        kitchenScene.setBackground('kitchen', 'assets/kitchenbg.jpg');
    },

    /** Add the initial visual elements to the canvas, and add the beginning text to the scene */

    create: function() {

        //make sure that kitchenScene variable is not still null
        if (kitchenScene !== null) {
            //add background to the state and scale it
            kitchenScene.loadScene('kitchen', 1.3);

            if (alreadyBeenKN === false) {
                //add explanatory text and ellipses
                kitchenScene.addTextBar('You step into someone\'s kitchen. You wonder whose it is.');
                kitchenScene.addEllipses();
                //when the text bar is clicked, call the changeText function
                textBar.events.onInputUp.add(this.changeText, this);

                //set alreadyBeenKN to true, so the player does not have to read the explanatory text again
                alreadyBeenKN = true;
            } else {
                //if the player has already entered the state, then skip the text and call the addButtons function
                this.addButtons();
            }
        }
    },

    /** Updates the text in the text bar to explain the scene to the player. Then, call the addButtons function */

    changeText: function() {

        //add text then remove the ellipses to indicate to the player there is no more text at this time
        kitchenScene.changeText('There\'s a list on the fridge door, and the pantry door seems '
            + 'to be unlocked.');
        kitchenScene.removeEllipses();

        //call the addButtons function
        this.addButtons();
    },

    /** Adds the buttons on the fridge, the pantry door, and the cabinet. If the fridge door is clicked,
     * the viewList function is called. If the pantry is clicked, the enterPantry function is called.
     * If the cabinet is clicked, the secretRoomTextStart function is called. */

    addButtons: function() {

        //add button on the fridge
        var fridgeButton = kitchenScene.addButton(80, 200, 100, 440, 0);

        //add button on the pantry
        var pantryButton = kitchenScene.addButton(280, 80, 150, 350, 0);

        //add button on the cabinet that leads to the secret gift room
        secretRoomButton = kitchenScene.addButton(845, 390, 60, 110, 0);

        if (allItemsFound === true) {
            //if allItemsFound (initiated and set in the pantryPuzzleState) is set to true in the pantryPuzzleState...

            //reset clickCount to 0
            clickCount = 0;

            //add the first piece of text, and add ellipses to indicate to the player that there is more text
            kitchenScene.addTextBar('You hear a loud click as a door you didn\'t notice before'
                + ' unlocks to your right.');
            kitchenScene.addEllipses();

            //when the text bar is clicked, call the beatPuzzleText function
            textBar.events.onInputUp.add(this.beatPuzzleText, this);

            //if the secretRoomButton is clicked, call the secretRoomTextStart function
            secretRoomButton.events.onInputUp.add(this.secretRoomTextStart, this);

        } else {
            //if allItemsFound (initiated and set in the pantryPuzzleState) is still set to
            //false in the pantryPuzzleState...

            //when the fridgeButton is pressed, call the viewList function
            fridgeButton.events.onInputUp.add(this.viewList, this);

            //when the pantryButton is pressed, call the enterPantry function
            pantryButton.events.onInputUp.add(this.enterPantry, this);

            //if the secretRoomButton is clicked, call the secretRoomTextStart function
            secretRoomButton.events.onInputUp.add(this.secretRoomTextStart, this);
        }

    },

    /** Adds more text to advance the plot. Only appears after the player has completed the Pantry Puzzle */

    beatPuzzleText: function() {

        //only allow the clickCount to increment to 3. Unnecessary for it to increment more
        if (clickCount < 3) {
            clickCount++;
            if (clickCount === 1) {
                kitchenScene.changeText('You peer through the door but see nothing but darkness.');
            } else if (clickCount === 2) {
                kitchenScene.changeText('There\'s a chilly draft coming from the other side of the door.');
            } else if (clickCount === 3) {
                kitchenScene.changeText('What do you want to do?');
                kitchenScene.removeEllipses();
                //call the finalDoorChoice function
                this.finalDoorChoice();
            }
        }
    },

    /** Gives the player the option to stay in the kitchen or exit the kitchen, which changes the state */

    finalDoorChoice: function() {

        //add choice buttons for staying in the kitchen and going through the door (leaving the kitchen)
        kitchenButton = kitchenScene.addChoiceButton(200, 500, 350, 80, 'Stay in the kitchen');
        finalDoorButton = kitchenScene.addChoiceButton(700, 500, 350, 80, 'Go through the door');

        //listens to these choice buttons and calls the stayInKitchen function if the kitchenButton is clicked,
        //and calls the throughFinalDoor function if the finalDoorButton is clicked
        kitchenButton.getButton().events.onInputUp.add(this.stayInKitchen, this);
        finalDoorButton.getButton().events.onInputUp.add(this.throughFinalDoor, this);

    },

    /** The player has chosen to stay in the kitchen */

    stayInKitchen: function() {

        //remove the text bar and its text from the scene, but the kitchenButton and the finalDoorButton remain
        textBar.kill();
        text.kill();

    },

    /** Adds first block of text setting up the secret room */

    secretRoomTextStart: function() {

        //remove the existing text bar and its text
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
        kitchenScene.addTextBar('Hmm, this cabinet door is the only one that is unlocked.');
        kitchenScene.addEllipses();
        textBar.events.onInputUp.add(this.secretRoomText, this);

    },

    /** The player has chosen to leave the kitchen and step through the door */

    throughFinalDoor: function() {

        //remove the kitchenButton and the finalDoorButton from the scene
        kitchenButton.kill();
        finalDoorButton.kill();

        //add the last bit of text for this state
        kitchenScene.changeText('You step out of the kitchen into the darkness...');

        //create a button over the entire background and a listener for the player to click on the button.
        //When the player clicks the button (background), call the leaveKitchen function
        var exitKitchenButton = kitchenScene.addButton(0, 0, 1200, 690, 0);
        exitKitchenButton.events.onInputUp.add(this.leaveKitchen, this);

    },

    /** Cycles through the remainder of the text setting up the secret room, then call the goToSecretRoom function */

    secretRoomText: function() {

        if (clickCount < 5) {
            clickCount++;
            if (clickCount === 1) {
                kitchenScene.changeText('You crouch down and peer into the cabinet.');
            } else if (clickCount === 2) {
                kitchenScene.changeText('There\'s a tunnel carved through the the cabinet!');
            } else if (clickCount === 3) {
                kitchenScene.changeText('You crawl into the tunnel.');
            } else if (clickCount === 4) {
                kitchenScene.changeText('As your eyes adjust, you can see a warm light ahead...');
                kitchenScene.removeEllipses();
            } else if (clickCount === 5) {
                this.goToSecretRoom();
            }
        }

    },

    /** Change the game state to viewListState */

    viewList: function() {
        game.state.start('viewListState');
    },

    /** Change the game state to pantryPuzzleState */

    enterPantry: function() {
        game.state.start('pantryPuzzleState');
    },

    /** Change the game state to the finalCorridorState */

    leaveKitchen: function() {
        game.state.start('finalCorridorState'); //doesn't exist yet
    },

    /** Changes game state to the secretRoomState */

    goToSecretRoom: function() {
        kitchenScene.changeText('nothing exists here yet oops');
        //game.state.start('secretRoomState'); //doesn't exist yet
    }

};