

export class Map{

    constructor(){
        this.cols = 12
        this.rows = 12
        this.tileSize = 64

        this.image = document.getElementById("full_map") 
        this.image_tile = 32
        this.image_cols = this.image.width / this.image_tile

       this.layers = [[],[]]
        
         
           

        }
       
   
    }