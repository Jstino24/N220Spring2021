//let yPositions = [];
let yPos; 
let xPos; 
 function setup() {
	createCanvas(600,300);
	fill(255, 50, 129);
}
function draw() {
	background(0);
	// if(yPositions.length > 10) {
    //    yPositions.shift();
	//}
    //yPositions.push(mouseY);
	yPos = mouseY;
	xPos = mouseX;
	for(var i = 0; i < 10; i++) {
		let diameter = 50 / (i + 1);
		xPos = xPos + (diameter / 2)
		circle(xPos, yPos, diameter);
		fill(255 - xPos, 50 - xPos, 200 - xPos);
		xPos = xPos + (diameter / 2); 
		print(i, xPos);
		print(i, diameter);
	}
}
