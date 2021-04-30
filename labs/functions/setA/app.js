function setup(){
    createCanvas(800,600);
}


let i = 0;
let j = 0;

function draw(){
    background(255,255,255);
    if(i==0){
        fill(0,0,255);
    }else if(i==1){
        fill(0,255,0);
    }else{
        fill(255,0,0);
    }
    j++;
    if(j==100){
        j=0;
        i++;
    }
    if(i==3){
        i=0;
    }
    circle(400,300,30);
}