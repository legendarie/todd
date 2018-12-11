//establish the global variables
var clickCount;
var textBar;

var leftAnswer;
var rightAnswer;
var middleAnswer;
var thing;
var slate;

var leftCorrect;
var rightCorrect;
var middleCorrect;

var isCorrect = false;
var riddleCounter;

var score;

let riddleRoomScene = null;

//initialize the state
var riddleRoomState = {

    /**The initial functions to set up the scene for player interaction*/

    preload: function() {
        //declare scene to be an instance of a Scene, and load in the background image to the state
        riddleRoomScene = new Scene;
        riddleRoomScene.setBackground('riddleRoombg', 'assets/attackPenguin.png');

        //reset the global clickCount variable
        clickCount = 0;
    },

    create: function() {
        //check to make sure the scene variable is not null
        if (riddleRoomScene != null) {

            //set it up so that the first riddle is run through
            riddleCounter = 1;

            score = 0;

            //load the background and scale it
            riddleRoomScene.loadScene('riddleRoombg', 0.6);

            //add the text bar (with all universal settings), with the first line of text
            riddleRoomScene.addTextBar("You see a stone slate carved with a short phrase.");

            //when the text bar is clicked, go to the changeText function
            this.slateButton();
        }
    },

    /**All of the functions that change the text in the text box:*/

    readySlate: function() {

        //remove the answers from the screen
        leftAnswer.kill();
        rightAnswer.kill();
        middleAnswer.kill();

        //inform the player if they chose the correct answer
        if (isCorrect === true) {
            riddleRoomScene.changeText("Correct.");
        } else {
            riddleRoomScene.changeText("...Incorrect.");
        }

        //reset the player's "correct answer"
        isCorrect = false;

        //ready the slate for the next riddle
        slate.events.onInputUp.add(this.nextRiddle, this);
    },

    nextRiddle: function() {
        slate.events.onInputUp.remove(this.nextRiddle, this);
        riddleRoomScene.addEllipses();

        //depending on which riddle the game is on, the text on the slate will change
        if (riddleCounter === 1) {
            riddleRoomScene.changeText('"I can be the sun, I can be sand, and I can be a bird."');
        } else if (riddleCounter === 2) {
            riddleRoomScene.changeText('"I can point to any destination, but I cannot get there myself."');
        } else if (riddleCounter === 3) {
            riddleRoomScene.changeText('"I am often bright, but I shed no light."');
        }
        textBar.events.onInputUp.add(this.continueRiddle, this);
    },

    continueRiddle: function() {
        textBar.events.onInputUp.remove(this.continueRiddle, this);
        riddleRoomScene.changeText('"What am I?"');
        riddleRoomScene.removeEllipses();

        this.resetCorrectAnswers();

        if (riddleCounter === 1) {
            this.leftAnswerButton();
            this.rightAnswerButton();
            this.middleAnswerButton();
        } else {
            if (riddleCounter === 2) {
                leftAnswer.setLabel("A finger");
                rightAnswer.setLabel("A sign");
                middleAnswer.setLabel("A compass");

                leftCorrect = true;
            }
            if (riddleCounter === 3) {
                leftAnswer.setLabel("A person");
                rightAnswer.setLabel("Your future");
                middleAnswer.setLabel("The moon");


            }

            //return the answers to the screen
            leftAnswer.revive();
            rightAnswer.revive();
            middleAnswer.revive();
            this.setCorrectAnswers();
        }
        riddleCounter++;
    },

    setCorrectAnswers: function() {
        if (leftCorrect === true) {
            leftAnswer.getButton().events.onInputUp.add(this.correct, this);
        } else {
            leftAnswer.getButton().events.onInputUp.add(this.readySlate, this);
        }
        if (rightCorrect === true) {
            rightAnswer.getButton().events.onInputUp.add(this.correct, this);
        } else {
            rightAnswer.getButton().events.onInputUp.add(this.readySlate, this);
        }
        if (middleCorrect === true) {
            middleAnswer.getButton().events.onInputUp.add(this.correct, this);
        } else {
            middleAnswer.getButton().events.onInputUp.add(this.readySlate, this);
        }
    },

    correct: function() {
        isCorrect = true;

        //increase the score (if the score hits 5, a bonus scene is added)
        score++;

        this.readySlate();
    },

    resetCorrectAnswers: function() {
        leftCorrect = false;
        rightCorrect = false;
        middleCorrect = false;
    },

    /**All of the functions that create interactive buttons:*/

    slateButton: function() {
        slate = riddleRoomScene.addButton(800, 200, 150, 300, 0.2);
        slate.events.onInputUp.add(this.nextRiddle, this);
    },

    leftAnswerButton: function() {
        leftAnswer = riddleRoomScene.addChoiceButton(100, 500, 325, 100, "A mirror");
        leftAnswer.getButton().events.onInputUp.add(this.readySlate, this);
    },

    rightAnswerButton() {
        rightAnswer = riddleRoomScene.addChoiceButton(800, 500, 325, 100, "The color red");
        rightAnswer.getButton().events.onInputUp.add(this.readySlate, this);
    },

    middleAnswerButton() {
        middleAnswer = riddleRoomScene.addChoiceButton(450, 500, 325, 100, "A clock");
        middleAnswer.getButton().events.onInputUp.add(this.correct, this);
    },

    /**The function that switches to the next state, of which there are...*/

    changeState: function() {
        //change states to the next state
        nextState = 'algaeDudeState';
        game.state.start('algaeDudeState');
    }
};