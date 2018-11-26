//This class is an extension of button with some helpful stuff for holding the script.
//Probably the only useful thing I made in all of this.

//a button for the button manager to check for so it can set its own slots to null
var nothingButton = new Button(0, 0, 0, 0);

class ChoiceButton extends Button {

    /**The constructor sets up the ChoiceButton object with an empty array for the
     * script associated with the button, a variable to keep track of the spot in
     * the script, and a list of its buttons*/

    constructor(x, y, width, height, opacity) {
        super(x, y, width, height, opacity);
        this.script = [];
        this.spot = 0;
        this.buttonList = {leftButton: null, rightButton: null, middleButton: null,
                topLeftButton: null, topRightButton: null, bottomLeftButton: null,
                bottomRightButton: null};
        this.alreadyClicked = false;
        this.endButton = false;
        this.death = false;
        this.irregularLines = false;
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

    //a check for whether "What do you want to do?" should be added to the end of the script
    isIrregular() {
        return this.irregularLines;
    }

    //a check for whether this button ends a choice branch
    isEndButton() {
        return this.endButton;
    }

    //a check for whether this button leads to the player dying
    isDeath() {
        return this.death;
    }

    //sets all of the buttons to null (for the end of a choice branch)
    removeButtons() {
        this.removeLeftButton();
        this.removeRightButton();
        this.removeMiddleButton();
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

    //a function to let the button manager know it should set its left button to null
    setNothingLeft() {
        this.buttonList.leftButton = nothingButton;
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

    //a function to let the button manager know it should set its right button to null
    setNothingRight() {
        this.buttonList.rightButton = nothingButton;
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

    //a function to let the button manager know it should set its middle button to null
    setNothingMiddle() {
        this.buttonList.middleButton = nothingButton;
    }

    setNewTopLeftButton(button) {
        this.buttonList.topLeftButton = button;
    }

    getNewTopLeftButton() {
        return this.buttonList.topLeftButton;
    }

    removeTopLeftButton() {
        this.buttonList.topLeftButton = null;
    }

    //a function to let the button manager know it should set its top left button to null
    setNothingTopLeft() {
        this.buttonList.topLeftButton = nothingButton;
    }

    setNewTopRightButton(button) {
        this.buttonList.topRightButton = button;
    }

    getNewTopRightButton() {
        return this.buttonList.topRightButton;
    }

    removeTopRightButton() {
        this.buttonList.topRightButton = null;
    }

    //a function to let the button manager know it should set its top right button to null
    setNothingTopRight() {
        this.buttonList.topRightButton = nothingButton;
    }

    setNewBottomLeftButton(button) {
        this.buttonList.bottomLeftButton = button;
    }

    getNewBottomLeftButton() {
        return this.buttonList.bottomLeftButton;
    }

    removeBottomLeftButton() {
        this.buttonList.bottomLeftButton = null;
    }

    //a function to let the button manager know it should set its bottom left button to null
    setNothingBottomLeft() {
        this.buttonList.bottomLeftButton = nothingButton;
    }

    setNewBottomRightButton(button) {
        this.buttonList.bottomRightButton = button;
    }

    getNewBottomRightButton() {
        return this.buttonList.bottomRightButton;
    }

    removeBottomRightButton() {
        this.buttonList.bottomRightButton = null;
    }

    //a function to let the button manager know it should set its bottom right button to null
    setNothingBottomRight() {
        this.buttonList.bottomRightButton = nothingButton;
    }

    setButtonList(list) {
        this.buttonList = list;
    }

    getButtonList() {
        return this.buttonList;
    }

    //marks the button as not including the normal "What do you want to do?" at the end of the script
    setToIrregular() {
        this.irregularLines = true;
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
