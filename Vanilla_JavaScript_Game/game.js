import { Map } from "./map.js"
import { Camera } from "./camera.js"

console.log("Welcome to Shadow and Steel")

export const TILE_SIZE = 32
export const COLS = 15  //15
export const ROWS = 20  //20

export const HALF_SIZE = TILE_SIZE /2


/* const GAME_WIDTH = TILE_SIZE * COLS
const GAME_HEIGHT = TILE_SIZE * ROWS */
 
const GAME_WIDTH = 256 //256 512 704
const GAME_HEIGHT = 256

     class Game{

        constructor(){
            this.map = new Map()
            this.camera = new Camera(this.map, GAME_WIDTH, GAME_HEIGHT) 
            this.keys= []
            
            window.addEventListener("keydown", e =>{
         
                if (this.keys.indexOf(e.key)=== -1){
                    this.keys.unshift(e.key)  
                }
                console.log(this.keys)
    
            })

             window.addEventListener("keyup", e =>{

                const index = this.keys.indexOf(e.key)

                if (index > -1){

                    this.keys.splice(index, 1)
                }
                console.log(this.keys)
        })
         
        }
        update(deltaTime){
            let speedX = 0;
            let speedY = 0;
            if (this.keys[0]=== "ArrowLeft") speedX = -1
            else if  (this.keys[0]=== "ArrowRight") speedX = 1
            else if  (this.keys[0]=== "ArrowUp") speedY = -1
            else if  (this.keys[0]=== "ArrowDown") speedY = 1
            this.camera.move(deltaTime, speedX,speedY)

        }
        
        drawLayer(layer,ctx){
            const startCol = Math.floor(this.camera.x / this.map.tileSize)
            const endCol = startCol + (this.camera.width / this.map.tileSize)
            const startRow = Math.floor(this.camera.y / this.map.tileSize)
            const endRow = startRow + (this.camera.height / this.map.tileSize)

            const offsetX = -this.camera.x + startCol * this.map.tileSize
            const offsetY = -this.camera.y + startRow * this.map.tileSize
         
            for (let row= startRow; row<= endRow; row++){
            
                for( let col = startCol; col <= endCol; col++){

                    const tile = this.map.getTile(layer, col ,row)
                    const x = (col - startCol)* this.map.tileSize + offsetX
                    const y = (row - startRow)* this.map.tileSize + offsetY

                    ctx.drawImage(
                        this.map.image,
                        (tile - 1)* this.map.image_tile % this.map.image.width,
                        Math.floor((tile-1 ) / this.map.image_cols) * this.map.image_tile,
                        this.map.image_tile,
                        this.map.image_tile,
                        Math.round(x),
                        Math.round(y),
                        this.map.tileSize,
                        this.map.tileSize)

              /*       ctx.strokeRect(
                        col * this.map.tileSize,
                        row * this.map.tileSize,
                        this.map.tileSize,
                        this.map.tileSize
                    )                 
                 */
        }}}
         render(ctx){

            this.drawLayer(0,ctx);
            this.drawLayer(1,ctx);
                
                
                
                }

       
        


         
    }

  


window.addEventListener("load", function(){

    const canvas = document.getElementById("canvas")
    const ctx = canvas.getContext("2d")
    canvas.width = GAME_WIDTH
    canvas.height = GAME_HEIGHT

    const game = new Game ()

    let lastTime = 0

    function animate (timeStamp){
   

        const deltaTime = timeStamp -lastTime
        lastTime = timeStamp

        console.log(deltaTime)

        game.update(deltaTime)
        game.render(ctx)
        requestAnimationFrame(animate)
    }
      requestAnimationFrame(animate) 
})