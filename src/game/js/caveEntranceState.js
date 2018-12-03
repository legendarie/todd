var clickCount;
var textBar;
let caveEntrance = null;

var caveEntranceState = {

    preload: function() {

        caveEntrance = new Scene;

        caveEntrance.setBackground('caveEntranceBg', 'assets/caveEntrance.png');

        clickCount = 0;
    },

    create: function() {

        if (caveEntrance != null) {

            //load the background and scale it
            caveEntrance.loadScene('caveEntranceBg', 0.5);

            //add the text bar (with all universal settings), with the first line of text
            caveEntrance.addTextBar("The path ends in a large cave entrance in the cliff.");

            //add a set of ellipses to the text box to indicate
            //further messages
            caveEntrance.addEllipses();

            //when the text bar is clicked, go to the changeText function
            textBar.events.onInputUp.add(this.changeText, this);
        }
    },

    changeText: function() {
        if (clickCount < 3) {
            clickCount++;
            if (clickCount === 1) {
                caveEntrance.changeText("You can't see what is waiting for you in the cave.");
            } else if (clickCount === 2) {
                caveEntrance.changeText("You're not too thrilled about the idea of venturing into the darkness.");
            } else  {
                caveEntrance.changeText("But it doesn't look like you really have a choice.");
                caveEntrance.removeEllipses();
                this.enterCaveButton();
            }
        }
    },

    enterCaveButton: function() {
        var caveEntranceButton = caveEntrance.addButton(560, 250, 340, 350, 0);
        caveEntranceButton.events.onInputUp.add(this.changeState, this);
    },

    changeState: function() {
        game.state.start('caveStartState');
    }

};