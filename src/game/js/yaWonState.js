//initialize global variables
var snow;
let yaWonScene = null;

var yaWonState = {

    /** Loads in the visual elements of the state */

    preload: function() {

        //create new instance of scene
        yaWonScene = new Scene;

        //load the images into the state
        yaWonScene.setBackground('yaWonbg', 'assets/yaWonbg.jpg');
        yaWonScene.setSprite('snowFlakes', 'assets/snowflake.png');
    },

    /** Adds all of the visual elements to the state */

    create: function() {

        //add the background to the scene
        yaWonScene.loadScene('yaWonbg', 1);

        //add all of the text to the state (yaWonText, beatSantaText, and giftsFoundText)
        var yaWonText = game.add.text(280, 140, 'You won!', {font: "bold 150px Arial", fill: "#00CC00"});
        yaWonText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

        var beatSantaText = game.add.text(340, 290, 'You defeated buff Santa and \n saved the residents of Reefville!',
            {font: "bold 35px Arial", fill: "#00F"});
        beatSantaText.setShadow(3, 3, 'rgba(0,0,0,0.3)', 2);

        var giftsFoundText = game.add.text(60, 580, 'You found ' + giftCount + ' of 10 possible gifts!',
            {font: "bold 35px Arial", fill: "#ff3b3b"});
        giftsFoundText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.createSnow();
    },

    /** Make the snow fall down the screen */

    createSnow: function () {
        snow = game.add.emitter(game.world.centerX, 0, 100); //x coordinate, y coordinate, number of particles
        snow.makeParticles('snowFlakes', 170, 50, true);
        snow.maxParticleScale = 0.3;
        snow.minParticleScale = 0.1;
        snow.setYSpeed(20, 100);
        snow.width = game.world.width * 1.5;
        snow.height = game.world.height;
        snow.minRotation = 0;
        snow.maxRotation = 40;
        snow.start(false, 7000, 100);
    }
};