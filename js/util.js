function addProperties(target, properties) {
    for (let key of Object.keys(properties)) {
        target[key] = properties[key];

        for (let innerKey of Object.keys(properties[key]))
        target[key][innerKey] = properties[key][innerKey];    
    }
};

function distance(x1,y1,x2,y2) {
    var a = x1 - x2;
    var b = y1 - y2;
    var c = Math.floor(Math.sqrt( a*a + b*b ));
    return c;
};

function rnd(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}