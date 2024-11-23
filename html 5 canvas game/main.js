import { Hero } from "./hero.js"
import { Input } from "./input.js"
import { World } from "./world.js"

console.log("Welcome to Shadow and Steel")

export const tile_size = 32
export const cols = 15
export const rows = 20
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
            this.hero = new Hero ({
                game: this,
                position: {  x:5, y:3  }
            })
            this.input = new Input()
        }
        render(ctx){
            this.hero.update()
            this.world.drawBackground(ctx) 
            this.world.drawGrid(ctx)
            this.hero.draw(ctx)
            this.world.drawForeground(ctx)
        }

    }

    const game = new Game ()

    function animate (){
        requestAnimationFrame(animate) 
        ctx.clearRect(0 , 0, game_width , game_height)
        game.render(ctx)
        
  

    }
      requestAnimationFrame(animate) 
    



})