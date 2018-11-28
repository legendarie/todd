//establish the global variables
var clickCount;
var textBar;
var wiseGuy;
var slingshot;
var back;
var wormHole;
var cliffRoad;
var alreadyBeen = false;     //boolean to keep track of whether the player has been in this state before
let convo1Scene = null;

//initialize the state
var roadForkState = {

    /** The initial function to set up the scene for player interaction */

    preload: function() {
        //declare convo1Scene to be an instance of a Scene, and load in the background image to the state
        convo1Scene = new Scene;
        convo1Scene.setBackground('roadForkbg', 'assets/roadForkbg.png');

        //load in the image of Wise Guy (santa placeholder for now)
        convo1Scene.setSprite('wiseGuy', 'assets/santa.png');
        //game.load.image('wiseGuy', 'assets/santa.png');

        convo1Scene.setSprite('slingshot', 'assets/slingshot.png');

        //reset the global clickCount variable
        clickCount = 0;
    },

    /** This function checks to see if the player has already been to this state, and creates the scene accordingly.
     * If the player has not been here, it adds the background and the Wise Guy sprite, who begins speaking to the
     * player, and begins their long conversation. If the player has been here, it only adds the background, and
     * omits the Wise Guy sprite. It then moves on to the pathChoice function. */

    create: function() {
        //check to make sure convo1Scene is not null
        if (convo1Scene != null) {

            //load the background and scale it
            convo1Scene.loadScene('roadForkbg', 0.55);

            //if the player has not been here before,
            if (alreadyBeen === false) {

                //indicate that the player has now been to this scene
                alreadyBeen = true;

                //add Wise Guy (santa placeholder)
                wiseGuy = convo1Scene.addStaticSprite(350, 200, 'wiseGuy', 1);

                //add the text bar (with all universal settings), with the first line of text
                convo1Scene.addTextBar("\"Sup.\"");

                //add a set of ellipses to the text box to indicate
                //further messages
                convo1Scene.addEllipses();

                //when the text bar is clicked, go to the changeText function
                textBar.events.onInputUp.add(this.changeText, this);

            } else if (alreadyBeen === true) {
                //if the player has been here before, then they skip the conversation with Wise Guy,
                //and move straight to the path choice.
                this.pathChoice();
            }
        }
    },

    /** All of the functions that change the text in the text box:
     * changeText runs through Wise Guy's lines of speech */

    changeText: function() {
        //clickCount keeps track of how many times the textBar is clicked, and changes the text accordingly.
        if (clickCount < 13) {
            clickCount++;
            if (clickCount === 1) {
                convo1Scene.changeText("\"You're a T.O.D.D. aren't you?\"")
            } else if (clickCount === 2) {
                convo1Scene.changeText("\"Yeah, you have to be. I'd recognize that stubborn expression anywhere.\"");
            } else if (clickCount === 3) {
                convo1Scene.changeText("\"You've come to defeat it, huh? That thing that's been " +
                    "terrorizing the place?\"");
            } else if (clickCount === 4) {
                convo1Scene.changeText("\"Man, I'm so glad you're finally here.\"");
            } else if (clickCount === 5) {
                convo1Scene.changeText("\"That thing invaded town a while ago and set up camp in a nearby cave.\"");
            } else if (clickCount === 6) {
                convo1Scene.changeText("\"You shoulda seen the thing. Smashing stuff with this giant hammer....\"");
            } else if (clickCount === 7) {
                convo1Scene.changeText("\"Ehem, anyways. That probably wasn't comforting to hear.\"");
            } else if (clickCount === 8) {
                convo1Scene.changeText("\"Oh, I should probably introduce myself. You can call me 'Wise Guy'.\"");
            } else if (clickCount === 9) {
                convo1Scene.changeText("\"Don't look at me like that. My parents like descriptive names.\"");
            } else if (clickCount === 10) {
                convo1Scene.changeText("\"Regardless, I'm here to help. Here. I picked up something for you.\"");
            } else if (clickCount === 11) {
                convo1Scene.changeText("He pulls a slingshot out from... well, you'd prefer not to know where.");
                //add the slingshot to the scene
                slingshot = convo1Scene.addSprite(300, 300, 'slingshot', 0.07);
            } else if (clickCount === 12) {
                convo1Scene.changeText("It actually looks decent. Maybe this guy isn't just a random weirdo after all.");
            } else if (clickCount === 13) {
                convo1Scene.changeText("\"Go find that monster and take 'em down for me, will ya?\"");
                //remove ellipses to indicate there is no more text
                convo1Scene.removeEllipses();
                //when the slingshot is clicked, move to takeSlingshot function
                slingshot.events.onInputUp.add(this.takeSlingshot, this);
            }
        }
    },

    /** In this function, the player takes the slingshot from Wise Guy, and their conversation ends. */

    takeSlingshot: function() {

        //remove the slingshot from the scene
        slingshot.kill();

        //add Wise Guy's last piece of dialogue
        convo1Scene.changeText("\"Thanks a million, buddy. Good luck out there.\"");

        //when the textBar is clicked, change to pathChoice function
        textBar.events.onInputUp.add(this.pathChoice, this);

    },

    /** The player is now given a choice of the path they would like to take: to the left to the worm cave,
     * or to the right to the road that bends around the cliff */

    pathChoice: function() {

        //remove Wise Guy from the scene (if he was there)
        wiseGuy.kill();

        //remove the textBar and its text from the scene (if they are there)
        textBar.kill();
        text.kill();

        //add buttons over the worm cave and the road by the cliff
        wormHole = convo1Scene.addButton(470, 210, 170, 120, 0);
        cliffRoad = convo1Scene.addButton(850, 250, 200, 200, 0);

        //if wormHole is clicked, change game state to wormState
        wormHole.events.onInputUp.add(this.goToWorm, this);

        //if cliffRoad is clicked, change game state to outsideCaveState
        cliffRoad.events.onInputUp.add(this.goToPath, this);
    },

    /** If the player selects the wormHole button, the game state changes to the wormState */

    goToWorm: function() {
        game.state.start('wormState');
    },

    /** If the player selects the cliffRoad button, the game state changes to the outsideCaveState */

    goToPath: function() {
        game.state.start('outsideCaveState');
    }
};