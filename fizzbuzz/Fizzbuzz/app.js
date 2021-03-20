




function setup() {
    createCanvas(700, 500);
}

function draw() {
    background(150);

    noFill();

    //For loop syntax
    for( var i = 0; i < 100; i++) {
        circle(250, 250, i * 7);
    }
    console.log("Afterwards: " + i);
}
