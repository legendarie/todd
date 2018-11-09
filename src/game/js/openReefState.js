var clickCount;
var textBar;
var sign;
var path;
let openReefScene = null;

//initialize the state
var openReefState = {

    preload: function() {
        //declare openReefScene to be an instance of a Scene, and load in the background image to the state
        openReefScene = new Scene;
        openReefScene.setBackground('destroyedReefbg', 'assets/destroyedReefbg.png');
        clickCount = 0;
    },

    create: function() {
        //check to make sure the openReefScene variable is not null
        if (openReefScene != null) {

            //load the background and scale it
            openReefScene.loadScene('destroyedReefbg', 0.9);

            //add the text bar (with all universal settings), with the first line of text
            openReefScene.addTextBar("You take your first step into a whole new world.");

            //add a set of ellipses to the text box to indicate
            //further messages
            openReefScene.addEllipses();

            //when the text bar is clicked, go to the changeText function
            textBar.events.onInputUp.add(this.changeText, this);
        }
    },

    changeText: function() {
        //only increment the click count twice
        if (clickCount < 2) {
            clickCount++;
            if (clickCount === 1) {
                openReefScene.changeText("The water feels strangely cold.")
            } else {
                openReefScene.changeText("You take a good look at your surroundings.");
                openReefScene.removeEllipses();
                this.signButton();
                this.pathButton();
            }
        }
    },

    signButton: function() {
        sign = openReefScene.addButton(300, 400, 50, 50, 0.2)
    },

    pathButton: function() {
        sign = openReefScene.addButton(450, 200, 300, 200, 0.2)
    }

}