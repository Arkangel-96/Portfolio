

export class Entity {
  constructor(x, y, w, h, stats = null){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    // stats
    const defaultStats = { hp:100, maxHp:100, energy:50, maxEnergy:50, coins:0 };
    this.stats = {...defaultStats, ...stats};
    this.alive = true;
    this.canAttack = true

    // animaciones
    this.animations = {};
    this.animationSettings = {};
    this.currentAnimation = "idle";
    this.spriteScale = 1;
    this.facing = 1;
    this.frameIndex = 0;
    this.frameCounter = 0;
    
    this.loop = true; // default
    this.animFPS = 16;  // default

    this.showHealthBar = false;

    // ataque
    this.attackBoxOffset = { x: 40, y: 0 , w: 40, h: 120, damage: 10 }; // default frontal
    this.attackBox = null;
  }

  // ------------------ HITBOX / ATAQUE ------------------
  isColliding(other){
    return this.x < other.x + other.w &&
           this.x + this.w > other.x &&
           this.y < other.y + other.h &&
           this.y + this.h > other.y;
  }

  // calcular attackBox automático según facing y posición actual
  updateAttackBox(){

  if(!this.canAttack) {
    this.attackBox = null;
    return;
  }
  
  const w = this.attackBoxOffset.w;
  const h = this.attackBoxOffset.h;

  // centro del hitbox de la entidad
  const centerX = this.x + this.w/2;
  
  // posición X simétrica según facing
  let attackX = centerX + this.attackBoxOffset.x * this.facing - (this.facing < 0 ? w : 0);

  this.attackBox = {
    x: attackX,
    y: this.y + this.attackBoxOffset.y,
    w: w,
    h: h,
    damage: this.attackBoxOffset.damage
  };
}

  clearAttackBox(){ this.attackBox = null; }

  checkHit(target){
    if(!this.attackBox || !target.alive) return false;
    const a = this.attackBox;
    const b = target; // target usa x,y,w,h como hitbox de daño
    return a.x < b.x + b.w && a.x + a.w > b.x &&
           a.y < b.y + b.h && a.y + a.h > b.y;
  }

  dealDamage(target){
    if(this.checkHit(target)){
      target.stats.hp -= this.attackBox.damage;
      if(target.stats.hp <= 0){
        target.alive = false;
        target.stats.hp = 0;
      }
      return true;
    }
    return false;
  }

  // ------------------ ANIMACIONES ------------------
  loadAnimations(baseFolder, animationNames, frameCount){
  for(let anim of animationNames){
    this.animations[anim] = [];
    for(let i=1; i<=frameCount; i++){
      const img = new Image();
      img.src = `./${baseFolder}/${anim}/frame_${i}.png`;
      this.animations[anim].push(img);
    }
  }
  // si existe la animación “idle” usarla como inicial
  this.currentAnimation = this.animations["idle"] ? "idle" : animationNames[0];
}

  setAnimationSettings(anim, settings){
    this.animationSettings[anim] = {
      scaleX: settings.scaleX ?? 1,
      scaleY: settings.scaleY ?? 1,
      offsetX: settings.offsetX ?? 0,
      offsetY: settings.offsetY ?? 0
    };
  }

  play(name, loop = true){
  if(this.currentAnimation !== name){
    this.currentAnimation = name;
    this.frameIndex = 0;
    this.frameCounter = 0;
    this.loop = loop; // 🔥 CLAVE
  }
}

updateAnimation(dt){

  if(!this.currentAnimation) return;

  const frames = this.animations[this.currentAnimation];
  if(!frames || frames.length === 0) return;

  this.frameCounter += dt;

  const frameTime = 1 / this.animFPS;

  if(this.frameCounter >= frameTime){
    this.frameCounter -= frameTime;
    this.frameIndex++;

    if(this.frameIndex >= frames.length){

      if(this.loop){
        this.frameIndex = 0; // 🔥 vuelve a empezar
      } else {
        this.frameIndex = frames.length - 1; // se queda (attack)
      }

    }
  }
}

  update(dt){
    this.updateAnimation(dt);
    this.updateAttackBox(); // recalcula attackBox cada frame
  }

  // ------------------ DIBUJO ------------------
  draw(ctx, cameraX, cameraY){
    const drawX = this.x - cameraX;
    const drawY = this.y - cameraY;

    // sprite
    const frames = this.animations[this.currentAnimation];
    if(!frames || frames.length === 0) return;{
      const img = frames[this.frameIndex];
      const settings = this.animationSettings?.[this.currentAnimation] || {};
      const renderW = this.w * (settings.scaleX ?? this.spriteScale);
      const renderH = this.h * (settings.scaleY ?? this.spriteScale);
      ctx.save();
      ctx.translate(drawX + this.w/2, drawY + this.h/2);
      ctx.scale(this.facing,1);
      ctx.drawImage(img, -renderW/2, -renderH/2, renderW, renderH);
      ctx.restore();
    }

    // barra de vida
    if(this.showHealthBar && this.stats) this.drawHealthBar(ctx, cameraX, cameraY);

    // ------------------ DEBUG HITBOX ------------------
    // hitbox de daño = rojo
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x - cameraX, this.y - cameraY, this.w, this.h);

    // hitbox de ataque = amarillo punteado
    ctx.strokeStyle = "yellow";
    ctx.setLineDash([4,2]);
    ctx.lineWidth = 2;
    if(this.attackBox){
      ctx.strokeRect(this.attackBox.x - cameraX, this.attackBox.y - cameraY,
                     this.attackBox.w, this.attackBox.h);
    }
    ctx.setLineDash([]);
  }

  drawHealthBar(ctx, cameraX, cameraY){
    const barWidth = this.w;
    const barHeight = 12;
    const drawX = this.x - cameraX + (this.w - barWidth)/2;
    const drawY = this.y - cameraY - 70;
    ctx.fillStyle = "black";
    ctx.fillRect(drawX, drawY, barWidth, barHeight);
    ctx.fillStyle = "red";
    ctx.fillRect(drawX, drawY, (this.stats.hp / this.stats.maxHp) * barWidth, barHeight);
  }
}