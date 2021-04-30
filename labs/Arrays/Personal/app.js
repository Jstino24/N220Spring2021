let dObj = { x: 200, y: 0, velocityY: .05 }
let gravity = .002;
function draw() {
    createCanvas(800, 600);
	background(25);
                circle(dObj.x, dObj.y, 20);
	            dObj.y += dObj.velocityY;
	            dObj.velocityY += gravity;
            
            
        
    }
