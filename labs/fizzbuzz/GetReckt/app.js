



function setup() {
    createCanvas(800, 500);  
    background(110, 123, 128)

    //noFill();

    //For loop syntax
    var y = 0;
    var x = 0;
    for( var i = 1; i < 5; i++) {
      x = 0
        for( var j = 0; j < i; j++) {
                    fill(245, 61, 15)
                    square(j + x, i + y, 15 )
                    x += 15;
            
        }
        y += 15;
        

    }
        
        
    
    console.log("Afterwards: " + i);
}
