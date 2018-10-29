var scene1bg;
var text;
var textBar;
var style;
var clickCount = 0;
var counterText;
var blueButton;
var brownButton;
var redButton;
var whiteButton;

var scene1 = {

    preload: function() {

        //load in the background image to the state
        game.load.image('scene1bg', 'assets/scene1bg.png');
        game.load.image('button', 'assets/button.png')

    },

    create: function() {
        //add the background the the canvas and scale appropriately
        scene1bg = game.add.image(0, 0, 'scene1bg');
        scene1bg.scale.setTo(0.6);

        textBar = game.add.graphics();
        textBar.beginFill(0x000000, 0.2);
        textBar.drawRect(0, 40, 1200, 100);
        textBar.inputEnabled = true;

        style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

        //  The Text is positioned at 0, 100
        text = game.add.text(0, 0, "You awaken in a room with nothing but a door with a dial.", style);
        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        text.setTextBounds(0, 40, 1200, 100);

        clickCount = 0;
        counterText = game.add.text(0,0, clickCount);

        textBar.events.onInputDown.add(this.changeText, this);

    },

    changeText: function() {
        clickCount++;
        text.kill();
        counterText.kill();
        counterText = game.add.text(0, 0, clickCount);

        if (clickCount == 1) {
            // text.kill();
            text = game.add.text(0, 0, "To what color do you turn the dial?", style);
            text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
            text.setTextBounds(0, 40, 1200, 100);
        }
        if (clickCount == 2) {
            // text.kill();
            text = game.add.text(0, 0, "Choose a color", style);
            text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
            text.setTextBounds(0, 40, 1200, 100);
        }
    },

    update: function() {
    }

    /*change: function() {
        game.state.start('fightState');
    }*/
};