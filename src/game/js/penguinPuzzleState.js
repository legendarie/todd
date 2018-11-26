var clickCount;
var textBar;
var buttonManager;
var clickedButton;
var endsBranch;
var deadEnd;

//general positions for the three buttons
const LEFTXP = 275;
const MIDDLEXP = 450;
const RIGHTXP = 650;
const LOWYP = 550;
const HIGHYP = 425;

//variables for all buttons
var doorButton;
var penguinButton;
var heapButton;
var wallButton;

//the scene variable
var penguinPuzzleScene = null;

//initialize the state
var penguinPuzzleState = {

    /**The initial functions to set up the scene for player interaction*/

    preload: function () {
        //declare penguinPuzzleScene to be an instance of a Scene, and load in the background image to the state
        penguinPuzzleScene = new Scene;
        penguinPuzzleScene.setBackground('gearPuzzlebg', 'assets/gearPuzzlebg.png');

        //reset the global clickCount variable
        clickCount = 0;
    },

    create: function () {
        //check to make sure the penguinPuzzleScene variable is not null
        if (penguinPuzzleScene != null) {

            //load the background and scale it
            penguinPuzzleScene.loadScene('gearPuzzlebg', 0.32);

            //add the text bar (with all universal settings), with the first line of text
            penguinPuzzleScene.addTextBar("You pad into a quiet cave.");

            //add a set of ellipses to the text box to indicate
            //further messages
            penguinPuzzleScene.addEllipses();

            //create all of the buttons and their button links
            this.createButtons();
            this.setScripts();
            this.setNewButtons();

            //initialize the button choice manager and button list for the puzzle
            buttonManager = new ButtonManager();
            buttonManager.setTopLeftButton(doorButton);
            buttonManager.setTopRightButton(heapButton);
            buttonManager.setBottomLeftButton(penguinButton);
            buttonManager.setBottomRightButton(wallButton);

            //when the text bar is clicked, go to the changeText function
            textBar.events.onInputUp.add(this.changeText, this);
        }
    },

    changeText: function () {
        //only increment the click count four times
        if (clickCount < 4) {
            clickCount++;
            if (clickCount === 1) {
                penguinPuzzleScene.changeText("It's small, and rather cozy.")
            } else if (clickCount === 2) {
                penguinPuzzleScene.changeText("You can see a large, wooden door.")
            } else if (clickCount === 3) {
                penguinPuzzleScene.changeText("Right next to it is a sleeping penguin.")
            } else {
                //change the text in the text bar, then create the choice buttons
                penguinPuzzleScene.changeText("What do you want to do?");
                penguinPuzzleScene.removeEllipses();
                textBar.events.onInputUp.remove(this.changeText, this);
                this.makeButton(doorButton);
                this.makeButton(heapButton);
                this.makeButton(wallButton);
                this.makeButton(penguinButton);
            }
        }
    },

    makeButton: function (button) {
        //position the button in the window and begin reading through the script lines
        button.position();
        button.getButton().events.onInputUp.add(this.beginScript, this);
    },

    beginScript() {
        //clear the choices and the listener on the clicked choice
        this.removeButtons();
        clickedButton.getButton().events.onInputUp.remove(this.beginScript, this);

        //add the first line of the choice's script, ellipses if needed, and a listener on the text bar
        penguinPuzzleScene.changeText("" + clickedButton.next());
        if (clickedButton.scriptLength() > 1) {
            penguinPuzzleScene.addEllipses();
        }
        if (clickedButton.isIrregular() === true) {
            this.setButtonChanges();
            buttonManager.getNewButtons();
            clickedButton.removeButtons();
            this.addButtons();
        } else {
            textBar.events.onInputUp.add(this.runScript, this);
        }
    },

    runScript() {
        //if the script hasn't been fully run through, keep reading
        if (clickedButton.getSpot() < clickedButton.scriptLength()) {
            penguinPuzzleScene.changeText("" + clickedButton.next());
        } else {
            //if it has, check if it's an ending
            penguinPuzzleScene.removeEllipses();
            endsBranch = clickedButton.isEndButton();
            if (endsBranch === false) {
                //if it isn't, assign any new buttons and add them to the window
                //check to make sure the button needs the normal end-of-script question
                penguinPuzzleScene.changeText("What do you want to do?");
                this.setButtonChanges();
                buttonManager.getNewButtons();
                clickedButton.removeButtons();
                this.addButtons();
            } else {
                //if it is, check if it's a death
                deadEnd = clickedButton.isDeath();
                if (deadEnd === true) {
                    //if it is, enter the "You Died" screen
                    game.state.start('yaDeadState', yaDeadState);
                }
                else {
                    openDoor = penguinPuzzleScene.addButton(460, 210, 250, 252, 0);
                    openDoor.events.onInputUp.add(this.changeState, this);
                }
            }
            //always remove the listener
            textBar.events.onInputUp.remove(this.runScript, this);
        }
    },

    addButtons() {
        //check for any new buttons and assign them to the appropriate button slots in the manager
        if (buttonManager.getTopLeftButton() != null) {
            this.makeButton(buttonManager.getTopLeftButton())
        }
        if (buttonManager.getTopRightButton() != null) {
            this.makeButton(buttonManager.getTopRightButton())
        }
        if (buttonManager.getBottomLeftButton() != null) {
            this.makeButton(buttonManager.getBottomLeftButton())
        }
        if (buttonManager.getBottomRightButton() != null) {
            this.makeButton(buttonManager.getBottomRightButton())
        }
    },

    createButtons: function () {
        //initialize all buttons so they can be recognized by other functions
        doorButton = new InGameButton(LEFTXP, HIGHYP);
        penguinButton = new InGameButton(LEFTXP, LOWYP);
        heapButton = new InGameButton(RIGHTXP, HIGHYP);
        wallButton = new InGameButton(RIGHTXP, LOWYP);
    },

    setScripts: function() {
        //assign all button scripts and labels
        doorButton.setScript(["You step forward towards the wooden door.",
            "Beneath your foot, you hear the sharp crack of ice breaking.",
            "The penguin's eyes fly open.",
            "You see only your inevitable doom in its pupils.",
            "rip"]);
        doorButton.setLabel("Try the door");
        penguinButton.setScript(["You cautiously observe the penguin from a distance.",
            "It seems like it's fast asleep.",
            "You can hear it snoring softly.",
            "You definitely do not trust that penguin."]);
        penguinButton.setLabel("Check the penguin");
        heapButton.setScript(["A pile of snow and clothes is heaped on the cave floor.",
            "You can see a scarf and a frosty mitten.",
            "You decide not to get too much closer."]);
        heapButton.setLabel("Examine snow pile");
        wallButton.setScript(["The walls on either side seem to be natural cave walls.",
            "They're encased in ice, but there's rough stone underneath."]);
        wallButton.setLabel(["Search the walls"])
    },

    removeButtons: function () {
        //remove the button choices on the screen
        if (buttonManager.getTopLeftButton() != null) {
            buttonManager.getTopLeftButton().kill();
        }
        if (buttonManager.getTopRightButton() != null) {
            buttonManager.getTopRightButton().kill();
        }
        if (buttonManager.getBottomLeftButton() != null) {
            buttonManager.getBottomLeftButton().kill();
        }
        if (buttonManager.getBottomRightButton() != null) {
            buttonManager.getBottomRightButton().kill();
        }
    },

    setNewButtons: function () {
        //set the initial button links for the choices
        doorButton.setToDeath();
    },

    setButtonChanges: function() {
        //use a few checks to assign new choices depending on what the player clicks first
    },

    changeState: function() {
        //change states to the next state
        game.state.start('doorState', doorState)
    }
};