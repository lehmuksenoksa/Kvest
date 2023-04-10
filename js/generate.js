function generateNoiseMap(width,height,ratio){
    var data = [];
    var minX = 0;
    var minY = 0;
    var maxX = width - 1;
    var maxY = height -1;
    for (let y = 0; y<height; y++){
        let line = [];
        for (let x = 0; x<width; x++){
            if (x === minX || x === maxX || y === minY || y === maxY){
                line = line + "#";
            
            } else if (Math.random() < ratio) {
                line = line + "#";
            } else {
                line = line + ".";
            }
                  
        }
        data.push(line);
    };
    return data;
};

function iterateNoiseMap(mapData){
    let width = mapData[0].length,
        height = mapData.length,
        mapResult = mapData;

    function getNumValue(x,y){
        let value = mapData[y].substr(x,1) === "#" ? 1 : 0;
        return value;
    }

    function setValue(x,y,val){
        let line = mapResult[y];
        line = line.substr(0,x) + val + line.substr(x+1);
        mapResult[y] = line;
    }

    function getAreaValue(x,y){
        let top = getNumValue(x,y-1);
        let bottom = getNumValue(x,y+1);
        let left = getNumValue(x-1, y);
        let right = getNumValue(x+1,y);
        let value = top + bottom + left + right;
        return value;
    }

    for (let y = 1; y<height-1; y++){
		for (let x = 1; x<width-1; x++){
            let tile = getNumValue(x,y);
            let area = getAreaValue(x,y);
            if (tile === 0 && area > 2) { setValue(x,y, "#"); }
            if (tile === 1 && area < 2 ) { setValue(x,y, "."); }
        }
    }    
    return mapResult;
};

function generateCave(width, height){
    let result = generateNoiseMap(width, height, 0.45)
    let iterations = 12;
    for(i=0; i<iterations; i++){
        result = iterateNoiseMap(result);
    }
    return result;
}