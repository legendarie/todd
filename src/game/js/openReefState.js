var clickCount = 0;
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
        //only increment the click count four times
        if (clickCount < 4) {
            clickCount++;
            if (clickCount === 1) {
                caveScene.changeText("Before you snake two dark tunnels.")
            } else if (clickCount === 2) {
                caveScene.changeText("To the left, you hear the rhythmic click" +
                    " of metal on metal.")
            } else if (clickCount === 3) {
                caveScene.changeText("To the right, you can just barely make out a soft," +
                    " green glow.")
            } else {
                //change the text in the text bar, then call the caveClicks function
                caveScene.changeText("Which tunnel do you choose to follow?");
                this.caveClicks();
            }
        }
    }

}