var clickCount;
var textBar;
var buttonManager;
var clickedButton;
var endsBranch;
var deadEnd;

//bug: **"Cut the wire" appears even when the wire has not been found, should fix**

//general positions for the three buttons
const LEFTXG = 100;
const MIDDLEXG = 450;
const RIGHTXG = 800;
const DUORIGHTXG = 650;
const DUOLEFTXG = 275;
const REGYG = 500;

//variables for all buttons
var barButton;
var followWireButton;
var testWireButton;
var tripWireButton;
var cutWireButton;
var cutWireWellButton;
var gear1Button;
var gear2Button;
var removeRockButton;
var checkGearsButton;
var checkGears2Button;
var jamCheckButton;
var window1Button;
var window2Button;
var window3Button;
var window4Button;
var boardButton;
var switchSearchButton;
var pullLever1Button;
var pullLever2Button;
var checkWindowButton;
var grabToolButton;
var cutDangerButton;
var cutSafeButton;
var followWire2Button;

//the scene variable
var gearPuzzleScene = null;

//initialize the state
var gearPuzzleState = {

    /** The initial functions to set up the scene for player interaction */

    preload: function () {
        //declare gearPuzzleScene to be an instance of a Scene, and load in the background image to the state
        gearPuzzleScene = new Scene;
        gearPuzzleScene.setBackground('gearPuzzlebg', 'assets/gearPuzzlebg.png');
        gearPuzzleScene.setBackground('brokenBarsbg', 'assets/brokenBarsbg.png');

        //reset the global clickCount variable
        clickCount = 0;
    },

    /** Add all the initial visual elements to the canvas */

    create: function () {
        //check to make sure the gearPuzzleScene variable is not null
        if (gearPuzzleScene != null) {

            //load the background and scale it
            gearPuzzleScene.loadScene('gearPuzzlebg', 0.32);

            if (this.hasDied !== true) {
                //add the text bar (with all universal settings), with the first line of text
                gearPuzzleScene.addTextBar("The left tunnel leads into a wide cavern.");
            } else {
                gearPuzzleScene.addTextBar("What do you want to do?");
            }

            //add a set of ellipses to the text box to indicate
            //further messages
            gearPuzzleScene.addEllipses();

            //create all of the buttons and their button links
            this.createButtons();
            this.setScripts();
            this.setNewButtons();

            // //initialize the button choice manager and button list for the puzzle
            // //remove this when gearPuzzleScene is hooked up to the rest of the game
            // buttonManager = new ButtonManager(gear1Button, barButton, window1Button);

            if (this.hasDied !== true) {
                buttonManager.setLeftButton(gear1Button);
                buttonManager.setMiddleButton(barButton);
                buttonManager.setRightButton(window1Button);

                //when the text bar is clicked, go to the changeText function
                textBar.events.onInputUp.add(this.changeText, this);
            } else {
                if (buttonManager.getLeftButton() != null) {
                    this.makeButton(buttonManager.getLeftButton());
                }
                if (buttonManager.getMiddleButton() != null) {
                    this.makeButton(buttonManager.getMiddleButton());
                }
                if (buttonManager.getRightButton() != null) {
                    this.makeButton(buttonManager.getRightButton());
                }
            }
        }
    },

    /** All of the functions that have to do with the text in the text box:
     * changeText runs through the first five lines of text
     * beginScript displays the first line of a button's script when it's clicked, and calls runScript
     * runScript runs through the entire script of a button, makes checks for changes or certain criteria,
     * and displays the next buttons to appear
     * setScripts sets the scripts and labels for each button */

    changeText: function () {
        //only increment the click count four times
        if (clickCount < 4) {
            clickCount++;
            if (clickCount === 1) {
                gearPuzzleScene.changeText("Before you, you can see a barred doorway.")
            } else if (clickCount === 2) {
                gearPuzzleScene.changeText("A crack in the wall is filled with large gears.")
            } else if (clickCount === 3) {
                gearPuzzleScene.changeText("A small window peers into the next room.")
            } else {
                //change the text in the text bar, then create the choice buttons
                gearPuzzleScene.changeText("What do you want to do?");
                gearPuzzleScene.removeEllipses();
                textBar.events.onInputUp.remove(this.changeText, this);
                this.makeButton(barButton);
                this.makeButton(gear1Button);
                this.makeButton(window1Button);
            }
        }
    },

    beginScript() {
        //clear the choices and the listener on the clicked choice
        this.removeButtons();
        clickedButton.getButton().events.onInputUp.remove(this.beginScript, this);

        //add the first line of the choice's script, ellipses if needed, and a listener on the text bar
        gearPuzzleScene.changeText("" + clickedButton.next());
        if (clickedButton.scriptLength() > 1) {
            gearPuzzleScene.addEllipses();
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
            gearPuzzleScene.changeText("" + clickedButton.next());
        } else {
            //if it has, check if it's an ending
            gearPuzzleScene.removeEllipses();
            endsBranch = clickedButton.isEndButton();
            if (endsBranch === false) {
                //if it isn't, assign any new buttons and add them to the window
                //check to make sure the button needs the normal end-of-script question
                gearPuzzleScene.changeText("What do you want to do?");
                this.setButtonChanges();
                buttonManager.getNewButtons();
                clickedButton.removeButtons();
                this.addButtons();
            } else {
                //if it is, check if it's a death
                deadEnd = clickedButton.isDeath();
                if (deadEnd === true) {
                    //if it is, enter the "You Died" screen
                    this.hasDied = true;
                    game.state.start('yaDeadState', yaDeadState);
                }
                else {
                    gearPuzzleScene.loadScene('brokenBarsbg', 0.32);
                    openDoor = gearPuzzleScene.addButton(460, 210, 250, 252, 0);
                    openDoor.events.onInputUp.add(this.changeState, this);
                }
            }
            //always remove the listener
            textBar.events.onInputUp.remove(this.runScript, this);
        }
    },

    setScripts: function() {
        //assign all button scripts and labels
        barButton.setScript(["The bars are much too heavy to lift.",
            "Upon closer inspection, you see a wire running across the floor.",
            "It trails off to your right."]);
        barButton.setLabel("Check the bars");
        followWireButton.setScript(["The wire runs up to a delicate-looking contraption that runs up the wall.",
            "It disappears into the ceiling.",
            "You can't tell what it does, and you're not sure you want to know."]);
        followWireButton.setLabel("Follow the wire");
        testWireButton.setScript(["You pluck the wire.",
            "...",
            "Nothing happens.",
            "It looks like interacting with this part of the wire won't do anything.",
            "That is, unless you can find some way to sever it."]);
        testWireButton.setLabel("Test the wire");
        tripWireButton.setScript(["You head over to the bars and give the tripwire a hearty kick.",
            "...",
            "Something creaks above you.",
            "You look up to see a panel of jagged spikes swinging towards your face.",
            "So that's what it does."]);
        tripWireButton.setLabel("Trip the wire");
        cutWireButton.setScript(["Where?"]);
        cutWireButton.setLabel("Cut the wire");
        cutWireWellButton.setScript(["You use the cutters to snip the wire over by the contraption.",
            "With a loud creak, something engages above your head.",
            "A huge hammer inlaid with spikes swings down from the ceiling of the cave.",
            "It rams into the bars with an awful squealing of metal.",
            "The trap disengages and slowly reels back up into the shadows.",
            "It leaves a gaping hole in the bars over the doorway.",
            "You wonder what you'd have done had this room been competently designed."]);
        cutWireWellButton.setLabel("Cut the wire");
        gear1Button.setScript(["The wall is full of inanimate mechanisms.",
                    "Many of them are interconnected in a giant pulley system.",
                    "It seems to be built to lift the bars on the door.",
                    "The gear system looks like it extends into the next room."]);
        gear1Button.setLabel("Investigate the gears");
        gear2Button.setScript(["The wall is full of inanimate mechanisms.",
            "Half of them are interconnected in a giant pulley system hooked to the bars.",
            "The other half are connected to the press machine you saw.",
            "Following them to the left, you notice a set of gears in the corner of the room.",
            "A stone is jammed between a couple of the teeth."]);
        gear2Button.setLabel("Investigate the gears");
        removeRockButton.setScript(["With some elbow grease, you dislodge the rock.",
            "The gears are now free of debris."]);
        removeRockButton.setLabel("Remove the rock");
        checkGearsButton.setScript(["None of the gears are moving.",
            "It seems like the system still needs to be turned on."]);
        checkGearsButton.setLabel("Check the gears");
        checkGears2Button.setScript(["Several of the mechanisms in the wall are running.",
            "The water thrums with clicks, hisses, and an incessant pounding."]);
        checkGears2Button.setLabel("Check the gears");
        jamCheckButton.setScript(["You can't see any problems with the gears in the wall.",
            "You realize that the apparatus in the wall is made up of two parts.",
            "One is hooked up to the pulley, and the other to the press machine.",
            "Following the orientation of the gears, you find something in the corner.",
            "It looks like a component of one of the mechanisms.",
            "A stone is wedged between a few of the parts."]);
        jamCheckButton.setLabel("Check for jams");
        window1Button.setScript(["You can see some sort of work table in the next room.",
            "To the far left are a bunch of running mechanical parts.",
            "They're connected to a heavy-looking press machine.",
            "Below the window is some sort of shelf.",
            "Above the window, you can feel something like a tool board on the wall.",
            "You can't reach anything on it right now."]);
        window1Button.setLabel("Look in the window");
        window2Button.setScript(["You can see some sort of work table in the next room.",
            "Next to it is a heavy-looking press machine.",
            "Below the window is some sort of shelf.",
            "Above the window, you can feel something like a tool board on the wall.",
            "You can't reach anything on it right now.",
            "You remember the pulley system you saw built into the wall.",
            "You reach around to the left in search of anything attached to it.",
            "Your hand finds a large lever."]);
        window2Button.setLabel("Look in the window");
        window3Button.setScript(["Nothing else through the window is within reach.",
            "...You think you see someone standing just around the corner."]);
        window3Button.setLabel("Look in the window");
        window4Button.setScript(["Nothing else through the window is within reach."]);
        window4Button.setLabel("Look in the window");
        boardButton.setScript(["You knock hard on the board above the window.",
            "You can hear something rattling above you, but nothing falls down."]);
        boardButton.setLabel("Knock on the board");
        switchSearchButton.setScript(["You don't see any way of turning the machine on from inside this room.",
            "You stick your hand through the window.",
            "Keeping the position of the apparatus in mind, you feel around to the left.",
            "Your hand immediately finds a large lever."]);
        switchSearchButton.setLabel("Search for on switch");
        pullLever1Button.setScript(["You yank at the lever, but it doesn't budge.",
            "It feels like something is jammed."]);
        pullLever1Button.setLabel("Pull the lever");
        pullLever2Button.setScript(["You yank at the lever.",
            "With a loud thunk, it releases.",
            "The cave fills with the sound of whirring machinery.",
            "In the next room over, the press machine begins pounding up and down.",
            "The floor shakes with its deafening beat.",
            "You hear several thumps, like metal hitting wood."]);
        pullLever2Button.setLabel("Pull the lever");
        checkWindowButton.setScript(["It looks like several tools have been knocked off of the board above.",
            "They're strewn across the floor of the next room.",
            "Cutters balance precariously on the edge of the sill below the window."]);
        checkWindowButton.setLabel("Check the window");
        grabToolButton.setScript(["You reach out and grab the cutters before they can fall off the shelf.",
            "You open and close them a few times.",
            "They're definitely still sharp."]);
        grabToolButton.setLabel("Grab the cutters");
        cutDangerButton.setScript(["You snip the wire by the bars.",
            "...",
            "Something creaks above you.",
            "You look up to see a panel of jagged spikes swinging towards your face.",
            "Whoops."]);
        cutDangerButton.setLabel("By the bars");
        cutSafeButton.setScript(["You use the cutters to snip the wire over by the contraption.",
            "With a loud creak, something engages above your head.",
            "A huge hammer inlaid with spikes swings down from the ceiling of the cave.",
            "It rams into the bars with an awful squealing of metal.",
            "The trap disengages and slowly reels back up into the shadows.",
            "It leaves a gaping hole in the bars over the doorway.",
            "You wonder what you'd have done had this room been competently designed."]);
        cutSafeButton.setLabel("By the wall");
        followWire2Button.setScript(["The wire runs up to a delicate-looking contraption that runs up the wall.",
            "It disappears into the ceiling.",
            "You can't tell what it does, and you're not sure you want to know."]);
        followWire2Button.setLabel("Follow the wire");
    },

    /** All of the functions that have to do with the choicebuttons:
     * makeButton takes a button and sets it as clickable, as prepares to run the script
     * addButtons adds the choice buttons stored in the buttonManager to the window
     * removeButtons kills any buttons on the screen
     * createButtons initializes the button variables with their x/y values for later use
     * setNewButtons sets up what buttons each choice button changes when clicked
     * setButtonChanges is a check that's run before the buttons are displayed,
     * which tracks certain choices and changes the game's reaction based on the player's actions */

    makeButton: function (button) {
        //position the button in the window and begin reading through the script lines
        if (button != null) {
            button.position();
            button.getButton().events.onInputUp.add(this.beginScript, this);
        }
    },

    addButtons() {
        //check for any new buttons and assign them to the appropriate button slots in the manager
        if (buttonManager.getLeftButton() != null) {
            this.makeButton(buttonManager.getLeftButton())
        }
        if (buttonManager.getRightButton() != null) {
            this.makeButton(buttonManager.getRightButton())
        }
        if (buttonManager.getMiddleButton() != null) {
            this.makeButton(buttonManager.getMiddleButton())
        }
    },

    removeButtons: function () {
        //remove the button choices on the screen
        if (buttonManager.getLeftButton() != null) {
            buttonManager.getLeftButton().kill();
        }
        if (buttonManager.getMiddleButton() != null) {
            buttonManager.getMiddleButton().kill();
        }
        if (buttonManager.getRightButton() != null) {
            buttonManager.getRightButton().kill();
        }
    },

    createButtons: function () {
        //initialize all buttons so they can be recognized by other functions
        barButton = new InGameButton(MIDDLEXG, REGYG);
        followWireButton = new InGameButton(MIDDLEXG, REGYG);
        testWireButton = new InGameButton(MIDDLEXG, REGYG);
        tripWireButton = new InGameButton(MIDDLEXG, REGYG);
        cutWireButton = new InGameButton(MIDDLEXG, REGYG);
        cutWireWellButton = new InGameButton(MIDDLEXG, REGYG);
        gear1Button = new InGameButton(LEFTXG, REGYG);
        gear2Button = new InGameButton(LEFTXG, REGYG);
        removeRockButton = new InGameButton(LEFTXG, REGYG);
        checkGearsButton = new InGameButton(LEFTXG, REGYG);
        checkGears2Button = new InGameButton(LEFTXG, REGYG);
        jamCheckButton = new InGameButton(LEFTXG, REGYG);
        window1Button = new InGameButton(RIGHTXG, REGYG);
        window2Button = new InGameButton(RIGHTXG, REGYG);
        window3Button = new InGameButton(RIGHTXG, REGYG);
        window4Button = new InGameButton(RIGHTXG, REGYG);
        boardButton = new InGameButton(RIGHTXG, REGYG);
        switchSearchButton = new InGameButton(RIGHTXG, REGYG);
        pullLever1Button = new InGameButton(RIGHTXG, REGYG);
        pullLever2Button = new InGameButton(RIGHTXG, REGYG);
        checkWindowButton = new InGameButton(RIGHTXG, REGYG);
        grabToolButton = new InGameButton(RIGHTXG, REGYG);
        cutDangerButton = new InGameButton(DUOLEFTXG, REGYG);
        cutSafeButton = new InGameButton(DUORIGHTXG, REGYG);
        followWire2Button = new InGameButton(DUORIGHTXG, REGYG);
    },

    setNewButtons: function () {
        //set the initial button links for the choices
        barButton.setNewMiddleButton(followWireButton);
        followWireButton.setNewMiddleButton(testWireButton);
        testWireButton.setNewMiddleButton(tripWireButton);
        tripWireButton.setToDeath();
        cutWireButton.setToIrregular();
        cutWireButton.setNewLeftButton(cutDangerButton);
        cutWireButton.setNewRightButton(followWire2Button);
        cutWireButton.setNothingMiddle();
        cutWireWellButton.setToEnd();
        gear1Button.setNewRightButton(window2Button);
        gear2Button.setNewLeftButton(removeRockButton);
        removeRockButton.setNewLeftButton(checkGearsButton);
        jamCheckButton.setNewLeftButton(removeRockButton);
        switchSearchButton.setNewRightButton(pullLever2Button);
        window1Button.setNewLeftButton(gear2Button);
        window1Button.setNewRightButton(boardButton);
        window2Button.setNewRightButton(pullLever1Button);
        window3Button.setNewRightButton(window4Button);
        pullLever1Button.setNewLeftButton(jamCheckButton);
        pullLever2Button.setNewLeftButton(checkGears2Button);
        pullLever2Button.setNewRightButton(checkWindowButton);
        checkWindowButton.setNewRightButton(grabToolButton);
        grabToolButton.setNewMiddleButton(cutWireButton);
        grabToolButton.setNewRightButton(window3Button);
        cutDangerButton.setToDeath();
        cutSafeButton.setToEnd();
        followWire2Button.setNewMiddleButton(cutWireButton);
        followWire2Button.setNothingLeft();
        followWire2Button.setNothingRight();
    },

    setButtonChanges: function() {
        //use a few checks to assign new choices depending on what the player clicks first
        if (window2Check !== true) {
            if (window2Button.beenClicked() === true) {
                removeRockButton.setNewRightButton(pullLever2Button);
                window2Check = true;
            }
        }
        if (gear2Check !== true) {
            if (gear2Button.beenClicked() === true) {
                checkGearsButton.setNewRightButton(switchSearchButton);
                gear2Check = true;
            }
        }
        if (followWireCheck !== true) {
            if ((followWireButton.beenClicked() === true) || (followWire2Button.beenClicked() === true)) {
                cutWireButton.setNewLeftButton(cutDangerButton);
                cutWireButton.setNewRightButton(cutSafeButton);
                cutWireButton.setNothingMiddle();
                followWireCheck = true;
            }
        }
        if (testWireCheck !== true) {
            if (testWireButton.beenClicked() === true) {
                grabToolButton.setNewMiddleButton(cutWireWellButton);
                testWireCheck = true;
            }
        }
    },

    /** Change the game state to workshopState */

    changeState: function() {
        //change states to the next state
        nextState = 'workshopState';
        game.state.start('workshopState')
    }

};