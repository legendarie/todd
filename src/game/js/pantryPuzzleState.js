let pantryPuzzle = null;

var pantryPuzzleState = {

    preload: function() {

        pantryPuzzle = new Scene;

        pantryPuzzle.setBackground('pantry', 'assets/pantrybg.jpg');
    },

    create: function() {

        pantryPuzzle.loadScene('pantry', 0.8);

        var orangeSoda = pantryPuzzle.addButton(640, 60, 40, 100, 0);
        var pizzaSauce = pantryPuzzle.addButton(470, 580, 55, 70, 0);
        var paperTowels = pantryPuzzle.addButton(900, 15, 50, 100, 0);
        var spices = pantryPuzzle.addButton(170, 230, 175, 50, 0); //change?
        var popcorn = pantryPuzzle.addButton(560, 360, 50, 40, 0);
        var trashBags = pantryPuzzle.addButton(905, 10, 45, 95, 0);

    }
};