//variables for checks in penguinPuzzleState
var heapCheck = false;
var examineLakeCheck = false;
var penguin2Check = false;
var examineRoomCheck = false;
var grabKeyCheck = false;
var followCordCheck = false;
var cutLockCheck = false;
var turnOnCheck = false;

//variables for checks in gearPuzzleState
var barCheck = false;
var window2Check = false;
var gear2Check = false;
var followWireCheck = false;
var testWireCheck = false;
var grabToolCheck = false;


//This class tracks the buttons that are supposed to appear after each
//choice in the two "choose your own adventure" puzzles
class ButtonManager {

    //the left/middle/right buttons are primarily for gearPuzzleState
    //the four others are for penguinPuzzleState
    constructor() {
        this.leftButton = null;
        this.rightButton = null;
        this.middleButton = null;

        this.topLeftButton = null;
        this.topRightButton = null;
        this.bottomLeftButton = null;
        this.bottomRightButton = null;
    }

    //store any new buttons that would appear under their proper labels
    getNewButtons() {
        //get any new buttons from the button that was just clicked
        let newLeft = clickedButton.getNewLeftButton();
        let newRight = clickedButton.getNewRightButton();
        let newMiddle = clickedButton.getNewMiddleButton();

        let newTopLeft = clickedButton.getNewTopLeftButton();
        let newTopRight = clickedButton.getNewTopRightButton();
        let newBottomLeft = clickedButton.getNewBottomLeftButton();
        let newBottomRight = clickedButton.getNewBottomRightButton();

        //store that information, if it exists, for each position
        if (newLeft != null) {
            if (newLeft === nothingButton) {
                this.removeLeftButton();
            } else {
                this.leftButton = newLeft;
            }
        }
        if (newRight != null) {
            if (newRight === nothingButton) {
                this.removeRightButton();
            } else {
                this.rightButton = newRight;
            }
        }
        if (newMiddle != null) {
            if (newMiddle === nothingButton) {
                this.removeMiddleButton();
            } else {
                this.middleButton = newMiddle;
            }
        }

        if (newTopLeft != null) {
            if (newTopLeft === nothingButton) {
                this.removeTopLeftButton();
            } else {
                this.topLeftButton = newTopLeft;
            }
        }
        if (newTopRight != null) {
            if (newTopRight === nothingButton) {
                this.removeTopRightButton();
            } else {
                this.topRightButton = newTopRight;
            }
        }
        if (newBottomLeft != null) {
            if (newBottomLeft === nothingButton) {
                this.removeBottomLeftButton();
            } else {
                this.bottomLeftButton = newBottomLeft;
            }
        }
        if (newBottomRight != null) {
            if (newBottomRight === nothingButton) {
                this.removeBottomRightButton();
            } else {
                this.bottomRightButton = newBottomRight;
            }
        }
    }

    /**Getters and setters*/

    //set all the buttons in buttonManager as null
    removeButtons() {
        this.removeLeftButton();
        this.removeRightButton();
        this.removeMiddleButton();
        this.removeTopLeftButton();
        this.removeTopRightButton();
        this.removeBottomLeftButton();
        this.removeBottomRightButton();
    }

    setLeftButton(button) {
        this.leftButton = button;
    }

    getLeftButton() {
        return this.leftButton;
    }

    removeLeftButton() {
        this.leftButton = null;
    }

    setRightButton(button) {
        this.rightButton = button;
    }

    getRightButton() {
        return this.rightButton;
    }

    removeRightButton() {
        this.rightButton = null;
    }

    setMiddleButton(button) {
        this.middleButton = button;
    }

    getMiddleButton() {
        return this.middleButton;
    }

    removeMiddleButton() {
        this.middleButton = null;
    }

    setTopLeftButton(button) {
        this.topLeftButton = button;
    }

    getTopLeftButton() {
        return this.topLeftButton;
    }

    removeTopLeftButton() {
        this.topLeftButton = null;
    }

    setTopRightButton(button) {
        this.topRightButton = button;
    }

    getTopRightButton() {
        return this.topRightButton;
    }

    removeTopRightButton() {
        this.topRightButton = null;
    }

    setBottomLeftButton(button) {
        this.bottomLeftButton = button;
    }

    getBottomLeftButton() {
        return this.bottomLeftButton;
    }

    removeBottomLeftButton() {
        this.bottomLeftButton = null;
    }

    setBottomRightButton(button) {
        this.bottomRightButton = button;
    }

    getBottomRightButton() {
        return this.bottomRightButton;
    }

    removeBottomRightButton() {
        this.bottomRightButton = null;
    }
}