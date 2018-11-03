
//the abstract class's constructor, with all prototype methods
function Scene() {

    //add the background, taking an image and its path as parameters
    //!!we should implement a check to make sure that 'background' is an image, or some similar precaution!!
    Scene.prototype.preload = function (background, backgroundPath) {
        //load in the background image to the state
        this.background = background;
        game.load.image(background, backgroundPath);

    },

    Scene.prototype.create = function () {
        //add the background to the canvas and scale appropriately
        background = game.add.image(0, 0, background);
        background.scale.setTo(0.5);

        this.addTextBar();

        //reset the click count for text bar
        clickCount = 0;

    },

    //set up the text bar
    Scene.prototype.addTextBar = function () {
        //add the text bar and make it interactable
        textBar = game.add.graphics();
        textBar.beginFill(0x000000, 0.2);
        textBar.drawRect(0, 40, 1200, 100);
        textBar.inputEnabled = true;

        //set the style of the font to be put in the text bar (this is used in multiple functions)
        style = {font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle"};

        //add the text to the center of the text bar
        this.setNewText("First Text");

        //when the text bar is clicked, go to the changeText function
        textBar.events.onInputUp.add(this.changeText, this);
    },

    //set up an if-then statement using the setNewText and the click counter
    Scene.prototype.changeText = function () {
    },

    //!!write check for parameter!!
    //manually set a new line of text in the text bar
    Scene.prototype.setNewText = function (text) {
        text.kill();
        text = game.add.text(0, 0, text, style);
        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        text.setTextBounds(0, 40, 1200, 100);
    },

    //!!write check for parameter!!
    //manually scale the background
    Scene.prototype.scaleBackground = function (scale) {
        background.scale.setTo(scale)
    },

    //switch to the next state (may be dependent upon choices)
    Scene.prototype.changeState = function (nextState) {
        let nextStateString = '' + nextState;
        game.state.start(nextStateString, nextState);
    }
}