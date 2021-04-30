function setup(){
    createCanvas(800,600);
}

let posX = 1;
let posY = 1;
let dX = 1;
let dY = 1;

function distance(x1,y1,x2,y2){
    var a = ((x1-x2)**2+(y1-y2)**2)**(1/2);
    console.log(a);
    return a;
}

function ddX(x1,y1,x2,y2){
    return (x2-x1)/distance(x1,y1,x2,y2)**2;
}

function ddY(x1,y1,x2,y2){
    return (y2-y1)/distance(x1,y1,x2,y2)**2;
}

function draw(){
    console.log(posX,posY,dX,dY);
    background(255,255,255);
    dX += ddX(mouseX,mouseY,posX,posY);
    dY += ddY(mouseX,mouseY,posX,posY);
    posX += dX;
    posY += dY;
    if(posX<0){
        posX += 800;
    }else if(posX>800){
        posX -= 800;
    }
    if(posY<0){
        posY += 600;
    }else if(posY>600){
        posY -= 600;
    }
    circle(posX,posY,30);
}