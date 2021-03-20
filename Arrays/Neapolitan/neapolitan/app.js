function setup() {
    createCanvas(800, 500);  
    background(110, 123, 128)

    //noFill();

    //For loop syntax

let icecream = [ "#ffff00", "#ff8080", "#ff5050" ];

var x = 0;
for(var i = 0; i < 3; i++)  {
        fill(icecream[i]);
        rect(200 + x, 300, 50, 100 );
        x = x + 50;
    
}


}
