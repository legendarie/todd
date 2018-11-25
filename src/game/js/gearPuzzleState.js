var clickCount;
var textBar;
var buttonManager;
var clickedButton;
var endsBranch;
var deadEnd;

//general positions for the three buttons
const LEFTX = 100;
const MIDDLEX = 450;
const RIGHTX = 800;
const DUORIGHTX = 650;
const DUOLEFTX = 275;
const REGY = 500;

//variables for all buttons
var doorButtonr;
var followWireButtonr;
var testWireButtonr;
var tripWireButtonr;
var cutWireButtonr;
var cutWireWellButtonr;
var gear1Buttonr;
var gear2Buttonr;
var removeRockButtonr;
var checkGearsButtonr;
var checkGears2Buttonr;
var jamCheckButtonr;
var window1Buttonr;
var window2Buttonr;
var window3Buttonr;
var window4Buttonr;
var boardButtonr;
var switchSearchButtonr;
var pullLever1Buttonr;
var pullLever2Buttonr;
var checkWindowButtonr;
var grabToolButtonr;
var cutDangerButtonr;
var cutSafeButtonr;
var followWire2Buttonr;

//the scene variable
var gearPuzzleScene2 = null;

//initialize the state
var gearPuzzleState = {

    /**The initial functions to set up the scene for player interaction*/

    preload: function () {
        //declare gearPuzzleScene to be an instance of a Scene, and load in the background image to the state
        gearPuzzleScene2 = new Scene;
        gearPuzzleScene2.setBackground('gearPuzzlebg', 'assets/gearPuzzlebg.png');

        //reset the global clickCount variable
        clickCount = 0;
    },

    create: function () {
        //check to make sure the gearPuzzleScene variable is not null
        if (gearPuzzleScene2 != null) {

            //load the background and scale it
            gearPuzzleScene2.loadScene('gearPuzzlebg', 0.32);

            //add the text bar (with all universal settings), with the first line of text
            gearPuzzleScene2.addTextBar("The left tunnel leads into a wide cavern.");

            //add a set of ellipses to the text box to indicate
            //further messages
            gearPuzzleScene2.addEllipses();

            //create all of the buttons and their button links
            this.createButtons();
            this.setScripts();
            this.setNewButtons();

            //initialize the button choice manager and button list for the puzzle
            buttonManager = new ButtonManager(gear1Buttonr, doorButtonr, window1Buttonr);

            //when the text bar is clicked, go to the changeText function
            textBar.events.onInputUp.add(this.changeText, this);
        }
    },

    changeText: function () {
        //only increment the click count four times
        if (clickCount < 4) {
            clickCount++;
            if (clickCount === 1) {
                gearPuzzleScene2.changeText("Before you, you can see a barred doorway.")
            } else if (clickCount === 2) {
                gearPuzzleScene2.changeText("A crack in the wall is filled with large gears.")
            } else if (clickCount === 3) {
                gearPuzzleScene2.changeText("A small window peers into the next room.")
            } else {
                //change the text in the text bar, then create the choice buttons
                gearPuzzleScene2.changeText("What do you want to do?");
                gearPuzzleScene2.removeEllipses();
                textBar.events.onInputUp.remove(this.changeText, this);
                this.makeButton(doorButtonr);
                this.makeButton(gear1Buttonr);
                this.makeButton(window1Buttonr);
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
        gearPuzzleScene2.changeText("" + clickedButton.next());
        if (clickedButton.scriptLength() > 1) {
            gearPuzzleScene2.addEllipses();
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
            gearPuzzleScene2.changeText("" + clickedButton.next());
        } else {
            //if it has, check if it's an ending
            gearPuzzleScene2.removeEllipses();
            endsBranch = clickedButton.isEndButton();
            if (endsBranch === false) {
                //if it isn't, assign any new buttons and add them to the window
                //check to make sure the button needs the normal end-of-script question
                gearPuzzleScene2.changeText("What do you want to do?");
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
                    openDoor = gearPuzzleScene2.addButton(460, 210, 250, 252, 0);
                    openDoor.events.onInputUp.add(this.changeState, this);
                }
            }
            //always remove the listener
            textBar.events.onInputUp.remove(this.runScript, this);
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

    createButtons: function () {
        //initialize all buttons so they can be recognized by other functions
        doorButtonr = new InGameButton(MIDDLEX, REGY);
        followWireButtonr = new InGameButton(MIDDLEX, REGY);
        testWireButtonr = new InGameButton(MIDDLEX, REGY);
        tripWireButtonr = new InGameButton(MIDDLEX, REGY);
        cutWireButtonr = new InGameButton(MIDDLEX, REGY);
        cutWireWellButtonr = new InGameButton(MIDDLEX, REGY);
        gear1Buttonr = new InGameButton(LEFTX, REGY);
        gear2Buttonr = new InGameButton(LEFTX, REGY);
        removeRockButtonr = new InGameButton(LEFTX, REGY);
        checkGearsButtonr = new InGameButton(LEFTX, REGY);
        checkGears2Buttonr = new InGameButton(LEFTX, REGY);
        jamCheckButtonr = new InGameButton(LEFTX, REGY);
        window1Buttonr = new InGameButton(RIGHTX, REGY);
        window2Buttonr = new InGameButton(RIGHTX, REGY);
        window3Buttonr = new InGameButton(RIGHTX, REGY);
        window4Buttonr = new InGameButton(RIGHTX, REGY);
        boardButtonr = new InGameButton(RIGHTX, REGY);
        switchSearchButtonr = new InGameButton(RIGHTX, REGY);
        pullLever1Buttonr = new InGameButton(RIGHTX, REGY);
        pullLever2Buttonr = new InGameButton(RIGHTX, REGY);
        checkWindowButtonr = new InGameButton(RIGHTX, REGY);
        grabToolButtonr = new InGameButton(RIGHTX, REGY);
        cutDangerButtonr = new InGameButton(DUOLEFTX, REGY);
        cutSafeButtonr = new InGameButton(DUORIGHTX, REGY);
        followWire2Buttonr = new InGameButton(DUORIGHTX, REGY);
    },

    setScripts: function() {
        //assign all button scripts and labels
        doorButtonr.setScript(["The bars are much too heavy to lift.",
            "Upon closer inspection, you see a wire running across the floor.",
            "It trails off to your right."]);
        doorButtonr.setLabel("Check the bars");
        followWireButtonr.setScript(["The wire runs up to a delicate-looking contraption that runs up the wall.",
            "It disappears into the ceiling.",
            "You can't tell what it does, and you're not sure you want to know."]);
        followWireButtonr.setLabel("Follow the wire");
        testWireButtonr.setScript(["You pluck the wire.",
            "...",
            "Nothing happens.",
            "It looks like interacting with this part of the wire won't do anything.",
            "That is, unless you can find some way to sever it."]);
        testWireButtonr.setLabel("Test the wire");
        tripWireButtonr.setScript(["You head over to the bars and give the tripwire a hearty kick.",
            "...",
            "Something creaks above you.",
            "You look up to see a panel of jagged spikes swinging towards your face.",
            "So that's what it does."]);
        tripWireButtonr.setLabel("Trip the wire");
        cutWireButtonr.setScript(["Where?"]);
        cutWireButtonr.setLabel("Cut the wire");
        cutWireWellButtonr.setScript(["You use the cutters to snip the wire over by the contraption.",
            "With a loud creak, something engages above your head.",
            "A huge hammer inlaid with spikes swings down from the ceiling of the cave.",
            "It rams into the bars with an awful squealing of metal.",
            "The trap disengages and slowly reels back up into the shadows.",
            "It leaves a gaping hole in the bars over the doorway.",
            "You wonder what you'd have done had this room been competently designed."]);
        cutWireWellButtonr.setLabel("Cut the wire");
        gear1Buttonr.setScript(["The wall is full of inanimate mechanisms.",
                    "Many of them are interconnected in a giant pulley system.",
                    "It seems to be built to lift the bars on the door.",
                    "The gear system looks like it extends into the next room."]);
        gear1Buttonr.setLabel("Investigate the gears");
        gear2Buttonr.setScript(["The wall is full of inanimate mechanisms.",
            "Half of them are interconnected in a giant pulley system hooked to the bars.",
            "The other half are connected to the press machine you saw.",
            "Following them to the left, you notice a set of gears in the corner of the room.",
            "A stone is jammed between a couple of the teeth."]);
        gear2Buttonr.setLabel("Investigate the gears");
        removeRockButtonr.setScript(["With some elbow grease, you dislodge the rock.",
            "The gears are now free of debris."]);
        removeRockButtonr.setLabel("Remove the rock");
        checkGearsButtonr.setScript(["None of the gears are moving.",
            "It seems like the system still needs to be turned on."]);
        checkGearsButtonr.setLabel("Check the gears");
        checkGears2Buttonr.setScript(["Several of the mechanisms in the wall are running.",
            "The water thrums with clicks, hisses, and an incessant pounding."]);
        checkGears2Buttonr.setLabel("Check the gears");
        jamCheckButtonr.setScript(["You can't see any problems with the gears in the wall.",
            "You realize that the apparatus in the wall is made up of two parts.",
            "One is hooked up to the pulley, and the other to the press machine.",
            "Following the orientation of the gears, you find something in the corner.",
            "It looks like a component of one of the mechanisms.",
            "A stone is wedged between a few of the parts."]);
        jamCheckButtonr.setLabel("Check for jams");
        window1Buttonr.setScript(["You can see some sort of work table in the next room.",
            "To the far left are a bunch of running mechanical parts.",
            "They're connected to a heavy-looking press machine.",
            "Below the window is some sort of shelf.",
            "Above the window, you can feel something like a tool board on the wall.",
            "You can't reach anything on it right now."]);
        window1Buttonr.setLabel("Look in the window");
        window2Buttonr.setScript(["You can see some sort of work table in the next room.",
            "Next to it is a heavy-looking press machine.",
            "Below the window is some sort of shelf.",
            "Above the window, you can feel something like a tool board on the wall.",
            "You can't reach anything on it right now.",
            "You remember the pulley system you saw built into the wall.",
            "You reach around to the left in search of anything attached to it.",
            "Your hand finds a large lever."]);
        window2Buttonr.setLabel("Look in the window");
        window3Buttonr.setScript(["Nothing else through the window is within reach.",
            "...You think you see someone standing just around the corner."]);
        window3Buttonr.setLabel("Look in the window");
        window4Buttonr.setScript(["Nothing else through the window is within reach."]);
        window4Buttonr.setLabel("Look in the window");
        boardButtonr.setScript(["You knock hard on the board above the window.",
            "You can hear something rattling above you, but nothing falls down."]);
        boardButtonr.setLabel("Knock on the board");
        switchSearchButtonr.setScript(["You don't see any way of turning the machine on from inside this room.",
            "You stick your hand through the window.",
            "Keeping the position of the apparatus in mind, you feel around to the left.",
            "Your hand immediately finds a large lever."]);
        switchSearchButtonr.setLabel("Search for on switch");
        pullLever1Buttonr.setScript(["You yank at the lever, but it doesn't budge.",
            "It feels like something is jammed."]);
        pullLever1Buttonr.setLabel("Pull the lever");
        pullLever2Buttonr.setScript(["You yank at the lever.",
            "With a loud thunk, it releases.",
            "The cave fills with the sound of whirring machinery.",
            "In the next room over, the press machine begins pounding up and down.",
            "The floor shakes with its deafening beat.",
            "You hear several thumps, like metal hitting wood."]);
        pullLever2Buttonr.setLabel("Pull the lever");
        checkWindowButtonr.setScript(["It looks like several tools have been knocked off of the board above.",
            "They're strewn across the floor of the next room.",
            "Cutters balance precariously on the edge of the sill below the window."]);
        checkWindowButtonr.setLabel("Check the window");
        grabToolButtonr.setScript(["You reach out and grab the cutters before they can fall off the shelf.",
            "You open and close them a few times.",
            "They're definitely still sharp."]);
        grabToolButtonr.setLabel("Grab the cutters");
        cutDangerButtonr.setScript(["You snip the wire by the bars.",
            "...",
            "Something creaks above you.",
            "You look up to see a panel of jagged spikes swinging towards your face.",
            "Whoops."]);
        cutDangerButtonr.setLabel("By the bars");
        cutSafeButtonr.setScript(["You use the cutters to snip the wire over by the contraption.",
            "With a loud creak, something engages above your head.",
            "A huge hammer inlaid with spikes swings down from the ceiling of the cave.",
            "It rams into the bars with an awful squealing of metal.",
            "The trap disengages and slowly reels back up into the shadows.",
            "It leaves a gaping hole in the bars over the doorway.",
            "You wonder what you'd have done had this room been competently designed."]);
        cutSafeButtonr.setLabel("By the wall");
        followWire2Buttonr.setScript(["The wire runs up to a delicate-looking contraption that runs up the wall.",
            "It disappears into the ceiling.",
            "You can't tell what it does, and you're not sure you want to know."]);
        followWire2Buttonr.setLabel("Follow the wire");
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

    setNewButtons: function () {
        //set the initial button links for the choices
        doorButtonr.setNewMiddleButton(followWireButtonr);
        followWireButtonr.setNewMiddleButton(testWireButtonr);
        testWireButtonr.setNewMiddleButton(tripWireButtonr);
        tripWireButtonr.setToDeath();
        cutWireButtonr.setToIrregular();
        cutWireButtonr.setNewLeftButton(cutDangerButtonr);
        cutWireButtonr.setNewRightButton(followWire2Buttonr);
        cutWireButtonr.setNothingMiddle();
        cutWireWellButtonr.setToEnd();
        gear1Buttonr.setNewRightButton(window2Buttonr);
        gear2Buttonr.setNewLeftButton(removeRockButtonr);
        removeRockButtonr.setNewLeftButton(checkGearsButtonr);
        checkGearsButtonr.setNewRightButton(switchSearchButtonr);
        jamCheckButtonr.setNewLeftButton(removeRockButtonr);
        switchSearchButtonr.setNewRightButton(pullLever2Buttonr);
        window1Buttonr.setNewLeftButton(gear2Buttonr);
        window1Buttonr.setNewRightButton(boardButtonr);
        window2Buttonr.setNewRightButton(pullLever1Buttonr);
        window3Buttonr.setNewRightButton(window4Buttonr);
        pullLever1Buttonr.setNewLeftButton(jamCheckButtonr);
        pullLever2Buttonr.setNewLeftButton(checkGears2Buttonr);
        pullLever2Buttonr.setNewRightButton(checkWindowButtonr);
        checkWindowButtonr.setNewRightButton(grabToolButtonr);
        grabToolButtonr.setNewMiddleButton(cutWireButtonr);
        grabToolButtonr.setNewRightButton(window3Buttonr);
        cutDangerButtonr.setToDeath();
        cutSafeButtonr.setToEnd();
        followWire2Buttonr.setNewMiddleButton(cutWireButtonr);
        followWire2Buttonr.setNothingLeft();
        followWire2Buttonr.setNothingRight();
    },

    setButtonChanges: function() {
        //use a few checks to assign new choices depending on what the player clicks first
        if (window2Buttonr.beenClicked() === true) {
            removeRockButtonr.setNewRightButton(pullLever2Buttonr);
        }
        if ((followWireButtonr.beenClicked() === true) || (followWire2Buttonr.beenClicked() === true)) {
            cutWireButtonr.setNewLeftButton(cutDangerButtonr);
            cutWireButtonr.setNewRightButton(cutSafeButtonr);
            cutWireButtonr.setNothingMiddle();
        }
        if (testWireButtonr.beenClicked() === true) {
            grabToolButtonr.setNewMiddleButton(cutWireWellButtonr);
        }
    },

    changeState: function() {
        //change states to the next state
        game.state.start('doorState', doorState)
    }

};