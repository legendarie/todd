//establish the global variables
var clickCount;
var textBar;
var door;
let workshopScene = null;

//initialize the state
var workshopState = {

    /**The initial functions to set up the scene for player interaction*/

    preload: function() {
        //declare scene to be an instance of a Scene, and load in the background image to the state
        workshopScene = new Scene;
        workshopScene.setBackground('workshopbg', 'assets/workshopbg.png');

        //reset the global clickCount variable
        clickCount = 0;
    },

    create: function() {
        //check to make sure the scene variable is not null
        if (workshopScene != null) {

            //load the background and scale it
            workshopScene.loadScene('workshopbg', 0.9);

            //add the text bar (with all universal settings), with the first line of text
            workshopScene.addTextBar("As you enter the workshop, you lift the lever by the door.");

            //add a set of ellipses to the text box to indicate
            //further messages
            workshopScene.addEllipses();

            //when the text bar is clicked, go to the changeText function
            textBar.events.onInputUp.add(this.changeText, this);
        }
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

    /**All of the functions that create interactive buttons:*/

    doorButton: function() {
        //make something clickable. If the exit is clicked, call the changeState function
        door = workshopScene.addButton(815, 50, 200, 275, 0.2);
        door.events.onInputUp.add(this.changeState, this);
    },

    /**The function that switches to the next state, of which there are...*/

    changeState: function() {
        //change states to the next state
        nextState = 'gardenState';
        game.state.start('transitionCaveState');
    }
};