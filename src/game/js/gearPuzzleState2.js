//My attempt at a rewrite.
var clickCount;
var textBar;
var buttonManager;
var clickedButton;
var endsBranch;
var deadEnd;

//must rewrite with clickedButton variable!!

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
            buttonManager = new ButtonManager(null, null, null);

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
        gearPuzzleScene2.addEllipses();
        gearPuzzleScene2.changeText("" + clickedButton.next());
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
                buttonManager.getNewButtons();
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
        doorButtonr = new InGameButton(450, 500);
        followWireButtonr = new InGameButton(450, 500);
        testWireButtonr = new InGameButton(450, 500);
        tripWireButtonr = new InGameButton(450, 500);
        // gear1Buttonr
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
        tripWireButtonr.setLabel("Trip the wire")
    },

    removeButtons: function () {
        doorButtonr.kill();
        followWireButtonr.kill();
        testWireButtonr.kill();
        tripWireButtonr.kill();
        // gear1Buttonr.kill();
        // gear2Buttonr.kill();
        // removeRockButtonr.kill();
        // checkGearsButtonr.kill();
        // jamCheckButtonr.kill();
        // switchSearchButtonr.kill();
        // window1Buttonr.kill();
        // boardButtonr.kill();
        // window2Buttonr.kill();
        // pullLever1Buttonr.kill();
        // pullLever2Buttonr.kill();
        // checkGears2Buttonr.kill();
        // checkWindowButtonr.kill();
        // grabToolButtonr.kill();
        // window3Buttonr.kill();
        // window4Buttonr.kill();
        // cutWireWellButtonr.kill();
        // cutWireButtonr.kill();
        // cutSafeButtonr.kill();
        // cutDangerButtonr.kill();
        // followWire2Buttonr.kill();
    },

    setNewButtons: function () {
        doorButtonr.setNewMiddleButton(followWireButtonr);
        followWireButtonr.setNewMiddleButton(testWireButtonr);
        testWireButtonr.setNewMiddleButton(tripWireButtonr);
        tripWireButtonr.setToDeath();
        // gear1Buttonr
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