var clickCount;
var textBar;
var sign;
var path;
var alreadyBeen = false;    //a boolean variable to track whether the player has visited this screen before
let openReefScene = null;

//initialize the state
var openReefState = {

    /**The initial functions to set up the scene for player interaction*/

    preload: function() {
        //declare openReefScene to be an instance of a Scene, and load in the background image to the state
        openReefScene = new Scene;
        openReefScene.setBackground('openReefbg', 'assets/openReefbg.png');

        //reset the global clickCount variable
        clickCount = 0;
    },

    create: function() {
        //check to make sure the openReefScene variable is not null
        if (openReefScene != null) {

            //load the background and scale it
            openReefScene.loadScene('openReefbg', 0.6);

            //if the player hasn't been to this screen before,
            if (alreadyBeen === false) {
                //add the text bar (with all universal settings), with the first line of text
                openReefScene.addTextBar("You take your first step into a whole new world.");

                //add a set of ellipses to the text box to indicate
                //further messages
                openReefScene.addEllipses();

                //when the text bar is clicked, go to the changeText function
                textBar.events.onInputUp.add(this.changeText, this);
            } else {
                //if the player has already visited this screen, create the
                //interactive buttons without the text bar descriptions
                this.signButton();
                this.pathButton();
            }
        }
    },

    /**All of the functions that change the text in the text box:
     * changeText runs through the first three lines of text*/

    changeText: function() {
        //if the player hasn't been to this screen before,
        if (alreadyBeen === false) {
            //only increment the click count twice
            if (clickCount < 2) {
                clickCount++;
                if (clickCount === 1) {
                    openReefScene.changeText("The water feels strangely cold.")
                } else {
                    //change the text in the text bar, then create the sign and path buttons
                    openReefScene.changeText("You take a good look at your surroundings.");
                    openReefScene.removeEllipses();
                    alreadyBeen = true;
                    this.signButton();
                    this.pathButton();
                }
            }
        }
    },

    /**All of the functions that create interactive buttons:
     * signButton switches states to the sign
     * pathButton switches states to the forked path*/

    signButton: function() {
        //make the sign clickable. If clicked, it will call the changeStateSign function
        sign = openReefScene.addButton(300, 400, 50, 50, 0.2);
        sign.events.onInputUp.add(this.changeStateSign, this);
    },

    pathButton: function() {
        //make the path ahead clickable. If clicked, it will call the changeStateFork function
        path = openReefScene.addButton(450, 200, 300, 200, 0.2);
        path.events.onInputUp.add(this.changeStateFork, this);
    },

    /**The functions that switch to the next state, of which
     * there are two; one for the sign, and one for the road,
     * which progresses the story*/

    changeStateSign: function() {
        //change states to signState
        game.state.start('signState', signState);
    },

    changeStateFork: function() {
        //change states to roadForkState
        game.state.start('roadForkWGState', roadForkWGState);
    }
};