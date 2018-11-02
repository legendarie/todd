//establish the global variables
var cave;
var text;
var textBar;
var style;
var clickCount = 0;
var leftCave;
var rightCave;

//initialize the state
var sceneCave = {

    preload: function() {
        //load in the background image to the state
        game.load.image('cave','assets/cave.jpg')

    },

    create: function() {
        //add the background to the canvas and scale appropriately
        cave = game.add.image(0, 0, 'cave');
        cave.scale.setTo(0.5);

        //add the text bar and make it interactable
        textBar = game.add.graphics();
        textBar.beginFill(0x000000, 0.2);
        textBar.drawRect(0, 40, 1200, 100);
        textBar.inputEnabled = true;

        //set the style of the font to be put in the text bar (this is used in multiple functions)
        style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

        //add the text to the center of the text bar
        text = game.add.text(0, 0, "The entrance of the cave is dim," +
            " but you can just make out your surroundings.", style);
        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        text.setTextBounds(0, 40, 1200, 100);

        //when the text bar is clicked, go to the changeText function
        textBar.events.onInputUp.add(this.changeText, this);

    },

    changeText: function() {
        //only increment the click count four times
        if (clickCount < 4) {
            clickCount++;
            text.kill();
            if (clickCount == 1) {
                //change the text in the text bar
                text = game.add.text(0, 0, "Before you wind two dark tunnels.", style);
                text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
                text.setTextBounds(0, 40, 1200, 100);
            } else if (clickCount == 2) {
                //change the text in the text bar
                text = game.add.text(0, 0, "To the left, you hear the rhythmic click" +
                    " of metal on metal.", style);
                text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
                text.setTextBounds(0, 40, 1200, 100);
            } else if (clickCount == 3) {
                //change the text in the text bar
                text = game.add.text(0, 0, "To the right, you can just make out a soft," +
                    " green glow.", style);
                text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
                text.setTextBounds(0, 40, 1200, 100);
            } else {
                //change the text in the text bar, then call the caveClicks function
                text = game.add.text(0, 0, "Which tunnel do you choose to follow?", style);
                text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
                text.setTextBounds(0, 40, 1200, 100);
                this.caveClicks();
            }
        }

    },

    caveClicks: function() {
        //make the left tunnel clickable. If clicked, it will call the changeStatePuzzle
        leftCave = game.add.graphics();
        leftCave.beginFill(0x000000, 0);
        leftCave.drawRect(225, 250, 260, 300);
        leftCave.inputEnabled = true;
        leftCave.events.onInputUp.add(this.changeStatePuzzle, this);

        //make the right tunnel clickable. If clicked, it will call the changeStateHall function
        rightCave = game.add.graphics();
        rightCave.beginFill(0x000000, 0);
        rightCave.drawRect(625, 250, 260, 300);
        rightCave.inputEnabled = true;
        rightCave.events.onInputUp.add(this.changeStateHall, this);

    },

    changeStatePuzzle: function() {
        //change states to the gear puzzle
        game.state.start('sceneGearPuzzle', scene1);
    },

    changeStateHall: function() {
        //change states to the algae hallway
        game.state.start('sceneAlgaeHall', scene2);
    }

}