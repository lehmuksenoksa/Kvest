var maps = [ 
	["#","#","#","#","#","#"],
	["#",9,9,9,9,"#"],
	["#",9,9,0,9,"#"],
	["#",9,9,9,9,9],
	["#",9,9,9,9,"#"],
	["#",9,9,9,9,"#"],
	["#","#",9,"#","#","#"],
	["#","#",9,"#","#","#"],
	["#","#",9,9,9,"#"],
	["#","#","#","#",9,"#"],
];

function getValue(array, x, y){
	if (!array || x < 0 || y < 0 || x >= array[0].length || y >= array.length) return;
	return array[y][x];
}

function getLowestNeighbourValue(array, x, y){
	let width = array[0].length,
		height = array.length;
	if (!array || x < 0 || y < 0 || x >= width || y >= height) return;
	var minX = Math.max(0, (x - 1));
	var minY = Math.max(0, (y - 1));
	var maxX = Math.min((width-1), ( x + 1));
	var maxY = Math.min((height-1), ( y + 1));
	var lowest = 99
	for (let j = minY; j <= maxY; j++){
		for (let i = minX; i <= maxX; i++){
			if (i === x && j === y) continue;
			let current = getValue(array,i,j);
			if (current === false) continue;
			if (current < lowest) lowest = current;
		}
	}
	return lowest;
}

function getLowestNeighbour(array, x, y){
	let width = array.length,
		height = array[0].length;
	if (!array || x < 0 || y < 0 || x >= width || y >= height) return;
	var minX = Math.max(0, (x - 1));
	var minY = Math.max(0, (y - 1));
	var maxX = Math.min((width-1), ( x + 1));
	var maxY = Math.min((height-1), ( y + 1));
	var lowest = 99;
	var coords = {};
	for (let j = minY; j <= maxY; j++){
		for (let i = minX; i <= maxX; i++){
			if (i === x && j === y) continue;
			let current = getValue(array,j,i);
			if (current === false) continue;
			if (current < lowest) { 
				lowest = current;
				coords.x = i;
				coords.y = j;
			}
		}
	}
	return (coords);
}


function Each(array, func){
	var width = array[0].length;
	var height = array.length;
	var result = [];
	for (let y = 0; y < height; y++){
		result[y] = [];
		for (let x = 0; x < width; x++){
			result[y][x] = func(array[y][x]);
		}
	}
	return result;
}

function calculateDjikstra(array) {
	if (!array) return;
	var width = array[0].length;
	var height = array.length;
	var result = [];
	var changes = false;
	for (let y = 0; y < height; y++){
		result[y] = [];
		for (let x = 0; x < width; x++){
			let current = getValue(array, x, y);
			let lowest = getLowestNeighbourValue(array, x, y);
			if (current && current - lowest > 1) {
				result[y][x] = lowest + 1;
				changes = true;
			} else {
				result[y][x] = current;
			}
		}
	}
	
	if (!changes) {
		return result;
	} else {
		return calculateDjikstra(result);
	}
}