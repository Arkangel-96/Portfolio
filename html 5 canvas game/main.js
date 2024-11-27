import { Hero } from "./hero.js"
import { Input } from "./input.js"
import { World } from "./world.js"
import { Camera } from "./camera.js"

console.log("Welcome to Shadow and Steel")

export const tile_size = 32
export const cols = 15
export const rows = 20

export const half_tile = tile_size /2
const game_width = tile_size * cols
const game_height = tile_size * rows

window.addEventListener("load", function(){

    const canvas = document.getElementById("canvas")
    const ctx = canvas.getContext("2d")
    canvas.width = game_width
    canvas.height = game_height

    class Game{

        constructor(){
            this.world = new World()
            this.camera = new Camera(this.world, game_width, game_height) 
            this.hero = new Hero ({
                game: this,
                sprite: {
                    image:document.getElementById("hero1"),
                    x:0,
                    y:11,
                    width:64,
                    height:64,
                    
                },
                position: {  x:5 * tile_size, y:3 *tile_size  }
            })
            this.input = new Input(this)


            this.eventUpdate = false
            this.eventTimer  = 0
            this.eventInterval = 60
            this.debug = false
        }
        toggleDebug (){
            this.debug = !this.debug

        }
        render(ctx, deltaTime){
            this.world.image, 
            this.camera.x,
            this.camera.y,
            this.hero.update(deltaTime)
            this.world.drawBackground(ctx) 
            if (this.debug) this.world.drawGrid(ctx)
            this.hero.draw(ctx)
            this.world.drawForeground(ctx)
            if (this.debug) this.world.drawCollisionMap(ctx)

            if (this.eventTimer < this.eventInterval){
                this.eventTimer += deltaTime
                this.eventUpdate = false

            }
            else{
                this.eventTimer = 0
                this.eventUpdate = true
            }



        }

    }

    const game = new Game ()

    let lastTime = 0

    function animate (timeStamp){
        requestAnimationFrame(animate) 
        ctx.clearRect(0 , 0, game_width , game_height)

        const deltaTime = timeStamp -lastTime
        lastTime = timeStamp

        console.log(deltaTime)

        game.render(ctx, deltaTime)
        
  

    }
      requestAnimationFrame(animate) 
    



})