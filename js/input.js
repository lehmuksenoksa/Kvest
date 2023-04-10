function getKeyAction(event){
    let key = event.key || ' ';
    let keyBindings = {
        'ArrowUp' : 'up',
        'ArrowDown' : 'down', 
        'ArrowLeft' : 'left',
        'ArrowRight' : 'right',
        'w' : 'up',
        's' : 'down', 
        'a' : 'left',
        'd' : 'right',
        ' ' : 'wait'
    };

    let action = keyBindings[key] || 'wait';
    return action;
};

function getMouseAction(event){
    if (!event) { return };
    let x = event.clientX;
    let y = event.clientY;


    let action = 'wait';
/*     let regionBindings = [
        ['wait','up','wait'],
        ['left','wait','right'],
        ['wait','down','wait']
    ];
    let xregion = Math.floor(x / window.innerWidth * 3);
    let yregion = Math.floor(y / window.innerHeight * 3);
    action = regionBindings[yregion][xregion];
 */
    let dx = getTileCoords(x,y).x - player.x;
    let dy = getTileCoords(x,y).y - player.y;
    if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0) {
            action = 'right';
        } else if (dx < 0) {
            action = 'left';
        }
    } else {
        if (dy > 0) {
            action = 'down';
        } else if (dy < 0) {
            action = 'up';
        }
    };

    return action;
};

/* function getTouchAction(event){
    let touch = event.touches[0] || event.changedTouches[0];
    let x = touch.pageX;
    let y = touch.pageY;

    let action = 'wait';
    let regionBindings = [
        ['wait','up','wait'],
        ['left','wait','right'],
        ['wait','down','wait']
    ];

    let xregion = Math.floor(x / window.innerWidth * 3);
    let yregion = Math.floor(y / window.innerHeight * 3);

    action = regionBindings[yregion][xregion];

    return action;
}; */



window.addEventListener('load', function(){ // on page load
    window.addEventListener("keydown",function(event){
        update(getKeyAction(event));
        event.preventDefault(); 
    },false);

/*     document.body.addEventListener("touchstart", function(e){
        update(getTouchAction(event));
        renderCharTile(0,0,"T");
        event.preventDefault();
    },false); */

    window.addEventListener("mousedown",function(event){
        update(getMouseAction(event));
        // renderCharTile(1,0,"M");
        event.preventDefault();
    },false);   

}, false)
