
import { Entity } from "./entity.js";

export class Pickup extends Entity {

  constructor(x,y,w,h,type,value){
    super(x,y,w,h);
    this.type=type;
    this.value=value;
  }

  draw(ctx,cameraX,cameraY){

    let color="white";

    if(this.type==="hp") color="red";
    if(this.type==="energy") color="cyan";
    if(this.type==="coin") color="gold";

    ctx.fillStyle=color;
    ctx.fillRect(this.x-cameraX,this.y-cameraY,this.w,this.h);
  }

  apply(playerStats){

    if(this.type==="hp"){
      playerStats.hp=Math.min(playerStats.maxHp,playerStats.hp+this.value);
    }

    if(this.type==="energy"){
      playerStats.energy=Math.min(playerStats.maxEnergy,playerStats.energy+this.value);
    }

    if(this.type==="coin"){
      playerStats.coins+=this.value;
    }
  }
}