//establish the global variables
var clickCount;
var textBar;
var wiseGuy;
var slingshot;
var back;
var wormHole;
var cliffRoad;
let convo1Scene = null;

//initialize the state
var roadForkState = {

    /**The initial functions to set up the scene for player interaction*/

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

    create: function() {
        //check to make sure convo1Scene is not null
        if (convo1Scene != null) {

            //load the background and scale it
            convo1Scene.loadScene('roadForkbg', 0.55);

            //add Wise Guy (santa placeholder)
            wiseGuy = convo1Scene.addStaticSprite(350, 200, 'wiseGuy', 1);
            //wiseGuy = game.add.image(350, 200, 'wiseGuy');
            //wiseGuy.scale.setTo(1.0);

            //add the text bar (with all universal settings), with the first line of text
            convo1Scene.addTextBar("\"Sup.\"");

            //add a set of ellipses to the text box to indicate
            //further messages
            convo1Scene.addEllipses();

            //when the text bar is clicked, go to the changeText function
            textBar.events.onInputUp.add(this.changeText, this);
        }
    },

    /**All of the functions that change the text in the text box:
     * changeText runs through Wise Guy's lines of speech*/

    changeText: function() {
        //only increment the click count twice
        if (clickCount < 13) {
            clickCount++;
            if (clickCount === 1) {
                convo1Scene.changeText("\"You're a T.O.D.D. aren't you?\"")
            } else if (clickCount === 2) {
                //change the text in the text bar, then further the plot somehow
                convo1Scene.changeText("\"Yeah, you have to be. I'd recognize that stubborn expression anywhere.\"");
                //convo1Scene.removeEllipses();
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
                slingshot = convo1Scene.addSprite(300, 300, 'slingshot', 0.07);
            } else if (clickCount === 12) {
                convo1Scene.changeText("It actually looks decent. Maybe this guy isn't just a random weirdo after all.");
            } else if (clickCount === 13) {
                convo1Scene.changeText("\"Go find that monster and take 'em down for me, will ya?\"");
                convo1Scene.removeEllipses();
                slingshot.events.onInputUp.add(this.takeSlingshot(), this);
            }
        }
    },

    takeSlingshot: function() {
        slingshot.kill();

        convo1Scene.changeText("\"Thanks a million, buddy. Good luck out there.\"");

        wormHole = convo1Scene.addButton(300, 200, 100, 100, 0.2);
        cliffRoad = convo1Scene.addButton(700, 300, 300, 200, 0.2);
    },

    goToWorm: function() {

    },

    goToPath: function() {

    }
};