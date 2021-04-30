function setup(){
    createCanvas(800,600);
}

let xPos = 0
let xSpeed = 5
function draw(){
    background(255,255,255);
    circle(xPos,300,30)
    xPos += xSpeed;
    if(xPos==800){
        xPos = 0;
    }
}