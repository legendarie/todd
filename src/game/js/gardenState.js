//establish the global variables
var clickCount;
var textBar;
var house;
var iceCavern;
var fruit1;
var fruit2;
var fruit3;
let gardenScene = null;

//initialize the state
var gardenState = {

    /**The initial functions to set up the scene for player interaction*/

    preload: function() {
        //declare gardenScene to be an instance of a Scene, and load in the background image to the state
        gardenScene = new Scene;
        gardenScene.setBackground('gardenbg', 'assets/gardenbg.png');

        //reset the global clickCount variable
        clickCount = 0;
    },

    create: function() {
        //check to make sure the scene variable is not null
        if (gardenScene != null) {

            //load the background and scale it
            gardenScene.loadScene('gardenbg', 0.9);

            //add the text bar (with all universal settings), with the first line of text
            gardenScene.addTextBar("You enter a subaquatic garden.");

            //add a set of ellipses to the text box to indicate
            //further messages
            gardenScene.addEllipses();

            //when the text bar is clicked, go to the changeText function
            textBar.events.onInputUp.add(this.changeText, this);
        }
    },

    /**All of the functions that change the text in the text box:*/

    changeText: function() {
        //only increment the click count 5 times
        if (clickCount < 5) {
            clickCount++;
            if (clickCount === 1) {
                gardenScene.changeText("It's lush with greenery.")
            } else if (clickCount === 2) {
                gardenScene.changeText("Er...bluery?")
            } else if (clickCount === 3) {
                gardenScene.changeText("This wasn't really what you were expecting to be here.")
            } else if (clickCount === 4) {
                gardenScene.changeText("You see two passageways and a towering tree.")
            } else {
                //change the text in the text bar, then create the passage/tree buttons
                gardenScene.changeText("Where do you want to go?");
                gardenScene.removeEllipses();
                this.houseButton();
                this.iceCavernButton();
                this.fruitButton();
            }
        }
    },

    beginDeathText: function() {
        //remove listeners on the fruit buttons and begin the death script
        fruit1.events.onInputUp.remove(this.beginDeathText, this);
        fruit2.events.onInputUp.remove(this.beginDeathText, this);
        fruit3.events.onInputUp.remove(this.beginDeathText, this);

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
                gardenScene.changeText("You feel a bit woozy.")
            } else if (clickCount === 9) {
                gardenScene.changeText("...")
            } else if (clickCount === 10) {
                gardenScene.changeText("Maybe you should take a nap.")
            } else if (clickCount === 11) {
                gardenScene.changeText("That spot under the tree looks good.")
            } else if (clickCount === 12) {
                gardenScene.changeText("Turning into fruit is pretty hard work, you know.")
            } else if (clickCount === 13) {
                gardenScene.changeText("You curl up by the twisting roots and fall asleep.")
            } else {
                //change the text in the text bar, then create the passage/tree buttons
                gardenScene.changeText("Your final dreams are of seafood and discount wigs.");
                textBar.events.onInputUp.add(this.changeStateDeath, this);
            }
        }
    },

    /**All of the functions that create interactive buttons:*/

    houseButton: function() {
        //make the door clickable. If clicked, call the changeStateHouse function
        house = gardenScene.addButton(100, 450, 200, 200, 0.2);
        house.events.onInputUp.add(this.changeStateHouse, this);
    },

    iceCavernButton: function() {
        //make the cavern entrance clickable. If clicked, call the changeStateCavern function
        iceCavern = gardenScene.addButton(700, 500, 200, 200, 0.2);
        iceCavern.events.onInputUp.add(this.changeStateCavern, this);
    },

    fruitButton: function() {
        //make the tree's fruits clickable. If clicked, run through a death scene.
        fruit1 = gardenScene.addButton(200, 50, 50, 50, 0.2);
        fruit2 = gardenScene.addButton(300, 50, 50, 50, 0.2);
        fruit3 = gardenScene.addButton(400, 50, 50, 50, 0.2);

        fruit1.events.onInputUp.add(this.changeStateDeath, this);
        fruit2.events.onInputUp.add(this.changeStateDeath, this);
        fruit3.events.onInputUp.add(this.changeStateDeath, this);
    },

    /**The function that switches to the next state, of which there are...*/

    changeStateHouse: function() {
        //change states to the next state
        nextState = 'nextState';
        game.state.start('nextState');
    },

    changeStateCavern: function() {
        //change states to the gem game
        nextState = 'penguinPuzzle';
        game.state.start('penguinPuzzle');
    },

    changeStateDeath: function() {
        //activate the death scene
        game.state.start('yaDeadState');
    }
};