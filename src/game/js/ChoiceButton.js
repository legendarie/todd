//This class is an extension of button with some helpful stuff for holding the script.
//Probably the only useful thing I made in all of this.

class ChoiceButton extends Button {

    /**The constructor sets up the ChoiceButton object with an empty array for the
     * script associated with the button, a variable to keep track of the spot in
     * the script, and a list of its buttons*/

    constructor(x, y, width, height, opacity) {
        super(x, y, width, height, opacity);
        this.script = [];
        this.spot = 0;
        this.buttonList = {leftButton: null, rightButton: null, middleButton: null}
        this.alreadyClicked = false;
        this.endButton = false;
        this.death = false;
    }

    //adds a line of dialogue to the button's script (which runs in the text box)
    addLine(newLine) {
        this.script.push(newLine);
    }

    //returns the next line in the button's script
    next() {
        if (this.spot < this.script.length) {
            let line = "" + this.script[this.spot];
            this.spot++;
            return line;
        }
    }

    //returns the number of objects (lines) in the script array
    scriptLength() {
        return this.script.length
    }

    //sets the spot for the script to 0, so if the button is clicked again, it runs through the script again
    reset() {
        this.spot = 0;
    }

    //sets this button to "has been clicked"
    click() {
        clickedButton = this;
        this.alreadyClicked = true;
    }

    //a check for whether this button has been clicked
    beenClicked() {
        return this.alreadyClicked;
    }

    //a check for whether this button ends a choice branch
    isEndButton() {
        return this.endButton;
    }

    //a check for whether this button leads to the player dying
    isDeath() {
        return this.death;
    }

    //sets all of the buttons to an essentially non-existent state (for the end of a choice branch)
    removeButtons() {
        this.setNewLeftButton(new Button(0, 0, 0, 0, 0));
        this.setNewRightButton(new Button(0, 0, 0, 0, 0));
        this.setNewMiddleButton(new Button(0, 0, 0, 0, 0));
    }

    /**Getters and setters*/

    getSpot() {
        return this.spot;
    }

    setScript(newScript) {
        this.script = newScript;
    }

    getScript() {
        return this.script;
    }

    setNewLeftButton(newLeftButton) {
        this.buttonList.leftButton = newLeftButton;

    }

    getNewLeftButton() {
        if (this.buttonList.leftButton != null) {
            return this.buttonList.leftButton;
        }
    }

    removeLeftButton() {
        this.buttonList.leftButton = null;
    }

    setNewRightButton(newRightButton) {
        this.buttonList.rightButton = newRightButton;
    }

    getNewRightButton() {
        if (this.buttonList.rightButton != null) {
            return this.buttonList.rightButton;
        }
    }

    removeRightButton() {
        this.buttonList.rightButton = null;
    }

    setNewMiddleButton(newMiddleButton) {
        this.buttonList.middleButton = newMiddleButton;
    }

    getNewMiddleButton() {
        if (this.buttonList.middleButton != null) {
            return this.buttonList.middleButton;
        }
    }

    removeMiddleButton() {
        this.buttonList.middleButton = null;
    }

    setButtonList(list) {
        this.buttonList = list;
    }

    getButtonList() {
        return this.buttonList;
    }

    //sets the button to be the end of a choice branch
    setToEnd() {
        this.endButton = true;
    }

    //sets the button to be a "dead end" in the choice branch (you die)
    setToDeath() {
        this.setToEnd();
        this.death = true;
    }
}
