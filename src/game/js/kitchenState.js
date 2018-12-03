var secretRoomButton;
var textBar;
var clickCount;
var kitchenButton;
var finalDoorButton;
var alreadyBeen = false;    //boolean variable to check to see if the player has already entered the state
let kitchenScene = null;

var kitchenState = {

    /** The initial function to set up the scene for player interaction */

    preload: function() {

        //create a new instance of Scene
        kitchenScene = new Scene;

        //load the background image into the state
        kitchenScene.setBackground('kitchen', 'assets/kitchenbg.jpg');

    },

    /** This function adds the starting visual elements to the scene. In this scene, there is the background
     * and a text bar, plus ellipses to indicate to the player that there is more text */

    create: function() {

        //add background to the state and scale it
        kitchenScene.loadScene('kitchen', 1.3);

        if (alreadyBeen === false) {
            //add explanatory text and ellipses
            kitchenScene.addTextBar('You step into someone\'s kitchen. You wonder whose it is.');
            kitchenScene.addEllipses();
            //when the text bar is clicked, call the changeText function
            textBar.events.onInputUp.add(this.changeText, this);

            //reset alreadyBeen to true, so the player does not have to read the explanatory text again
            alreadyBeen = true;

        } else {

            //if the player has already entered the state, then skip the text and call the addButtons function
            this.addButtons();
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

    /** Adds the buttons on the fridge and the pantry door into the scene. If the fridge door is clicked,
     * the viewList function is called. If the pantry is clicked, the enterPantry function is called. */

    addButtons: function() {

        //add button on the fridge
        var fridgeButton = kitchenScene.addButton(80, 200, 100, 440, 0);

        //add button on the pantry
        var pantryButton = kitchenScene.addButton(280, 80, 150, 350, 0);

        //add button on the cabinet that leads to the secret gift room
        secretRoomButton = kitchenScene.addButton(845, 390, 60, 110, 0);

        //if allItemsFound (instantiated in the pantryPuzzleState) is set to true in the pantryPuzzleState
        if (allItemsFound === true) {

            //set clickCount to 0 to start tracking the number of times the player clicks on the text bar
            clickCount = 0;
            kitchenScene.addTextBar('You hear a loud click as a door you didn\'t notice before'
                + ' unlocks to your right.');
            kitchenScene.addEllipses();
            //when the text bar is clicked, call the beatPuzzleText function
            textBar.events.onInputUp.add(this.beatPuzzleText, this);

            //if the secretRoomButton is clicked, call the secretRoomTextStart function
            secretRoomButton.events.onInputUp.add(this.secretRoomTextStart, this);

        } else {
            //if allItemsFound (instantiated in the pantryPuzzleState) is still set to
            //false in the pantryPuzzleState...

            //when the fridgeButton is pressed, call the viewList function
            fridgeButton.events.onInputUp.add(this.viewList, this);

            //when the pantryButton is pressed, call the enterPantry function
            pantryButton.events.onInputUp.add(this.enterPantry, this);

            //if the secretRoomButton is clicked, call the secretRoomTextStart function
            secretRoomButton.events.onInputUp.add(this.secretRoomTextStart, this);
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

    /** Adds more text to advance the plot. Only appears after the player has completed the Pantry Puzzle */

    beatPuzzleText: function() {
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

    /** Change the game state to the finalCorridorState */

    leaveKitchen: function() {
        game.state.start('finalCorridorState'); //doesn't exist yet
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

    /** Changes game state to the secretRoomState */

    goToSecretRoom: function() {
        kitchenScene.changeText('nothing exists here yet oops');
        //game.state.start('secretRoomState'); //doesn't exist yet
    }

};