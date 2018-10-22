var fightState = {

    preload: function() {
        // State preload logic goes here
        game.load.image('bg', 'src/game/assets/background.jpg');
        game.load.image('santa', 'src/game/assets/Picture1.png');
        game.load.image('candy', 'src/game/assets/candy.png');

    },

    create: function(){
        // State create logic goes here
        this.background = game.add.sprite(0,0,'bg');this.background.scale.setTo(0.5,0.5);
        this.candy = game.add.sprite(this.game.world.centerX,this.game.world.height,'candy');this.candy.anchor.setTo(0.5,1);
        this.santa = game.add.sprite(0,this.game.world.centerY,'santa');this.santa.anchor.setTo(0.5,0.5);

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.enable(this.candy);
        this.candy.body.collideWorldBounds = true;
        // this.candy.body.gravity.x = 10;
        this.candy.body.velocity.x = 200;
        this.candy.body.velocity.y = 500;
        this.candy.body.gravity.y = 100 + Math.random() * 100;
        this.candy.body.bounce.setTo(1, 1);

        game.physics.enable(this.santa);
        this.santa.body.collideWorldBounds = true;
        this.santa.body.velocity.setTo(200,-5);
        this.santa.body.bounce.setTo(1,1);
    },

    update: function() {
        // State Update Logic goes here.
        // this.candy.x += 5;
        // this.candy.y -= 2;
        game.physics.arcade.collide(this.candy, this.santa);
    }

};