import { cols, rows, tile_size } from "./main.js"

export class World{

    constructor(){
        this.level1 = {

            waterLayer:[],
            groundLayer:[],
            backgroundLayer:document.getElementById("backgroundLevel1"),
            foregroundLayer:document.getElementById("foregroundLevel1")


        }


    }
    drawBackground(ctx){

        ctx.drawImage(this.level1.backgroundLayer,0,0)
    }

    drawForeground(ctx){
        
        ctx.drawImage(this.level1.foregroundLayer,0,0)
    }

    drawGrid(ctx){

        for (let row = 0; row < rows; row++){
            for (let col = 0; col < cols; col++){
                ctx.strokeRect(
                    col * tile_size,
                    row * tile_size,
                    tile_size,
                    tile_size

                )


            }

        }


    }

}