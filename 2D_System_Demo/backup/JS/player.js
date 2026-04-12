
import { Entity } from "./entity.js";

export class Player extends Entity {

constructor(x, y) {
    super(x, y, 80, 120);

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

    // ================= INICIAR ACCIÓN =================
    if (!this.attacking) {

      if (attackPressed) {
        this.attacking = true;
        this.play(this.jumping ? "jump_attack" : "attack", false);
        this.frameIndex = 0;
      }

      if (throwPressed && !this.attacking) {
        this.attacking = true;
        this.play(this.jumping ? "jump_throw" : "throw", false);
        this.frameIndex = 0;

        // 🔥 DISPARO
        const spawnX = this.x + this.w / 2;
        const spawnY = this.y + this.h / 2 - 20;

        scene.spawnKunai(spawnX, spawnY, this.facing);
      }
    }

    // ================= ACTUALIZAR ACCIÓN =================
    if (this.attacking) {

      const frames = this.animations[this.currentAnimation];
      const isLastFrame = frames && this.frameIndex === frames.length - 1;

      if (isLastFrame) {

        if (attackPressed) {
          this.play(this.jumping ? "jump_attack" : "attack", false);
          this.frameIndex = 0;
        }

        else if (throwPressed) {
          this.play(this.jumping ? "jump_throw" : "throw", false);
          this.frameIndex = 0;
        }

        else {
          this.attacking = false;
          this.play(this.jumping ? "jump" : "idle");
        }
      }
    }

    // ================= MOVIMIENTO =================
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

    // ================= COLISION SUELO =================
    for (let p of platforms) {

      const playerBottom = nextY + this.h;
      const playerTop = nextY;

      const platformTop = p.y;
      const platformBottom = p.y + p.h;

      const horizontalOverlap =
        this.x + this.w > p.x &&
        this.x < p.x + p.w;

      if (horizontalOverlap) {

        if (
          this.velocityY > 0 &&
          this.y + this.h <= platformTop &&
          playerBottom >= platformTop
        ) {
          nextY = platformTop - this.h;
          this.velocityY = 0;
          this.jumping = false;
        }

        if (
          this.velocityY < 0 &&
          this.y >= platformBottom &&
          playerTop <= platformBottom
        ) {
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
    }

    // ================= ANIMACIONES BASE =================
    if (!this.attacking) {
      if (this.jumping) this.play("jump");
      else if (keys["arrowleft"] || keys["arrowright"]) this.play("run");
      else this.play("idle");
    }

    super.update();
}


// ================= DIBUJO =================
draw(ctx, cameraX, cameraY) {
    super.draw(ctx, cameraX, cameraY);

    const drawX = this.x - cameraX;
    const drawY = this.y - cameraY;

    ctx.strokeStyle = "lime";
    ctx.lineWidth = 2;
    ctx.strokeRect(drawX, drawY, this.w, this.h);
}

}