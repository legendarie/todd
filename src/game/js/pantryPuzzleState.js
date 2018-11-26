var orangeSoda;
var pizzaSauce;
var paperTowels;
var spices1;
var spices2;
var spices3;
var popcorn;
var trashBags;
var score = 0;
var returnButton;
var scoreText;
var foundItems = [];   //array to keep track of the items that have already been found
var allItemsFound = false;  //boolean variable to see if all 8 items have been found
let pantryPuzzle = null;

var pantryPuzzleState = {

    /** The initial function to set up the scene for player interaction */

    preload: function() {

        pantryPuzzle = new Scene;

        pantryPuzzle.setBackground('pantry', 'assets/pantrybg.jpg');
    },

    /** Add the visual elements to the scene, and have the first instances of player interaction */

    create: function() {

        //add the background to the scene
        pantryPuzzle.loadScene('pantry', 0.8);

        //add the text to the scene, style it, and add a shadow underneath it
        scoreText = game.add.text(0, 0, 'Items found: ' + score + ' of 8', {font: "bold 38px Arial", fill: "#fff"});
        scoreText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

        //add the hidden items that the player has to find to the scene, if they have not already been found.
        //If they have already been found, then they are not added to the scene again. The foundItems array
        //keeps track of which items have been found even if the player returns to the kitchen
        if (!foundItems.includes(orangeSoda)) {
            orangeSoda = pantryPuzzle.addHiddenButton(640, 60, 40, 100, 0);
        }
        if (!foundItems.includes(pizzaSauce)) {
            pizzaSauce = pantryPuzzle.addHiddenButton(410, 580, 120, 70, 0);
        }
        if (!foundItems.includes(paperTowels)) {
            paperTowels = pantryPuzzle.addHiddenButton(905, 10, 45, 95, 0);
        }
        if (!foundItems.includes(spices1)) {
            spices1 = pantryPuzzle.addHiddenButton(170, 230, 175, 50, 0);
        }
        if (!foundItems.includes(spices2)) {
            spices2 = pantryPuzzle.addHiddenButton(570, 95, 55, 95, 0);
        }
        if (!foundItems.includes(spices3)) {
            spices3 = pantryPuzzle.addHiddenButton(790, 360, 160, 50, 0);
        }
        if (!foundItems.includes(popcorn)) {
            popcorn = pantryPuzzle.addHiddenButton(560, 360, 50, 40, 0);
        }
        if (!foundItems.includes(trashBags)) {
            trashBags = pantryPuzzle.addHiddenButton(970, 490, 100, 80, 0);
        }

        //add the button that returns the player to the kitchenState
        returnButton = pantryPuzzle.addChoiceButton(900, 600, 275, 80, 'Return to kitchen');

        //listens to the buttons of the hidden items, and calls the foundItem function if one is clicked
        //(if the buttons of the hidden items are on the screen)
        orangeSoda.events.onInputUp.add(this.foundItem, this);
        pizzaSauce.events.onInputUp.add(this.foundItem, this);
        paperTowels.events.onInputUp.add(this.foundItem, this);
        spices1.events.onInputUp.add(this.foundItem, this);
        spices2.events.onInputUp.add(this.foundItem, this);
        spices3.events.onInputUp.add(this.foundItem, this);
        popcorn.events.onInputUp.add(this.foundItem, this);
        trashBags.events.onInputUp.add(this.foundItem, this);

        //listens to the button that returns the player to the kitchenState, and calls the returnToKitchen
        //function if it is clicked
        returnButton.getButton().events.onInputUp.add(this.returnToKitchen, this);

    },

    /** Keeps track of which items have been found and keeps track of the score (how many items the player
     * has found) */

    foundItem: function(item) {

        //removes the score text from the screen, and removes the button of the hidden item that was clicked
        scoreText.kill();
        item.kill();

        //increment the score and display the score
        score++;
        scoreText = game.add.text(0, 0, 'Items found: ' + score + ' of 8', {font: "bold 38px Arial",
            fill: "#fff"});
        scoreText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

        //call the doNotRegenerate function for this item
        this.doNotRegenerate(item);

        //iff all of the items have been found
        if (score === 8) {

            allItemsFound = true;
            //remove the scoreText, and replace it with green text to indicate to the player that they have found
            //all of the items
            scoreText.kill();
            scoreText = game.add.text(0, 0, 'Items found: ' + score + ' of 8', {font: "bold 38px Arial",
                fill: "#00CC00"});
            scoreText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

            //once the returnButton is clicked, call the returnToKitchen funciton
            returnButton.getButton().events.onInputUp.add(this.returnToKitchen, this);
        }
    },

    /** Adds the found item to the foundItems array, then returns the array */

    doNotRegenerate: function(item) {

        foundItems.push(item);

        return foundItems;
    },

    /** Change the game state back to kitchenState */

    returnToKitchen: function() {
        game.state.start('kitchenState');
    }
};