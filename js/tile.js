console.log("Loading Tile");
var tileId = 0;

var Tile = function Tile(x,y,type){
    this.x = x;
    this.y = y;
    this.type = type;
    this.id = tileId++;

    var Properties = Tile.Types[type];
    addProperties(this, Properties);
};

Tile.prototype = {
    x : null,
    y : null,
	type : null,
	name: null,
    id: null,
    explored : false,
    passable : false,
    seethrough : true,
    char : null,
    onEnter : function(){},
    onExit : function(){},
    onMoveTo : function(){},
};

Tile.Types = {
    floor: {
        name: 'Floor',
        char: '.',
        passable: true,
        seethrough: true,
    },
    wall: {
        name: 'Wall',
        char: '#',
        passable: false,
        seethrough: false,
    }
};

