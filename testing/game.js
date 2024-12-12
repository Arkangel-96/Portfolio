import { Map } from "./map.js"
import { Camera } from "./camera.js"

console.log("Welcome to Shadow and Steel")

export const TILE_SIZE = 32
export const COLS = 15 
export const ROWS = 20 

export const HALF_SIZE = TILE_SIZE /2


/* const GAME_WIDTH = TILE_SIZE * COLS
const GAME_HEIGHT = TILE_SIZE * ROWS */

const GAME_WIDTH = 200
const GAME_HEIGHT = 200

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

         render(ctx){
            ctx.drawImage(
                this.map.image,
                this.camera.x,
                this.camera.y,
                GAME_WIDTH,
                GAME_HEIGHT,
                0,
                0,
                GAME_WIDTH,
                GAME_HEIGHT)
        


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