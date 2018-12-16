var clickCount;
var firstBg;
var textBar;
var wiseGuyButton;
var wiseGuy;
var leaveCaveButton;
let transitionScene = null;

var transitionCaveState = {

    /**The initial functions to set up the scene for player interaction*/

    preload: function() {
        //declare doorScene to be an instance of a Scene
        transitionScene = new Scene;

        //load the background images into the state
        transitionScene.setBackground('transitionCavebgWG', 'assets/transitionCavebgWG.png');
        transitionScene.setBackground('transitionCavebg', 'assets/transitionCavebg.png');

        //load the sprite of Wise Guy
        transitionScene.setSprite('wiseGuy', 'assets/wiseGuy.png');

        //reset the global clickCount to 0;
        clickCount = 0;

    },

    /**Add the visual elements to the canvas, and add the first line of text to the scene*/

    create: function() {
        //check to make sure that the scene has been created
        if (transitionScene !== null) {
            //load the background and scale it
            firstBg = transitionScene.loadScene('transitionCavebgWG', 0.48);

            //add a button over the image of Wise Guy that will begin a conversation when clicked
            wiseGuyButton = transitionScene.addButton(970, 370, 80, 50, 0);
            wiseGuyButton.events.onInputUp.add(this.wiseGuyAppear, this);
        }
    },

    /** All of the functions that change the text in the text box:
     * wiseGuyAppear spawns Wise Guy and begins his conversation with the player
     * wiseGuyConvo continues the conversation with Wise Guy*/

    wiseGuyAppear: function() {
        //set a new background with sprites
        wiseGuyButton.kill();
        firstBg.kill();
        transitionScene.loadScene('transitionCavebg', 0.48);
        wiseGuy = transitionScene.addStaticSprite(670, 320, 'wiseGuy', 0.3, 0, 0);

        //begin a conversation
        transitionScene.addTextBar('\"Yo. Wassup. Nice to see you again, bud.\"');
        transitionScene.addEllipses();

        textBar.events.onInputUp.add(this.wiseGuyConvo, this);
    },

    wiseGuyConvo: function() {
        //only allow the clickCount to increment to 14
        if (clickCount < 14) {
            clickCount++;
            if (clickCount === 1) {
                transitionScene.changeText('\"So, as you probably figured, the monster is in this cave.\"');
            } else if (clickCount === 2) {
                transitionScene.changeText('\"I\'m here to offer you a little wisdom before you take it on.\"');
            } else if (clickCount === 3) {
                transitionScene.changeText('\"I know what you\'re thinking. Why aren\'t I taking it on ' +
                    'myself?\"');
            } else if (clickCount === 4) {
                transitionScene.changeText('\"Well, as you can see, I don\'t have the ideal physique ' +
                    'to fight a monster.\"');
            } else if (clickCount === 5) {
                transitionScene.changeText('\"Don\'t give me that look. I\'m doing what I can to be helpful.\"');
            } else if (clickCount === 6) {
                transitionScene.changeText('\"I gave you a slingshot. Don\'t forget about that.\"');
            } else if (clickCount === 7) {
                transitionScene.changeText('\"Ehem. Anyways. You have what it takes to take this dude down.\"');
            } else if (clickCount === 8) {
                transitionScene.changeText('\"One thing though. Be careful of the snow. It\'s, like, ' +
                    'toxic or something.\"');
            } else if (clickCount === 9) {
                transitionScene.changeText('\"How do I know this? C\'mon. My name is Wise Guy.\"');
            } else if (clickCount === 10) {
                transitionScene.changeText('\"Regardless, you got this. Thanks for all your help. Peace out.\"');
            } else if (clickCount === 11) {
                wiseGuy.kill();
                transitionScene.changeText('...Now that you\'re alone in this cave, it feels a lot spookier.');
            } else if (clickCount === 12) {
                transitionScene.changeText('Also cold. It\'s really cold in here actually. You shiver a little.');
            } else if (clickCount === 13) {
                transitionScene.changeText('You\'re not sure if it\'s because of the cold or your nerves.');
            } else if (clickCount === 14) {
                transitionScene.changeText('You take a deep breath.');
                transitionScene.removeEllipses();
                leaveCaveButton = transitionScene.addButton(150, 230, 300, 240, 0);
                leaveCaveButton.events.onInputUp.add(this.changeState, this);
            }
        }
    },

    /**The function that switches to the next state*/

    changeState: function() {
        //change states to gardenState
        nextState = 'gardenState';
        game.state.start('gardenState');
    }

};