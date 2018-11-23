class CBFollowWire extends ChoiceButton {

    constructor(x, y) {
        super(x, y, 325, 100, 0.2);
        this.x = x;
        this.y = y;
        this.setScript(["The wire runs up to a delicate-looking contraption that runs up the wall.",
            "It disappears into the ceiling.",
            "You can't tell what it does, and you're not sure you want to know."]);
    }

    addFull() {
        this.add();
        this.addText("Follow the wire")
    }
}