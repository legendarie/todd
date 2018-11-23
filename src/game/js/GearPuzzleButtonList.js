//establish the global variables

//the buttons themselves
var doorButton;
var followWireButton;
var testWireButton;
var tripWireButton;
var gear1Button;
var gear2Button;
var removeRockButton;
var checkGearsButton;
var jamCheckButton;
var switchSearchButton;
var window1Button;
var boardButton;
var window2Button;
var pullLever1Button;
var pullLever2Button;
var checkGears2Button;
var checkWindowButton;
var grabToolButton;
var window3Button;
var window4Button;
var cutWireWellButton;
var cutWireButton;
var cutSafeButton;
var cutDangerButton;
var followWire2Button;

//This class is an extension of ButtonList, but we shouldn't use these. I'm just keeping
//the scripts here in their organized form.
class GearPuzzleButtonList extends ButtonList {

    /**The constructor adds buttons to the buttonList with their labels, scripts, positions, and choices*/

    constructor() {
        super();
        this.makeButtons();
    }

    /**A series of functions to create each button with their position and script,
     * and add them with a label to the buttonList*/

    makeDoorButton() {
        doorButton = new ChoiceButton(MIDDLEX, BUTTONY, MIDWIDTH, BUTTONHEIGHT, BUTTONOPACITY);
        doorButton.setScript(["The bars are much too heavy to lift.",
            "Upon closer inspection, you see a wire running across the floor.",
            "It trails off to your right."]);
        this.addButton("door", doorButton, "Check the bars")
    }

    makeFollowWireButton() {
        followWireButton = new ChoiceButton(MIDDLEX, BUTTONY, MIDWIDTH, BUTTONHEIGHT, BUTTONOPACITY);
        followWireButton.setScript(["The wire runs up to a delicate-looking contraption that runs up the wall.",
            "It disappears into the ceiling.",
            "You can't tell what it does, and you're not sure you want to know."]);
        this.addButton("followWire", followWireButton, "Follow the wire")
    }

    makeTestWireButton() {
        testWireButton = new ChoiceButton(MIDDLEX, BUTTONY, MIDWIDTH, BUTTONHEIGHT, BUTTONOPACITY);
        testWireButton.setScript(["You pluck the wire.",
            "...",
            "Nothing happens.",
            "It looks like interacting with this part of the wire won't do anything.",
            "That is, unless you can find some way to sever it."]);
        this.addButton("testWire", testWireButton, "Test the wire")
    }

    makeTripWireButton() {
        tripWireButton = new ChoiceButton(MIDDLEX, BUTTONY, MIDWIDTH, BUTTONHEIGHT, BUTTONOPACITY);
        tripWireButton.setScript(["You head over to the bars and give the tripwire a hearty kick.",
            "...",
            "Something creaks above you.",
            "You look up to see a panel of jagged spikes swinging towards your face.",
            "So that's what it does."]);
        this.addButton("tripWire", tripWireButton, "Trip the wire")
    }

    makeCutWireButton() {
        cutWireButton = new ChoiceButton(MIDDLEX, BUTTONY, MIDWIDTH, BUTTONHEIGHT, BUTTONOPACITY);
        cutWireButton.setScript(["Where?"]);
        this.addButton("cutWire", cutWireButton, "Cut the wire")
    }

    makeCutWireWellButton() {
        cutWireWellButton = new ChoiceButton(MIDDLEX, BUTTONY, MIDWIDTH, BUTTONHEIGHT, BUTTONOPACITY);
        cutWireWellButton.setScript(["You use the cutters to snip the wire over by the contraption.",
            "With a loud creak, something engages above your head.",
            "A huge hammer inlaid with spikes swings down from the ceiling of the cave.",
            "It rams into the bars with an awful squealing of metal.",
            "The trap disengages and slowly reels back up into the shadows.",
            "It leaves a gaping hole in the bars over the doorway.",
            "You wonder what you'd have done had this room been competently designed."]);
        this.addButton("cutWireWell", cutWireWellButton, "Cut the wire")
    }

    makeGear1Button() {
        gear1Button = new ChoiceButton(LEFTX, BUTTONY, BUTTONWIDTH, BUTTONHEIGHT, BUTTONOPACITY);
        gear1Button.setScript(["The wall is full of inanimate mechanisms.",
            "Many of them are interconnected in a giant pulley system.",
            "It seems to be built to lift the bars on the door.",
            "The gear system looks like it extends into the next room."]);
        this.addButton("gear1", gear1Button, "Investigate the gears")
    }

    makeGear2Button() {
        gear2Button = new ChoiceButton(LEFTX, BUTTONY, BUTTONWIDTH, BUTTONHEIGHT, BUTTONOPACITY);
        gear2Button.setScript(["The wall is full of inanimate mechanisms.",
            "Half of them are interconnected in a giant pulley system hooked to the bars.",
            "The other half are connected to the press machine you saw.",
            "Following them to the left, you notice a set of gears in the corner of the room.",
            "A stone is jammed between a couple of the teeth."]);
        this.addButton("gear2", gear2Button, "Investigate the gears")
    }

    makeRemoveRockButton() {
        removeRockButton = new ChoiceButton(LEFTX, BUTTONY, BUTTONWIDTH, BUTTONHEIGHT, BUTTONOPACITY);
        removeRockButton.setScript(["With some elbow grease, you dislodge the rock.",
            "The gears are now free of debris."]);
        this.addButton("removeRock", removeRockButton, "Remove the rock")
    }

    makeCheckGearsButton() {
        checkGearsButton = new ChoiceButton(LEFTX, BUTTONY, BUTTONWIDTH, BUTTONHEIGHT, BUTTONOPACITY);
        checkGearsButton.setScript(["None of the gears are moving.",
            "It seems like the system still needs to be turned on."]);
        this.addButton("checkGears", checkGearsButton, "Check the gears")
    }

    makeJamCheckButton() {
        jamCheckButton = new ChoiceButton(LEFTX, BUTTONY, BUTTONWIDTH, BUTTONHEIGHT, BUTTONOPACITY);
        jamCheckButton.setScript(["You can't see any problems with the gears in the wall.",
            "You realize that the apparatus in the wall is made up of two parts.",
            "One is hooked up to the pulley, and the other to the press machine.",
            "Following the orientation of the gears, you find something in the corner.",
            "It looks like a component of one of the mechanisms.",
            "A stone is wedged between a few of the parts."]);
        this.addButton("jamCheck", jamCheckButton, "Check for jams")
    }

    makeCheckGears2Button() {
        checkGears2Button = new ChoiceButton(LEFTX, BUTTONY, BUTTONWIDTH, BUTTONHEIGHT, BUTTONOPACITY);
        checkGears2Button.setScript(["Several of the mechanisms in the wall are running.",
            "The water thrums with clicks, hisses, and an incessant pounding."]);
        this.addButton("checkGears2", checkGears2Button, "Check the gears")
    }

    makeSwitchSearchButton() {
        switchSearchButton = new ChoiceButton(RIGHTX, BUTTONY, BUTTONWIDTH, BUTTONHEIGHT, BUTTONOPACITY);
        switchSearchButton.setScript(["You don't see any way of turning the machine on from inside this room.",
            "You stick your hand through the window.",
            "Keeping the position of the apparatus in mind, you feel around to the left.",
            "Your hand immediately finds a large lever."]);
        this.addButton("switchSearch", switchSearchButton, "Search for on switch")
    }

    makeWindow1Button() {
        window1Button = new ChoiceButton(RIGHTX, BUTTONY, BUTTONWIDTH, BUTTONHEIGHT, BUTTONOPACITY);
        window1Button.setScript(["You can see some sort of work table in the next room.",
            "To the far left are a bunch of running mechanical parts.",
            "They're connected to a heavy-looking press machine.",
            "Below the window is some sort of shelf.",
            "Above the window, you can feel something like a tool board on the wall.",
            "You can't reach anything on it right now."]);
        this.addButton("window1", window1Button, "Look in the window")
    }

    makeBoardButton() {
        boardButton = new ChoiceButton(RIGHTX, BUTTONY, BUTTONWIDTH, BUTTONHEIGHT, BUTTONOPACITY);
        boardButton.setScript(["You knock hard on the board above the window.",
            "You can hear something rattling above you, but nothing falls down."]);
        this.addButton("board", boardButton, "Knock on the board")
    }

    makeWindow2Button() {
        window2Button= new ChoiceButton(RIGHTX, BUTTONY, BUTTONWIDTH, BUTTONHEIGHT, BUTTONOPACITY);
        window2Button.setScript(["You can see some sort of work table in the next room.",
            "Next to it is a heavy-looking press machine.",
            "Below the window is some sort of shelf.",
            "Above the window, you can feel something like a tool board on the wall.",
            "You can't reach anything on it right now.",
            "You remember the pulley system you saw built into the wall.",
            "You reach around to the left in search of anything attached to it.",
            "Your hand finds a large lever."]);
        this.addButton("window2", window2Button, "Look in the window")
    }

    makePullLever1Button() {
        pullLever1Button = new ChoiceButton(RIGHTX, BUTTONY, BUTTONWIDTH, BUTTONHEIGHT, BUTTONOPACITY);
        pullLever1Button.setScript(["You yank at the lever, but it doesn't budge.",
            "It feels like something is jammed."]);
        this.addButton("pullLever1", pullLever1Button, "Pull the lever")
    }

    makePullLever2Button() {
        pullLever2Button = new ChoiceButton(RIGHTX, BUTTONY, BUTTONWIDTH, BUTTONHEIGHT, BUTTONOPACITY);
        pullLever2Button.setScript(["You yank at the lever.",
            "With a loud thunk, it releases.",
            "The cave fills with the sound of whirring machinery.",
            "In the next room over, the press machine begins pounding up and down.",
            "The floor shakes with its deafening beat.",
            "You hear a loud clanging noise, like metal hitting wood."]);
        this.addButton("pullLever2", pullLever2Button, "Pull the lever")
    }

    makeCheckWindowButton() {
        checkWindowButton = new ChoiceButton(RIGHTX, BUTTONY, BUTTONWIDTH, BUTTONHEIGHT, BUTTONOPACITY);
        checkWindowButton.setScript(["It looks like several tools have been knocked off of the board above.",
            "They're strewn across the floor of the next room.",
            "Cutters balance precariously on the edge of the sill below the window."]);
        this.addButton("checkWindow", checkWindowButton, "Check the window")
    }

    makeGrabToolButton() {
        grabToolButton = new ChoiceButton(RIGHTX, BUTTONY, BUTTONWIDTH, BUTTONHEIGHT, BUTTONOPACITY);
        grabToolButton.setScript(["You reach out and grab the cutters before they can fall off the shelf.",
            "You open and close them a few times.",
            "They're definitely still sharp."]);
        this.addButton("grabTool", grabToolButton, "Grab the cutters")
    }

    makeWindow3Button() {
        window3Button = new ChoiceButton(RIGHTX, BUTTONY, BUTTONWIDTH, BUTTONHEIGHT, BUTTONOPACITY);
        window3Button.setScript(["Nothing else through the window is within reach.",
            "...You think you see someone standing just around the corner."]);
        this.addButton("window3", window3Button, "Look in the window")
    }

    makeWindow4Button() {
        window4Button = new ChoiceButton(RIGHTX, BUTTONY, BUTTONWIDTH, BUTTONHEIGHT, BUTTONOPACITY);
        window4Button.setScript(["Nothing else through the window is within reach."]);
        this.addButton("window4", window4Button, "Look in the window")
    }

    makeCutSafeButton() {
        cutSafeButton = new ChoiceButton(DUORIGHTX, BUTTONY, BUTTONWIDTH, BUTTONHEIGHT, BUTTONOPACITY);
        cutSafeButton.setScript(["You use the cutters to snip the wire over by the contraption.",
            "With a loud creak, something engages above your head.",
            "A huge hammer inlaid with spikes swings down from the ceiling of the cave.",
            "It rams into the bars with an awful squealing of metal.",
            "The trap disengages and slowly reels back up into the shadows.",
            "It leaves a gaping hole in the bars over the doorway.",
            "You wonder what you'd have done had this room been competently designed."]);
        this.addButton("cutSafe", cutSafeButton, "By the wall")
    }

    makeCutDangerButton() {
        cutDangerButton = new ChoiceButton(DUOLEFTX, BUTTONY, BUTTONWIDTH, BUTTONHEIGHT, BUTTONOPACITY);
        cutDangerButton.setScript(["You snip the wire by the bars.",
            "...",
            "Something creaks above you.",
            "You look up to see a panel of jagged spikes swinging towards your face.",
            "Whoops."]);
        this.addButton("cutDanger", cutDangerButton, "By the bars")
    }

    makeFollowWire2Button() {
        followWire2Button = new ChoiceButton(DUORIGHTX, BUTTONY, BUTTONWIDTH, BUTTONHEIGHT, BUTTONOPACITY);
        followWire2Button.setScript(["The wire runs up to a delicate-looking contraption that runs up the wall.",
            "It disappears into the ceiling.",
            "You can't tell what it does, and you're not sure you want to know."]);
        this.addButton("followWire2", followWire2Button, "Follow the wire")
    }

    /**All functions that collectively add buttons to the buttonList/add choices to the buttons*/

    //calls all button-maker functions so they don't have to be called in the constructor
    makeButtons() {
        this.makeDoorButton();
        this.makeFollowWireButton();
        this.makeTestWireButton();
        this.makeTripWireButton();
        this.makeGear1Button();
        this.makeGear2Button();
        this.makeRemoveRockButton();
        this.makeCheckGearsButton();
        this.makeJamCheckButton();
        this.makeSwitchSearchButton();
        this.makeWindow1Button();
        this.makeBoardButton();
        this.makeWindow2Button();
        this.makePullLever1Button();
        this.makePullLever2Button();
        this.makeCheckGears2Button();
        this.makeCheckWindowButton();
        this.makeGrabToolButton();
        this.makeWindow3Button();
        this.makeWindow4Button();
        this.makeCutWireWellButton();
        this.makeCutWireButton();
        this.makeCutSafeButton();
        this.makeCutDangerButton();
        this.makeFollowWire2Button();
    }

    //takes the created buttons and adds initial links to them, which can be changed later mid-game
    //this part is separated from the button creation because all buttons need to be created to be
    //added as choices
    // addButtonLinks() {
    //     this.buttonList["door"].setNewMiddleButton(followWireButton);
    //     this.buttonList["followWire"].setNewMiddleButton(testWireButton);
    //     this.buttonList["testWire"].setNewMiddleButton(tripWireButton);
    //     this.buttonList["cutWire"].setNewLeftButton(cutDangerButton);
    //     //cutWire right button to be added once it's determined whether followWireButton has been clicked
    //     //don't get middle button from ButtonManager when pressed
    //     this.buttonList["gear1"].setNewRightButton(window2Button);
    //     this.buttonList["gear2"].setNewLeftButton(removeRockButton);
    //     this.buttonList["removeRock"].setNewLeftButton(checkGearsButton); //right button (pullLever2) to be set if gears checked first
    //     //checkGearsButton will need a new right button set (switchSearchButton) if the window is checked first
    //     this.buttonList["jamCheck"].setNewLeftButton(removeRockButton);
    //     this.buttonList["switchSearch"].setNewRightButton(pullLever2Button);
    //     this.buttonList["window1"].setNewLeftButton(gear2Button);
    //     this.buttonList["window2"].setNewRightButton(pullLever1Button);
    //     this.buttonList["pullLever1"].setNewLeftButton(jamCheckButton); //left button to be removed once jamCheckButton is clicked
    //     this.buttonList["pullLever2"].setNewLeftButton(checkGears2Button);
    //     this.buttonList["pullLever2"].setNewRightButton(checkWindowButton);
    //     this.buttonList["checkWindow"].setNewRightButton(grabToolButton);
    //     this.buttonList["grabTool"].setNewRightButton(window3Button);
    //     this.buttonList["window3"].setNewRightButton(window4Button);
    //     this.buttonList["grabTool"].setNewMiddleButton(cutWireButton); //change to cutWireWell if testWireButton has been clicked
    //     this.buttonList["followWire2"].setNewRightButton(window3Button); //change to window4Button if window3 has been clicked
    //     this.buttonList["followWire2"].setNewLeftButton(checkGears2Button);
    // }
}

