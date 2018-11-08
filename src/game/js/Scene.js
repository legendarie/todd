var background;
var text;
var textBar;
var style;
var button;

class Scene {

    //load the background into the state. Take an image and its path as parameters
    setBackground(background, backgroundPath) {
        game.load.image(background, backgroundPath);
    }

    //add and scale the background. Take an image and a number as parameters
    loadScene(background, scale) {
        background = game.add.image(0, 0, background);
        background.scale.setTo(scale);
    }

    //add the text bar to the window with the appropriate settings. Takes a string as its parameter
    addTextBar(firstText) {
        //add the text bar and make it interactive
        textBar = game.add.graphics();
        textBar.beginFill(0x000000, 0.2);
        textBar.drawRect(0, 40, 1200, 100);
        textBar.inputEnabled = true;

        //set the style of the font to be put in the text bar (this is used in multiple functions)
        style = {font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle"};

        //add the text to the center of the text bar (set to whatever
        text = game.add.text(0, 0, firstText, style);
        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        text.setTextBounds(0, 40, 1200, 100);
    }

    //change the text displayed in the text bar. Takes a string as its parameter
    changeText(newText) {
        text.kill();
        text = game.add.text(0, 0, newText, style);
        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        text.setTextBounds(0, 40, 1200, 100);
    }

    //adds an "invisible button" to the window. For convenience, it takes a parameter (number) for the opacity,
    //along with the x and y coordinates, the length, and the width
    addButton(x, y, length, width, opacity) {
        button = game.add.graphics();
        button.beginFill(0x000000, opacity);
        button.drawRect(x, y, length, width);
        button.inputEnabled = true;
        return button;
    }
}