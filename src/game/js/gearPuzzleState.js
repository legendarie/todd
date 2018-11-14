//establish the global variables
var clickCount;
var textBar;
var thing;
var gearButton1;
let gearPuzzleScene = null;

//initialize the state
var gearPuzzleState = {

    /**The initial functions to set up the scene for player interaction*/

    preload: function() {
        //declare gearPuzzleScene to be an instance of a Scene, and load in the background image to the state
        gearPuzzleScene = new Scene;
        gearPuzzleScene.setBackground('gearPuzzlebg', 'assets/gearPuzzlebg.png');

        //reset the global clickCount variable
        clickCount = 0;
    },

    create: function() {
        //check to make sure the gearPuzzleScene variable is not null
        if (gearPuzzleScene != null) {

            //load the background and scale it
            gearPuzzleScene.loadScene('gearPuzzlebg', 0.32);

            //add the text bar (with all universal settings), with the first line of text
            gearPuzzleScene.addTextBar("First Text.");

            //add a set of ellipses to the text box to indicate
            //further messages
            gearPuzzleScene.addEllipses();

            //when the text bar is clicked, go to the changeText function
            textBar.events.onInputUp.add(this.changeText, this);
        }
    },

    /**All of the functions that change the text in the text box:*/

    changeText: function() {
        //only increment the click count twice
        if (clickCount < 2) {
            clickCount++;
            if (clickCount === 1) {
                gearPuzzleScene.changeText("Second Text.")
            } else {
                //change the text in the text bar, then create the choice buttons
                gearPuzzleScene.changeText("Third Text.");
                gearPuzzleScene.removeEllipses();
                this.addGearChoice1();
            }
        }
    },

    /**All of the functions that create interactive buttons:*/

    // addGearChoice1() {
    //     //add the button that presents the first choice available for investigating the gears
    //     gearButton1 = gearPuzzleScene.addChoice(200, 200, 200, 200, "Lookat dem gears");
    //     gearButton1.events.onInputUp.add(gearPuzzleScene.changeText("You see some pretty neato gears."))
    // },

    nextSceneButton: function() {
        //make something clickable. If the thing is clicked, call the changeState function
        thing = gearPuzzleScene.addButton(450, 210, 250, 420, 0.2);
        thing.events.onInputUp.add(this.changeState, this);
    },

    /**The function that switches to the next state*/

    changeState: function() {
        //change states to the next state
        game.state.start('doorState', doorState);
    }
};