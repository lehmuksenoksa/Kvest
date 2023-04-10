function getRing(gamemap,x,y,rad){
    let minX = x - rad > 0 ? x - rad : 0;
    let maxX = x + rad >= gamemap.width ? gamemap.width - 1 : x + rad;
    let minY = y - rad > 0 ? y - rad : 0;
    let maxY = y + rad >= gamemap.height ? gamemap.height - 1: y + rad;
    var list = [];
    for (let x1 = minX; x1 <= maxX; x1++){
            let tile = gamemap.get(x1,minY);
            list.push(tile);
    };
    for (let y1 = minY+1; y1 < maxY; y1++){
        let tile = gamemap.get(maxX,y1);
        list.push(tile);
    };
    for (let x2 = maxX; x2 >= minX; x2--){
            let tile = gamemap.get(x2,maxY);
            list.push(tile);
    }; 
    for (let y2 = maxY-1; y2 > minY; y2--){
        let tile = gamemap.get(minX,y2);
        list.push(tile);
    }; 
    return list;
};

function getFovList(gamemap,x,y,rad){
    var shadowArcs = [];
    var fovRings = [];

    for (let r = 1; r <= rad; r++){
        let ring = getRing(gamemap,x,y,r);
        fovRings.push(ring);
    }

    for (let i = 1; i <= rad; i++){
        for (let j = 0; j < fovRings[i].length; j++){
            let startAngle = null;
            let endAngle = null;
            if (!fovRings[i][j].isSeethrough) {

            }
        }
    }

};