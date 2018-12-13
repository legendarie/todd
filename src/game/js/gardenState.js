//establish the global variables
var clickCount;
var hasDiedGarden = false;
var textBar;
var gift4;
var house;
var iceCavern;
var fruit;

let gardenScene = null;

//initialize the state
var gardenState = {

    /**The initial functions to set up the scene for player interaction*/

    preload: function() {
        //declare gardenScene to be an instance of a Scene
        gardenScene = new Scene;

        //load in the background image to the state
        gardenScene.setBackground('gardenbg', 'assets/gardenbg.png');

        //load the gift sprite into the state
        gardenScene.setSprite('gift', 'assets/gift.png');

        //reset the global clickCount, giftFound, and giftText variables
        clickCount = 0;
        if (hasDiedGarden === false) {
            giftFound = false;
        }
        giftText = false;
    },

    /**Add the visual elements to the canvas, and add the first line of text to the scene*/

    create: function() {
        //check to make sure that the scene has been created
        if (gardenScene != null) {

            //load the background and scale it
            gardenScene.loadScene('gardenbg', 0.32);

            //load the gift sprite and scale it
            if (giftFound === false) {
                gift4 = gardenScene.addSprite(100, 550, 'gift', 0.015);
                gift4.events.onInputUp.add(this.foundGift, this);
            }

            if (hasDiedGarden === false) {
                //add the text bar (with all universal settings), with the first line of text
                gardenScene.addTextBar("You come across a crossroads.");

                //add a set of ellipses to the text box to indicate
                //further messages
                gardenScene.addEllipses();

                //when the text bar is clicked, go to the changeText function
                textBar.events.onInputUp.add(this.changeText, this);

            } else {
                gardenScene.addTextBar("Where do you want to go?");
                this.houseButton();
                this.iceCavernButton();
                this.fruitButton();
            }
        }
    },

    /** Once the player has found the gift, remove the sprite from the screen, set giftFound to true
     * (so the gift isn't made again if the player returns to the original state), update the giftCount,
     * and tell the player that they have found a gift. **/

    foundGift: function() {
        textBar.kill();
        text.kill();
        gardenScene.removeEllipses();

        gift4.kill();
        giftFound = true;
        giftCount++;

        gardenScene.addTextBar('You found a gift!');
        gardenScene.addEllipses();
        textBar.events.onInputUp.add(this.changeGiftText, this);

        return giftCount;
    },

    /** Tells the player how many gifts they have found so far. **/

    changeGiftText: function() {
        if (giftText === false) {
            gardenScene.changeText('You have found ' + giftCount + ' gift(s)');
            giftText = true;
            if (clickCount < 5) {
                textBar.events.onInputUp.add(this.changeText, this);
            } else {
                gardenScene.removeEllipses();
                this.houseButton();
                this.iceCavernButton();
                this.fruitButton();
            }
        }
    },

    /**All of the functions that change the text in the text box:
     * changeText runs through the first six lines of text
     * beginDeathText prepares the death script
     * continueDeathText runs through the death sequence for touching the fruit*/

    changeText: function() {
        console.log(clickCount);
        //describe the grotto
        //only increment the click count 5 times
        if (clickCount < 5) {
            clickCount++;
            if (clickCount === 1) {
                gardenScene.changeText("The little grotto is overgrown with different types of plants.");
            } else if (clickCount === 2) {
                gardenScene.changeText("They are somewhat tactfully arranged.");
            } else if (clickCount === 3) {
                gardenScene.changeText("A glowing lantern sits on a stony ledge.");
            } else if (clickCount === 4) {
                gardenScene.changeText("You see a solid stone door, and an icy tunnel.");
            } else {
                //once this script has been run through, create the passage/tree buttons
                gardenScene.changeText("Where do you want to go?");
                textBar.events.onInputUp.remove(this.changeText, this);
                clickCount = 0;
                gardenScene.removeEllipses();

                this.houseButton();
                this.iceCavernButton();
                this.fruitButton();
            }
        }
    },

    beginDeathText: function() {
        //remove listener on the buttons and begin the death script
        fruit.events.onInputUp.remove(this.beginDeathText, this);
        house.events.onInputUp.remove(this.changeStateHouse, this);
        iceCavern.events.onInputUp.remove(this.changeStateCavern, this);

        gardenScene.addEllipses();

        gardenScene.changeText("You reach up to pluck some interesting-looking fruit.");
        textBar.events.onInputUp.add(this.continueDeathText, this);
    },

    continueDeathText: function() {
        //run the player through the death script
        //only allow the clickCount to increment to 9
        if (clickCount < 10) {
            clickCount++;
            if (clickCount === 1) {
                gardenScene.changeText("It's a bit of a stretch, but you're able to grab one.");
                gardenScene.addEllipses();
            } else if (clickCount === 2) {
                gardenScene.changeText("Immediately, you retract your hand in surprise.");
            } else if (clickCount === 3) {
                gardenScene.changeText("The thick gel on its skin latches onto your fingers.");
            } else if (clickCount === 3) {
                gardenScene.changeText("It starts sinking into your flesh like an acid.");
            } else if (clickCount === 4) {
                gardenScene.changeText("Your arm is turning purple.");
            } else if (clickCount === 5) {
                gardenScene.changeText("...");
            } else if (clickCount === 6) {
                gardenScene.changeText("It's turning into fruit!");
            } else if (clickCount === 7) {
                gardenScene.changeText("YOU'RE turning into fruit!");
            } else if (clickCount === 8) {
                gardenScene.changeText("...");
            } else if (clickCount === 9) {
                gardenScene.changeText("You give your hand a lick.");
            } else {
                //once this script has been run through, call the death state
                gardenScene.changeText("Your final comfort is the knowledge that you taste delicious.");
                textBar.events.onInputUp.add(this.changeStateDeath, this);
            }
        }
    },

    /**All of the functions that create interactive buttons:
     * houseButton creates the button over the door leading to kitchenState
     * iceCavernButton creates the button over the tunnel leading to the gem game
     * fruitButton creates the button over the fruit cluster that activates a death sequence*/

    houseButton: function() {
        //make the door clickable. If clicked, call the changeStateHouse function
        house = gardenScene.addButton(325, 175, 200, 275, 0);
        house.events.onInputUp.add(this.changeStateHouse, this);
    },

    iceCavernButton: function() {
        //make the cavern entrance clickable. If clicked, call the changeStateCavern function
        iceCavern = gardenScene.addButton(775, 380, 275, 275, 0);
        iceCavern.events.onInputUp.add(this.changeStateCavern, this);
    },

    fruitButton: function() {
        //make the tree's fruits clickable. If clicked, run through a death scene.
        fruit = gardenScene.addButton(266, 185, 30, 40, 0);
        fruit.events.onInputUp.add(this.beginDeathText, this);
    },

    /**The functions that switch to the next state, of which there are three*/

    changeStateHouse: function() {
        //change states to kitchenState
        nextState = 'kitchenState';
        game.state.start('kitchenState');
    },

    changeStateCavern: function() {
        //change states penguinPuzzleState
        nextState = 'penguinPuzzleState';
        game.state.start('penguinPuzzleState');
    },

    changeStateDeath: function() {
        //activate the death state
        hasDiedGarden = true;
        nextState = 'gardenState';
        game.state.start('yaDeadState');
    }
};