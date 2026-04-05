
import { Entity } from "./entity.js";

export class Projectile extends Entity {

  constructor(x, y, dir) {
    super(x, y, 40, 40);

    this.speed = 600;
    this.dir = dir;

    this.loadAnimations("ninja", ["kunai"], 1);
    this.scaleX = 0.5;
    this.scaleY = 1.25;
  }

  update(dt) {
    this.x += this.speed * this.dir * dt;
    super.update();
  }

  draw(ctx, cameraX, cameraY) {

    const drawX = this.x - cameraX;
    const drawY = this.y - cameraY;

    const img = this.animations["kunai"][0];

    const baseW = 40;
    const baseH = 40;

    const renderW = baseW * this.scaleX;
    const renderH = baseH * this.scaleY;

    ctx.save();

    ctx.translate(drawX + renderW / 2, drawY + renderH / 2);

    ctx.rotate(this.dir === 1 ? Math.PI / 2 : -Math.PI / 2);

    ctx.drawImage(img, -renderW / 2, -renderH / 2, renderW, renderH);

    ctx.restore();
  }
}