//establish the global variables
var clickCount;
var textBar;
var thing;

//choice buttons
var doorButton;
var followWireButton;
var testWireButton;
var tripWireButton;
var gear1Button;
var gear2Button;
var removeRockButton;
var checkGearsButton;
var gear3Button;
var window3Button;
var window1Button;
var boardButton;
var window2Button;
var pullLever1Button;
var pullLever2Button;

//booleans to check whether an option has been completed or not
var changeTextDone;
var doorDone;
var followWireDone;
var testWireDone;
var gear1Done;
var gear2Done;
var removeRockDone;
var checkGearsDone;
var gear3Done;
var window3Done;
var window1Done;
var boardKnockDone;
var window2Done;
var pullLever1Done;
var pullLever2Done;

//the Scene object variable
let gearPuzzleScene = null;

//initialize the state
var gearPuzzleState = {

    /**The initial functions to set up the scene for player interaction*/

    preload: function() {
        //declare gearPuzzleScene to be an instance of a Scene, and load in the background image to the state
        gearPuzzleScene = new Scene;
        gearPuzzleScene.setBackground('gearPuzzlebg', 'assets/gearPuzzlebg.png');

        //reset the global clickCount variable
        clickCount = 0;
    },

    create: function() {
        //check to make sure the gearPuzzleScene variable is not null
        if (gearPuzzleScene != null) {

            //load the background and scale it
            gearPuzzleScene.loadScene('gearPuzzlebg', 0.32);

            //add the text bar (with all universal settings), with the first line of text
            gearPuzzleScene.addTextBar("The left tunnel leads into a wide cavern.");

            //add a set of ellipses to the text box to indicate
            //further messages
            gearPuzzleScene.addEllipses();

            //when the text bar is clicked, go to the changeText function
            textBar.events.onInputUp.add(this.changeText, this);
        }
    },

    /**All of the functions that change the text in the text box:
     * changeText runs through the first five lines of text
     * doorText/doorMoreText shows text specific to checking out the bars on the doorway
     * followWireText/MoreText is for following where the wire leads
     * testWireText/MoreText is for trying to trip the wire by the wall
     * gear1Text/MoreText is for investigating the gears first
     * gear2Text/MoreText is for investigating the gears if the window is checked first
     * window1Text/MoreText is for looking through the window first
     * boardKnockText/MoreText is for trying to knock down the tools above the window*/

    changeText: function() {
        //make sure changeText isn't called twice
        if (changeTextDone !== true) {
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
                    changeTextDone = true;
                    this.gear1Choice();
                    this.window1Choice();
                    this.doorChoice();
                }
            }
        }
    },

    doorText() {
        clickCount = 0;
        this.removeButtons();
        gearPuzzleScene.addEllipses();
        doorDone = false;
        gearPuzzleScene.changeText("The bars are much too heavy to lift.");
        textBar.events.onInputUp.add(this.doorMoreText, this);
    },

    doorMoreText() {
        //make sure doorMoreText isn't called accidentally
        if (doorDone !== true) {
            //only increment the click count three times
            if (clickCount < 3) {
                clickCount++;
                if (clickCount === 1) {
                    gearPuzzleScene.changeText("Upon closer inspection, you see a wire running across the floor.")
                } else if (clickCount === 2) {
                    gearPuzzleScene.changeText("It trails off to your right.")
                } else {
                    //change the text in the text bar, then create the choice buttons
                    gearPuzzleScene.changeText("What do you want to do?");
                    gearPuzzleScene.removeEllipses();
                    doorDone = true;
                    if (pullLever2Done != null) {
                        //stuff after the machine is activated
                    } else {
                        if (window1Done != null) {
                            if (gear2Done != null) {
                                if (removeRockDone != null) {
                                    if (checkGearsDone != null) {
                                        if (window3Done != null) {
                                            this.pullLever2Choice();
                                            this.checkGearsChoice();
                                        } else {
                                            this.window3Choice();
                                            this.checkGearsChoice();
                                        }
                                    } else {
                                        this.boardKnockChoice();
                                        this.checkGearsChoice();
                                    }
                                } else {
                                    this.boardKnockChoice();
                                    this.removeRockChoice();
                                }
                            } else {
                                this.boardKnockChoice();
                                this.gear2Choice();
                            }
                        } else if (gear1Done != null) {
                            if (window2Done != null) {
                                if (pullLever1Done != null) {
                                    if (gear3Done != null) {
                                        if (removeRockDone != null) {
                                            //check window for lever
                                        } else {
                                            this.pullLever1Choice();
                                            this.removeRockChoice();
                                        }
                                    } else {
                                        this.pullLever1Choice();
                                        this.gear3Choice();
                                    }
                                } else {
                                    this.pullLever1Choice();
                                    this.gear1Choice()
                                }
                            } else {
                                this.window2Choice();
                                this.gear1Choice();
                            }
                        } else {
                            this.gear1Choice();
                            this.window2Choice();
                        }
                    }
                    this.followWireChoice();
                }
            }
        }
    },

    followWireText() {
        clickCount = 0;
        this.removeButtons();
        gearPuzzleScene.addEllipses();
        followWireDone = false;
        gearPuzzleScene.changeText("The wire runs up to a delicate-looking contraption that runs up the wall.");
        textBar.events.onInputUp.add(this.followWireMoreText, this);
    },

    followWireMoreText() {
        //make sure followWireMoreText isn't called accidentally
        if (followWireDone !== true) {
            //only increment the click count three times
            if (clickCount < 3) {
                clickCount++;
                if (clickCount === 1) {
                    gearPuzzleScene.changeText("It disappears into the ceiling.")
                } else if (clickCount === 2) {
                    gearPuzzleScene.changeText("You can't tell what it does, and you're not sure you want to know.")
                } else {
                    //change the text in the text bar, then create the choice buttons
                    gearPuzzleScene.changeText("What do you want to do?");
                    gearPuzzleScene.removeEllipses();
                    followWireDone = true;
                    if (pullLever2Done != null) {
                        //stuff after the machine is activated
                    } else {
                        if (window1Done != null) {
                            if (gear2Done != null) {
                                if (removeRockDone != null) {
                                    if (checkGearsDone != null) {
                                        if (window3Done != null) {
                                            this.pullLever2Choice();
                                            this.checkGearsChoice();
                                        } else {
                                            this.window3Choice();
                                            this.checkGearsChoice();
                                        }
                                    } else {
                                        this.boardKnockChoice();
                                        this.checkGearsChoice();
                                    }
                                } else {
                                    this.boardKnockChoice();
                                    this.removeRockChoice();
                                }
                            } else {
                                this.boardKnockChoice();
                                this.gear2Choice();
                            }
                        } else if (gear1Done != null) {
                            if (window2Done != null) {
                                if (pullLever1Done != null) {
                                    if (gear3Done != null) {
                                        if (removeRockDone != null) {
                                            //check window for lever
                                        } else {
                                            this.pullLever1Choice();
                                            this.removeRockChoice();
                                        }
                                    } else {
                                        this.pullLever1Choice();
                                        this.gear3Choice();
                                    }
                                } else {
                                    this.pullLever1Choice();
                                    this.gear1Choice()
                                }
                            } else {
                                this.window2Choice();
                                this.gear1Choice();
                            }
                        } else {
                            this.gear1Choice();
                            this.window2Choice();
                        }
                    }
                    this.testWireChoice();
                }
            }
        }
    },

    testWireText() {
        clickCount = 0;
        this.removeButtons();
        gearPuzzleScene.addEllipses();
        testWireDone = false;
        gearPuzzleScene.changeText("You pluck the wire.");
        textBar.events.onInputUp.add(this.testWireMoreText, this);
    },

    testWireMoreText() {
        //make sure testWireMoreText isn't called accidentally
        if (testWireDone !== true) {
            //only increment the click count three times
            if (clickCount < 5) {
                clickCount++;
                if (clickCount === 1) {
                    gearPuzzleScene.changeText("...")
                } else if (clickCount === 2) {
                    gearPuzzleScene.changeText("Nothing happens.")
                } else if (clickCount === 3) {
                    gearPuzzleScene.changeText("It looks like interacting with this part of the wire won't do anything.")
                } else if (clickCount === 4) {
                    gearPuzzleScene.changeText("That is, unless you can find some way to sever it.")
                } else {
                    //change the text in the text bar, then create the choice buttons
                    gearPuzzleScene.changeText("What do you want to do?");
                    gearPuzzleScene.removeEllipses();
                    testWireDone = true;
                    if (pullLever2Done != null) {
                        //stuff after the machine is activated
                    } else {
                        if (window1Done != null) {
                            if (gear2Done != null) {
                                if (removeRockDone != null) {
                                    if (checkGearsDone != null) {
                                        if (window3Done != null) {
                                            this.pullLever2Choice();
                                            this.checkGearsChoice();
                                        } else {
                                            this.window3Choice();
                                            this.checkGearsChoice();
                                        }
                                    } else {
                                        this.boardKnockChoice();
                                        this.checkGearsChoice();
                                    }
                                } else {
                                    this.boardKnockChoice();
                                    this.removeRockChoice();
                                }
                            } else {
                                this.boardKnockChoice();
                                this.gear2Choice();
                            }
                        } else if (gear1Done != null) {
                            if (window2Done != null) {
                                if (pullLever1Done != null) {
                                    if (gear3Done != null) {
                                        if (removeRockDone != null) {
                                            //check window for lever
                                        } else {
                                            this.pullLever1Choice();
                                            this.removeRockChoice();
                                        }
                                    } else {
                                        this.pullLever1Choice();
                                        this.gear3Choice();
                                    }
                                } else {
                                    this.pullLever1Choice();
                                    this.gear1Choice()
                                }
                            } else {
                                this.window2Choice();
                                this.gear1Choice();
                            }
                        } else {
                            this.gear1Choice();
                            this.window2Choice();
                        }
                    }
                    this.tripWireChoice();
                }
            }
        }
    },

    tripWireText() {
        clickCount = 0;
        this.removeButtons();
        gearPuzzleScene.addEllipses();
        gearPuzzleScene.changeText("You head over to the bars and give the tripwire a hearty kick.");
        textBar.events.onInputUp.add(this.tripWireMoreText, this);
    },

    tripWireMoreText() {
        //only increment the click count five times
        if (clickCount < 5) {
            clickCount++;
            if (clickCount === 1) {
                gearPuzzleScene.changeText("...")
            } else if (clickCount === 2) {
                gearPuzzleScene.changeText("Something creaks above you.")
            } else if (clickCount === 3) {
                gearPuzzleScene.changeText("You look up to see a panel of jagged spikes swinging towards your face")
            } else if (clickCount === 4) {
                gearPuzzleScene.changeText("So that's what it does.")
            } else {
                //restart the scene: not implemented for now
            }
        }
    },

    gear1Text() {
        clickCount = 0;
        this.removeButtons();
        gearPuzzleScene.addEllipses();
        gear1Done = false;
        gearPuzzleScene.changeText("The wall is full of inanimate mechanisms.");
        textBar.events.onInputUp.add(this.gear1MoreText, this);
    },

    gear1MoreText() {
        //make sure gear1MoreText isn't called accidentally
        if (gear1Done !== true) {
            //only increment the click count four times
            if (clickCount < 4) {
                clickCount++;
                if (clickCount === 1) {
                    gearPuzzleScene.changeText("Many of them are interconnected in a giant pulley system.")
                } else if (clickCount === 2) {
                    gearPuzzleScene.changeText("It seems to be built to lift the bars on the door.")
                } else if (clickCount === 3) {
                    gearPuzzleScene.changeText("The gear system looks like it extends into the next room.")
                } else {
                    //change the text in the text bar, then create the choice buttons
                    gearPuzzleScene.changeText("What do you want to do?");
                    gearPuzzleScene.removeEllipses();
                    gear1Done = true;
                    this.gear1Choice();
                    if (window2Done != null) {
                        this.pullLever1Choice();
                    } else {
                        this.window2Choice();
                    }
                    if (doorDone != null) {
                        this.followWireChoice();
                    } else {
                        this.doorChoice();
                    }
                }
            }
        }
    },

    gear2Text() {
        clickCount = 0;
        this.removeButtons();
        gearPuzzleScene.addEllipses();
        gear2Done = false;
        gearPuzzleScene.changeText("The wall is full of inanimate mechanisms.");
        textBar.events.onInputUp.add(this.gear2MoreText, this);
    },

    gear2MoreText() {
        //make sure gear2MoreText isn't called accidentally
        if (gear2Done !== true) {
            //only increment the click count five times
            if (clickCount < 5) {
                clickCount++;
                if (clickCount === 1) {
                    gearPuzzleScene.changeText("Half of them are interconnected in a giant pulley system hooked to the bars.")
                } else if (clickCount === 2) {
                    gearPuzzleScene.changeText("The other half are connected to the press machine you saw.")
                } else if (clickCount === 3) {
                    gearPuzzleScene.changeText("Following them to the left, you notice a set of gears in the corner of the room.")
                } else if (clickCount === 4) {
                    gearPuzzleScene.changeText("A stone is jammed between a couple of the teeth.")
                } else {
                    //change the text in the text bar, then create the choice buttons
                    gearPuzzleScene.changeText("What do you want to do?");
                    gearPuzzleScene.removeEllipses();
                    gear2Done = true;
                    this.removeRockChoice();
                    this.boardKnockChoice();
                    if (doorDone != null) {
                        this.followWireChoice();
                    } else {
                        this.doorChoice();
                    }
                }
            }
        }
    },

    removeRockText() {
        clickCount = 0;
        this.removeButtons();
        gearPuzzleScene.addEllipses();
        removeRockDone = false;
        gearPuzzleScene.changeText("With some elbow grease, you dislodge the rock.");
        textBar.events.onInputUp.add(this.removeRockMoreText, this);
    },

    removeRockMoreText() {
        //make sure removeRockMoreText isn't called accidentally
        if (removeRockDone !== true) {
            //only increment the click count twice
            if (clickCount < 2) {
                clickCount++;
                if (clickCount === 1) {
                    gearPuzzleScene.changeText("The gears are now free of debris.");
                } else {
                    //change the text in the text bar, then create the choice buttons
                    gearPuzzleScene.changeText("What do you want to do?");
                    gearPuzzleScene.removeEllipses();
                    removeRockDone = true;
                    this.checkGearsChoice();
                    if (pullLever1Done != null) {
                        this.pullLever2Choice();
                    } else {
                        this.boardKnockChoice();
                    }
                    if (doorDone != null) {
                        this.followWireChoice();
                    } else {
                        this.doorChoice();
                    }
                }
            }
        }
    },

    checkGearsText() {
        clickCount = 0;
        this.removeButtons();
        gearPuzzleScene.addEllipses();
        checkGearsDone = false;
        gearPuzzleScene.changeText("None of the gears are moving.");
        textBar.events.onInputUp.add(this.checkGearsMoreText, this);
    },

    checkGearsMoreText() {
        //make sure checkGearsMoreText isn't called accidentally
        if (checkGearsDone !== true) {
            //only increment the click count twice
            if (clickCount < 2) {
                clickCount++;
                if (clickCount === 1) {
                    gearPuzzleScene.changeText("It seems like the system still needs to be turned on.")
                } else {
                    //change the text in the text bar, then create the choice buttons
                    gearPuzzleScene.changeText("What do you want to do?");
                    gearPuzzleScene.removeEllipses();
                    checkGearsDone = true;
                    this.checkGearsChoice();
                    if (pullLever1Done != null) {
                        this.pullLever2Choice();
                    } else {
                        if (window3Done != null) {
                            this.pullLever2Choice();
                        } else {
                            this.window3Choice();
                        }
                    }
                    if (doorDone != null) {
                        this.followWireChoice();
                    } else {
                        this.doorChoice();
                    }
                }
            }
        }
    },

    gear3Text() {
        clickCount = 0;
        this.removeButtons();
        gearPuzzleScene.addEllipses();
        gear3Done = false;
        gearPuzzleScene.changeText("You can't see any problems with the gears in the wall.");
        textBar.events.onInputUp.add(this.gear3MoreText, this);
    },

    gear3MoreText() {
        //make sure gear3MoreText isn't called accidentally
        if (gear3Done !== true) {
            //only increment the click count six times
            if (clickCount < 6) {
                clickCount++;
                if (clickCount === 1) {
                    gearPuzzleScene.changeText("You realize that the apparatus in the wall is made up of two parts.")
                } else if (clickCount === 2) {
                    gearPuzzleScene.changeText("One is hooked up to the pulley, and the other to the press machine.")
                } else if (clickCount === 3) {
                    gearPuzzleScene.changeText("Following the orientation of the gears, you find something in the corner.")
                } else if (clickCount === 4) {
                    gearPuzzleScene.changeText("It looks like a component to the press machine mechanism.")
                } else if (clickCount === 5) {
                    gearPuzzleScene.changeText("A stone is stuck in the gears.")
                } else {
                    //change the text in the text bar, then create the choice buttons
                    gearPuzzleScene.changeText("What do you want to do?");
                    gearPuzzleScene.removeEllipses();
                    gear3Done = true;
                    this.removeRockChoice();
                    this.pullLever1Choice();
                    if (doorDone != null) {
                        this.followWireChoice();
                    } else {
                        this.doorChoice();
                    }
                }
            }
        }
    },

    window3Text() {
        clickCount = 0;
        this.removeButtons();
        gearPuzzleScene.addEllipses();
        window3Done = false;
        gearPuzzleScene.changeText("You don't see any way of turning the machine on from in this room.");
        textBar.events.onInputUp.add(this.window3MoreText, this);
    },

    window3MoreText() {
        //make sure window1MoreText isn't called accidentally
        if (window3Done !== true) {
            //only increment the click count four times
            if (clickCount < 4) {
                clickCount++;
                if (clickCount === 1) {
                    gearPuzzleScene.changeText("You stick your hand through the window.")
                } else if (clickCount === 2) {
                    gearPuzzleScene.changeText("Keeping the position of the apparatus in mind, you feel around to the left.")
                } else if (clickCount === 3) {
                    gearPuzzleScene.changeText("Your hand immediately finds a large lever.");
                } else {
                    //change the text in the text bar, then create the choice buttons
                    gearPuzzleScene.changeText("What do you want to do?");
                    gearPuzzleScene.removeEllipses();
                    window3Done = true;
                    this.checkGearsChoice();
                    this.pullLever2Choice();
                    if (doorDone != null) {
                        this.followWireChoice();
                    } else {
                        this.doorChoice();
                    }
                }
            }
        }
    },


    window1Text() {
        clickCount = 0;
        this.removeButtons();
        gearPuzzleScene.addEllipses();
        window1Done = false;
        gearPuzzleScene.changeText("You can see some sort of work table in the next room.");
        textBar.events.onInputUp.add(this.window1MoreText, this);
    },

    window1MoreText() {
        //make sure window1MoreText isn't called accidentally
        if (window1Done !== true) {
            //only increment the click count six times
            if (clickCount < 6) {
                clickCount++;
                if (clickCount === 1) {
                    gearPuzzleScene.changeText("To the far left are a bunch of running mechanical parts.")
                } else if (clickCount === 2) {
                    gearPuzzleScene.changeText("They're connected to a heavy-looking press machine.")
                } else if (clickCount === 3) {
                    gearPuzzleScene.changeText("Below the window is some sort of shelf.")
                } else if (clickCount === 4) {
                    gearPuzzleScene.changeText("Above the window, you can feel something like a tool board on the wall.")
                } else if (clickCount === 5) {
                    gearPuzzleScene.changeText("You can't reach anything on it right now.")
                } else {
                    //change the text in the text bar, then create the choice buttons
                    gearPuzzleScene.changeText("What do you want to do?");
                    gearPuzzleScene.removeEllipses();
                    window1Done = true;
                    this.gear2Choice();
                    this.boardKnockChoice();
                    if (doorDone != null) {
                        this.followWireChoice();
                    } else {
                        this.doorChoice();
                    }
                }
            }
        }
    },

    boardKnockText() {
        clickCount = 0;
        this.removeButtons();
        gearPuzzleScene.addEllipses();
        boardKnockDone = false;
        gearPuzzleScene.changeText("You knock hard on the board above the window.");
        textBar.events.onInputUp.add(this.boardKnockMoreText, this);
    },

    boardKnockMoreText() {
        //make sure boardKnockMoreText isn't called accidentally
        if (boardKnockDone !== true) {
            //only increment the click count twice
            if (clickCount < 2) {
                clickCount++;
                if (clickCount === 1) {
                    gearPuzzleScene.changeText("You can hear something rattling above you, but nothing falls down.")
                } else {
                    //change the text in the text bar, then create the choice buttons
                    gearPuzzleScene.changeText("What do you want to do?");
                    gearPuzzleScene.removeEllipses();
                    boardKnockDone = true;
                    if (gear2Done != null) {
                        if (removeRockDone != null) {
                            this.checkGearsChoice();
                        } else {
                            this.removeRockChoice();
                        }
                    } else {
                        this.gear2Choice();
                    }
                    this.boardKnockChoice();
                    if (doorDone != null) {
                        this.followWireChoice();
                    } else {
                        this.doorChoice();
                    }
                }
            }
        }
    },

    window2Text() {
        clickCount = 0;
        this.removeButtons();
        gearPuzzleScene.addEllipses();
        window2Done = false;
        gearPuzzleScene.changeText("You can see some sort of work table in the next room.");
        textBar.events.onInputUp.add(this.window2MoreText, this);
    },

    window2MoreText() {
        //make sure window1MoreText isn't called accidentally
        if (window2Done !== true) {
            //only increment the click count eight times
            if (clickCount < 8) {
                clickCount++;
                if (clickCount === 1) {
                    gearPuzzleScene.changeText("Next to it is a heavy-looking press machine.")
                } else if (clickCount === 2) {
                    gearPuzzleScene.changeText("Below the window is some sort of shelf.")
                } else if (clickCount === 3) {
                    gearPuzzleScene.changeText("Above the window, you can feel something like a tool board on the wall.")
                } else if (clickCount === 4) {
                    gearPuzzleScene.changeText("You can't reach anything on it right now.")
                } else if (clickCount === 5) {
                    gearPuzzleScene.changeText("You remember the pulley system you saw built into the wall.")
                } else if (clickCount === 6) {
                    gearPuzzleScene.changeText("You reach around to the left in search of anything attached to it.")
                } else if (clickCount === 7) {
                    gearPuzzleScene.changeText("Your hand finds a large lever.")
                } else {
                    //change the text in the text bar, then create the choice buttons
                    gearPuzzleScene.changeText("What do you want to do?");
                    gearPuzzleScene.removeEllipses();
                    window2Done = true;
                    this.gear1Choice();
                    this.pullLever1Choice();
                    if (doorDone != null) {
                        this.followWireChoice();
                    } else {
                        this.doorChoice();
                    }
                }
            }
        }
    },

    pullLever1Text() {
        clickCount = 0;
        this.removeButtons();
        gearPuzzleScene.addEllipses();
        pullLever1Done = false;
        gearPuzzleScene.changeText("You yank at the lever, but it doesn't budge.");
        textBar.events.onInputUp.add(this.pullLever1MoreText, this);
    },

    pullLever1MoreText() {
        //make sure boardKnockMoreText isn't called accidentally
        if (pullLever1Done !== true) {
            //only increment the click count twice
            if (clickCount < 2) {
                clickCount++;
                if (clickCount === 1) {
                    gearPuzzleScene.changeText("It feels like something is jammed.")
                } else {
                    //change the text in the text bar, then create the choice buttons
                    gearPuzzleScene.changeText("What do you want to do?");
                    gearPuzzleScene.removeEllipses();
                    pullLever1Done = true;
                    if (gear3Done != null) {
                        this.removeRockChoice();
                    } else {
                        this.gear3Choice();
                    }
                    this.pullLever1Choice();
                    if (doorDone != null) {
                        this.followWireChoice();
                    } else {
                        this.doorChoice();
                    }
                }
            }
        }
    },

    pullLever2Text() {
        clickCount = 0;
        this.removeButtons();
        gearPuzzleScene.addEllipses();
        pullLever2Done = false;
        gearPuzzleScene.changeText("You yank at the lever.");
        textBar.events.onInputUp.add(this.pullLever2MoreText, this);
    },

    pullLever2MoreText() {
        //make sure pullLever2MoreText isn't called accidentally
        if (pullLever2Done !== true) {
            //only increment the click count six times
            if (clickCount < 6) {
                clickCount++;
                if (clickCount === 1) {
                    gearPuzzleScene.changeText("With a loud thunk, it releases.")
                } else if (clickCount === 2) {
                    gearPuzzleScene.changeText("The cave fills with the sound of whirring machinery.")
                } else if (clickCount === 3) {
                    gearPuzzleScene.changeText("In the next room over, the press machine begins pounding up and down.")
                } else if (clickCount === 4) {
                    gearPuzzleScene.changeText("The floor shakes with its deafening beat.")
                } else if (clickCount === 5) {
                    gearPuzzleScene.changeText("You hear a loud clanging noise, like metal hitting wood.")
                } else {
                    //change the text in the text bar, then create the choice buttons
                    gearPuzzleScene.changeText("What do you want to do?");
                    gearPuzzleScene.removeEllipses();
                    pullLever2Done = true;
                }
            }
        }
    },

    /**All of the functions that create interactive buttons:
     * doorChoice adds a button to check the bars
     * followWireChoice adds a button to see where the tripwire leads
     * testWireChoice adds a button to try out the wire by the wall
     * gear1Choice adds a button to investigate the gears first
     * gear2Choice adds a button to investigate the gears after looking through the window
     * window1Choice adds a button to look through the window first
     * boardKnockChoice adds a button to knock on the tool board*/

    doorChoice() {
        //presents the option to look at the barred doorway
        doorButton = gearPuzzleScene.addChoice(450, 500, 300, 100, "Check the bars");
        doorButton.getButton().events.onInputUp.add(this.doorText, this);
    },

    followWireChoice() {
        //presents the option to follow the tripwire
        followWireButton = gearPuzzleScene.addChoice(450, 500, 300, 100, "Follow the wire");
        followWireButton.getButton().events.onInputUp.add(this.followWireText, this);
    },

    testWireChoice() {
        //presents the option to try and trip the wire
        testWireButton = gearPuzzleScene.addChoice(450, 500, 300, 100, "Test the wire");
        testWireButton.getButton().events.onInputUp.add(this.testWireText, this);
    },

    tripWireChoice() {
        //presents the option to activate a deathtrap
        tripWireButton = gearPuzzleScene.addChoice(450, 500, 300, 100, "Trip the wire");
        tripWireButton.getButton().events.onInputUp.add(this.tripWireText, this);
    },

    gear1Choice() {
        //presents the first choice available for investigating the gears
        gear1Button = gearPuzzleScene.addChoice(100, 500, 325, 100, "Investigate the gears");
        gear1Button.getButton().events.onInputUp.add(this.gear1Text, this);
    },

    gear2Choice() {
        //presents the second choice for investigating the gears (if you look through the window first)
        gear2Button = gearPuzzleScene.addChoice(100, 500, 325, 100, "Investigate the gears");
        gear2Button.getButton().events.onInputUp.add(this.gear2Text, this);
    },

    removeRockChoice() {
        //presents the option to dislodge the stone stuck in the gears
        removeRockButton = gearPuzzleScene.addChoice(100, 500, 325, 100, "Remove the rock");
        removeRockButton.getButton().events.onInputUp.add(this.removeRockText, this);
    },

    checkGearsChoice() {
        //presents the option to check the running gears
        checkGearsButton = gearPuzzleScene.addChoice(100, 500, 325, 100, "Check the gears");
        checkGearsButton.getButton().events.onInputUp.add(this.checkGearsText, this);
    },

    gear3Choice() {
        //presents the option to check the gears after finding the lever (and not the rock)
        gear3Button = gearPuzzleScene.addChoice(100, 500, 325, 100, "Check for jams");
        gear3Button.getButton().events.onInputUp.add(this.gear3Text, this);
    },

    window3Choice() {
        //presents the opportunity to look for a way to turn on the machine after unclogging the gears
        window3Button = gearPuzzleScene.addChoice(775, 500, 400, 100, "Search for an on switch");
        window3Button.getButton().events.onInputUp.add(this.window3Text, this);
    },

    window1Choice() {
        //presents the first choice available for looking through the window
        window1Button = gearPuzzleScene.addChoice(775, 500, 325, 100, "Look in the window");
        window1Button.getButton().events.onInputUp.add(this.window1Text, this);
    },

    boardKnockChoice() {
        //presents the option to knock at the tool board through the window
        boardButton = gearPuzzleScene.addChoice(775, 500, 325, 100, "Knock on the board");
        boardButton.getButton().events.onInputUp.add(this.boardKnockText, this);
    },

    window2Choice() {
        //presents the second choice for looking through the window (if the gears were investigated first)
        window2Button = gearPuzzleScene.addChoice(775, 500, 325, 100, "Look in the window");
        window2Button.getButton().events.onInputUp.add(this.window2Text, this);
    },

    pullLever1Choice() {
        //presents the option to (unsuccessfully) pull the lever with the stone not yet discovered
        pullLever1Button = gearPuzzleScene.addChoice(775, 500, 325, 100, "Pull the lever");
        pullLever1Button.getButton().events.onInputUp.add(this.pullLever1Text, this);
    },

    pullLever2Choice() {
        //presents the option to pull the lever after dislodging the stone
        pullLever2Button = gearPuzzleScene.addChoice(775, 500, 325, 100, "Pull the lever");
        pullLever2Button.getButton().events.onInputUp.add(this.pullLever2Text, this);
    },

    nextSceneButton: function() {
        //make something clickable. If the thing is clicked, call the changeState function
        thing = gearPuzzleScene.addButton(450, 210, 250, 420, 0.2);
        thing.events.onInputUp.add(this.changeState, this);
    },

    /**A (very repetitive) function that removes the choice buttons from the window.
     * Currently, arrays in Javascript are being investigated.*/

    removeButtons() {
        if (doorButton != null) {
            if (doorButton.getButton() != null) {
                doorButton.kill();
            }
        }
        if (followWireButton != null) {
            if (followWireButton.getButton() != null) {
                followWireButton.kill();
            }
        }
        if (testWireButton != null) {
            if (testWireButton.getButton() != null) {
                testWireButton.kill();
            }
        }
        if (tripWireButton != null) {
            if (tripWireButton.getButton() != null) {
                tripWireButton.kill();
            }
        }
        if (gear1Button != null) {
            if (gear1Button.getButton() != null) {
                gear1Button.kill();
            }
        }
        if (gear2Button != null) {
            if (gear2Button.getButton() != null) {
                gear2Button.kill();
            }
        }
        if (removeRockButton != null) {
            if (removeRockButton.getButton() != null) {
                removeRockButton.kill();
            }
        }
        if (checkGearsButton != null) {
            if (checkGearsButton.getButton() != null) {
                checkGearsButton.kill();
            }
        }
        if (gear3Button != null) {
            if (gear3Button.getButton() != null) {
                gear3Button.kill();
            }
        }
        if (window3Button != null) {
            if (window3Button.getButton() != null) {
                window3Button.kill();
            }
        }
        if (window1Button != null) {
            if (window1Button.getButton() != null) {
                window1Button.kill();
            }
        }
        if (boardButton != null) {
            if (boardButton.getButton() != null) {
                boardButton.kill();
            }
        }
        if (window2Button != null) {
            if (window2Button.getButton() != null) {
                window2Button.kill();
            }
        }
        if (pullLever1Button != null) {
            if (pullLever1Button.getButton() != null) {
                pullLever1Button.kill();
            }
        }
        if (pullLever2Button != null) {
            if (pullLever2Button.getButton() != null) {
                pullLever2Button.kill();
            }
        }
    },

    /**The function that switches to the next state*/

    changeState: function() {
        //change states to the next state
        game.state.start('doorState', doorState);
    }
};