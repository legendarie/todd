//establish the global variables
var clickCount;
var textBar;
var thing;
let genericScene = null;

//initialize the state
var stateTemplate = {

    /**The initial functions to set up the scene for player interaction*/

    preload: function() {
        //declare scene to be an instance of a Scene, and load in the background image to the state
        genericScene = new Scene;
        genericScene.setBackground('image', 'assets/image');

        //reset the global clickCount variable
        clickCount = 0;
    },

    create: function() {
        //check to make sure the scene variable is not null
        if (genericScene != null) {

            //load the background and scale it
            genericScene.loadScene('image', 0.6);

            //add the text bar (with all universal settings), with the first line of text
            genericScene.addTextBar("FirstText.");

            //add a set of ellipses to the text box to indicate
            //further messages
            genericScene.addEllipses();

            //when the text bar is clicked, go to the changeText function
            textBar.events.onInputUp.add(this.changeText, this);
        }
    },

    /**All of the functions that change the text in the text box:*/

    changeText: function() {
        //only increment the click count so many times
        if (clickCount < 0) {
            clickCount++;
            if (clickCount === 1) {
                genericScene.changeText("Second Text.")
            } else {
                //change the text in the text bar, then further the plot somehow
                genericScene.changeText("Third Text.");
                genericScene.removeEllipses();
                this.nextSceneButton();
            }
        }
    },

    /**All of the functions that create interactive buttons:*/

    nextSceneButton: function() {
        //make something clickable. If the thing is clicked, call the changeState function
        thing = genericScene.addButton(450, 210, 250, 420, 0);
        thing.events.onInputUp.add(this.changeState, this);
    },

    /**The function that switches to the next state, of which there are...*/

    changeState: function() {
        //change states to the next state
        game.state.start('nextState', 'the variable for nextState');
    }
};