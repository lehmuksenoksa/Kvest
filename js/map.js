console.log("Loading Map");

var templateMap = [
	'####################',
	'#..................#',
	'#..................#',
	'#..................#',
	'#..................#',
	'#..................#',
	'#..................#',
	'#..................#',
	'#..................#',
	'#......###.........#',
	'#..................#',
	'#..................#',
	'#..................#',
	'#..................#',
	'#..................#',
	'#..................#',
	'#..................#',
	'#..................#',
	'#..................#',
	'####################',
	
];


var Map = function Map(){

};

Map.prototype = {
	width : null,
	height: null,
	data: null,
	djikstra: [],
	visible: [],
	set: function(x,y, val){
		if (x < 0 || x >= this.width || y < 0 || y >= this.height){
			return;
		} 
		this.data[x][y] = val;
	},
	get: function(x,y){
		if (x < 0 || x >= this.width || y < 0 || y >= this.height){
			return;
		}
		return this.data[x][y];
	},
	remove: function(x,y){
		if (x < 0 || x >= this.width || y < 0 || y >= this.height){
			return;
		}
		this.set(x,y, void 0);
	},
	reset: function(){
		this.data = [];
		for (let i = 0; i < this.width; i++) {
			this.data[i] = [];
		}
	},
	resize: function(width, height){
		this.width = width;
        this.height = height;
        for (var i = 0; i < this.width; i++) {
            if(!this.data){
                this.data = [];
            }

            if(this.data[i] === void 0){
                this.data[i] = [];
            }
        }
	},
/* 	load: function(mapData){
		let width = mapData[0].length,
			height = mapData.length;
		
		this.width = width;
		this.height = height;
		this.reset();

		for (let y = 0; y<height; y++){
			for (let x = 0; x<width; x++){
				this.set(x,y,mapData[y].substr(x,1));
			}
		}
	}, */
	loadTilemapFromArray: function(mapData){
		let width = mapData[0].length,
			height = mapData.length;
		
		this.width = width;
		this.height = height;
		this.reset();

		var tiletypes = {
			"." : "floor",
			"#" : "wall",
		};


		for (let y = 0; y<height; y++){
			for (let x = 0; x<width; x++){
				let newTiletype = tiletypes[mapData[y].substr(x,1)];
				let newTile = new Tile(x,y,newTiletype);

				this.set(x,y,newTile);
			}
		}
	},
	
	resetDjikstra: function(){
		let width = this.width,
			height = this.height;
		var startValue = width + height;
		
		for (let x = 0; x<width; x++){		
			this.djikstra[x]=[];
			for (let y = 0; y<height; y++){
				(this.get(x,y).passable) ? this.djikstra[x][y]=startValue : this.djikstra[x][y]=false;	
			}
		}
	},
	
	getLowestDjikstra: function(x, y){
		let width = this.width,
			height = this.height;
		if (x < 0 || y < 0 || x >= width || y >= height) return;
		var minX = Math.max(0, (x - 1));
		var minY = Math.max(0, (y - 1));
		var maxX = Math.min((width-1), ( x + 1));
		var maxY = Math.min((height-1), ( y + 1));
		var lowest = 99;
		var coords = {};
		for (let y = minY; y <= maxY; y++){
			for (let x = minX; x <= maxX; x++){
				let current = this.djikstra[x][y];
				if (current === false) continue;
				if (current < lowest) { 
					lowest = current;
					coords.x = x;
					coords.y = y;
				}
			}
		}
		return (coords);
	},
	
/* 	listAdjacent: function(x,y,rad){
		let minX = x - rad > 0 ? x - rad : 0;
		let maxX = x + rad >= this.width ? this.width - 1 : x + rad;
		let minY = y - rad > 0 ? y - rad : 0;
		let maxY = y + rad >= this.height ? this.height - 1: y + rad;
		var list = {};
		for (let i = minX; i <= maxX; i++){
			for (let j = minY; j <= maxY; j++){
				var tile = this.get(i,j);
				list[i+"+"+j] = tile;
			}
		}
		return list;
	}, */

	listAdjacentTiles: function(x,y,rad){
		let minX = x - rad > 0 ? x - rad : 0;
		let maxX = x + rad >= this.width ? this.width - 1 : x + rad;
		let minY = y - rad > 0 ? y - rad : 0;
		let maxY = y + rad >= this.height ? this.height - 1: y + rad;
		var list = [];
		for (let i = minX; i <= maxX; i++){
			for (let j = minY; j <= maxY; j++){
				var tile = this.get(i,j);
				list.push(tile);
			}
		}
		return list;
	},
	
	canMoveTo: function(x,y){
		var tile = this.get(x,y);
		return (tile.passable);
	},

	startPosition: function(){
		let width = this.width;
		let height = this.height;
		let x = 1;
		let Y = 1;
		do {
			x = Math.floor(Math.random()*width/3);
			y = Math.floor(Math.random()*height/3);
		} while (!this.canMoveTo(x,y));
		let result = {};
		result.x = x;
		result.y = y;
		return result;
	},
	
	randomPosition: function(){
		let width = this.width;
		let height = this.height;
		let x = 1;
		let Y = 1;
		do {
			x = Math.floor(Math.random()*width);
			y = Math.floor(Math.random()*height);
		} while (!this.canMoveTo(x,y));
		let result = {};
		result.x = x;
		result.y = y;
		return (result);
	}
};