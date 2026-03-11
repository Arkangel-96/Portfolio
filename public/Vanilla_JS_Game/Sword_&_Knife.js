

// ==================== CONFIG ====================
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Resolución fija del juego
const GAME_WIDTH = 1024;
const GAME_HEIGHT = 576;
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;

const WORLD_WIDTH = 6000;
const WORLD_HEIGHT = 2000;

// Fondo
const bgImage = new Image();
bgImage.src = "Background_01.png";

// Teclas
const keys = {};
window.addEventListener("keydown", e => keys[e.key.toLowerCase()] = true);
window.addEventListener("keyup", e => keys[e.key.toLowerCase()] = false);

// Stats jugador
const playerStats = { hp: 75, maxHp: 100, energy: 40, maxEnergy: 100, coins: 43 };

// ==================== CLASES ====================
class Entity {

  constructor(x, y, w, h) {

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.animations = {};
    this.currentAnimation = null;

    this.spriteScale = 1;
    this.spriteOffsetX = 0;
    this.spriteOffsetY = 0;
    this.facing = 1;
    this.frameIndex = 0;
    this.frameCounter = 0;
    this.frameDelay = 6;

  }

  isColliding(other) {
    return this.x < other.x + other.w &&
           this.x + this.w > other.x &&
           this.y < other.y + other.h &&
           this.y + this.h > other.y;
  }

  loadAnimations(baseFolder, animationNames, frameCount) {

    for (let anim of animationNames) {

      this.animations[anim] = [];

      for (let i = 1; i <= frameCount; i++) {

        const img = new Image();
        img.src = `${baseFolder}/${anim}/frame_${i}.png`;

        this.animations[anim].push(img);

      }

    }

    this.currentAnimation = animationNames[0];

  }

  play(anim) {

    if (this.currentAnimation !== anim) {

      this.currentAnimation = anim;
      this.frameIndex = 0;
      this.frameCounter = 0;

    }

  }

  updateAnimation() {

    const frames = this.animations[this.currentAnimation];
    if (!frames) return;

    if (frames.length === 1) return; // imagen estática

    this.frameCounter++;

    if (this.frameCounter >= this.frameDelay) {

      this.frameCounter = 0;
      this.frameIndex++;

      if (this.frameIndex >= frames.length) {
        this.frameIndex = 0;
      }

    }

  }

  update() {
    this.updateAnimation();
  }

  draw(ctx, cameraX, cameraY) {

    const drawX = this.x - cameraX;
    const drawY = this.y - cameraY;

    const frames = this.animations[this.currentAnimation];

    if (frames) {

        const renderW = this.w * this.spriteScale;
        const renderH = this.h * this.spriteScale;
      // ✔ caso imagen única
      if (frames.length === 1) {
        ctx.drawImage(frames[0], drawX + this.spriteOffsetX, drawY + this.spriteOffsetYs, this.w, this.h);
        return;
      }

      // ✔ animación
      const img = frames[this.frameIndex];
      
        ctx.save();

        if(this.facing === -1){
        ctx.scale(-1,1);
        ctx.drawImage(
            img,
            -(drawX + this.w),
            drawY,
            this.w,
            this.h
        );
        }
        else{
        ctx.drawImage(img, drawX, drawY, this.w, this.h);
        }

        ctx.restore();

    }

   // fallback debug
    ctx.fillStyle = "green";
    ctx.fillRect(drawX, drawY, this.w, this.h);
 
  }

}

class Player extends Entity {

  constructor(x,y){

    super(x,y,80,80);

    this.velocityY = 0;
    this.jumping = false;
    this.jumpSpeedX = 0;
    this.spriteScale = 1.0;
    this.spriteOffsetY = -30;
    this.flipX = false;
    this.facing = 1;
    this.state = "idle";

    this.loadAnimations(
      "ninja",
      ["idle","run","jump","attack"],
      10
    );
  }

  setState(newState){
    if(this.state === newState) return;
    this.state = newState;
    this.play(newState);
  }

  update(keys, platforms){

  // =================
  // MOVIMIENTO HORIZONTAL
  // =================

    let dx = 0;

    if(keys["arrowleft"]){
    dx = -5;
    this.facing = -1;
    }

    if(keys["arrowright"]){
    dx = 5;
    this.facing = 1;
    }

     this.x += dx;


  // colisión horizontal
  for(let p of platforms){
    if(this.isColliding(p)){
      if(dx > 0) this.x = p.x - this.w;
      else if(dx < 0) this.x = p.x + p.w;
    }
  }


  // =================
  // GRAVEDAD
  // =================

  this.velocityY += 0.15;

  let nextY = this.y + this.velocityY;


  // =================
  // COLISION CON SUELO
  // 👉 EL BLOQUE VA ACA
  // =================

  for(let p of platforms){

    const playerBottom = nextY + this.h;
    const playerTop = nextY;

    const platformTop = p.y;
    const platformBottom = p.y + p.h;

    const horizontalOverlap =
      this.x + this.w > p.x &&
      this.x < p.x + p.w;

    if(horizontalOverlap){

      // caer sobre plataforma
      if(this.velocityY > 0 &&
         this.y + this.h <= platformTop &&
         playerBottom >= platformTop){

        nextY = platformTop - this.h;
        this.velocityY = 0;
        this.jumping = false;
      }

      // golpear techo
      if(this.velocityY < 0 &&
         this.y >= platformBottom &&
         playerTop <= platformBottom){

        nextY = platformBottom;
        this.velocityY = 0;
      }

    }
  }

  // aplicar movimiento final
  this.y = nextY;


  // =================
  // SALTO
  // =================

  if(!this.jumping && keys["arrowup"]){
    this.jumping = true;
    this.velocityY = -7;
  }

  // =================
// ANIMACIONES
// =================

if(this.jumping){
  this.play("jump");
}
else if(keys["arrowleft"] || keys["arrowright"]){
  this.play("run");
}
else{
  this.play("idle");
}

// actualizar animaciones
super.update();

}}


class Platform extends Entity {
  draw(ctx,cameraX,cameraY){
    ctx.fillStyle = "grey";
    ctx.fillRect(this.x - cameraX, this.y - cameraY, this.w, this.h);
  }
}

class Pickup extends Entity {
  constructor(x,y,w,h,type,value){
    super(x,y,w,h);
    Object.assign(this,{type,value});
  }
  draw(ctx,cameraX,cameraY){
    let color="white";
    if(this.type==="hp") color="red";
    else if(this.type==="energy") color="cyan";
    else if(this.type==="coin") color="gold";
    ctx.fillStyle=color;
    ctx.fillRect(this.x - cameraX, this.y - cameraY, this.w, this.h);
  }
  apply(playerStats){
    if(this.type==="hp"){ 
      playerStats.hp = Math.min(playerStats.maxHp, playerStats.hp + this.value);
    } else if(this.type==="energy"){ 
      playerStats.energy = Math.min(playerStats.maxEnergy, playerStats.energy + this.value);
    } else if(this.type==="coin"){ 
      playerStats.coins += this.value;
    }
  }
}

// -------- Fondo --------
function drawBackground(ctx,bg,cameraX,cameraY){
  const bgW = bg.width;
  const bgH = bg.height;
  if(bgW>0 && bgH>0){
    const startX = -(cameraX % bgW);
    const startY = -(cameraY % bgH);
    for(let x=startX; x<GAME_WIDTH; x+=bgW){
      for(let y=startY; y<GAME_HEIGHT; y+=bgH){
        ctx.drawImage(bg, x, y, bgW, bgH);
      }
    }
  }
}

// ==================== SCENE ====================
class Scene {
  constructor(){
    this.player = new Player(200,270);
    this.platforms = [
      new Platform(0,500,4000,40),
      new Platform(1200,350,400,20),
      new Platform(1700,300,400,20),
      new Platform(2250,300,200,20),
      new Platform(2600,250,400,20),
      new Platform(3300,200,100,400)
    ];
    this.pickups = [
      new Pickup(600,400,30,30,"hp",20),
      new Pickup(900,400,30,30,"energy",15),
      new Pickup(1100,400,30,30,"coin",1)
    ];

    this.cameraX = 0;
    this.cameraY = 0;
  }

  update(){
    this.player.update(keys, this.platforms);

    for(let i=this.pickups.length-1;i>=0;i--){
      const p = this.pickups[i];
      if(this.player.isColliding(p)){
        p.apply(playerStats);
        this.pickups.splice(i,1);
      }
    }

    this.updateCamera();
  }

  updateCamera(){
    const targetX = this.player.x + this.player.w/2 - GAME_WIDTH/2;
    const targetY = this.player.y + this.player.h/2 - GAME_HEIGHT/2;

    const lerpFactor = 0.1;
    this.cameraX += (targetX - this.cameraX) * lerpFactor;
    this.cameraY += (targetY - this.cameraY) * lerpFactor;

    this.cameraX = Math.max(0, Math.min(this.cameraX, WORLD_WIDTH - GAME_WIDTH));
    this.cameraY = Math.max(0, Math.min(this.cameraY, WORLD_HEIGHT - GAME_HEIGHT));
  }

  draw(){
    drawBackground(ctx,bgImage,this.cameraX,this.cameraY);
    this.platforms.forEach(p=>p.draw(ctx,this.cameraX,this.cameraY));
    this.pickups.forEach(p=>p.draw(ctx,this.cameraX,this.cameraY));
    this.player.draw(ctx,this.cameraX,this.cameraY);
    this.drawUI(ctx);
  }

  drawUI(ctx){
    const margin = 10;
    const barWidth = 200;
    const barHeight = 20;

    // HP
    ctx.fillStyle="black"; 
    ctx.fillRect(margin, margin, barWidth, barHeight);
    ctx.fillStyle="red"; 
    ctx.fillRect(margin, margin, (playerStats.hp/playerStats.maxHp)*barWidth, barHeight);

    // Energy
    ctx.fillStyle="black"; 
    ctx.fillRect(margin, margin*2 + barHeight, barWidth, barHeight);
    ctx.fillStyle="cyan"; 
    ctx.fillRect(margin, margin*2 + barHeight, (playerStats.energy/playerStats.maxEnergy)*barWidth, barHeight);

    // Coins
    ctx.fillStyle="gold";
    ctx.font="20px Arial";
    ctx.fillText("🪙 "+playerStats.coins, margin, margin*5 + barHeight*2);
  }
}

const scene = new Scene();

// ==================== GAME LOOP ====================
function gameLoop(){
  ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);
  scene.update();
  scene.draw();
  requestAnimationFrame(gameLoop);
}

bgImage.onload = ()=> requestAnimationFrame(gameLoop);