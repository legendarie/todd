//establish the global variables
var clickCount;
var textBar;

//various buttons
var leftAnswer;
var rightAnswer;
var middleAnswer;
var slate;
var passage;

//booleans for whether the left, right, or middle answers are the correct answers
var leftCorrect;
var rightCorrect;
var middleCorrect;

//a check for whether the player chose the right answer
var isCorrect = false;

//a counter to keep track of what riddle the player is on
var riddleCounter;

//tallies up how many riddles the player got correct
var riddlesCorrect;

let riddleRoomScene = null;

//initialize the state
var riddleRoomState = {

    /**The initial functions to set up the scene for player interaction*/

    preload: function() {
        //declare scene to be an instance of a Scene, and load in the background image to the state
        riddleRoomScene = new Scene;
        riddleRoomScene.setBackground('riddleRoombg', 'assets/riddleRoombg.png');

        //reset the global clickCount variable
        clickCount = 0;
    },

    create: function() {
        //check to make sure the scene variable is not null
        if (riddleRoomScene != null) {

            //set it up so that the first riddle is run through
            riddleCounter = 1;

            riddlesCorrect = 0;

            //load the background and scale it
            riddleRoomScene.loadScene('riddleRoombg', 0.32);

            //add the text bar (with all universal settings), with the first line of text
            riddleRoomScene.addTextBar('You see a stone slate carved with the phrase, "What Am I?"');

            //when the text bar is clicked, go to the changeText function
            this.slateButton();
        }
    },

    /**All of the functions that change the text in the text box:*/

    readyNextRiddle: function() {
        //remove the choice buttons from the screen
        leftAnswer.kill();
        rightAnswer.kill();
        middleAnswer.kill();

        //inform the player if they chose the correct answer
        if (isCorrect === true) {
            riddleRoomScene.changeText("Correct.");
        } else {
            riddleRoomScene.changeText("...Incorrect.");
        }

        riddleRoomScene.addEllipses();

        //reset the player's "correct answer"
        isCorrect = false;

        //decide whether to pull up the next riddle, or end the scene
        if (riddleCounter === 10) {
            textBar.events.onInputUp.remove(this.nextRiddle, this);
            textBar.events.onInputUp.add(this.endScript, this);
        } else {
            //ready the slate for the next riddle
            textBar.events.onInputUp.add(this.nextRiddle, this);
        }
    },

    nextRiddle: function() {
        textBar.events.onInputUp.remove(this.nextRiddle, this);
        slate.events.onInputUp.remove(this.nextRiddle, this);
        riddleRoomScene.removeEllipses();

        //depending on which riddle the game is on, the text on the slate will change
        if (riddleCounter === 1) {
            riddleRoomScene.changeText('"I can be the sun, I can be sand, and I can be a bird. What am I?"');
        } else if (riddleCounter === 2) {
            riddleRoomScene.changeText('"I can point to any destination, but I cannot get there myself. What am I?"');
        } else if (riddleCounter === 3) {
            riddleRoomScene.changeText('"I can run, but I cannot walk. What am I?"');
        } else if (riddleCounter === 4) {
            riddleRoomScene.changeText('"I am often bright, but I shed no light. What am I?"')
        } else if (riddleCounter === 5) {
            riddleRoomScene.changeText('"I am always falling, but never breaking. What am I?"')
        } else if (riddleCounter === 6) {
            riddleRoomScene.changeText('"I will destroy this world. Who am I?"')
        } else if (riddleCounter === 7) {
            riddleRoomScene.changeText('"I should never have walked through that door. Who am I?"')
        } else if (riddleCounter === 8) {
            riddleRoomScene.changeText('"I am a filthy intruder. Who am I?"')
        } else if (riddleCounter === 9) {
            riddleRoomScene.changeText('"I will die in this cave. Who am I?"')
        }

        //set what the answers are
        this.setAnswers();
    },

    setAnswers: function() {

        //reset which answers are correct
        this.resetCorrectAnswers();

        //check which riddle the player is on, and set the appropriate answers/correct answers
        if (riddleCounter === 1) {
            this.leftAnswerButton();
            this.rightAnswerButton();
            this.middleAnswerButton();
        } else {
            if (riddleCounter === 2) {
                leftAnswer.setLabel("A finger");
                rightAnswer.setLabel("A compass");
                middleAnswer.setLabel("A clue");

                leftCorrect = true;
            }
            if (riddleCounter === 3) {
                leftAnswer.setLabel("A foot");
                rightAnswer.setLabel("An ear");
                middleAnswer.setLabel("A mouth");

                middleCorrect = true;
            }
            if (riddleCounter === 4) {
                leftAnswer.setLabel("Metal");
                rightAnswer.setLabel("My future");
                middleAnswer.setLabel("The moon");

                middleCorrect = true;
            }
            if (riddleCounter === 5) {
                leftAnswer.setLabel("Night");
                rightAnswer.setLabel("Day");
                middleAnswer.setLabel("Rain");

                leftCorrect = true;
            }
            if (riddleCounter === 6) {
                leftAnswer.setLabel("A man");
                rightAnswer.setLabel("Neither");
                middleAnswer.setLabel("A monster");

                rightCorrect = true;
            }
            //the last three questions ll have the same answers
            if (riddleCounter === 7 || riddleCounter === 8 || riddleCounter === 9) {
                leftAnswer.setLabel("Me");
                rightAnswer.setLabel("Me");
                middleAnswer.setLabel("Me");

                leftCorrect = true;
                rightCorrect = true;
                middleCorrect = true;
            }

            //return the buttons to the screen
            leftAnswer.revive();
            rightAnswer.revive();
            middleAnswer.revive();

            //set up the buttons to respond in a certain way when clicked,
            // depending on if they are correct
            this.setCorrectAnswers();
        }

        //always increment the riddle that the player is on
        riddleCounter++;
    },

    setCorrectAnswers: function() {
        //set whether the button will bring up the "correct" response
        if (leftCorrect === true) {
            leftAnswer.getButton().events.onInputUp.add(this.correct, this);
        } else {
            leftAnswer.getButton().events.onInputUp.add(this.readyNextRiddle, this);
        }
        if (rightCorrect === true) {
            rightAnswer.getButton().events.onInputUp.add(this.correct, this);
        } else {
            rightAnswer.getButton().events.onInputUp.add(this.readyNextRiddle, this);
        }
        if (middleCorrect === true) {
            middleAnswer.getButton().events.onInputUp.add(this.correct, this);
        } else {
            middleAnswer.getButton().events.onInputUp.add(this.readyNextRiddle, this);
        }
    },

    correct: function() {
        //sets the "player got the answer right" check to true
        isCorrect = true;

        //increase the riddlesCorrect (if the riddlesCorrect hits 5, a bonus scene is added)
        riddlesCorrect++;

        this.readyNextRiddle();
    },

    resetCorrectAnswers: function() {
        //reset the booleans determining which answers are correct
        leftCorrect = false;
        rightCorrect = false;
        middleCorrect = false;
    },

    endScript: function() {
        //only increment the click count twice
        if (clickCount < 2) {
            clickCount++;
            if (clickCount === 1) {
                riddleRoomScene.changeText('"...You have answered all of my riddles."');
            } else {
                //change the text in the text bar, then create the exit button
                riddleRoomScene.removeEllipses();
                riddleRoomScene.changeText('"You may pass."');
                this.exitButton();
            }
        }
    },

    /**All of the functions that create interactive buttons:
     * slateButton creates the button to begin the riddles
     * leftAnswerButton creates the left of the three options
     * rightAnswerButton creates the right of the three options
     * middleAnswerButton creates the center option
     * exitbutton creates the button that ends the state*/

    slateButton: function() {
        //creates the button over the riddle slate
        slate = riddleRoomScene.addButton(805, 280, 190, 225, 0);
        slate.events.onInputUp.add(this.nextRiddle, this);
    },

    leftAnswerButton: function() {
        //creates the leftmost choice button with the first answer set to it
        leftAnswer = riddleRoomScene.addChoiceButton(100, 500, 325, 100, "A plant");
        leftAnswer.getButton().events.onInputUp.add(this.readyNextRiddle, this);
    },

    rightAnswerButton: function() {
        //creates the rightmost choice button with the first answer set to it
        rightAnswer = riddleRoomScene.addChoiceButton(800, 500, 325, 100, "The color red");
        rightAnswer.getButton().events.onInputUp.add(this.readyNextRiddle, this);
    },

    middleAnswerButton: function() {
        //creates the middle choice button with the first answer set to it
        middleAnswer = riddleRoomScene.addChoiceButton(450, 500, 325, 100, "A clock");
        middleAnswer.getButton().events.onInputUp.add(this.correct, this);
    },

    exitButton: function() {
        //creates the button over the open passage to switch scenes
        passage = riddleRoomScene.addButton(225, 100, 300, 375, 0);

        //if the player got at least eight riddles correct,
        //set up algaeDudeState as the next state
        if (riddlesCorrect >= 8) {
            passage.events.onInputUp.add(this.changeStateAlgae, this);
        } else {
            passage.events.onInputUp.add(this.changeStateGarden, this);
        }
    },

    /**The functions that switch to the next state, of which there are two*/

    changeStateGarden: function() {
        //change states to the garden if the player failed too many riddles
        nextState = 'transitionCaveState';
        game.state.start('transitionCaveState');
    },

    changeStateAlgae: function() {
        //change states to mort's cave if enough riddles were answered correctly
        nextState = 'algaeDudeState';
        game.state.start('algaeDudeState');
    }
};