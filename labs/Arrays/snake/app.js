let xPositions = [];
let yPositions = [];
function setup() {
	createCanvas(600,300);
	fill(255, 12, 129);
}
function draw() {
	background(0);
	if(xPositions.length > 10) {
		xPositions.shift();
        yPositions.shift();
	}
    yPositions.push(mouseY);
	xPositions.push(mouseX);
	for(var i = 0; i < xPositions.length; i++) {
		circle(xPositions[i],yPositions[i], 5);
	}
}
