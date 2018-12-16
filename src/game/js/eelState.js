var clickCount = 0;
var eelSprite;
var singleGem;
var textBar;
var alreadyBeenES = false; //boolean to check whether the player has been to this state or not

let eelScene = null;

//initialize the state
var eelState = {

    preload: function() {

        eelScene = new Scene;

        eelScene.setBackground('eelCavebg', 'assets/eelCavebg.png');

        eelScene.setSprite('eelWithAGun', 'assets/eelWithAGun.png');

        eelScene.setSprite('singleGem', 'assets/singleGem.png');

        clickCount = 0;

    },

    create: function() {

        eelScene.loadScene('eelCavebg', 0.477);

        eelSprite = eelScene.addStaticSprite(650, 240, 'eelWithAGun', 0.3, 0, 0);

        singleGem = eelScene.addSprite(285, 420, 'singleGem', 2.5);

        if (alreadyBeenES === false) {
            alreadyBeenES = true;

            eelScene.addTextBar('\"Howdy.\"');
            eelScene.addEllipses();
            textBar.events.onInputUp.add(this.changeText, this);
        } else {
            eelScene.addTextBar('\"I declare!\"');
            eelScene.addEllipses();
            textBar.events.onInputUp.add(this.afterGameText, this);
        }

    },

    changeText: function() {
        if (clickCount < 8) {
            clickCount++;
            if (clickCount === 1) {
                eelScene.changeText('\"I don\'t see many folks \'round these parts.\"');
            } else if (clickCount === 2) {
                eelScene.changeText('\"\'Specially since that rabble-rousing varmint showed up.\"');
            } else if (clickCount === 3) {
                eelScene.changeText('\"That fella was madder than a wet hen when he showed up...\"');
            } else if (clickCount === 4) {
                eelScene.changeText('\"I reckon yer fixin\' to find \'im, huh?\"');
            } else if (clickCount === 5) {
                eelScene.changeText('\"Well, as you prolly figured, I can\'t just letcha skeddadle.\"');
            } else if (clickCount === 6) {
                eelScene.changeText('\"I gotta make for certain yer fit as a fiddle.\"');
            } else if(clickCount === 7) {
                eelScene.changeText('\"If you can nix 150 gems, I\'ll shoot that ol\' gem there' +
                    ' and letcha pass.\"');
            } else {
                eelScene.changeText('\"Go ahead and head on up to the gem to get started.\"');
                eelScene.removeEllipses();
                singleGem.events.onInputUp.add(this.goToGame, this);
            }
        }
    },

    afterGameText: function() {
        if (clickCount < 8) {
            clickCount++;
            if (clickCount === 1) {
                eelScene.changeText('\"Well, stranger, I must say I\'m impressed with you.\"');
            } else if (clickCount === 2) {
                eelScene.changeText('\"You finished that puzzle like water off a duck\'s back.\"');
            } else if (clickCount === 3) {
                eelScene.changeText('\"Now it\'s plain as day that yer ready your feud.\"')
            } else if (clickCount === 4) {
                eelScene.changeText('\"Lemme take out this gem for ya, so you can get on with it.\"');
            } else if (clickCount === 5) {
                eelScene.changeText('With a sharp pop, the eel shot the gem blocking the cave, shattering it.');
            } else if (clickCount === 6) {
                singleGem.kill();
                eelScene.changeText('\"Good luck, stranger. Also, could you give that varmint' +
                    ' a message for me?\"');
            } else if (clickCount === 7) {
                eelScene.changeText('\"Tell \'im he can stick that hammer of his where the sun don\'t shine!\"');
            } else {
                eelScene.changeText('\"Thanks, pardner.\"');
                eelScene.removeEllipses();
                this.exitButton();
            }
        }
    },

    exitButton: function() {
        var caveButton = eelScene.addButton(285, 375, 170, 180, 0);
        caveButton.events.onInputUp.add(this.changeState, this);
    },


    goToGame: function() {
        game.state.start('gemGame2');
    },

    changeState: function() {
        game.state.start('penguinPuzzleState');
    }

};