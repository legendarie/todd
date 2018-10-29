var scene1bg;
var text;
var textBar;
var style;
var clickCount = 0;
//var counterText;
var blueDial;
var brownDial;
var redDial;
var whiteDial;
var door;

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

        //clickCount = 0;
        //counterText = game.add.text(0,0, clickCount);

        textBar.events.onInputUp.add(this.changeText, this);

    },

    changeText: function() {
        if (clickCount < 2) {
            clickCount++;
            text.kill();
            //counterText.kill();
            //counterText = game.add.text(0, 0, clickCount);
            if (clickCount == 1) {
                text = game.add.text(0, 0, "To what color do you turn the dial?", style);
                text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
                text.setTextBounds(0, 40, 1200, 100);
            } else if (clickCount == 2) {
                text = game.add.text(0, 0, "Choose a color", style);
                text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
                text.setTextBounds(0, 40, 1200, 100);
                this.dialClicks();
            }
        }

    },

    dialClicks: function() {

        blueDial = game.add.graphics();
        blueDial.beginFill(0x000000, 0);
        blueDial.drawRect(540, 263, 60, 40);
        blueDial.inputEnabled = true;
        blueDial.events.onInputUp.add(this.blueMessage, this);

        brownDial = game.add.graphics();
        brownDial.beginFill(0x000000, 0);
        brownDial.drawRect(584, 292, 40, 55);
        brownDial.inputEnabled = true;
        brownDial.events.onInputUp.add(this.otherMessage, this);

        redDial = game.add.graphics();
        redDial.beginFill(0x000000, 0);
        redDial.drawRect(540, 335, 60, 45);
        redDial.inputEnabled = true;
        redDial.events.onInputUp.add(this.otherMessage, this);

        whiteDial = game.add.graphics();
        whiteDial.beginFill(0x000000, 0);
        whiteDial.drawRect(515, 292, 40, 55);
        whiteDial.inputEnabled = true;
        whiteDial.events.onInputUp.add(this.otherMessage, this);

    },

    blueMessage: function() {
        text.kill();

        style = style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

        text = game.add.text(0, 0, "The door unlocks. Open the door.", style);
        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        text.setTextBounds(0, 40, 1200, 100);

        this.doorOpen();
    },

    otherMessage: function() {
        text.kill();

        style = style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

        text = game.add.text(0, 0, "The dial seems to be stuck... Choose another color.", style);
        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        text.setTextBounds(0, 40, 1200, 100);
    },

    doorOpen: function() {
        door = game.add.graphics();
        door.beginFill(0x000000, 0);
        door.drawRect(450, 210, 250, 420);
        door.inputEnabled = true;
        door.events.onInputUp.add(this.changeState, this);
    },

    changeState: function() {
        game.state.start('scene2', scene2);
    }

};