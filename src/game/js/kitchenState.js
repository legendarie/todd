var textBar;
let kitchenScene = null;

var kitchenState = {

    /** The initial function to set up the scene for player interaction */

    preload: function() {

        //create a new instance of Scene
        kitchenScene = new Scene;

        //load the background image into the state
        kitchenScene.setBackground('kitchen', 'assets/kitchenbg.jpg');

    },

    /** This function adds the starting visual elements to the scene. In this scene, there is the background
     * and a text bar, plus ellipses to indicate to the player that there is more text */

    create: function() {

        //add background to the state and scale it
        kitchenScene.loadScene('kitchen', 1.3);

        //add explanatory text and ellipses
        kitchenScene.addTextBar('You are in someone\'s kitchen. You wonder whose it is.');
        kitchenScene.addEllipses();
        textBar.events.onInputUp.add(this.changeText, this);

    },

    /** Updates the text in the text bar to explain the scene to the player. Then, call the addButtons function */

    changeText: function() {

        kitchenScene.changeText('There\'s a list on the fridge door, and the pantry door seems '
            + 'to be unlocked.');
        kitchenScene.removeEllipses();
        this.addButtons();
    },

    /** Adds the buttons on the fridge and the pantry door into the scene. If the fridge door is clicked,
     * the viewList function is called. If the pantry is clicked, the enterPantry function is called. */

    addButtons: function() {

        //add button on the fridge
        var fridgeButton = kitchenScene.addButton(80, 200, 100, 440, 0);

        //add button on the pantry
        var pantryButton = kitchenScene.addButton(280, 80, 150, 350, 0);

        //when the fridgeButton is pressed, call the viewList function
        fridgeButton.events.onInputUp.add(this.viewList, this);

        //when the pantryButton is pressed, call the enterPantry function
        pantryButton.events.onInputUp.add(this.enterPantry, this);
    },

    /** Change the game state to viewListState */

    viewList: function() {
        game.state.start('viewListState');
    },

    /** Change the game state to pantryPuzzleState */

    enterPantry: function() {
        game.state.start('pantryPuzzleState');
    }

};