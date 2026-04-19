
import { Entity } from "./entity.js";

export class Platform extends Entity {

  draw(ctx,cameraX,cameraY){
    ctx.fillStyle="grey";
    ctx.fillRect(this.x-cameraX,this.y-cameraY,this.w,this.h);
  }

}