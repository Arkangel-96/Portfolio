import { tile_size } from "./main.js";

export class GameObject{

    constructor({
        game, 
        sprite,
        position, 
        scale}
    ){
        this.game = game
        this.sprite = sprite ?? {x:0,y:0,width:tile_size,height:tile_size,image:""}
        this.position = position ?? {x:0,y:0}
        this.scale = scale ?? 1  // nulli


    }

    draw(ctx){
        
        ctx.fillRect(
            this.position.x * tile_size,
            this.position.y * tile_size,
            tile_size,
            tile_size

        )

    }



}