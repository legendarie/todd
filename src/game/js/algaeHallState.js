//establishing global variables
var hallbg = 'DestroyedReef';
var hallbgPath = 'assets/DestroyedReef.png';
var hallState;

//constructor setting up AlgaeHallState state as an extension of Scene
function AlgaeHallState() {
    Scene.call(this);
    AlgaeHallState.prototype = Object.create(Scene.prototype);

    //defining the changeText function
    AlgaeHallState.prototype.changeText = function() {
        if (clickCount < 2) {
            clickCount++;
            if (clickCount === 1) {
                AlgaeHallState.prototype.setNewText("Hi :D");
            }
        }
    }
}

//make an instance
hallState = new AlgaeHallState;

//attempt to use the instance so we can use the game.state.start command in index.html
var algaeHallState = {

    preload: function() {
        hallState.preload(hallbg, hallbgPath)
    },

    create: function () {
        hallState.create()
    }
}