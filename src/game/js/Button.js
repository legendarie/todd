this.x;
this.y;
this.width;
this.height;
this.opacity;
this.button;
this.buttonText;

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
        this.button = game.add.graphics();
        this.button.beginFill(0x000000, this.opacity);
        this.button.drawRect(this.x, this.y, this.width, this.height);
        this.button.inputEnabled = true;
        this.button.input.useHandCursor = true;
    }

    //adds text to the center of the button
    addText(text) {
        this.buttonText = game.add.text(0, 0, text, style);
        this.buttonText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        this.buttonText.setTextBounds(this.x, this.y, this.width, this.height);
    }

    /**The kill function removes the button and any text on it*/

    kill() {
        this.button.kill();
        if (this.buttonText !== null) {
            this.buttonText.kill();
        }
    }

    /**Getter functions*/

    getButton() {
        return this.button;
    }

    getText() {
        return this.buttonText;
    }

}