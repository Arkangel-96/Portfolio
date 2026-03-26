
import { Player } from "./player.js";
import { Pickup } from "./pickup.js";
import { Platform } from "./platform.js";
import { Enemy } from "./enemy.js";
import { ctx, bgImage, GAME_WIDTH, GAME_HEIGHT } from "./main.js";
import { Projectile } from "./projectile.js";
import { keys } from "./main.js";


export class Scene {

constructor(){
this.player = new Player(100,0);

this.platforms=[
new Platform(0,500,4000,40),
new Platform(1200,350,400,20),
new Platform(1700,300,400,20),
new Platform(2250,300,200,20),
new Platform(2600,250,400,20),
new Platform(3300,200,100,400)

];

this.enemies = [
  new Enemy(800, 380)
];

this.projectiles = [];

this.pickups=[

new Pickup(1100,400,30,30,"hp",20),
new Pickup(900,400,30,30,"energy",15),
new Pickup(600,400,30,30,"coin",1)

];

this.cameraX=0;
this.cameraY=0;
}


updateCamera(){

  const targetX = this.player.x + this.player.w / 2 - GAME_WIDTH / 2;
  const targetY = this.player.y + this.player.h / 2 - GAME_HEIGHT / 2;
  
  const lerp = 0.1;

  this.cameraX += (targetX - this.cameraX) * lerp;
  this.cameraY += (targetY - this.cameraY) * lerp;

  // límites del mundo (opcional pero PRO)
  this.cameraX = Math.max(0, Math.min(this.cameraX, 6000 - GAME_WIDTH));
  this.cameraY = Math.max(0, Math.min(this.cameraY, 2000 - GAME_HEIGHT));
}

update(deltaTime){

  // =================
  // 1. UPDATE ENTIDADES
  // =================

  this.player.update(keys, this.platforms, deltaTime, this);

  this.enemies.forEach(e => 
    e.update(deltaTime, this.platforms, this.player)
  );

  this.projectiles.forEach(p => 
    p.update(deltaTime)
  );

  this.pickups.forEach(p => 
    p.update(deltaTime, this.player)
  );


  // =================
  // 2. COLISIONES
  // =================

  // 🔥 PLAYER vs ENEMIES
  this.enemies.forEach(enemy => {

    if (this.player.isColliding(enemy)) {

      if (this.player.x < enemy.x) {
        this.player.x = enemy.x - this.player.w;
      } else {
        this.player.x = enemy.x + enemy.w;
      }

    }

  });


  // 🔥 PLAYER vs PICKUPS
  for (let i = this.pickups.length - 1; i >= 0; i--) {

    if (this.player.isColliding(this.pickups[i])) {

      this.pickups[i].apply(this.player);
      this.pickups.splice(i, 1);

    }

  }


  // =================
  // 3. CÁMARA
  // =================

  this.updateCamera();
}



drawBackground(){

  const bgW = bgImage.width;
  const bgH = bgImage.height;

  if(bgW > 0 && bgH > 0){

    const parallax = 0.3;

    const startX = -Math.floor((this.cameraX * parallax) % bgW);

    for(let x = startX; x < GAME_WIDTH; x += bgW){
      ctx.drawImage(bgImage, x, 0, bgW + 1, GAME_HEIGHT);
      ctx.imageSmoothingEnabled = true;
    }

  }
}


draw(){


this.drawBackground();

this.platforms.forEach(p=>p.draw(ctx,this.cameraX,this.cameraY));
this.pickups.forEach(p=>p.draw(ctx,this.cameraX,this.cameraY));
this.projectiles.forEach(p => p.draw(ctx, this.cameraX, this.cameraY));
this.player.draw(ctx,this.cameraX,this.cameraY);

this.enemies.forEach(e => e.draw(ctx, this.cameraX, this.cameraY));

this.drawUI(ctx)

}
spawnKunai(x, y, dir) {
  this.projectiles.push(new Projectile(x, y, dir));
  
  
}



drawUI(ctx){

  const margin = 10;
  const barWidth = 200;
  const barHeight = 20;

  const s = this.player.stats;

  ctx.fillStyle = "black";
  ctx.fillRect(margin, margin, barWidth, barHeight);

  ctx.fillStyle = "red";
  ctx.fillRect(margin, margin, (s.hp / s.maxHp) * barWidth, barHeight);

  ctx.fillStyle = "black";
  ctx.fillRect(margin, margin*2 + barHeight, barWidth, barHeight);

  ctx.fillStyle = "cyan";
  ctx.fillRect(margin, margin*2 + barHeight, (s.energy / s.maxEnergy) * barWidth, barHeight);

  ctx.fillStyle = "gold";
  ctx.font = "20px Arial";
  ctx.fillText("🪙 " + s.coins, margin, margin*5 + barHeight*2);
}
}