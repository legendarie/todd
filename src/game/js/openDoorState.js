var scene2bg;
var textBar;
var text;
var style;
var door;

var openDoorState = {

    preload: function () {
        game.load.image('scene2bg', 'assets/scene2bg.png');
    },

    create: function() {
        scene2bg = game.add.image(0, 0, 'scene2bg');
        scene2bg.scale.setTo(0.6);

        //add the text bar and make it interactable
        textBar = game.add.graphics();
        textBar.beginFill(0x000000, 0.2);
        textBar.drawRect(0, 40, 1200, 100);
        textBar.inputEnabled = true;

        //set the style of the font to be put in the text bar (this is used in multiple functions
        style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

        //add the text to the center of the text bar
        text = game.add.text(0, 0, "The room begins to fill with water.", style);
        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        text.setTextBounds(0, 40, 1200, 100);

        //when the text bar is clicked, go to the changeText function
        textBar.events.onInputUp.add(this.changeText, this);
    },

    changeText: function() {
        text.kill();
        text = game.add.text(0, 0, "The water is now above your head," +
            " but for some reason you can still breathe.", style);
        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        text.setTextBounds(0, 40, 1200, 100);
        this.throughDoor();
    },

    throughDoor: function() {
        door = game.add.graphics();
        door.beginFill(0x000000, 0);
        door.drawRect(500, 100, 280, 460);
        door.inputEnabled = true;
        door.events.onInputUp.add(this.changeState, this);
    },

    changeState: function () {
      game.state.start('caveState', caveState);
    }

};