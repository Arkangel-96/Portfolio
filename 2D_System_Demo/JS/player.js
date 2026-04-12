
import { Entity } from "./entity.js";

export class Player extends Entity {

constructor(x, y){
  super(x, y, 80, 120, {

    hp: 75,
    maxHp: 100,
    energy: 40,
    maxEnergy: 100,
    coins: 43
  });

   /* this.stats = {
      hp: 100,
      maxHp: 100,
      energy: 50,
      maxEnergy: 50,
      coins: 0
    };*/

    this.velocityY = 0;
    this.jumping = false;

    this.spriteScale = 1;
    this.spriteOffsetY = 0;

    this.facing = 1;
    this.attacking = false;

   this.loadAnimations(
    "ninja",
    ["idle","run","jump","attack","throw","jump_attack","jump_throw"],
    10
  );

    this.state = "idle";

    this.setAnimationSettings("idle", { scaleX: 0.8, scaleY: 1 });
    this.setAnimationSettings("run", { scaleX: 1.1, scaleY: 1.05 });
    this.setAnimationSettings("attack", { scaleX: 1.55, scaleY: 1.2, offsetX: 20 });
    this.setAnimationSettings("jump_attack", { scaleX: 1.55, scaleY: 1.2, offsetX: 20, offsetY: 5 });
    this.setAnimationSettings("jump", { scaleX: 1.1, scaleY: 1.1 });
    this.setAnimationSettings("throw", { scaleX: 1.2, scaleY: 1 });
}


update(keys, platforms, dt, scene) {
  // ================= INPUT =================
  const attackPressed = keys["d"];
  const throwPressed = keys["f"];

  // ================= MOVIMIENTO HORIZONTAL =================
  let dx = 0;
  const speed = 400;

  if (!this.attacking) {
    if (keys["arrowleft"]) {
      dx = -speed * dt;
      this.facing = -1;
    }
    if (keys["arrowright"]) {
      dx = speed * dt;
      this.facing = 1;
    }
  }

  this.x += dx;

  // colisión horizontal
  for (let p of platforms) {
    if (this.isColliding(p)) {
      if (dx > 0) this.x = p.x - this.w;
      if (dx < 0) this.x = p.x + p.w;
    }
  }

  // ================= GRAVEDAD =================
  const gravity = 900;
  this.velocityY += gravity * dt;
  let nextY = this.y + this.velocityY * dt;

  // ================= COLISIÓN SUELO =================
  this.onGround = false;
  for (let p of platforms) {
    const playerBottom = nextY + this.h;
    const playerTop = nextY;
    const platformTop = p.y;
    const platformBottom = p.y + p.h;
    const horizontalOverlap =
      this.x + this.w > p.x && this.x < p.x + p.w;

    if (horizontalOverlap) {
      // aterrizaje
      if (this.velocityY > 0 && this.y + this.h <= platformTop && playerBottom >= platformTop) {
        nextY = platformTop - this.h;
        this.velocityY = 0;
        this.jumping = false;
        this.onGround = true;
      }
      // colisión techo
      if (this.velocityY < 0 && this.y >= platformBottom && playerTop <= platformBottom) {
        nextY = platformBottom;
        this.velocityY = 0;
      }
    }
  }
  this.y = nextY;

  // ================= SALTO =================
  if (!this.jumping && keys["arrowup"] && !this.attacking) {
    this.jumping = true;
    this.velocityY = -600;
    this.onGround = false;
  }

  // ================= INICIAR ACCIONES =================
  if (!this.attacking) {
    if (attackPressed) {
      this.attacking = true;
      this.play(this.jumping ? "jump_attack" : "attack", false);
    } 
    else if (throwPressed) {
      this.attacking = true;
      this.play(this.jumping ? "jump_throw" : "throw", false);

      // 🔥 DISPARO
      const spawnX = this.x + this.w / 2;
      const spawnY = this.y + this.h / 2 - 20;
      scene.spawnKunai(spawnX, spawnY, this.facing);
    }
  }

  // ================= ACTUALIZAR ACCIONES =================
  if (this.attacking) {
    const frames = this.animations[this.currentAnimation];
    const isLastFrame = frames && this.frameIndex === frames.length - 1;

    if (isLastFrame) {
      if (attackPressed) {
        if (this.currentAnimation !== (this.jumping ? "jump_attack" : "attack")) {
          this.play(this.jumping ? "jump_attack" : "attack", false);
        }
      } 
      else if (throwPressed) {
        if (this.currentAnimation !== (this.jumping ? "jump_throw" : "throw")) {
          this.play(this.jumping ? "jump_throw" : "throw", false);
        }
      } 
      else {
        this.attacking = false;
        if (!this.onGround) this.play("jump");
        else this.play("idle");
      }
    }
  }

  // ================= ANIMACIONES BASE =================
  if (!this.attacking) {

    let nextAnim = "idle";

    if (!this.onGround) nextAnim = "jump";
    else if (keys["arrowleft"] || keys["arrowright"]) nextAnim = "run";

    this.play(nextAnim);
  }

  // ================= UPDATE ENTITY =================
  super.update(dt);
}

// ================= DIBUJO =================



  draw(ctx, cameraX, cameraY){
    super.draw(ctx, cameraX, cameraY);

    // Opcional: debug adicional
    // ctx.strokeStyle = "lime";
    // ctx.strokeRect(this.x - cameraX, this.y - cameraY, this.w, this.h);
  }
}