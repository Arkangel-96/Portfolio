import { half_tile, tile_size } from "./main.js";

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

        this.destinationPosition ={x:this.position.x, y:this.position.y}
        this.distanceToTravel = { x:0 , y:0}

        this.width = this.sprite.width * this.scale
        this.halfWidht = this.width /2 
        this.height = this.sprite.height *this.scale

    }       
        // suavizado del movimento del jugador

    moveTowards(destinationPosition, speed){        

        this.distanceToTravel.x = destinationPosition.x - this.position.x
        this.distanceToTravel.y = destinationPosition.y - this.position.y

        let distance = Math.hypot(this.distanceToTravel.x, this.distanceToTravel.y)

        if ( distance <= speed){

            //si esta cerca, salta a esa posición
            this.position.x= destinationPosition.x
            this.position.y= destinationPosition.y
        }   
        else {

            // de lo contrario da un paso hacia el destino
            const stepX = this.distanceToTravel.x/ distance
            const stepY = this.distanceToTravel.y/ distance
            this.position.x += stepX * speed
            this.position.y += stepY * speed

            //distancia restante
            this.distanceToTravel.x  = destinationPosition.x -   this.position.x
            this.distanceToTravel.y  = destinationPosition.y -   this.position.y
            distance = Math.hypot(this.distanceToTravel.x, this.distanceToTravel.y)

        }
        return distance;
    }

    draw(ctx){
       /*  if (this.game.debug){} */
        ctx.fillStyle = "grey"
        ctx.fillRect(
            this.position.x ,
            this.position.y,
            tile_size,
            tile_size

        )

        ctx.strokeStyle = "yellow"
        ctx.strokeRect(
            this.destinationPosition.x ,
            this.destinationPosition.y,
            tile_size,
            tile_size

        )

        ctx.drawImage (             //recortando sprite sheet

            this.sprite.image,
            this.sprite.x * this.sprite.width,
            this.sprite.y * this.sprite.height,
            this.sprite.width,
            this.sprite.height,
            this.position.x + half_tile - this.halfWidht,
            this.position.y + tile_size - this.height,
            this.width ,
            this.height 

        )
    }



}