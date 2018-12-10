var GEM_SIZE = 64;
var GEM_SPACING = 2;
var GEM_SIZE_SPACED = GEM_SIZE + GEM_SPACING;
var BOARD_COLS;
var BOARD_ROWS;
var MATCH_MIN = 3; // min number of same color gems required in a row to be considered a match

var gems;
var selectedGem = null;
var selectedGemStartPos;
var selectedGemTween;
var tempShiftedGem = null;
var allowInput;

var gemGame2 = {
    preload: function() {
        game.load.spritesheet('gems','assets/diamonds32x5.png',GEM_SIZE,GEM_SIZE);
    },

    create: function() {
        this.spawnBoard();
        selectedGemStartPos={x:0,y:0};
        allowInput = false;
        // game.input.addMoveCallback(this.slideGem,this);
    },

    spawnBoard: function() {
        BOARD_COLS = Math.floor(game.world.width/GEM_SIZE_SPACED);
        BOARD_ROWS = Math.floor(game.world.height/GEM_SIZE_SPACED);
        gems = game.add.group();

        for(var i = 0; i<BOARD_COLS; i++) {
            for (var j = 0; j < BOARD_ROWS; j++) {
                var gem = gems.create(i * GEM_SIZE_SPACED, j * GEM_SIZE_SPACED, 'gems');
                gem.name = 'gem' + i.toString() + 'x' + j.toString();
                gem.inputEnabled = true;
                this.randomizeGemColor(gem);
                gem.events.onInputDown.add(this.selectGem,this);
                // gem.events.onInputUp.add(this.releaseGem,this);
                this.setGemPosition(gem,i*GEM_SIZE_SPACED,j*GEM_SIZE_SPACED);

            }
        }
    },

    randomizeGemColor: function(gem) {
        gem.frame = game.rnd.integerInRange(0,gem.animations.frameTotal - 1);
    },

    selectGem: function(gem) {
        if (selectedGem == null && tempShiftedGem == null) {
            selectedGem = gem;
            selectedGemStartPos.x = gem.x;
            selectedGemStartPos.y = gem.y;
        }
        else if(selectedGem != null && tempShiftedGem == null){
            tempShiftedGem = gem;
            this.slideGem();
        }
        else{
            selectedGem = gem;
            selectedGemStartPos.x = gem.x;
            selectedGemStartPos.y = gem.y;
            tempShiftedGem = null;
        }
    },

    releaseGem: function() {

        var canKill = this.checkAndKillGemMatches(selectedGem);
        canKill = this.checkAndKillGemMatches(tempShiftedGem) || canKill;

        if(!canKill){
            if(selectedGemTween !== null){
                game.tweens.removeAll();
            }

            selectedGemTween = this.tweenGemPos(selectedGem,this.getGemPos(selectedGemStartPos.x),this.getGemPos(selectedGemStartPos.y));
            this.tweenGemPos(tempShiftedGem,this.getGemPos(selectedGem.x),this.getGemPos(selectedGem.y));
            this.swapGemPosition(selectedGem,tempShiftedGem);
        }
        selectedGem = null;
        tempShiftedGem = null;

        // this.removeKilledGems();
        this.dropGems();
    },

    // removeKilledGems: function(){
    //     gems.forEach(function(gem){
    //         if(!gem.alive){
    //             this.setGemPosition(gem,-1,-1);
    //         }
    //     })
    // },

    swapGemPosition: function(gem1,gem2){
        tempX = gem1.x;
        tempY = gem1.y;
        this.setGemPosition(gem1,gem2.x,gem2.y);
        this.setGemPosition(gem2,tempX,tempY);
    },

    setGemPosition: function(gem,x,y){
        gem.x = x;
        gem.y = y;
        gem.identification = this.getGemID(Math.floor(x/GEM_SIZE_SPACED),Math.floor(y/GEM_SIZE_SPACED));
    },

    tweenGemPos: function(gem,newx,newy,durationMultiplier){
        if(durationMultiplier === null || typeof durationMultiplier == 'undefined'){
            durationMultiplier = 1;
        }
        var newTween = game.add.tween(gem);

        newTween.to({x:newx*GEM_SIZE_SPACED,y:newy*GEM_SIZE_SPACED},200*durationMultiplier,Phaser.Easing.Linear.None,true);


    },

    checkAndKillGemMatches: function(gem){
        if(gem == null) {return;}
        var canKill = false;

        var countUp = this.countSameColorGem(gem,0,-1);
        var countDown = this.countSameColorGem(gem,0,1);
        var countRight = this.countSameColorGem(gem,1,0);
        var countLeft = this.countSameColorGem(gem,-1,0);

        var countHoriz = countLeft + countRight + 1;
        var countVert = countUp + countDown + 1;

        if (countVert >= MATCH_MIN) {
            this.killGemRange(this.getGemPos(gem.x),this.getGemPos(gem.y)-countUp,this.getGemPos(gem.x),this.getGemPos(gem.y)+countDown);
            canKill = true;
        }

        if (countHoriz >= MATCH_MIN) {
            this.killGemRange(this.getGemPos(gem.x)-countLeft,this.getGemPos(gem.y),this.getGemPos(gem.x)+countRight,this.getGemPos(gem.y));
            canKill = true;
        }
        return canKill;
    },

    killGemRange: function(fromX,fromY,toX,toY){
        for(var i = fromX; i<=toX; i++){
            for(var j = fromY; j<=toY; j++){
                var gem = this.getGem(i,j);
                gem.kill();
                console.log(gem.name);
            }
        }
    },

    countSameColorGem: function(gem,horiz,vert){
        var curY = this.getGemPos(gem.y) + vert;
        var curX = this.getGemPos(gem.x) + horiz;
        var count = 0;

        while(curX >= 0 && curY >= 0 && curX<BOARD_COLS && curY<BOARD_ROWS && this.getGemColor(gem) === this.getGemColor(this.getGem(curX,curY))){
            count++;
            curY += vert;
            curX += horiz;
        }
        return count;
    },

    getGemID: function(x, y) {
        var id = (x + y*BOARD_COLS);
        return id;
    },

    getGem: function(x,y) {
        var gemm = (gems.iterate('identification',this.getGemID(x,y),Phaser.Group.RETURN_CHILD));
        return gemm;


    },

    getGemColor: function(gem){
        return gem.frame;
    },

    slideGem: function(){

        var TemPosX = this.getGemPos(tempShiftedGem.x);
        var TempPosY = this.getGemPos(tempShiftedGem.y);

        if(this.checkIfGemCanBeMovedHere(this.getGemPos(selectedGemStartPos.x),this.getGemPos(selectedGemStartPos.y),TemPosX,TempPosY)){
            if(TemPosX != this.getGemPos(selectedGem.x) || TempPosY != this.getGemPos(selectedGem.y)){

                if(selectedGemTween!=null){
                    game.tweens.removeAll();
                }
                selectedGemTween = this.tweenGemPos(selectedGem,TemPosX,TempPosY);
                gems.bringToTop(selectedGem);


                this.tweenGemPos(tempShiftedGem,this.getGemPos(selectedGem.x),this.getGemPos(selectedGem.y));
                this.swapGemPosition(tempShiftedGem,selectedGem);

                var timer = game.time.events.add(Phaser.Timer.SECOND * 0.3, this.releaseGem, this);

            }

        }

    },

    checkIfGemCanBeMovedHere: function(fromx,fromy,tox,toy){
        if(fromx<0||tox>BOARD_COLS||fromy<0||toy>BOARD_ROWS){
            return false;
        }

        if(fromx === tox && fromy>=toy-1 && fromy<=toy+1){
            return true;
        }

        if(fromy === toy && fromx>=tox-1 && fromx<=tox+1){
            return true;
        }
        return false;

    },

    getGemPos: function(coordinate){
        return Math.floor(coordinate/GEM_SIZE_SPACED);
    },

    dropGems: function(){
        console.log('called')
        for(var i = 0; i< BOARD_COLS;i++){
            var dropRows = 0;
            for(var j = BOARD_ROWS-1;j>=0;j--){

                var gem = this.getGem(i,j);
                if (gem == null){
                    dropRows++;
                }
                else if(dropRows >0){
                    this.setGemPosition(gem,x,y+dropRows);
                    this.tweenGemPos(gem,x,this.getGemPos(y),dropRows);
                }
            }
        }
   }
};