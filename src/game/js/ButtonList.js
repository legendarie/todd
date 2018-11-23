//general positions for the three buttons
const LEFTX = 100;
const MIDDLEX = 450;
const RIGHTX = 775;
const DUORIGHTX = 650;
const DUOLEFTX = 275;
const BUTTONY = 500;
const BUTTONHEIGHT = 100;
const BUTTONWIDTH = 325;
const MIDWIDTH = 300;
const BUTTONOPACITY = 0.2;

//This class is useless. It was just making a parent class for button lists for each game that now only
//exist until I can transfer the scripts in their more manageable form to something else.
class ButtonList {

    constructor() {
        this.buttonList = {}
    }

    addButton(name, button, label) {
        button.setLabel(label);
        this.buttonList[name] = button;
    }

    /**Getters and setters*/

    getButtonList() {
        return this.buttonList;
    }
}