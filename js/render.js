console.log("Loading Render");
var offsetX = 4;
var offsetY = 13;
var tileSize = 18;
var defaultBgColor = '#000';
var defaultFgColor = '#fff';
var fovBgColor = '#220';
var c = document.getElementById("map");
var ctx = setupCanvas(c);

function setupCanvas(canvas) {
    var dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width  = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    var ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.font = tileSize + "px 'Courier Prime'";
    return ctx;
};

function renderCharTile(x,y,char, fgcolor, bgcolor){
    ctx.fillStyle = bgcolor || defaultBgColor;
    ctx.fillRect(x*tileSize, y*tileSize, tileSize+1, tileSize+1);    
    ctx.fillStyle = fgcolor || defaultFgColor;
    ctx.fillText(char, x*tileSize+offsetX, y*tileSize+offsetY);
};

function renderPlayer(player){
    renderCharTile(player.x, player.y, player.char, 'white', '#440');
};

function renderEntities(list,fov){
	if (!list) return;
	for (let i = 0; i < list.length; i++){
		if (gamemap.visible[list[i].x][list[i].y] > 0) renderCharTile(list[i].x, list[i].y, list[i].char, 'brown', fovBgColor);
	}
};

function renderClear(){
    ctx.fillStyle = defaultBgColor;
    ctx.fillRect(0,0, c.width, c.height);
};

function renderTileList(list, fgcolor, bgcolor){
    var foreground = fgcolor || defaultFgColor;
    var background = bgcolor || defaultBgColor;
    for (var tile of list) {
        var x = tile.x;
        var y = tile.y;
        var val = tile.char;
        renderCharTile(x,y,val, foreground, background);
    };
};

function render(gamemap,player,entities){
    renderClear();
    var rad = fovrad;
    var fov = calculateFOV(gamemap,player.x,player.y,rad);
    explored = [...explored, ...fov];
    renderTileList(explored,'#333');
    renderTileList(fov,'#ffe',fovBgColor);
	renderPlayer(player);
	renderEntities(entities);
};

function getTileCoords (x,y) {
    let xTile = Math.floor(x / tileSize);
    let yTile = Math.floor(y / tileSize);
    let result = {
        x: xTile,
        y: yTile
    }
    return result;
};

