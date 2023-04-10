function calculateFOV(resistanceMap, startx, starty, radius) {
    var radius = radius;
    var width = resistanceMap.width;
    var height = resistanceMap.height;
    var lightMap = [];
    var lightList = [];
    var startTile = resistanceMap.get(startx, starty);
    lightList.push(startTile);
 
    for (let i = 0; i < width; i++) {
        lightMap[i] = [];
        for (let j = 0; j < height; j++) {
            lightMap[i][j] = 0;
        }
    }

    function castLight(row, start, end, xx, xy, yx, yy) {
        var newStart = 0;
        if (start < end) {
            return;
        }
        var blocked = false;
        for (var dist = row; dist <= radius && !blocked; dist++) {
            var deltaY = -dist;
            for (var deltaX = -dist; deltaX <= 0; deltaX++) {
                var currentX = startx + deltaX * xx + deltaY * xy;
                var currentY = starty + deltaX * yx + deltaY * yy;
                var leftSlope = (deltaX - 0.5) / (deltaY + 0.5);
                var rightSlope = (deltaX + 0.5) / (deltaY - 0.5);
     
                if (!(currentX >= 0 && currentY >= 0 && currentX < resistanceMap.width && currentY < resistanceMap.height) || start < rightSlope) {
                    continue;
                } else if (end > leftSlope) {
                    break;
                }
     
                //check if it's within the lightable area and light if needed
                if (distance(0,0,deltaX, deltaY) <= radius) {
                    var brightness = (1 - (distance(0,0,deltaX, deltaY) / radius));
                    var litTile = resistanceMap.get(currentX,currentY);
                    lightMap[currentX][currentY] = brightness;
                    lightList.push(litTile);
                }
     
                if (blocked) { //previous cell was a blocking one
                    if (!resistanceMap.data[currentX][currentY].seethrough) {//hit a wall
                        newStart = rightSlope;
                        continue;
                    } else {
                        blocked = false;
                        start = newStart;
                    }
                } else {
                    if (!resistanceMap.data[currentX][currentY].seethrough && dist < radius) {//hit a wall within sight line
                        blocked = true;
                        castLight(dist + 1, start, leftSlope, xx, xy, yx, yy);
                        newStart = rightSlope;
                    }
                }
            }
        }
    }

    lightMap[startx][starty] = 1;
    castLight(1, 1.0, 0.0, 0, 1, 1, 0);
    castLight(1, 1.0, 0.0, 1, 0, 0, 1);
    castLight(1, 1.0, 0.0, 0, -1, 1, 0);
    castLight(1, 1.0, 0.0, -1, 0, 0, 1);
    castLight(1, 1.0, 0.0, 0, -1, -1, 0);
    castLight(1, 1.0, 0.0, -1, 0, 0, -1);
    castLight(1, 1.0, 0.0, 0, 1, -1, 0);
    castLight(1, 1.0, 0.0, 1, 0, 0, -1);
    resistanceMap.visible = lightMap;
    return lightList;
}
 
