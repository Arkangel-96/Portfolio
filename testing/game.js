import { Map } from "./map.js"
import { Camera } from "./camera.js"

console.log("Welcome to Shadow and Steel")

export const TILE_SIZE = 32
export const COLS = 15
export const ROWS = 20

export const HALF_SIZE = TILE_SIZE /2
const GAME_WIDTH = TILE_SIZE * COLS
const GAME_HEIGHT = TILE_SIZE * ROWS

     class Game{

        constructor(){
            this.map = new Map()
            this.camera = new Camera(this.map, GAME_WIDTH, GAME_HEIGHT) 
   
        }
         render(ctx){
            ctx.drawImage(
                this.map.image,
                0,
                0,
                500,
                500,
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

    game.render(ctx)


})