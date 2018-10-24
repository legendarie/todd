var candy;
var santa;
var background;
var slingshot;

var fightState = {

    preload: function () {
        // preload all of the images to be used as images or sprites in the game
        game.load.image('bg', 'assets/background.jpg');
        game.load.image('santa', 'assets/Picture1.png');
        game.load.image('dotCandy', 'assets/DotCandy.png');
        game.load.image('stripeCandy', 'assets/StripeCandy.png');
        game.load.image('slingshot', 'assets/slingshot.png');

    },

    create: function() {
        // adds the background to the game world
        background = game.add.image(0, 0, 'bg');
        background.scale.setTo(0.5, 0.5);

        // randomly chooses between the two candy sprites and adds it to the world
        var num = Math.random();
        if (num < 0.5) {
            candy = game.add.sprite(game.world.centerX, 650, 'dotCandy');
            candy.scale.setTo(0.1,0.1);
            candy.anchor.setTo(0.5, 1);
        } else {
            candy = game.add.sprite(game.world.centerX, 650, 'stripeCandy');
            candy.scale.setTo(0.1,0.1);
            candy.anchor.setTo(0.5, 1);
        }

        slingshot = game.add.sprite(game.world.centerX, game.world.height, 'slingshot');
        slingshot.scale.setTo(0.07, 0.07);
        slingshot.anchor.setTo(0.5, 0.5);

        // add the santa sprite to the middle of the world
        santa = game.add.sprite(100, game.world.centerY, 'santa');
        santa.anchor.setTo(0.5, 0.5);

        // enables the arcade-style physics pre-loaded into Phaser
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.enable(candy);
        // enables the santa sprite to be interacted with, but does not allow it to move through the world
        game.physics.enable(santa);
        santa.body.immovable = true;
        santa.inputEnabled = true;

        santa.events.onInputDown.add(this.launch, this);

    },

    launch: function() {

        // enables game physics to apply to the candy sprite, then sets its x and y velocity, the gravity
        // that will be applied to the sprite when it falls, and the x and y trajectory upon a bounce
        candy.body.collideWorldBounds = true;
        candy.body.gravity.x = 100;
        candy.body.velocity.x = game.rnd.integerInRange(-750, 750); // keeps updating
        candy.body.velocity.y = game.rnd.integerInRange(-900,-100); // keeps updating
        //this.candy.body.gravity.y = 100 + Math.random() * 100;
        candy.body.bounce.setTo(1, 1);

    },


    update: function() {
        // as the game is running, the candy and santa are allowed to interact (to bounce off one another)
        game.physics.arcade.collide(candy, santa);
    }

};