//establish the global variables
var clickCount;
var textBar;
var thing;
var gearButton1;
var windowButton1;
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
            gearPuzzleScene.addTextBar("The left tunnel leads into a wide cavern.");

            //add a set of ellipses to the text box to indicate
            //further messages
            gearPuzzleScene.addEllipses();

            //when the text bar is clicked, go to the changeText function
            textBar.events.onInputUp.add(this.changeText, this);
        }
    },

    /**All of the functions that change the text in the text box:
     * changeText runs through the first five lines of text
     * gearChoice1Text shows text specific to investigating the gears first
     * windowChoice1Text shows text specific to looking through the window first*/

    changeText: function() {
        //only increment the click count four times
        if (clickCount < 4) {
            clickCount++;
            if (clickCount === 1) {
                gearPuzzleScene.changeText("Before you, you can see a barred doorway.")
            } else if (clickCount === 2) {
                gearPuzzleScene.changeText("A crack in the wall is filled with whirring gears.")
            } else if (clickCount === 3) {
                gearPuzzleScene.changeText("A small window peers into the next room.")
            } else {
                //change the text in the text bar, then create the choice buttons
                gearPuzzleScene.changeText("What do you want to do?");
                gearPuzzleScene.removeEllipses();
                this.gearChoice1();
                this.windowChoice1();
            }
        }
    },

    gearChoice1Text() {
      gearPuzzleScene.changeText("You see some pretty neato gears.");
    },

    windowChoice1Text() {
        gearPuzzleScene.changeText("Y E L L O W")
    },

    /**All of the functions that create interactive buttons:
     * gearChoice1 adds a button to investigate the gears first
     * windowChoice1 adds a button to look through the window first*/

    gearChoice1() {
        //presents the first choice available for investigating the gears
        gearButton1 = gearPuzzleScene.addChoice(200, 500, 300, 100, "Lookat dem gears");
        gearButton1.getButton().events.onInputUp.add(this.gearChoice1Text, this);
    },

    windowChoice1() {
        //presents the first choice available for looking through the window
        windowButton1 = gearPuzzleScene.addChoice(700, 500, 300, 100, "Lookie in da window");
        windowButton1.getButton().events.onInputUp.add(this.windowChoice1Text, this);
    },

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