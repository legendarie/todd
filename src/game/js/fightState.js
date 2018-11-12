let count = 0;
var originalX;
var originalY;
var candy;

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

        if(count==3){
            text = game.add.text(0,0,'you win!');
            text.anchor.setTo(0.5);
            text.position.setTo(game.world.width/2,game.world.height/2);
        }

        this.play();

    },

    createCandy: function() {
        // randomly chooses between the two candy sprites and adds it to the world
        // var num = Math.random();
        // if (num < 0.5) {
        candy = game.add.sprite(game.world.centerX, 550, 'dotCandy');
        candy.scale.setTo(0.1);
        candy.anchor.setTo(0.5, 1);
        // } else {
        //     candy = game.add.sprite(game.world.centerX, 550, 'stripeCandy');
        //     candy.scale.setTo(0.1);
        //     candy.anchor.setTo(0.5, 1);
        // }
        originalX = candy.x;
        originalY = candy.y;
        game.physics.enable(candy);
        candy.inputEnabled = true;
        candy.events.onInputDown.add(candy.input.enableDrag(true),this);

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
        santa.body.immovable = true;
        santa.inputEnabled = true;
        santa.events.onInputDown.add(santa.input.enableDrag(true), this);

    },

    play: function() {
        count++;
        // candy.events.onInputDown.add(candy.input.enableDrag(true),this);
        // candy.events.onInputUp.add(this.launch,this);


    },

    launch: function() {

        // enables game physics to apply to the candy sprite, then sets its x and y velocity, the gravity
        // that will be applied to the sprite when it falls, and the x and y trajectory upon a bounce
        candy.body.collideWorldBounds = true;
        candy.body.gravity.y = 100;
        distanceX = Math.abs(candy.x - originalX);
        distanceY = Math.abs(candy.y - originalY);
        candy.body.velocity.x = 1000*distanceX/600;
        candy.body.velocity.y = 1000*distanceY/600;
        //this.candy.body.gravity.y = 100 + Math.random() * 100;
        candy.body.bounce.setTo(1, 1);

    },


    update: function() {
        // as the game is running, the candy and santa are allowed to interact (to bounce off one another)
        game.physics.arcade.collide(candy, santa);
    }

};