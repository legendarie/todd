//establish the global variables
var clickCount;
var textBar;
var house;
var iceCavern;
var fruit;
let gardenScene = null;

//initialize the state
var gardenState = {

    /**The initial functions to set up the scene for player interaction*/

    preload: function() {
        //declare gardenScene to be an instance of a Scene, and load in the background image to the state
        gardenScene = new Scene;
        gardenScene.setBackground('gardenbg', 'assets/gardenbg.png');

        this.hasDied = false;

        //reset the global clickCount variable
        clickCount = 0;
    },

    create: function() {
        //check to make sure the scene variable is not null
        if (gardenScene != null) {

            //load the background and scale it
            gardenScene.loadScene('gardenbg', 0.32);


            //if the player has died here, respawn them without the introductory text
            if (this.hasDied === true) {
                gardenScene.addTextBar("");
                this.houseButton();
                this.iceCavernButton();
                this.fruitButton();
            } else {

                //add the text bar (with all universal settings), with the first line of text
                gardenScene.addTextBar("You come across a crossroads.");

                //add a set of ellipses to the text box to indicate
                //further messages
                gardenScene.addEllipses();

                //when the text bar is clicked, go to the changeText function
                textBar.events.onInputUp.add(this.changeText, this);
            }
        }
    },

    /**All of the functions that change the text in the text box:
     * changeText runs through the first six lines of text
     * beginDeathText prepares the death script
     * continueDeathText runs through the death sequence for touching the fruit*/

    changeText: function() {
        //only increment the click count 5 times
        if (clickCount < 5) {
            clickCount++;
            if (clickCount === 1) {
                gardenScene.changeText("The little grotto is overgrown with different types of plants.")
            } else if (clickCount === 2) {
                gardenScene.changeText("They are somewhat tactfully arranged.")
            } else if (clickCount === 3) {
                gardenScene.changeText("A glowing lantern sits on a stony ledge.")
            } else if (clickCount === 4) {
                gardenScene.changeText("You see a solid stone door, and an icy tunnel.")
            } else {
                //change the text in the text bar, then create the passage/tree buttons
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
        //remove listeners on the fruit buttons and begin the death script
        fruit.events.onInputUp.remove(this.beginDeathText, this);
        house.events.onInputUp.remove(this.changeStateHouse, this);
        iceCavern.events.onInputUp.remove(this.changeStateCavern, this);

        gardenScene.addEllipses();

        gardenScene.changeText("You reach up to pluck some interesting-looking fruit.");
        textBar.events.onInputUp.add(this.continueDeathText, this);
    },

    continueDeathText: function() {
        //increment the click count 15 times
        if (clickCount < 15) {
            clickCount++;
            if (clickCount === 1) {
                gardenScene.changeText("It's a bit of a stretch, but you're able to grab one.")
            } else if (clickCount === 2) {
                gardenScene.changeText("Immediately, you retract your hand in surprise.")
            } else if (clickCount === 3) {
                gardenScene.changeText("The thick gel on its skin latches onto your fingers.")
            } else if (clickCount === 3) {
                gardenScene.changeText("It starts sinking into your flesh like an acid.")
            } else if (clickCount === 4) {
                gardenScene.changeText("Your arm is turning purple.")
            } else if (clickCount === 5) {
                gardenScene.changeText("...")
            } else if (clickCount === 6) {
                gardenScene.changeText("It's turning into fruit!")
            } else if (clickCount === 7) {
                gardenScene.changeText("YOU'RE turning into fruit!")
            } else if (clickCount === 8) {
                gardenScene.changeText("...")
            } else if (clickCount === 9) {
                gardenScene.changeText("You give your hand a lick.")
            } else {
                //change the text in the text bar, then create the passage/tree buttons
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
        //change states to the next state
        nextState = 'kitchenState';
        game.state.start('kitchenState');
    },

    changeStateCavern: function() {
        //change states to the gem game
        nextState = 'penguinPuzzleState';
        game.state.start('penguinPuzzleState');
    },

    changeStateDeath: function() {
        //activate the death scene
        this.hasDied = true;
        game.state.start('yaDeadState');
    }
};