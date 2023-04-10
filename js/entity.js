
var Entity = function Entity(x,y){
    this.x = x;
    this.y = y;
};

Entity.prototype = {
    x: null,
    y: null,
    nextAction : null,
    previousAction : null,
    char: "w",
    move: function(x,y){
        this.x = x;
        this.y = y;
    },
	update : function() {
        var dist = distance(this.x, this.y, player.x, player.y);
        var ai = rnd(1,6);
        if (dist < 4 && this.nextAction && this.nextAction.action !== 'follow') {
            this.nextAction.action = 'follow'
            this.nextAction.turns = rnd (5,10);
        } else if (this.nextAction) {
            this[this.nextAction.action]();
            this.nextAction.turns = this.nextAction.turns - 1; 
        } else { 
            this.nextAction = {};
            switch(ai) {
                case 1:
                    this.nextAction.action = 'up';
                    break;            
                case 2:
                    this.nextAction.action = 'down';
                    break;            
                case 3:
                    this.nextAction.action = 'left';
                    break;            
                case 4:
                    this.nextAction.action = 'right';
                    break;            
                default:
                    this.nextAction.action = 'wait';
                    break;
            }
            this.nextAction.turns = rnd (3,7);
        }
        if (this.nextAction.turns <= 0) this.nextAction = null;
        return;     
    },

	follow : function() {
		var x = this.x;
		var y = this.y;
		var newCoords = gamemap.getLowestDjikstra(x, y);
		if (gamemap.canMoveTo(newCoords.x,newCoords.y) && !player.isLocation(newCoords.x,newCoords.y)){
            this.move(newCoords.x,newCoords.y);
        }
    },

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
    wait: function(){
        return;
    },
    

};

