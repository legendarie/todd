var distX;
var distY;
var diag;


var findingSanta = {
    preload: function() {
        game.load.image('santa','assets/santa.png');
        game.load.audio('hohoho','assets/hohoho.mp3');
        game.load.image('bg','assets/snowflakebg.jpg')
    },

    create: function() {
        diag = Math.sqrt(Math.pow(game.world.width,2) + Math.pow(game.world.width,2));

        //set background color to white
        bg = game.add.image(0,0,'bg');
        bg.scale.setTo(0.5);

        //initialize santa
        santa = game.add.sprite(0,0,'santa');
        santa.scale.setTo(0.3);
        santa.position.setTo(Math.floor(Math.random() * (game.world.width-santa.width)),Math.floor(Math.random() * (game.world.height-santa.height)));
        santa.alpha = 0;

        //implement game.physics to move santa
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.enable(santa);
        santa.body.collideWorldBounds = true;
        santa.body.velocity.x = 20;
        santa.body.velocity.y = 20;
        santa.body.bounce.set(1,1);

        //sound of santa
        santaSound = game.add.audio('hohoho');
        santaSound.loop = true;
        santaSound.play();

        santa.inputEnabled = true; //make santa interactive
        santa.events.onInputDown.add(this.gameWin,this); //clicking on santa
        santa.input.useHandCursor = true; //change pointer into the pointing finger when mouse is over santa

    },

    update: function() {
        this.changeVolume()
    },

    changeVolume:function() {
        //distance between mouse and santa
        distX = game.input.mousePointer.x - santa.x;
        distY = game.input.mousePointer.y - santa.y;
        distLinear = Math.sqrt(Math.pow(distX,2)+Math.pow(distY,2));

        //change santa's volume according to the distance between the mouse and santa
        santaSound.volume = 0.1 + 5*Math.pow((1 - distLinear/diag),2);
    },


    gameWin: function() {
        this.santaOnClick();
        game.time.events.add(Phaser.Timer.SECOND*0.5, this.changeState, this);

    },

    santaOnClick: function() {
        //when the user successfully finds santa
        santa.alpha = 1;
        santa.body.velocity.x = 0;
        santa.body.velocity.y = 0;
        santaSound.stop();

    },


    changeState: function () {
        game.state.start('fightState',fightState);
    }


};