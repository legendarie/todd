//This class is an example of a specific child of the ChoiceButton class that each button could be,
//but I don't know how helpful it is.
class CBDoor extends ChoiceButton {

    constructor(x, y) {
        super(x, y, 325, 100, 0.2);
        this.x = x;
        this.y = y;
        this.setScript(["The bars are much too heavy to lift.",
            "Upon closer inspection, you see a wire running across the floor.",
            "It trails off to your right."]);
    }

    addFull() {
        this.add();
        this.addText("Check the bars")
    }
}