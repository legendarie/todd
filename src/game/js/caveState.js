//establish the global variables
var cave;
var caveClickCount = 0;
var textBar;
var leftCave;
var rightCave;
let caveScene = null;

//!!There's some error going on where the third line of text is skipped when clickCount is used instead of caveClickCount,
//so we should look into that.

//initialize the state
var caveState = {

    preload: function() {
        //declare caveScene to be an instance of a Scene, and load in the background image to the state
        caveScene = new Scene;
        caveScene.setBackground('cave', 'assets/cave.jpg');

    },

    create: function() {
        //check to make sure the caveScene variable is not null
        if (caveScene != null) {

            //load the background and scale it
            caveScene.loadScene('cave', 0.5);

            //add the text bar (with all universal settings), with the first line of text
            caveScene.addTextBar("The entrance of the cave is dim," +
                " but you can just make out your surroundings.");

            //when the text bar is clicked, go to the changeText function
            textBar.events.onInputUp.add(this.changeText, this);
        }

    },

    changeText: function() {
        //only increment the click count four times
        if (caveClickCount < 4) {
            caveClickCount++;
            if (caveClickCount === 1) {
                caveScene.changeText("Before you snake two dark tunnels.")
            } else if (caveClickCount === 2) {
                caveScene.changeText("To the left, you hear the rhythmic click" +
                " of metal on metal.")
            } else if (caveClickCount === 3) {
                caveScene.changeText("To the right, you can just barely make out a soft," +
                " green glow.")
            } else {
                //change the text in the text bar, then call the caveClicks function
                caveScene.changeText("Which tunnel do you choose to follow?");
                this.caveClicks();
            }
        }
    },

    caveClicks: function() {
        //make the left tunnel clickable. If clicked, it will call the changeStatePuzzle
        leftCave = caveScene.addButton(225, 250, 260, 300, 0);
        leftCave.events.onInputUp.add(this.changeStatePuzzle, this);

        //make the right tunnel clickable. If clicked, it will call the changeStateHall function
        rightCave = caveScene.addButton(625, 250, 260, 300, 0);
        rightCave.events.onInputUp.add(this.changeStateHall, this);

    },

    changeStatePuzzle: function() {
        //change states to the gear puzzle
        game.state.start('sceneGearPuzzle', doorState);
    },

    changeStateHall: function() {
        //change states to the algae hallway
        game.state.start('sceneAlgaeHall', openDoorState);
    }

}