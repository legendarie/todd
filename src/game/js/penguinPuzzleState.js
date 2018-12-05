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
const VERYHIGHYP = 400;

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
var contemplateButton;
var heapButton;
var heap2Button;
var reachButton;
var extendButton;
var grabPipeButton;
var grabPipe2Button;
var meltIceButton;
var turnOnButton;
var lookPanelButton;
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
var followCord2Button;
var tryKeyButton;
var lookLockButton;
var unlockPanelButton;
var openDrawerButton;
var cutLockButton;
var touchButton;
var touch2Button;
var useDialButton;
var turnUpButton;
var turnUp2Button;
var turnUp3Button;
var crossWarmButton;
var turnDownButton;
var turnDown2Button;
var turnDownPermButton;
var crossColdButton;
var crossCold2Button;
var grabPickButton;
var givePickButton;
var grabKeyButton;
var penguinAttackButton;

//the scene variable
var penguinPuzzleScene = null;

//initialize the state
var penguinPuzzleState = {

    /** The initial functions to set up the scene for player interaction */

    preload: function () {
        //declare penguinPuzzleScene to be an instance of a Scene, and load in the background image to the state
        penguinPuzzleScene = new Scene;
        penguinPuzzleScene.setBackground('penguinPuzzlebg', 'assets/penguinPuzzlebg.png');
        penguinPuzzleScene.setBackground('attackPenguinbg', 'assets/attackPenguin.png');
        penguinPuzzleScene.setBackground('sunkPenguinbg', 'assets/sunkPenguinbg.png');

        //reset the global clickCount variable
        clickCount = 0;
    },

    /** Add the initial visual elements to the canvas, and add the first piece of text to the scene */

    create: function () {
        //check to make sure the penguinPuzzleScene variable is not null
        if (penguinPuzzleScene != null) {

            //load the background and scale it
            if (turnUp2Button != null) {
                if (turnUp2Button.beenClicked() === true) {
                    penguinPuzzleScene.loadScene('sunkPenguinbg', 0.32);
                } else {
                    penguinPuzzleScene.loadScene('penguinPuzzlebg', 0.32)
                }
            } else {
                penguinPuzzleScene.loadScene('penguinPuzzlebg', 0.32)
            }

            //add a set of ellipses to the text box to indicate
            //further messages
            penguinPuzzleScene.addEllipses();

            if (this.hasDied !== true) {
                //add the text bar (with all universal settings), with the first line of text
                penguinPuzzleScene.addTextBar("You pad into a quiet cave.");
            } else {
                penguinPuzzleScene.addTextBar("What do you want to do?");
                penguinPuzzleScene.removeEllipses();
            }

            // //initialize the button choice manager and button list for the puzzle
            // //remove this when penguinPuzzleScene is hooked up to the rest of the game
            // buttonManager = new ButtonManager();

            //if the player hasn't died in this game, start it from the beginning
            if (this.hasDied !== true) {
                //create all of the buttons and their button links
                this.createButtons();
                this.setScripts();
                this.setNewButtons();

                buttonManager.setTopLeftButton(doorButton);
                buttonManager.setTopRightButton(heapButton);
                buttonManager.setBottomLeftButton(penguinButton);
                buttonManager.setBottomRightButton(wallButton);

                //when the text bar is clicked, go to the changeText function
                textBar.events.onInputUp.add(this.changeText, this);
            } else {
                //if the player has died, skip the opening text and load the last choices used
                if (buttonManager.getTopLeftButton() != null) {
                    this.makeButton(buttonManager.getTopLeftButton());
                }
                if (buttonManager.getTopRightButton() !=null) {
                    this.makeButton(buttonManager.getTopRightButton());
                }
                if (buttonManager.getBottomLeftButton() != null) {
                    this.makeButton(buttonManager.getBottomLeftButton());
                }
                if (buttonManager.getBottomRightButton() != null) {
                    this.makeButton(buttonManager.getBottomRightButton());
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

    beginScript() {
        //clear the choices and the listener on the clicked choice
        this.removeButtons();
        clickedButton.getButton().events.onInputUp.remove(this.beginScript, this);

        //add the first line of the choice's script, ellipses if needed, and a listener on the text bar
        penguinPuzzleScene.changeText("" + clickedButton.next());
        if (clickedButton.scriptLength() > 1) {
            penguinPuzzleScene.addEllipses();
        }
        textBar.events.onInputUp.add(this.runScript, this);
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
                //check to see if the clickedButton is turnUp2Button
                if (clickedButton === turnUp2Button) {
                    buttonManager.removeButtons();

                    penguinPuzzleScene.loadScene('attackPenguinbg', 0.32);
                    penguinPuzzleScene.addTextBar("");

                    penguinAttackButton = penguinPuzzleScene.addButton(0, 0, 1000, 1000, 0);
                    penguinAttackButton.events.onInputUp.add(this.fallScene, this);
                } else {
                    //if not, check to make sure the button needs the normal end-of-script question
                    penguinPuzzleScene.changeText("What do you want to do?");
                    this.setButtonChanges();
                    buttonManager.getNewButtons();
                    clickedButton.removeButtons();
                    this.addButtons();
                }
            } else {
                //if it is a branch end, check if it's a death
                deadEnd = clickedButton.isDeath();
                if (deadEnd === true) {
                    //if it is a death, enter the "You Died" screen
                    this.hasDied = true;
                    game.state.start('yaDeadState', yaDeadState);
                }
                else {
                    //if it's the end of the scene ("winning"), load the button over the door
                    openDoor = penguinPuzzleScene.addButton(540, 210, 175, 252, 0);
                    openDoor.events.onInputUp.add(this.changeState, this);
                }
            }
            //always remove the listener
            textBar.events.onInputUp.remove(this.runScript, this);
        }
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
        contemplateButton.setScript(["You take a moment to contemplate your existence.",
            "...",
            ".....",
            ".......",
            "You feel a little bit better.",
            "That snow pile was still pretty freaky though. "]);
        contemplateButton.setLabel("Contemplate life");
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
        extendButton.setScript(["You attach the wire cutters to the handle of the pick with the tape.",
            "You'll definitely be able to reach the snow pile now."]);
        extendButton.setLabel("Extend your reach");
        grabPipeButton.setScript(["You hook the pickaxe head around the tobacco pipe, and pull gently.",
            "It falls into the snow.",
            "You begin slowly scraping the pipe across the lake.",
            "Suddenly, the heap of snow shifts towards you.",
            "You hear an irritated snort.",
            "Two glowing coals roll around to the front of the snow pile and stare at you.",
            "Its scarf snakes across the ice and wraps firmly around your pick.",
            "Uh..."]);
        grabPipeButton.setLabel("Grab the pipe");
        grabPipe2Button.setScript(["You hook the pickaxe head around the tobacco pipe, and pull gently.",
            "It falls into the snow.",
            "You begin slowly scraping the pipe across the lake.",
            "Suddenly, the heap of snow shifts towards you.",
            "You hear an irritated snort.",
            "Two glowing coals roll around to the front of the snow pile and stare at you.",
            "Its scarf snakes across the ice and wraps firmly around your pick.",
            "You remember what you had read on that note in the ice.",
            "You let go of the cutters handle.",
            "...",
            "The heap snuffles.",
            "It raises the pickaxe and bats the pipe across the snow towards you.",
            "It lands near your feet.",
            "The snow pile goes still."]);
        grabPipe2Button.setLabel("Grab the pipe");
        meltIceButton.setScript(["The tobacco pipe is unnaturally hot.",
            "It takes a while, but the heat helps to defrost the panel.",
            "The switches are now functional."]);
        meltIceButton.setLabel("Melt ice on panel");
        turnOnButton.setScript(["You press a conspicuous red button.",
            "The panel begins to hum softly."]);
        turnOnButton.setLabel("Turn panel on");
        lookPanelButton.setScript(["The panel buzzes with energy."]);
        lookPanelButton.setLabel("Look at panel");
        penguinButton.setScript(["You cautiously observe the penguin from a distance.",
            "It seems like it's fast asleep.",
            "You can hear it snoring softly."]);
        penguinButton.setLabel("Check the penguin");
        penguin2Button.setScript(["You observe the penguin.",
            "It looks...strange.",
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
        wallButton.setScript(["The walls on either side seem to be those of a natural cave.",
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
            "They're all frozen in place, but they seem important."]);
        followCordButton.setLabel("Follow the cord");
        followCord2Button.setScript(["The cord leads to a metal panel set into the wall.",
            "There are a few dials and switches prominent.",
            "They're all frozen in place, but they seem important.",
            "There's a small keyturn on the right side."]);
        followCord2Button.setLabel("Follow the cord");
        tryKeyButton.setScript(["You try to insert the key into the padlock, but it doesn't fit."]);
        tryKeyButton.setLabel("Unlock the box");
        lookLockButton.setScript(["The box itself doesn't have any other locks.",
            "You walk over to the panel in the wall.",
            "There's a small keyturn on the right side."]);
        lookLockButton.setLabel("Look for locks");
        unlockPanelButton.setScript(["The keyturn unlocks a small door on the panel.",
            "Inside is a closed drawer with a metal handle."]);
        unlockPanelButton.setLabel("Unlock the panel");
        openDrawerButton.setScript(["The drawer is full of tools.",
            "You can see some wire cutters, a bolt cutters, and a wrench.",
            "There's a roll of electrical tape.",
            "You're starting to get a few ideas."]);
        openDrawerButton.setLabel("Open the drawer");
        cutLockButton.setScript(["You snap the padlock off of the plastic box with the bolt cutters.",
            "You open it up to find some sort of controls.",
            "There's a large dial, and a sticky-note attached on top.",
            'It reads, "DO NOT TOUCH THE THERMOSTAT."']);
        cutLockButton.setLabel("Cut the lock");
        touchButton.setScript(["You twist the dial a little.",
            "...",
            "You twist it more.",
            "It doesn't seem like it's turned on."]);
        touchButton.setLabel("Touch the thermostat");
        touch2Button.setScript(["You turn the dial furiously back and forth.",
            "Nothing happens, but it's kind of satisfying."]);
        touch2Button.setLabel("Touch the thermostat");
        useDialButton.setScript(["The thermostat has been turned on."]);
        useDialButton.setLabel("Use thermostat");
        turnUpButton.setScript(["You turn up the heat.",
            "The water is getting a little warmer.",
            "The penguin starts making a buzzing noise."]);
        turnUpButton.setLabel("Heat up");
        turnUp2Button.setScript(["You crank the heat up as far as it can go.",
            "After a few seconds, you hear a spine-chilling shrieking from across the cave.",
            ""]);
        turnUp2Button.setLabel(["Heat up"]);
        turnUp3Button.setScript(["You heat the room back up.",
            "It returns to a normal temperature."]);
        turnUp3Button.setLabel("Heat up");
        crossWarmButton.setScript(["You don't even make it three steps before the ice gives out beneath you.",
            "You plunge into the murk below.",
            "You hear a burbling voice behind you:",
            '"No hard feelings, kiddo."']);
        crossWarmButton.setLabel("Exit room");
        turnDownButton.setScript(["You turn the dial until it hits zero.",
            "The room is feeling pretty frigid."]);
        turnDownButton.setLabel("Cool down");
        turnDown2Button.setScript(["You cool the room back down.",
            "It returns to a normal temperature.",
            "The penguin stops buzzing."]);
        turnDown2Button.setLabel("Cool down");
        turnDownPermButton.setScript(["You turn the dial all the way back down."]);
        turnDownPermButton.setLabel("Cool down");
        crossColdButton.setScript(["You slowly, quietly cross the frozen lake.",
            "The ice is solid beneath your feet.",
            "You turn the knob of the door.",
            "It's already unlocked."]);
        crossColdButton.setLabel("Exit room");
        crossCold2Button.setScript(["You carefully make your way around the hole in the ice.",
            "You reach the door and turn the knob.",
            "It looks like it's been unlocked this whole time.",
            "Welp."]);
        crossCold2Button.setLabel("Exit room");
        grabPickButton.setScript(["You pull as hard as you can on the cutters handle.",
            "Suddenly, you feel an overwhelming force yank on the other end.",
            "You're tugged through the air and into the heap of snow.",
            "You feel yourself being smothered.",
            "Snow and ice pile up around you until you're completely cocooned.",
            "At the very least, you make a nice snowman."]);
        grabPickButton.setLabel("Pull the pickaxe");
        givePickButton.setScript(["You let go of the cutters handle.",
            "...",
            "The heap snuffles.",
            "It raises the pickaxe and bats the pipe across the snow towards you.",
            "It lands near your feet.",
            "The snow pile goes still."]);
        givePickButton.setLabel("Release the pickaxe");
        grabKeyButton.setScript(["As you lean in towards the penguin, you hear a weird clicking sound.",
            "You catch a whiff of something oily.",
            "...You think you see a second pair of eyes hidden in its feathers.",
            "Hoo boy.",
            "You snatch the key and retreat to the cave entrance."]);
        grabKeyButton.setLabel("Grab the key");
    },

    /** All of the functions that have to do with the choicebuttons:
     * makeButton takes a button and sets it as clickable, as prepares to run the script
     * addButtons adds the choice buttons stored in the buttonManager to the window
     * removeButtons kills any buttons on the screen
     * createButtons initializes the button variables with their x/y values for later use
     * setNewButtons sets up what buttons each choice button changes when clicked
     * setButtonChanges is a check that's run before the buttons are displayed,
     * which tracks certain choices and changes the game's reaction based on the player's actions
     * attackScene begins the penguin attack cutscene
     * fallScene ends the penguin attack cutscene */

    makeButton: function (button) {
        //position the button in the window and begin reading through the script lines
        button.position();
        button.getButton().events.onInputUp.add(this.beginScript, this);
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
        contemplateButton = new InGameButton(LEFTXP, HIGHYP);
        heapButton = new InGameButton(RIGHTXP, HIGHYP);
        heap2Button = new InGameButton(RIGHTXP, HIGHYP);
        reachButton = new InGameButton(RIGHTXP, HIGHYP);
        extendButton = new InGameButton(RIGHTXP, HIGHYP);
        grabPipeButton = new InGameButton(RIGHTXP, HIGHYP);
        grabPipe2Button = new InGameButton(RIGHTXP, HIGHYP);
        meltIceButton = new InGameButton(RIGHTXP, HIGHYP);
        turnOnButton = new InGameButton(RIGHTXP, HIGHYP);
        lookPanelButton = new InGameButton(RIGHTXP, HIGHYP);
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
        followCord2Button = new InGameButton(RIGHTXP, LOWYP);
        tryKeyButton = new InGameButton(RIGHTXP, LOWYP);
        lookLockButton  = new InGameButton(RIGHTXP, LOWYP);
        unlockPanelButton = new InGameButton(RIGHTXP, LOWYP);
        openDrawerButton = new InGameButton(RIGHTXP, LOWYP);
        cutLockButton = new InGameButton(RIGHTXP, LOWYP);
        touchButton = new InGameButton(RIGHTXP, LOWYP);
        touch2Button = new InGameButton(RIGHTXP, LOWYP);
        useDialButton = new InGameButton(RIGHTXP, LOWYP);
        turnUpButton = new InGameButton(RIGHTXP, LOWYP);
        turnUp2Button = new InGameButton(RIGHTXP, LOWYP);
        turnUp3Button = new InGameButton(RIGHTXP, LOWYP);
        crossWarmButton = new InGameButton(RIGHTXP, LOWYP);
        turnDownButton = new InGameButton(LEFTXP, LOWYP);
        turnDown2Button = new InGameButton(LEFTXP, LOWYP);
        turnDownPermButton = new InGameButton(LEFTXP, LOWYP);
        crossColdButton = new InGameButton(LEFTXP, LOWYP);
        crossCold2Button = new InGameButton(MIDDLEXP, MIDDLEYP);
        grabPickButton = new InGameButton(LEFTXP, MIDDLEYP);
        givePickButton = new InGameButton(RIGHTXP, MIDDLEYP);
        grabKeyButton = new InGameButton(MIDDLEXP, MIDDLEYP);
    },

    setNewButtons: function () {
        //set the initial button links for the choices
        //also set if the button is a death ending or the winning ending
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
        extendButton.setNewTopRightButton(grabPipeButton);
        grabPipeButton.setNothingTopLeft();
        grabPipeButton.setNothingTopRight();
        grabPipeButton.setNewBottomLeftButton(grabPickButton);
        grabPipeButton.setNewBottomRightButton(givePickButton);
        grabPipe2Button.setNewTopRightButton(meltIceButton);
        meltIceButton.setNewTopRightButton(turnOnButton);
        turnOnButton.setNewBottomRightButton(cutLockButton);
        turnOnButton.setNewTopRightButton(lookPanelButton);
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
        tryKeyButton.setNewBottomRightButton(followCord2Button);
        followCord2Button.setNewBottomRightButton(unlockPanelButton);
        lookLockButton.setNewBottomRightButton(unlockPanelButton);
        unlockPanelButton.setNewBottomRightButton(openDrawerButton);
        openDrawerButton.setNewTopRightButton(extendButton);
        openDrawerButton.setNewBottomRightButton(cutLockButton);
        cutLockButton.setNewBottomRightButton(touchButton);
        touchButton.setNewBottomRightButton(touch2Button);
        useDialButton.setNothingTopLeft();
        useDialButton.setNothingTopRight();
        useDialButton.setNewBottomLeftButton(turnDownButton);
        useDialButton.setNewBottomRightButton(turnUpButton);
        turnUpButton.setNewBottomLeftButton(turnDown2Button);
        turnUpButton.setNewBottomRightButton(turnUp2Button);
        turnUp2Button.setNothingBottomLeft();
        turnUp2Button.setNothingBottomRight();
        turnUp3Button.setNewBottomRightButton(turnUpButton);
        turnUp3Button.setNewBottomLeftButton(turnDownButton);
        crossWarmButton.setToDeath();
        turnDownButton.setNewBottomLeftButton(crossColdButton);
        turnDownButton.setNewBottomRightButton(turnUp3Button);
        turnDown2Button.setNewBottomLeftButton(turnDownButton);
        turnDown2Button.setNewBottomRightButton(turnUpButton);
        turnDownPermButton.setNewMiddleButton(crossCold2Button);
        turnDownPermButton.setNothingBottomLeft();
        turnDownPermButton.setNothingBottomRight();
        crossColdButton.setToEnd();
        crossCold2Button.setToEnd();
        grabPickButton.setToDeath();
        givePickButton.setNewTopLeftButton(contemplateButton);
        givePickButton.setNewTopRightButton(meltIceButton);
        givePickButton.setNewBottomLeftButton(penguin3Button);
        givePickButton.setNewBottomRightButton(cutLockButton);
        grabKeyButton.setNothingMiddle();
        grabKeyButton.setNewTopLeftButton(examineLake2Button);
        grabKeyButton.setNewTopRightButton(reachButton);
        grabKeyButton.setNewBottomLeftButton(penguin3Button);
        grabKeyButton.setNewBottomRightButton(examineRoomButton);
    },

    setButtonChanges: function() {
        //use checks to assign new choices depending on what the player clicks first
        if (heapCheck !== true) {
            if (heapButton.beenClicked() === true) {
                pickaxeButton.setNewTopRightButton(reachButton);
                heapCheck = true;
            }
        }
        if (examineLakeCheck !== true) {
            if (examineLakeButton.beenClicked() === true) {
                grabKeyButton.setNewTopLeftButton(checkWaterButton);
                examineLakeCheck = true;
            }
        }
        if (penguin2Check !== true) {
            if (penguin2Button.beenClicked() === true) {
                reachButton.removeBottomLeftButton();
                penguin2Check = true;
            }
        }
        if (examineRoomCheck !== true) {
            if (examineRoomButton.beenClicked() === true) {
                reachButton.removeBottomRightButton();
                grabKeyButton.setNewBottomRightButton(tryKeyButton);
                examineRoomCheck = true;
            }
        }
        if (grabKeyCheck !== true) {
            if (grabKeyButton.beenClicked() === true) {
                examineRoomButton.setNewBottomRightButton(tryKeyButton);
                grabKeyCheck = true;
            }
        }
        if (followCordCheck !== true) {
            if (followCordButton.beenClicked() === true) {
                tryKeyButton.setNewBottomRightButton(lookLockButton);
                followCordCheck = true;
            }
        }
        if (cutLockCheck !== true) {
            if (cutLockButton.beenClicked() === true) {
                givePickButton.setNewBottomRightButton(touchButton);
                turnOnButton.setNewBottomRightButton(useDialButton);
                cutLockCheck = true;
            }
        }
        if (turnOnCheck !== true) {
            if (turnOnButton.beenClicked() === true) {
                cutLockButton.setNewBottomRightButton(useDialButton);
                turnOnCheck = true;
            }
        }
    },

    fallScene: function() {
        //the second part of the cutscene that continues the choice branch
        penguinAttackButton.kill();
        penguinPuzzleScene.loadScene('sunkPenguinbg', 0.32);
        penguinPuzzleScene.addTextBar("...");

        //set the next choices available
        buttonManager.setBottomLeftButton(turnDownPermButton);
        buttonManager.setBottomRightButton(crossWarmButton);

        //add the buttons to the window
        this.makeButton(crossWarmButton);
        this.makeButton(turnDownPermButton);
    },

    /** Change the game state to [insert state name here] */

    changeState: function() {
        //change states to the next state
        game.state.start('doorState', doorState)
    }
};