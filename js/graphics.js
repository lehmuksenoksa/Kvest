function rnd(min, max) {
	return Math.floor(Math.random() * (max - min) ) + min;
}

CanvasRenderingContext2D.prototype.fLine = function (x1, y1, x2, y2, width, color) {

	function rnd(min, max) {
 		return Math.floor(Math.random() * (max - min) ) + min;
	}

	this.beginPath()
	this.strokeStyle = color || 'rgba(0,0,0,.7)';
	this.lineWidth = width || 1;
    this.moveTo(x1+rnd(-2,2), y1+rnd(-2,2));
    this.quadraticCurveTo(x1+(x2-x1)/2+rnd(-2,2), y1+(y2-y1)/2, x2+rnd(-2,2)+rnd(-2,2), y2+rnd(-2,2));
    this.stroke();
    this.beginPath()
    this.moveTo(x1+rnd(-2,2), y1+rnd(-2,2));
    this.quadraticCurveTo(x1+(x2-x1)/2+rnd(-2,2), y1+(y2-y1)/2+rnd(-2,2), x2+rnd(-2,2), y2+rnd(-2,2));
    this.stroke();
    
}

CanvasRenderingContext2D.prototype.fRect = function (x1, y1, w, h, color) {
	var fillColor = color || 'antiquewhite';
	this.fLine(x1, y1, x1+w, y1, 1, fillColor);
	this.fLine(x1+w, y1, x1+w, y1+h, 1, fillColor);
	this.fLine(x1+w, y1+h, x1, y1+h, 1, fillColor);
	this.fLine(x1, y1, x1, y1+h, 1, fillColor);
	this.fillStyle = fillColor;
	this.fillRect(x1, y1, w, h);
	this.stroke();
}

CanvasRenderingContext2D.prototype.fPolyline = function (x1, y1, polyArray, width, color) {
	var points = polyArray.length;
	for(i = 1; i < points; i++){
		this.fLine(x1+polyArray[i-1][0],y1+polyArray[i-1][1],x1+polyArray[i][0],y1+polyArray[i][1],width,color);
	}
}

CanvasRenderingContext2D.prototype.fPolyarea = function (x1, y1, polyArray, color) {
	var points = polyArray.length;
	this.fillStyle = color || 'black';
	this.beginPath()
	this.moveTo(x1+polyArray[0][0],y1+polyArray[0][1]);
	for(let i = 1; i < points; i++){
		this.lineTo(x1+polyArray[i][0],y1+polyArray[i][1]);
	}
	this.closePath();
	this.fill();
}

function createAsteroid(x,y, minrad, maxrad, facets) {
	
		function rnd(min, max) {
			return Math.floor(Math.random() * (max - min) ) + min;
		}
	
		let asteroid = [];
		let xCoord;
		let yCoord;
		let rndRad;
		let Angle = Math.floor(360 / facets);
		let rndAngle;
		
		for (let i = 0; i < facets; i++){
			rndAngle = rnd(i*Angle, (i+1)*Angle)*Math.PI/180;
			rndRad = rnd(minrad,maxrad);
			xCoord = Math.floor(x + (rndRad * Math.cos(rndAngle)));
			yCoord = Math.floor(y + (rndRad * Math.sin(rndAngle)));	
			asteroid.push([xCoord,yCoord]);
		}
		asteroid.push(asteroid[0]);
		return asteroid;
}

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
c.width  = window.innerWidth;
c.height = window.innerHeight;
c.style.width  = window.innerWidth + 'px';
c.style.height = window.innerHeight + 'px';

var wallPoly = [[10,10],[70,10],[70,50],[60,50],[60,70],[30,70],[30,50],[10,50],[10,10]];
var floorPoly = [[20,20],[60,20],[60,40],[50,40],[50,60],[40,60],[40,40],[20,40],[20,20]];

ctx.fRect(5, 5, 200, 200, 'lightgrey');
ctx.fPolyarea(10,10, wallPoly, 'grey');
ctx.fPolyline(10,10, wallPoly, 4, 'grey)');
ctx.fPolyarea(10,10, floorPoly, 'antiquewhite');
ctx.fPolyline(10,10, floorPoly, 2);

