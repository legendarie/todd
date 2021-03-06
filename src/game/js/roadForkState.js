//establish the global variables
var clickCount;
var textBar;
var wiseGuy;
var slingshot;
var back;
var wormHole;
var cliffRoad;

var alreadyBeenRF = false;     //boolean to keep track of whether the player has been in this state before

let convo1Scene = null;

//initialize the state
var roadForkState = {

    /** The initial function to set up the scene for player interaction */

    preload: function() {
        //declare convo1Scene to be an instance of Scene
        convo1Scene = new Scene;

        //load in the background image to the state
        convo1Scene.setBackground('roadForkbg', 'assets/roadForkbg.png');

        //load in the sprites of Wise Guy and the slingshot
        convo1Scene.setSprite('wiseGuy', 'assets/wiseGuy.png');
        convo1Scene.setSprite('slingshot', 'assets/slingshot.png');

        //reset the global clickCount variable
        clickCount = 0;
    },

    /**Add the initial visual elements to the canvas, and add the first piece of text to the scene*/

    create: function() {
        //check to make sure that the scene has been created
        if (convo1Scene != null) {
            //load the background and scale it
            convo1Scene.loadScene('roadForkbg', 0.55);

            //if the player has not been here before,
            if (alreadyBeenRF === false) {

                //indicate that the player has now been to this scene
                alreadyBeenRF = true;

                //add Wise Guy sprite to the canvas
                wiseGuy = convo1Scene.addStaticSprite(350, 220, 'wiseGuy', 0.3, 0, 0);

                //add the text bar (with all universal settings), with the first line of text
                convo1Scene.addTextBar("\"Sup.\"");

                //add a set of ellipses to the text box to indicate
                //further messages
                convo1Scene.addEllipses();

                //when the text bar is clicked, go to the changeText function
                textBar.events.onInputUp.add(this.changeText, this);
            } else if (alreadyBeenRF === true) {
                //if the player has been here before, then they skip the conversation with Wise Guy,
                //and move straight to the choice between the cave to the left or the path to the right
                this.pathChoice();
            }
        }
    },

    /** All of the functions that change the text in the text box:
     * changeText runs through Wise Guy's conversation*/

    changeText: function() {
        //only allow the clickCount to increment to 13
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
                //when the slingshot is clicked, remove the sprite and finish the conversation
                slingshot.events.onInputUp.add(this.takeSlingshot, this);
            }
        }
    },

    /** All of the functions that create interactive buttons:
     * takeSlingshot removes the slingshot sprite and finishes the conversation with Wise Guy
     * pathChoice creates buttons over the two paths available to follow*/

    takeSlingshot: function() {
        //remove the slingshot from the scene
        slingshot.kill();

        //add Wise Guy's last piece of dialogue
        convo1Scene.changeText("\"Thanks a million, buddy. Good luck out there.\"");
        convo1Scene.addEllipses();

        //when the textBar is clicked, spawn buttons over the two paths
        textBar.events.onInputUp.add(this.pathChoice, this);

    },

    pathChoice: function() {

        convo1Scene.removeEllipses();

        //remove Wise Guy from the scene (if he was there) -- N/A if alreadyBeenRF is true
        wiseGuy.kill();

        //remove the textBar and its text from the scene (if they are there) -- N/A if alreadyBeenRF is true
        textBar.kill();
        text.kill();

        //add buttons over the worm cave and the road by the cliff
        wormHole = convo1Scene.addButton(470, 210, 170, 120, 0);
        cliffRoad = convo1Scene.addButton(850, 250, 200, 200, 0);

        //if wormHole is clicked, change game state to wormState
        wormHole.events.onInputUp.add(this.changeStateWorm, this);

        //if cliffRoad is clicked, change game state to outsideCaveState
        cliffRoad.events.onInputUp.add(this.changeStatePath, this);
    },

    /**The functions that switch to the next state, of which there are two*/

    changeStateWorm: function() {
        //change states to wormState
        game.state.start('wormState');
    },

    changeStatePath: function() {
        //change states to caveEntranceState
        var nextState = 'caveEntranceState';
        game.state.start(nextState);
    }
};
