//A class for the button objects that appear in every state
class Button {

    /**The constructor sets up all needed variables, including the box opacity*/

    constructor(x, y, width, height, opacity) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.opacity = opacity;
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
        this.buttonLabel = text;
        this.buttonText = game.add.text(0, 0, text, style);
        this.buttonText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        this.buttonText.setTextBounds(this.x, this.y, this.width, this.height);
    }

    //retruns the button to the window after being killed
    revive() {
        this.add();
        if (this.buttonLabel !== null) {
            this.addText(this.buttonLabel)
        }
    }

    /**Other functions (killing the button and adding the button's label)*/

    //removes the button's actual interactive button, and any text that was on it
    kill() {
        if (this.button != null) {
            this.button.kill();
        }
        if (this.buttonText != null) {
            this.buttonText.kill();
        }
    }

    //adds the stored "label" string to the button as visible text
    addLabel() {
        if (this.buttonLabel != null) {
            this.addText(this.buttonLabel);
        }
    }

    /**Getters and setters*/

    getButton() {
        return this.button;
    }

    getText() {
        return this.buttonText;
    }

    setLabel(label) {
        this.buttonLabel = label;
    }

    getLabel() {
        return this.buttonLabel;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    getOpacity() {
        return this.opacity;
    }

}