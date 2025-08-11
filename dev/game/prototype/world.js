import { cols, rows, tile_size } from "./main.js"

export class World{

    constructor(){
        this.level1 = {

            waterLayer:[],
            groundLayer:[],
            collisionLayer: [
                1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                1,0,0,1,1,1,1,1,1,1,1,0,0,0,1,
                1,0,0,1,1,1,1,1,1,1,1,0,0,0,1,
                1,0,0,1,1,1,1,1,1,1,1,0,0,0,1,
                1,0,0,1,1,1,1,1,1,1,1,0,0,0,1,
                1,0,0,1,1,1,1,1,1,1,1,0,0,0,1,
                1,0,0,1,1,1,1,1,1,1,1,0,0,0,1,
                1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,


            ],
            backgroundLayer:document.getElementById("backgroundLevel1"),
            foregroundLayer:document.getElementById("foregroundLevel1")


        }
       /*  const image = document.getElementById("backgroundLevel1") */
   
    }
    getTiled(array,row,col) {

        return array[cols * row + col]
    }
    drawBackground(ctx){

       ctx.drawImage(this.level1.backgroundLayer,0,0) 
    }

    drawForeground(ctx){
        
        ctx.drawImage(this.level1.foregroundLayer,0,0)
    }

    drawCollisionMap(ctx){
      /*   ctx.fillStyle = "grey"  */
        for (let row = 0; row < rows; row++){
            for (let col = 0; col < cols; col++){
                if (this.getTiled(this.level1.collisionLayer, row, col ) === 1) 
                    ctx.fillRect(
                        col * tile_size,
                        row * tile_size,
                        tile_size,
                        tile_size
    
                
                
                    )
                    
                


            }}}


    drawGrid(ctx){
        ctx.strokeStyle = "black"
        for (let row = 0; row < rows; row++){
            for (let col = 0; col < cols; col++){
                ctx.strokeRect(
                    col * tile_size,
                    row * tile_size,
                    tile_size,
                    tile_size

                )


            }}}






}