var x;
var y;
var width;
var height;
var opacity;
var button;
var buttonText;

class Button {

    /**The constructor sets up all needed variables and calls the separate "add" function*/

    constructor(x, y, width, height, opacity) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.opacity = opacity;
        this.add()
    }

    /**All functions that add objects to the window*/

    //adds the button to the window with the specified attributes
    add() {
        button = game.add.graphics();
        button.beginFill(0x000000, this.opacity);
        button.drawRect(this.x, this.y, this.width, this.height);
        button.inputEnabled = true;
        button.input.useHandCursor = true;
    }

    //adds text to the center of the button
    addText(text) {
        buttonText = game.add.text(0, 0, text, style);
        buttonText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        buttonText.setTextBounds(this.x, this.y, this.width, this.height);
    }

    /**Getter functions*/

    getButton() {
        return button;
    }

    getText() {
        return buttonText;
    }

}