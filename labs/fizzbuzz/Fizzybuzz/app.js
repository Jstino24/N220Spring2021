



function setup() {
    createCanvas(800, 500);  
    background(110, 123, 128)

    //noFill();

    //For loop syntax
    for( var i = 0; i < 25; i++) {
        if ((i + 1) % 15 == 0 ) {
            fill(39, 149, 186)
            square(i * 25 - 7.5, 250 - 7.5, 15);
            
        } else if ( (i + 1) % 5 == 0) { 
            fill(50, 168, 85) 
            square(i * 25 - 7.5, 250 - 7.5, 15); 
            
        } else if ( (i + 1) % 3 == 0) {
             fill(139, 46, 179)
             circle(i * 25, 250, 8);
           
        } else {
            fill(0, 0, 0)
            circle(i * 25, 250, 8); 
            
        }
        
        
    }
    console.log("Afterwards: " + i);
}

