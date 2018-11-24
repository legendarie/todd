//This class is an example of a specific child of the ChoiceButton class that each button could be,
//but I don't know how helpful it is.
class InGameButton extends ChoiceButton {

    constructor(x, y) {
        super(x, y, 325, 100, 0.2);
        this.x = x;
        this.y = y;
    }

    position() {
        this.addFull();
        this.reset();
        this.button.events.onInputUp.add(this.click, this)
    }

    addFull() {
        this.add();
        this.addLabel();
    }
}