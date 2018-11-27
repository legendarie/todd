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
const MIDDLEYP = 500;

//variables for all buttons
var doorButton;
var examineLakeButton;
var examineLake2Button;
var checkAgainButton;
var paranoiaButton;
var crossDangerButton;
var checkWaterButton;
var checkWater2Button;
var checkWater3Button;
var readNoteButton;
var readNoteButton2;
var heapButton;
var heap2Button;
var reachButton;
var penguinButton;
var penguin2Button;
var penguin3Button;
var crossButton;
var crossSafeButton;
var wallButton;
var pickaxeButton;
var climbButton;
var examineRoomButton;
var followCordButton;
var tryKeyButton;       //try the key on the box
var grabKeyButton;

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
        if (buttonManager.getMiddleButton() != null) {
            this.makeButton(buttonManager.getMiddleButton())
        }
    },

    createButtons: function () {
        //initialize all buttons so they can be recognized by other functions
        doorButton = new InGameButton(LEFTXP, HIGHYP);
        examineLakeButton = new InGameButton(LEFTXP, HIGHYP);
        examineLake2Button = new InGameButton(LEFTXP, HIGHYP);
        checkAgainButton = new InGameButton(LEFTXP, HIGHYP);
        paranoiaButton = new InGameButton(LEFTXP, HIGHYP);
        crossDangerButton = new InGameButton(LEFTXP, HIGHYP);
        checkWaterButton = new InGameButton(LEFTXP, HIGHYP);
        checkWater2Button = new InGameButton(LEFTXP, HIGHYP);
        checkWater3Button = new InGameButton(LEFTXP, HIGHYP);
        readNoteButton = new InGameButton(LEFTXP, HIGHYP);
        readNoteButton2 = new InGameButton(LEFTXP, HIGHYP);
        heapButton = new InGameButton(RIGHTXP, HIGHYP);
        heap2Button = new InGameButton(RIGHTXP, HIGHYP);
        reachButton = new InGameButton(RIGHTXP, HIGHYP);
        penguinButton = new InGameButton(LEFTXP, LOWYP);
        penguin2Button = new InGameButton(LEFTXP, LOWYP);
        penguin3Button = new InGameButton(LEFTXP, LOWYP);
        crossButton = new InGameButton(LEFTXP, LOWYP);
        crossSafeButton = new InGameButton(LEFTXP, LOWYP);
        wallButton = new InGameButton(RIGHTXP, LOWYP);
        pickaxeButton = new InGameButton(RIGHTXP, LOWYP);
        climbButton = new InGameButton(RIGHTXP, LOWYP);
        examineRoomButton = new InGameButton(RIGHTXP, LOWYP);
        followCordButton = new InGameButton(RIGHTXP, LOWYP);
        grabKeyButton = new InGameButton(MIDDLEXP, MIDDLEYP);
    },

    setScripts: function() {
        //assign all button scripts and labels
        doorButton.setScript(["You step forward towards the wooden door.",
            "Beneath your foot, you hear the sharp crack of ice breaking.",
            "The penguin's eyes fly open.",
            "You see only your inevitable doom in its soulless pupils."]);
        doorButton.setLabel("Try the door");
        examineLakeButton.setScript(["You wipe away a swath of snow over the ice.",
            "The water is dark and murky.",
            "You think you just saw something large swim past you."]);
        examineLakeButton.setLabel("Look at the lake");
        examineLake2Button.setScript(["Below the ice is dark and unwelcoming.",
            "You wonder what could be down there."]);
        examineLake2Button.setLabel("Look at the lake");
        checkAgainButton.setScript(["You don't see anything swimming.",
            "Maybe it was just your imagination."]);
        checkAgainButton.setLabel("Check again");
        paranoiaButton.setScript(["You decide to sit and feel paranoid for a while.",
            "It doesn't help."]);
        paranoiaButton.setLabel("Feel paranoid");
        crossDangerButton.setScript(["You cross the lake over the center.",
            "You don't get three steps before you feel the ice cracking.",
            "You hear an inhuman shriek from by the door.",
            "Antarctic fury envelopes your being."]);
        crossDangerButton.setLabel("Cross over middle");
        checkWaterButton.setScript(["You bend over the patch of ice you cleared off.",
            "...",
            "There. You definitely saw something move.",
            "No mistaking it this time."]);
        checkWaterButton.setLabel("Watch the lake");
        checkWater2Button.setScript(["You sit down on the ice.",
            "Every now and then, you catch a flicker of something swimming.",
            "Whatever it is, it looks big and long.",
            "You think you see scales."]);
        checkWater2Button.setLabel("Watch more");
        checkWater3Button.setScript(["Something raps sharply against the ice.",
            "You nearly jump out of your skin.",
            "...The penguin is still asleep.",
            "Under your knees is a floating scrap of paper."]);
        checkWater3Button.setLabel("Watch more");
        readNoteButton.setScript(["The note reads,",
            '"He wants something in return"']);
        readNoteButton.setLabel("Read note");
        readNoteButton2.setScript(['"He wants something in return"']);
        readNoteButton2.setLabel("Read note");
        heapButton.setScript(["A pile of snow and clothes is heaped on the cave floor.",
            "You can see a scarf and a still-smoking tobacco pipe.",
            "You decide not to get too much closer."]);
        heapButton.setLabel("Examine snow pile");
        heap2Button.setScript(["A pile of snow and clothes is heaped on the cave floor.",
            "You can see a scarf and a still-smoking tobacco pipe.",
            "You might be able to reach it with your pick."]);
        heap2Button.setLabel("Examine snow pile");
        reachButton.setScript(["You attempt to grab the pipe with your pickaxe.",
            "You extend your arm as far as it can go while staying near the lake edge.",
            "You're just barely out of range.",
            "You'll need to extend your reach somehow."]);
        reachButton.setLabel("Reach for pipe");
        penguinButton.setScript(["You cautiously observe the penguin from a distance.",
            "It seems like it's fast asleep.",
            "You can hear it snoring softly."]);
        penguinButton.setLabel("Check the penguin");
        penguin2Button.setScript(["You observe the penguin.",
            "It looks peaceful.",
            "Upon closer examination, you see something hanging above its head.",
            "It looks like a key on a ring.",
            "Damn."]);
        penguin2Button.setLabel("Check the penguin");
        penguin3Button.setScript(["The penguin isn't moving anymore."]);
        penguin3Button.setLabel("Check the penguin");
        crossButton.setScript(["The entire floor feels a little fragile.",
            "The edges by the wall might be shallower.",
            "You can't quite tell through the snow."]);
        crossButton.setLabel("Evaluate ice");
        crossSafeButton.setScript(["You sidle along the wall.",
            "Thankfully, the ice is solid, and you make it to the other side.",
            "You're dreadfully close to the penguin now."]);
        crossSafeButton.setLabel("Cross by the side");
        wallButton.setScript(["The walls on either side seem to those of a natural cave.",
            "They're encased in ice, but you can see the stone underneath.",
            "You nearly trip over something in the snow on the ground."]);
        wallButton.setLabel(["Search the walls"]);
        pickaxeButton.setScript(["Kneeling down, you find a pickaxe against the wall.",
            "You gently pry it from the frost.",
            "You brush away a film of snow on the ground to find a layer of ice.",
            "It seems like there's a frozen lake beneath you.",
            "The ice looks rather thin."]);
        pickaxeButton.setLabel("Search the snow");
        climbButton.setScript(["You look over the walls with the pick in your hand.",
            "You could definitely use it as a climbing tool.",
            "You swing the axe up into the air, and slam it into the ice.",
            "An ear-piercing screech echoes through the cavern.",
            "You hear frantic clicking and shuffling.",
            "By the time you've raised your tool in defense, it's too late.",
            "You stare down the beak of your demise."]);
        climbButton.setLabel("Climb wall with pick");
        examineRoomButton.setScript(["You search the cave for anything else that could be useful.",
            "You almost immediately come across a small plastic box on the ground.",
            "There's a heavy padlock holding it shut.",
            "A cord extends from the back."]);
        examineRoomButton.setLabel("Check the room");
        followCordButton.setScript(["The cord leads to a metal panel set into the wall.",
            "There are a few dials and switches prominent.",
            "They're all frozen in place."]);
        followCordButton.setLabel("Follow the cord");
        grabKeyButton.setScript(["As you lean in towards the penguin, you hear a weird clicking sound.",
            "You catch a whiff of something oily.",
            "...You think you see a second pair of eyes hidden in its feathers.",
            "Hoo boy.",
            "You snatch the key and retreat to the cave entrance."]);
        grabKeyButton.setLabel("Grab the key");
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
        if (buttonManager.getMiddleButton() != null) {
            buttonManager.getMiddleButton().kill();
        }
    },

    setNewButtons: function () {
        //set the initial button links for the choices
        doorButton.setToDeath();
        examineLakeButton.setNewTopLeftButton(checkAgainButton);
        checkAgainButton.setNewTopLeftButton(paranoiaButton);
        crossDangerButton.setToDeath();
        checkWaterButton.setNewTopLeftButton(checkWater2Button);
        checkWater2Button.setNewTopLeftButton(checkWater3Button);
        checkWater3Button.setNewTopLeftButton(readNoteButton);
        readNoteButton.setNewTopLeftButton(readNoteButton2);
        heap2Button.setNewTopRightButton(reachButton);
        reachButton.setNewBottomRightButton(examineRoomButton);
        reachButton.setNewBottomLeftButton(penguin2Button);
        penguin2Button.setNewBottomLeftButton(crossButton);
        crossButton.setNewTopLeftButton(crossDangerButton);
        crossButton.setNewBottomLeftButton(crossSafeButton);
        crossSafeButton.setNewMiddleButton(grabKeyButton);
        crossSafeButton.setNothingTopLeft();
        crossSafeButton.setNothingTopRight();
        crossSafeButton.setNothingBottomLeft();
        crossSafeButton.setNothingBottomRight();
        wallButton.setNewBottomRightButton(pickaxeButton);
        pickaxeButton.setNewBottomRightButton(climbButton);
        pickaxeButton.setNewTopRightButton(heap2Button);
        pickaxeButton.setNewTopLeftButton(examineLakeButton);
        climbButton.setToDeath();
        examineRoomButton.setNewBottomRightButton(followCordButton);
        grabKeyButton.setNothingMiddle();
        grabKeyButton.setNewTopLeftButton(examineLake2Button);
        grabKeyButton.setNewTopRightButton(reachButton);
        grabKeyButton.setNewBottomLeftButton(penguin3Button);
        grabKeyButton.setNewBottomRightButton(examineRoomButton);
    },

    setButtonChanges: function() {
        //use a few checks to assign new choices depending on what the player clicks first
        if (heapButton.beenClicked() === true) {
            pickaxeButton.setNewTopRightButton(reachButton);
        }
        if (examineLakeButton.beenClicked() === true) {
            grabKeyButton.setNewTopLeftButton(checkWaterButton);
        }
        if (examineRoomButton.beenClicked() === true) {
            grabKeyButton.setNewBottomRightButton(tryKeyButton);
        }
    },

    changeState: function() {
        //change states to the next state
        game.state.start('doorState', doorState)
    }
};