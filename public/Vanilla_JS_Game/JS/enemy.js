

import { Entity } from "./entity.js";

export class Enemy extends Entity {

  constructor(x, y){
    super(x, y, 80, 120, {
    
    hp: 50,
    maxHp: 100

    });

    this.showHealthBar = true; // 🔥 SOLO enemigos

    this.animFPS = 16; 

    this.velocityY = 0;
    this.jumping = true;
    this.attackRange = 80;
    this.attacking = false;
    this.attackCooldown = 0;

    this.loadAnimations(
      "knight",
      ["idle","run","attack","die"],
      10
    );

    this.play("idle");

    this.setAnimationSettings("idle", { scaleX: 4, scaleY: 2.75 },);
    this.setAnimationSettings("run", { scaleX: 4, scaleY: 2.5 });
    this.setAnimationSettings("attack", { scaleX: 4, scaleY: 2.5 });
    this.setAnimationSettings("die", { scaleX: 4, scaleY: 2.5 });
    this.setAnimationSettings("jump", { scaleX: 4, scaleY: 2.5 });


    
    this.aggroRange = 300;
  }

update(dt, platforms, player){

  // =====================
  // GRAVEDAD
  // =====================
  const gravity = 900;
  this.velocityY += gravity * dt;

  let nextY = this.y + this.velocityY * dt;

  for (let p of platforms) {

    const horizontalOverlap =
      this.x + this.w > p.x &&
      this.x < p.x + p.w;

    if (horizontalOverlap) {

      if (
        this.velocityY > 0 &&
        this.y + this.h <= p.y &&
        nextY + this.h >= p.y
      ) {
        nextY = p.y - this.h;
        this.velocityY = 0;
        this.jumping = false;
      }
    }
  }

  this.y = nextY;

  // =====================
  // IA
  // =====================

  const dx = player.x - this.x;
  const dist = Math.abs(dx);

  const speed = 100;

  // cooldown
  if(this.attackCooldown > 0){
    this.attackCooldown -= dt;
  }

  // mirar jugador
  this.facing = dx > 0 ? 1 : -1;

    // =====================
    // ATAQUE
    // =====================

    if(dist < this.attackRange && this.attackCooldown <= 0 && !this.attacking){

    this.attacking = true;
    this.play("attack", false);
    this.frameIndex = 0;

    this.hitDone = false;
    this.attackCooldown = 1.2;
    }

  if(this.attacking){

  // frame donde pega
  if(this.frameIndex === 4 && !this.hitDone){
    player.stats.hp -= 10;
    this.hitDone = true;
  }

  const frames = this.animations[this.currentAnimation];

  if(this.frameIndex === frames.length - 1){
    this.attacking = false;
  }

}
  // =====================
  // MOVIMIENTO
  // =====================
  else if(dist < this.aggroRange && !this.attacking){

  this.x += Math.sign(dx) * speed * dt;
  this.play("run");

}

  else{

    this.attacking = false;
    this.play("idle");

  }

  super.update(dt);

}

  
draw(ctx, cameraX, cameraY){
    super.draw(ctx, cameraX, cameraY);

    // Opcional: debug adicional
    // ctx.strokeStyle = "cyan";
    // ctx.strokeRect(this.x - cameraX, this.y - cameraY, this.w, this.h);
  }

}