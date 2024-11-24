export const LEFT = "LEFT"
export const RIGHT = "RIGHT"
export const UP = "UP"
export const DOWN = "DOWN"

export class Input  {

    constructor(game){
        this.keys= []
        this.game = game 
        window.addEventListener("keydown", e =>{
         
            if (e.key === "ArrowUp" || e.key.toLowerCase()=== "w"){
                this.keyPressed(UP)
            }
            else   if (e.key === "ArrowDown" || e.key.toLowerCase()=== "s"){
                this.keyPressed(DOWN)
            }

            else   if (e.key === "ArrowLeft" || e.key.toLowerCase()=== "a"){
                this.keyPressed(LEFT)
            }

            else   if (e.key === "ArrowRight" || e.key.toLowerCase()=== "d"){
                this.keyPressed(RIGHT)
            }
            else   if (e.key === "Enter" || e.key=== "Space"){
                this.game.toggleDebug()
            }

        })

        window.addEventListener("keyup", e =>{
            if (e.key === "ArrowUp" || e.key.toLowerCase()=== "w"){
                this.keyReleased(UP)
            }
            else   if (e.key === "ArrowDown" || e.key.toLowerCase()=== "s"){
                this.keyReleased(DOWN)
            }

            else   if (e.key === "ArrowLeft" || e.key.toLowerCase()=== "a"){
                this.keyReleased(LEFT)
            }

            else   if (e.key === "ArrowRight" || e.key.toLowerCase()=== "d"){
                this.keyReleased(RIGHT)
            }

        })


    }
    keyPressed(key){
        if (this.keys.indexOf(key) === -1){
            this.keys.unshift(key)
        }

        console.log(key)
    }

    keyReleased(key){
        const index = this.keys.indexOf(key)
        if (index === -1) return;

        this.keys.splice(index ,1)
       
    }

    get lastKey(){
        return this.keys[0]
    }

}
