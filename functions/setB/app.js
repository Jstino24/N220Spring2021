function setup(){
    createCanvas(800,600);
}

function distance(x1,y1,x2,y2){
    return ((x1-x2)**2+(y1-y2)**2)**(1/2)
}

function dX(x1,y1,x2,y2){
    return 3*(x1-x2)/distance(x1,y1,x2,y2);
}

function dY(x1,y1,x2,y2){
    return 3*(y1-y2)/distance(x1,y1,x2,y2);
}

let circleX = 0;
let circleY = 0;

function draw(){
    background(255,255,255);
    if(distance(mouseX,mouseY,circleX,circleY)<3){
        circleX = mouseX;
        circleY = mouseY;
        fill(255,0,0);
    }else if(distance(mouseX,mouseY,circleX,circleY)<7){
        circleX += dX(mouseX,mouseY,circleX,circleY);
        circleY += dY(mouseX,mouseY,circleX,circleY);
        fill(255,0,0);
    }else{
        circleX += dX(mouseX,mouseY,circleX,circleY);
        circleY += dY(mouseX,mouseY,circleX,circleY);
        fill(0)
    }
    circle(circleX,circleY,30)
}