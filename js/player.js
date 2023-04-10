console.log("Loading Player");

var Player = function Player(x,y){
    this.x = x;
    this.y = y;
};

Player.prototype = {
    x: null,
    y: null,
    char: "@",
    move: function(x,y){
        this.x = x;
        this.y = y;
		gamemap.resetDjikstra();
		gamemap.djikstra[x][y] = 0;
		gamemap.djikstra = calculateDjikstra(gamemap.djikstra);
    },
    /* draw: function() {
        ctx.clearRect(this.x,this.y, tileSize, tileSize);
        ctx.fillText(this.char, this.x*15+offsetX, this.y*15+offsetY);
    },
    clear: function() {
        ctx.clearRect(this.x,this.y, tileSize, tileSize);
    }, */
    up : function() {
        let newX = this.x;
        let newY = this.y - 1;
        if (gamemap.canMoveTo(newX,newY)){
            this.move(newX, newY);
        }
    },
    down : function() {
        let newX = this.x;
        let newY = this.y + 1;
        if (gamemap.canMoveTo(newX,newY)){
            this.move(newX, newY);
        }
    },
    left : function() {
        let newX = this.x - 1;
        let newY = this.y;
        if (gamemap.canMoveTo(newX,newY)){
            this.move(newX, newY);
        }
    },
    right : function() {
        let newX = this.x + 1;
        let newY = this.y;
        if (gamemap.canMoveTo(newX,newY)){
            this.move(newX, newY);
        }
    },
    wait : function() {
        return;
    },
    isLocation : function(x,y) {
		return (this.x === x && this.y === y);
    },
};

