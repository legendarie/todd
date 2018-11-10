//establish the global variables
var clickCount;
var textBar;
var wiseGuy;
var slingshot;
var back;
var wormHole;
var cliffRoad;
let roadForkScene = null;

//initialize the state
var roadForkState = {

    /**The initial functions to set up the scene for player interaction*/

    preload: function() {
        //declare convo1Scene to be an instance of a Scene, and load in the background image to the state
        convo1Scene = new Scene;
        convo1Scene.setBackground('roadForkbg', 'assets/roadForkbg.png');

        //load in the image of Wise Guy (santa placeholder for now)
        game.load.image('wiseGuy', 'assets/santa.png');

        //reset the global clickCount variable
        clickCount = 0;
    },

    create: function() {
        //check to make sure convo1Scene is not null
        if (convo1Scene != null) {

            //load the background and scale it
            convo1Scene.loadScene('roadForkbg', 0.9);

            //add Wise Guy (santa placeholder)
            wiseGuy = game.add.image(200, 200, 'wiseGuy');
            wiseGuy.scale.setTo(1.0);

            //add the text bar (with all universal settings), with the first line of text
            convo1Scene.addTextBar("'Sup.");

            //add a set of ellipses to the text box to indicate
            //further messages
            convo1Scene.addEllipses();

            //when the text bar is clicked, go to the changeText function
            textBar.events.onInputUp.add(this.changeText, this);
        }
    },

    /**All of the functions that change the text in the text box:
     * changeText runs through Wise Guy's first lines of speech*/

    changeText: function() {
        //only increment the click count twice
        if (clickCount < 2) {
            clickCount++;
            if (clickCount === 1) {
                convo1Scene.changeText("Whassup?")
            } else {
                //change the text in the text bar, then further the plot somehow
                convo1Scene.changeText("What's hangin'?");
                convo1Scene.removeEllipses();
            }
        }
    },
};