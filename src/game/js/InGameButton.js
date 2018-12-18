//This class is specifically designed for the
// "choose your own adventure" puzzles
class InGameButton extends ChoiceButton {

    /**Every button has the same opacity, width, and height*/

    constructor(x, y) {
        super(x, y, 325, 100, 0.2);
        this.x = x;
        this.y = y;
    }

    /**The position function puts the button in the window
     * in the correct location with the script reset to the
     * beginning*/

    position() {
        this.addFull();
        this.reset();
        this.button.events.onInputUp.add(this.click, this)
    }

    /**Add the stored label/button to the window*/

    addFull() {
        this.add();
        this.addLabel();
    }
}