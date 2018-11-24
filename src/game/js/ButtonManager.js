//This class tracks the buttons that are supposed to appear after each choice
class ButtonManager {

    constructor(leftButton, middleButton, rightButton) {
        this.leftButton = leftButton;
        this.rightButton = rightButton;
        this.middleButton = middleButton;
    }

    //sets any new buttons to their proper positions
    getNewButtons() {
        let newLeft = clickedButton.getNewLeftButton();
        let newRight = clickedButton.getNewRightButton();
        let newMiddle = clickedButton.getNewMiddleButton();
        if (newLeft != null) {
            this.leftButton = newLeft;
            clickedButton.removeLeftButton(); //may want to remove this line if we want choice loops
        }
        if (newRight != null) {
            this.rightButton = newRight;
            clickedButton.removeRightButton(); //may want to remove this line if we want choice loops
        }
        if (newMiddle != null) {
            this.middleButton = newMiddle;
            clickedButton.removeMiddleButton(); //may want to remove this line if we want choice loops
        }
    }

    //convenient way to call the next line for a script
    runScript() {
        clickedButton.next();
    }

    /**Getters and setters*/

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
}