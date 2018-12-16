var background;
var hiddenButton;
var text;
var textBar;
var style;
var fullButton;
var button;
var choiceButton;
var circle;
var circle1;
var circle2;
var circle3;

//Note: the "Button" class itself cannot be used to work with onInputUp events, since those only act on
//graphics objects. Thus, while addButton returns the graphics object directly for easy interaction, addChoiceButton
//returns the Button object and requires the getButton() function to make the button clickable.

//A class to define the different states (or "scenes") of the game;
//different backgrounds, text, buttons, etc.
class Scene {

    /**Some general setup functions for loading and adding images to the game window*/

    //load the background into the state. Take an image and its path as parameters
    setBackground(background, backgroundPath) {
        game.load.image(background, backgroundPath);
    }

    //add and scale the background. Take an image and a number as parameters. Make it interactable
    loadScene(background, scale) {
        background = game.add.image(0, 0, background);
        background.scale.setTo(scale);
        background.inputEnabled = true;

        return background;
    }

    //load the sprite image into the state. Take an image and its path as parameters
    setSprite(sprite, spritePath) {
        game.load.image(sprite, spritePath);
    }

    //add an interactive sprite to the game. Take the coordinates, image, and scale as parameters
    addSprite(x, y, sprite, scale) {
        //add the sprite and make it interactive
        sprite = game.add.sprite(x, y, sprite);
        sprite.scale.setTo(scale);
        sprite.inputEnabled = true;
        //when the mouse hovers over the sprite, a hand appears
        sprite.input.useHandCursor = true;

        return sprite;
    }

    //add a non-interactive sprite to the game. Take the coordinates image, and scale as parameters
    addStaticSprite(x, y, sprite, scale, anchorX, anchorY) {
        sprite = game.add.sprite(x, y, sprite);
        sprite.scale.setTo(scale);
        sprite.anchor.add(anchorX, anchorY);

        return sprite;
    }

    /**Functions for adding and editing the text bar. addTextBar sets up the bar for the scene,
     * while changeText allows it to be changed for further narration*/

    //add the text bar to the window with the appropriate settings. Takes a string as its parameter
    addTextBar(firstText) {
        //add the text bar and make it interactive
        textBar = game.add.graphics();
        textBar.beginFill(0x000000, 0.2);
        textBar.drawRect(0, 0, 1200, 100);
        textBar.inputEnabled = true;
        textBar.input.useHandCursor = true;

        //set the style of the font to be put in the text bar (this is used in multiple functions)
        style = {font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle"};

        //add the text to the center of the text bar and add a slight shadow underneath the text
        text = game.add.text(0, 0, firstText, style);
        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        text.setTextBounds(0, 0, 1200, 100);

        return textBar;

    }

    //change the text displayed in the text bar. Takes a string as its parameter
    changeText(newText) {
        text.kill();
        text = game.add.text(0, 0, newText, style);
        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        text.setTextBounds(0, 0, 1200, 100);

    }

    /**The function for adding a button to a scene. Used in-game to activate text sequences
     * and call other states*/

    //adds an "invisible button" to the window. For convenience, it takes a parameter (number) for the opacity,
    //along with the x and y coordinates, the length, and the width
    addButton(x, y, width, height, opacity) {
        fullButton = new Button(x, y, width, height, opacity);
        fullButton.add();
        button = fullButton.getButton();

        return button;
    }

    // adds a visible button with some text describing the player's available choice(s)
    addChoiceButton(x, y, width, height, choiceText) {
        choiceButton = new ChoiceButton(x, y, width, height, 0.2);
        choiceButton.add();
        choiceButton.addText(choiceText);

        return choiceButton;
    }

    //adds a button that does not turn the mouse into a hand when hovered over
    addHiddenButton(x, y, width, height, opacity) {
        hiddenButton = new Button(x, y, width, height, opacity);
        hiddenButton.add();
        button = hiddenButton.getButton();
        button.input.useHandCursor = false;

        return button;
    }

    /**All functions having to do with ellipses. addCircle creates each individual
     * circle shape, while addEllipses and removeEllipses deal with the pattern used
     * in the text box*/

    //adds a white circle to the canvas
    addCircle(x, y, width, height) {
        circle = game.add.graphics();
        circle.beginFill(0x999999, 5.0);
        circle.drawEllipse(x, y, width, height);
        return circle;
    }

    //uses "addCircle" to create an ellipsis, for use in indicating to the player that there is more text
    //to read
    addEllipses() {
        circle1 = this.addCircle(1130, 88, 8, 8);
        circle2 = this.addCircle(1155, 88, 8, 8);
        circle3 = this.addCircle(1180, 88, 8, 8);
    }

    //removes the ellipsis to indicate no further text
    removeEllipses() {
        if (circle1 != null) {
            circle1.kill();
            circle2.kill();
            circle3.kill();
        }
    }
}