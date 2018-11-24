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
var gear1Buttonr;
var gear2Buttonr;
var removeRockButtonr;
var checkGearsButtonr;
var jamCheckButtonr;
var switchSearchButtonr;
var window1Buttonr;
var boardButtonr;
var window2Buttonr;
var pullLever1Buttonr;
var pullLever2Buttonr;
var checkGears2Buttonr;
var checkWindowButtonr;
var grabToolButtonr;
var window3Buttonr;
var window4Buttonr;
var cutWireWellButtonr;
var cutWireButtonr;
var cutSafeButtonr;
var cutDangerButtonr;
var followWire2Buttonr;

//an array of all buttons
var gearButtonArray = [doorButtonr, followWireButtonr, testWireButtonr, tripWireButtonr,
    gear1Buttonr, gear2Buttonr, removeRockButtonr, checkGearsButtonr, jamCheckButtonr,
    switchSearchButtonr, window1Buttonr, boardButtonr, window2Buttonr, pullLever1Buttonr,
    pullLever2Buttonr, checkGears2Buttonr, checkWindowButtonr, grabToolButtonr,
    window3Buttonr, window4Buttonr, cutWireWellButtonr, cutWireButtonr, cutSafeButtonr,
    cutDangerButtonr, followWire2Buttonr];

//the scene variable
var gearPuzzleScene2 = null;

//initialize the state
var gearPuzzleState2 = {

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
        button.position();
        button.getButton().events.onInputUp.add(this.beginScript, this);
    },

    beginScript() {
        this.removeButtons();
        clickedButton.getButton().events.onInputUp.remove(this.beginScript, this);
        gearPuzzleScene2.changeText("" + clickedButton.next());
        if (clickedButton.scriptLength() > 1) {
            gearPuzzleScene2.addEllipses();
        }
        textBar.events.onInputUp.add(this.runScript, this);
    },

    runScript() {
        if (clickedButton.getSpot() < clickedButton.scriptLength()) {
            gearPuzzleScene2.changeText("" + clickedButton.next());
        } else {
            gearPuzzleScene2.removeEllipses();
            endsBranch = clickedButton.isEndButton();
            if (endsBranch === false) {
                gearPuzzleScene2.changeText("What do you want to do?");
                this.setNewButtons();
                buttonManager.getNewButtons();
                clickedButton.removeButtons();
                this.addButtons();
            } else {
                deadEnd = clickedButton.isDeath();
                if (deadEnd = true) {
                    game.state.start('gearPuzzleState2', gearPuzzleState2);
                }
                else {
                    //the ending to the scene goes here
                }
            }
            textBar.events.onInputUp.remove(this.runScript, this);
        }
    },

    addButtons() {
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
        doorButtonr = new InGameButton(MIDDLEX, REGY);
        followWireButtonr = new InGameButton(MIDDLEX, REGY);
        testWireButtonr = new InGameButton(MIDDLEX, REGY);
        tripWireButtonr = new InGameButton(MIDDLEX, REGY);
        gear1Buttonr = new InGameButton(LEFTX, REGY);
        gear2Buttonr = new InGameButton(LEFTX, REGY);
        removeRockButtonr = new InGameButton(LEFTX, REGY);
        checkGearsButtonr = new InGameButton(LEFTX, REGY);
        jamCheckButtonr = new InGameButton(LEFTX, REGY);
        switchSearchButtonr = new InGameButton(RIGHTX, REGY);
        window1Buttonr = new InGameButton(RIGHTX, REGY);
        boardButtonr = new InGameButton(RIGHTX, REGY);
        window2Buttonr = new InGameButton(RIGHTX, REGY);
        pullLever1Buttonr = new InGameButton(RIGHTX, REGY);
        pullLever2Buttonr = new InGameButton(RIGHTX, REGY);
        checkGears2Buttonr = new InGameButton(LEFTX, REGY);
        checkWindowButtonr = new InGameButton(RIGHTX, REGY);
        grabToolButtonr = new InGameButton(RIGHTX, REGY);
        window3Buttonr = new InGameButton(RIGHTX, REGY);
        window4Buttonr = new InGameButton(RIGHTX, REGY);
        cutWireWellButtonr = new InGameButton(MIDDLEX, REGY);
        cutWireButtonr = new InGameButton(MIDDLEX, REGY);
        cutSafeButtonr = new InGameButton(DUORIGHTX, REGY);
        cutDangerButtonr = new InGameButton(DUOLEFTX, REGY);
        followWire2Buttonr = new InGameButton(DUORIGHTX, REGY);
    },

    setScripts: function() {
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
        gear1Buttonr.setScript(["The wall is full of inanimate mechanisms.",
                    "Many of them are interconnected in a giant pulley system.",
                    "It seems to be built to lift the bars on the door.",
                    "The gear system looks like it extends into the next room."]);
        gear1Buttonr.setLabel("Investigate the gears");
        gear2Buttonr.setScript();
        gear2Buttonr.setLabel("Investigate the gears");
        removeRockButtonr.setScript();
        removeRockButtonr.setLabel("Remove the rock");
        checkGearsButtonr.setScript();
        checkGearsButtonr.setLabel("Check the gears");
        jamCheckButtonr.setScript();
        jamCheckButtonr.setLabel("Check for jams");
        switchSearchButtonr.setScript();
        switchSearchButtonr.setLabel("Search for on switch");
        window1Buttonr.setScript(["You can see some sort of work table in the next room.",
            "To the far left are a bunch of running mechanical parts.",
            "They're connected to a heavy-looking press machine.",
            "Below the window is some sort of shelf.",
            "Above the window, you can feel something like a tool board on the wall.",
            "You can't reach anything on it right now."]);
        window1Buttonr.setLabel("Look in the window");
        boardButtonr.setScript(["You knock hard on the board above the window.",
            "You can hear something rattling above you, but nothing falls down."]);
        boardButtonr.setLabel("Knock on the board");
        window2Buttonr.setScript();
        window2Buttonr.setLabel("Look in the window");
        pullLever1Buttonr.setScript();
        pullLever1Buttonr.setLabel("Pull the lever");
        pullLever2Buttonr.setScript();
        pullLever2Buttonr.setLabel("Pull the lever");
        checkGears2Buttonr.setScript();
        checkGears2Buttonr.setLabel("Check the gears");
        checkWindowButtonr.setScript();
        checkWindowButtonr.setLabel("Check the window");
        grabToolButtonr.setScript();
        grabToolButtonr.setLabel("Grab the cutters");
        window3Buttonr.setScript();
        window3Buttonr.setLabel("Look in the window");
        window4Buttonr.setScript();
        window4Buttonr.setLabel("Look in the window");
        cutWireWellButtonr.setScript();
        cutWireWellButtonr.setLabel("Cut the wire");
        cutWireButtonr.setScript("Where?");
        cutWireButtonr.setLabel("Cut the wire");
        cutSafeButtonr.setScript();
        cutSafeButtonr.setLabel("By the wall");
        cutDangerButtonr.setScript();
        cutDangerButtonr.setLabel("By the bars");
        followWire2Buttonr.setScript();
        followWire2Buttonr.setLabel("Follow the wire");
    },

    removeButtons: function () {
        doorButtonr.kill();
        followWireButtonr.kill();
        testWireButtonr.kill();
        tripWireButtonr.kill();
        gear1Buttonr.kill();
        gear2Buttonr.kill();
        removeRockButtonr.kill();
        checkGearsButtonr.kill();
        jamCheckButtonr.kill();
        switchSearchButtonr.kill();
        window1Buttonr.kill();
        boardButtonr.kill();
        window2Buttonr.kill();
        pullLever1Buttonr.kill();
        pullLever2Buttonr.kill();
        checkGears2Buttonr.kill();
        checkWindowButtonr.kill();
        grabToolButtonr.kill();
        window3Buttonr.kill();
        window4Buttonr.kill();
        cutWireWellButtonr.kill();
        cutWireButtonr.kill();
        cutSafeButtonr.kill();
        cutDangerButtonr.kill();
        followWire2Buttonr.kill();
    },

    setNewButtons: function () {
        doorButtonr.setNewMiddleButton(followWireButtonr);
        followWireButtonr.setNewMiddleButton(testWireButtonr);
        testWireButtonr.setNewMiddleButton(tripWireButtonr);
        tripWireButtonr.setToDeath();
        //gear1Buttonr
        // gear2Buttonr
        // removeRockButtonr
        // checkGearsButtonr
        // jamCheckButtonr
        // switchSearchButtonr
        // window1Buttonr
        // boardButtonr
        // window2Buttonr
        // pullLever1Buttonr
        // pullLever2Buttonr
        // checkGears2Buttonr
        // checkWindowButtonr
        // grabToolButtonr
        // window3Buttonr
        // window4Buttonr
        // cutWireWellButtonr
        // cutWireButtonr
        // cutSafeButtonr
        // cutDangerButtonr
        // followWire2Buttonr
    }
};