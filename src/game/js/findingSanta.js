var distX;
var distY;
var diag;
var santa;
var santaSound;
let findScene = null;


var findingSanta = {

    preload: function() {
        findScene = new Scene;
        findScene.setBackground('bg', 'assets/snowflakebg.jpg');
        findScene.setSprite('santa', 'assets/santa.png');
        game.load.audio('hohoho','assets/hohoho.mp3');
    },

    create: function() {
        diag = Math.sqrt(Math.pow(game.world.width,2) + Math.pow(game.world.width,2));

        //set background image to the snowflake background image
        findScene.loadScene('bg', 0.5);

        //initialize santa
        santa = findScene.addSprite(0, 0, 'santa', 0.3);
        santa.position.setTo(Math.floor(Math.random() * (game.world.width-santa.width)),
            Math.floor(Math.random() * (game.world.height-santa.height)));
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
        var distLinear = Math.sqrt(Math.pow(distX,2)+Math.pow(distY,2));

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