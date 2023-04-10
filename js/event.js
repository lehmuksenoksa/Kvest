console.log("Loading Events");
var gamemap = new Map();
var kartta = generateCave(20,30);
gamemap.loadTilemapFromArray(kartta);
gamemap.resetDjikstra();
const fovrad = 3;
var fov = [];
var explored = [];
var entities = [];
let start = gamemap.startPosition();
let enemy = gamemap.randomPosition();
var player = new Player(start.x,start.y);
entities[0] = new Entity(enemy.x,enemy.y);

function update(action){
    var execute = action || 'wait';
    player[execute]();
	entities[0].update();
    render(gamemap,player,entities);
};

function init(){
    update();
};

init();


