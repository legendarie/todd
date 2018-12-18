let santaHealth;
let lives;
var originalX;
var originalY;
var distanceX;
var distanceY;
var candy;
var santa;
var background;
var santaHealthText;
var yourHealthText;
var snow;
let playing = false;
let dragging = true;
let dragBounds = new Phaser.Rectangle(originalX-100,originalY-100,200,200);
var countBounce = 0;


var fightState = {

    preload: function () {
        // preload all of the images to be used as images or sprites in the game
        game.load.image('bg', 'assets/snowflakebg.jpg');
        game.load.image('santa', 'assets/santa.png');
        game.load.image('dotCandy', 'assets/dotCandy.png');
        game.load.image('stripeCandy', 'assets/stripeCandy.png');
        game.load.image('slingshot', 'assets/slingshot.png');
        game.load.image('snowFlakes', 'assets/snowflake.png');

        santaHealth = 8;
        lives = 3;
    },

    create: function () {
        // adds the background to the game world
        background = game.add.image(0, 0, 'bg');
        background.scale.setTo(0.5);

        // enables the arcade-style physics pre-loaded into Phaser
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.createSlingshot();
        this.createCandy();
        this.createSanta();
        this.createSnow();

        santaHealthText = game.add.text(0, 0, santaHealth, {font: "bold 32px Arial", fill: "#cc0000"});
        yourHealthText = game.add.text(300,0,lives, {font: "bold 32px Arial", fill: "#00CC00"});
    },


    createCandy: function () {
        // randomly chooses between the two candy sprites and adds it to the world
        playing = false;
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
        dragBounds = new Phaser.Rectangle(originalX-100,originalY-100,200,200);
        candy.input.boundsRect = dragBounds;


        this.play();
    },

    createSlingshot: function () {
        // add the slingshot to the bottom center of the window
        slingshot = game.add.sprite(game.world.centerX, game.world.height - 100, 'slingshot');
        slingshot.scale.setTo(0.07);
        slingshot.anchor.setTo(0.5);
    },

    createSanta: function () {
        // add the santa sprite to the middle of the world
        santa = game.add.sprite(0, 0, 'santa');
        santa.position.setTo(Math.floor(Math.random() * (game.world.width - santa.width)), 100);
        santa.scale.setTo(0.15);
        game.physics.enable(santa);
        santa.body.collideWorldBounds = true;
        santa.body.bounce.setTo(0.6, 0.6);
    },

    createSnow: function () {
        snow = game.add.emitter(game.world.centerX, 0, 100); //x coordinate, y coordinate, number of particles
        snow.makeParticles('snowFlakes', 100, 25, true);
        snow.maxParticleScale = 0.3;
        snow.minParticleScale = 0.1;
        snow.setYSpeed(20, 100);
        snow.width = game.world.width * 1.5;
        snow.height = game.world.height * 0.75;
        snow.minRotation = 0;
        snow.maxRotation = 40;
        snow.start(false, 7000, 100);
    },


    play: function () {
        playing = false;
        candy.events.onInputUp.add(this.launch, this);
    },

    launch: function () {
        // enables game physics to apply to the candy sprite, then sets its x and y velocity, the gravity
        // that will be applied to the sprite when it falls, and the x and y trajectory upon a bounce
        playing = true;
        candy.body.collideWorldBounds = true;
        candy.body.onWorldBounds = new Phaser.Signal();
        candy.body.onWorldBounds.add(this.candyIncrementBounds, this);

        distanceX = (candy.x - originalX);
        distanceY = (candy.y - originalY);

        candy.body.gravity.y = 100;
        candy.body.velocity.x = -5 * distanceX;
        candy.body.velocity.y = -5 * distanceY;
        candy.body.bounce.setTo(.8, .8);

    },


    restart: function () {
        if (candy.input.isDragged === false) {
            santaHealth = santaHealth - 1;
            candy.destroy();
            this.createCandy();
            if (santaHealth <= 0) {
                game.state.start('yaWonState');
            }
        }
    },

    hitSnow: function () {
        if(playing === true) {
            lives--;
            candy.kill();
            this.createCandy();
            if (lives <= 0) {
                game.state.start('yaDeadState');
            }
        }
    },

    candyIncrementBounds: function() {
        //sets the rule that if the candy bounces off the wall 3 times, it will return to the sling shot again
        if (countBounce >= 2) {
            candy.destroy();
            this.createCandy();
            countBounce = 0;
        }
        else {
            countBounce++;
        }
    },




    update: function () {
        // as the game is running, the candy and santa are allowed to interact (to bounce off one another)
        if(playing === true) {
            game.physics.arcade.collide(candy, santa, this.restart, null, this);
            game.physics.arcade.collide(candy, snow, this.hitSnow, null, this);
        }
        santaHealthText.setText("Santa's health: " + santaHealth);
        yourHealthText.setText("Your health: " +lives);
    }
};