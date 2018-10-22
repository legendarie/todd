/**
 *
 * This is a simple state template to use for getting a Phaser phaser up
 * and running quickly. Simply add your own phaser logic to the default
 * state object or delete it and make your own.
 *
 */

var fightState = {

    preload: function() {
        // State preload logic goes here
        this.game.load.image('bg', 'src/phaser/assets/background.jpg');
        this.game.load.image('santa', 'src/phaser/assets/Picture1.png');
        this.game.load.image('candy', 'src/phaser/assets/candy.png');

    },
    create: function(){
      // State create logic goes here
        this.background = this.game.add.sprite(0,0,'bg');this.background.scale.setTo(0.5,0.5)
        this.candy = this.game.add.sprite(this.game.world.centerX,this.game.world.height,'candy');this.candy.anchor.setTo(0.5,1)
        this.santa = this.game.add.sprite(0,this.game.world.centerY,'santa');this.santa.anchor.setTo(0.5,0.5)

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.enable(this.candy);
        this.candy.body.collideWorldBounds = true;
        // this.candy.body.gravity.x = 10;
        this.candy.body.velocity.x = 200;
        this.candy.body.velocity.y = 500;
        this.candy.body.gravity.y = 100 + Math.random() * 100;
        this.candy.body.bounce.setTo(1, 1);

        this.game.physics.enable(this.santa);
        this.santa.body.collideWorldBounds = true;
        this.santa.body.velocity.setTo(200,-5);
        this.santa.body.bounce.setTo(1,1);
    },
    update: function() {
        // State Update Logic goes here.
        // this.candy.x += 5;
        // this.candy.y -= 2;
        this.game.physics.arcade.collide(this.candy, this.santa);
    }


};

var game = new Phaser.Game(
    1200,
    720,
    Phaser.AUTO,
    'game',
    fightState
);

