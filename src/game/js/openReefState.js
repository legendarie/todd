var clickCount;
var textBar;
var sign;
var path;
let openReefScene = null;

//initialize the state
var openReef = {

    preload: function() {
        //declare openReefScene to be an instance of a Scene, and load in the background image to the state
        openReefScene = new Scene;
        openReefScene.setBackground('destroyedReef', 'assets/destroyedReefbg.jpg');
        clickCount = 0;
    },

    create: function() {
        //check to make sure the openReefScene variable is not null
        if (openReefScene != null) {

            //load the background and scale it
            openReefScene.loadScene('cave', 0.5);

            //add the text bar (with all universal settings), with the first line of text
            openReefScene.addTextBar("You take your first step into a whole new world.");

            //when the text bar is clicked, go to the changeText function
            textBar.events.onInputUp.add(this.changeText, this);
        }
    },

    changeText: function() {
        //only increment the click count twice
        if (clickCount < 2) {
            clickCount++;
            if (clickCount === 1) {
                caveScene.changeText("The water feels strangely cold.")
            } else {
                caveScene.changeText("You take a good look at your surroundings.");
                this.signButton();
                this.pathButton();
            }
        }
    },

    signButton: function() {

    },

    pathButton: function() {

    }

}