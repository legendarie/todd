let count = 0;
var originalX;
var originalY;
var candy;
var santa;
var numCollision;
var slingShot;

var fightState = {

    preload: function () {
        // preload all of the images to be used as images or sprites in the game
        game.load.image('bg', 'assets/snowflakebg.jpg');
        game.load.image('santa', 'assets/santa.png');
        game.load.image('dotCandy', 'assets/dotCandy.png');
        game.load.image('stripeCandy', 'assets/stripeCandy.png');
        game.load.image('slingshot', 'assets/slingshot.png');

    },

    create: function() {
        // adds the background to the game world
        background = game.add.image(0, 0, 'bg');
        background.scale.setTo(0.5);

        // enables the arcade-style physics pre-loaded into Phaser
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.createSlingshot();
        this.createCandy();
        this.createSanta();
        numCollision = 0;

    },

    reset: function() {
        santa.destroy();
        candy.destroy();
        slingShot.destroy();
        this.createSlingshot();
        this.createCandy();
        this.createSanta();
        numCollision = 0;
    },

    createCandy: function() {
        // randomly chooses between the two candy sprites and adds it to the world
        var num = Math.random();
        if (num < 0.5) {
            candy = game.add.sprite(game.world.centerX, 550, 'dotCandy');
            candy.scale.setTo(0.1);
            candy.anchor.setTo(0.5, 1);
        } else {
            candy = game.add.sprite(game.world.centerX, 550, 'stripeCandy');
            candy.scale.setTo(0.1);
            candy.anchor.setTo(0.5, 1);
        }
        originalX = candy.x;
        originalY = candy.y;
        game.physics.enable(candy);
        candy.inputEnabled = true;
        candy.input.enableDrag(true);

        this.play();
    },

    createSlingshot: function() {
        // add the slingshot to the bottom center of the window
        slingshot = game.add.sprite(game.world.centerX, game.world.height-100, 'slingshot');
        slingshot.scale.setTo(0.07);
        slingshot.anchor.setTo(0.5);
    },

    createSanta: function() {
        // add the santa sprite to the middle of the world
        santa = game.add.sprite(0,0, 'santa');
        santa.position.setTo(Math.floor(Math.random() * (game.world.width-santa.width)),Math.floor(Math.random() * (game.world.height-santa.height)));
        santa.scale.setTo(0.5);
        game.physics.enable(santa);
        santa.body.collideWorldBounds = true;
        santa.body.bounce.setTo(0.6,0.6);
        santa.inputEnabled = true;
        santa.events.onInputDown.add(santa.input.enableDrag(true), this);

    },

    // createLine: function() {
    //
    // },

    play: function() {
        count++;
        candy.events.onInputUp.add(this.launch,this);


    },

    launch: function() {

        // enables game physics to apply to the candy sprite, then sets its x and y velocity, the gravity
        // that will be applied to the sprite when it falls, and the x and y trajectory upon a bounce
        candy.body.collideWorldBounds = true;

        distanceX = (candy.x - originalX);
        distanceY = (candy.y - originalY);

        candy.body.gravity.y = 100;
        candy.body.velocity.x = -5*distanceX;
        candy.body.velocity.y = -5*distanceY;
        candy.body.bounce.setTo(.8, .8);

    },

    incrementCollision: function() {
        numCollision++;
    },


    update: function() {
        // as the game is running, the candy and santa are allowed to interact (to bounce off one another)
        game.physics.arcade.collide(candy, santa, this.reset);
        // if(numCollision == 3) {
        //     this.create();
        // }
    }

};