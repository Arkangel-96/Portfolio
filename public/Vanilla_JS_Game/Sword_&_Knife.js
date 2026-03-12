

// ==================== CONFIG ====================
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

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


// ==================== ENTITY ====================
class Entity{

constructor(x,y,w,h){

this.x=x;
this.y=y;
this.w=w;
this.h=h;

this.animations={};
this.animationSettings = {};
this.currentAnimation=null;

this.spriteScale=1;
this.spriteOffsetX=0;
this.spriteOffsetY=0;
this.loop = true;
this.animationFinished = false;

this.facing=1;

this.frameIndex=0;
this.frameCounter=0;
this.frameDelay=6;

}

isColliding(other){
return this.x < other.x + other.w &&
       this.x + this.w > other.x &&
       this.y < other.y + other.h &&
       this.y + this.h > other.y;
}

loadAnimations(baseFolder,animationNames,frameCount){

for(let anim of animationNames){

this.animations[anim]=[];

for(let i=1;i<=frameCount;i++){

const img=new Image();
img.src=`${baseFolder}/${anim}/frame_${i}.png`;

this.animations[anim].push(img);

}

}

this.currentAnimation=animationNames[0];

}


setAnimationSettings(anim, settings){

  this.animationSettings[anim] = {
    scaleX: settings.scaleX ?? 1,
    scaleY: settings.scaleY ?? 1,
    offsetX: settings.offsetX ?? 0,
    offsetY: settings.offsetY ?? 0
  };

}


play(anim, loop=true){

  if(this.currentAnimation !== anim){

    this.currentAnimation = anim;
    this.frameIndex = 0;
    this.frameCounter = 0;
    this.loop = loop;
    this.animationFinished = false;

  }

}

updateAnimation(){

const frames=this.animations[this.currentAnimation];
if(!frames) return;

if(frames.length===1) return;

this.frameCounter++;

if(this.frameCounter>=this.frameDelay){

this.frameCounter=0;
this.frameIndex++;

if (this.frameIndex >= frames.length) {

  if(this.loop){
    this.frameIndex = 0;
  }
  else{
    this.frameIndex = frames.length - 1;
    this.animationFinished = true;
  }

}}

}

update(){
this.updateAnimation();
}

draw(ctx,cameraX,cameraY){

  const drawX = this.x - cameraX;
  const drawY = this.y - cameraY;

  const frames = this.animations[this.currentAnimation];
  if(!frames) return;

  const img = frames[this.frameIndex];

  const settings = this.animationSettings[this.currentAnimation] || {};

  const scaleX = settings.scaleX ?? this.spriteScale;
  const scaleY = settings.scaleY ?? this.spriteScale;

  const offsetX = settings.offsetX ?? this.spriteOffsetX;
  const offsetY = settings.offsetY ?? this.spriteOffsetY;

  const renderW = this.w * scaleX;
  const renderH = this.h * scaleY;

  ctx.save();

  if(this.facing === -1){

    ctx.scale(-1,1);

    ctx.drawImage(
      img,
      -(drawX + renderW + offsetX),
      drawY + offsetY,
      renderW,
      renderH
    );

  }else{

    ctx.drawImage(
      img,
      drawX + offsetX,
      drawY + offsetY,
      renderW,
      renderH
    );

  }

  ctx.restore();

}

}


// ==================== PLAYER ====================

class Player extends Entity{

  constructor(x,y){

    super(x,y,80,120);

    this.velocityY = 0;
    this.jumping = false;

    this.spriteScale = 1;
    this.spriteOffsetY = 0;

    this.facing = 1;

    // ATAQUE
    this.attacking = false;
    this.attackTimer = 0;
    this.attackDuration = 60; // 60 frames ≈ 1 segundo

    this.loadAnimations(
      "ninja",
      ["idle","run","jump","attack"],
      10
    );

  this.setAnimationSettings("idle",{
      scaleX:0.75,
      scaleY:1.0,
      offsetY:0,
      offsetX:10
      
    });

  this.setAnimationSettings("run", {
    scale: 1,
    offsetY: 2
   
  });

  this.setAnimationSettings("jump", {
    scale: 1,
    offsetY: 0
  });

  this.setAnimationSettings("attack", {
    scaleX:1.5,
    scaleY:1.1,
    offsetY: 0
  });
 }


  
  update(keys,platforms,dt){

  // =================
  // ATAQUE
  // =================

  if(keys["d"] && !this.attacking){

    this.attacking = true;
    this.attackTimer = this.attackDuration;

    this.play("attack", false);

  }

  if(this.attacking){

    this.attackTimer--;

    if(this.attackTimer <= 0){

      this.attacking = false;
      this.play("idle");

    }

  }


  // =================
  // MOVIMIENTO HORIZONTAL
  // =================

  let dx = 0;
  const speed = 400; // pixeles por segundo

  if(!this.attacking){

    if(keys["arrowleft"]){
    
      
      dx = -speed * dt;
      this.facing = -1;
    }

    if(keys["arrowright"]){
    
      dx = speed * dt;
      this.facing = 1;
    }

  }

  this.x += dx;


  // colisión horizontal
  for(let p of platforms){

    if(this.isColliding(p)){

      if(dx > 0) this.x = p.x - this.w;
      if(dx < 0) this.x = p.x + p.w;

    }

  }


  // =================
  // GRAVEDAD
  // =================

  const gravity = 900;
  this.velocityY += gravity * dt;

  let nextY = this.y + this.velocityY * dt;


  // =================
  // COLISION SUELO
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

  this.y = nextY;


  // =================
  // SALTO
  // =================

  if(!this.jumping && keys["arrowup"] && !this.attacking){

    this.jumping = true;
    this.velocityY = -600;

  }


  // =================
  // ANIMACIONES
  // =================

  if(!this.attacking){

    if(this.jumping){
      this.play("jump");
    }
    else if(keys["arrowleft"] || keys["arrowright"]){
      this.play("run");
    }
    else{
      this.play("idle");
    }

  }

  super.update();

  }


  // =================
  // DIBUJAR
  // =================

  draw(ctx,cameraX,cameraY){

    super.draw(ctx,cameraX,cameraY);

    // HITBOX VERDE
    const drawX = this.x - cameraX;
    const drawY = this.y - cameraY;

    ctx.strokeStyle = "lime";
    ctx.lineWidth = 2;
    ctx.strokeRect(drawX, drawY, this.w, this.h);

  }

}


// ==================== PLATFORM ====================
class Platform extends Entity{
draw(ctx,cameraX,cameraY){
ctx.fillStyle="grey";
ctx.fillRect(this.x-cameraX,this.y-cameraY,this.w,this.h);
}
}


// ==================== PICKUPS ====================
class Pickup extends Entity{

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


// ==================== BACKGROUND ====================
function drawBackground(ctx,bg,cameraX,cameraY){

const bgW=bg.width;
const bgH=bg.height;

if(bgW>0 && bgH>0){

const startX=-(cameraX%bgW);
const startY=-(cameraY%bgH);

for(let x=startX;x<GAME_WIDTH;x+=bgW){
for(let y=startY;y<GAME_HEIGHT;y+=bgH){
ctx.drawImage(bg,x,y,bgW,bgH);
}
}

}

}


// ==================== SCENE ====================
class Scene{

constructor(){

this.player=new Player(200,270);

this.platforms=[

new Platform(0,500,4000,40),
new Platform(1200,350,400,20),
new Platform(1700,300,400,20),
new Platform(2250,300,200,20),
new Platform(2600,250,400,20),
new Platform(3300,200,100,400)

];

this.pickups=[

new Pickup(600,400,30,30,"hp",20),
new Pickup(900,400,30,30,"energy",15),
new Pickup(1100,400,30,30,"coin",1)

];

this.cameraX=0;
this.cameraY=0;

}

update(deltaTime){


this.player.update(keys, this.platforms, deltaTime);


for(let i=this.pickups.length-1;i>=0;i--){

const p=this.pickups[i];

if(this.player.isColliding(p)){
p.apply(playerStats);
this.pickups.splice(i,1);
}

}

this.updateCamera();

}

updateCamera(){

const targetX=this.player.x+this.player.w/2-GAME_WIDTH/2;
const targetY=this.player.y+this.player.h/2-GAME_HEIGHT/2;

const lerp=0.1;

this.cameraX+=(targetX-this.cameraX)*lerp;
this.cameraY+=(targetY-this.cameraY)*lerp;

this.cameraX=Math.max(0,Math.min(this.cameraX,WORLD_WIDTH-GAME_WIDTH));
this.cameraY=Math.max(0,Math.min(this.cameraY,WORLD_HEIGHT-GAME_HEIGHT));

}

draw(){

drawBackground(ctx,bgImage,this.cameraX,this.cameraY);

this.platforms.forEach(p=>p.draw(ctx,this.cameraX,this.cameraY));
this.pickups.forEach(p=>p.draw(ctx,this.cameraX,this.cameraY));

this.player.draw(ctx,this.cameraX,this.cameraY);

this.drawUI(ctx);

}

drawUI(ctx){

const margin=10;
const barWidth=200;
const barHeight=20;

ctx.fillStyle="black";
ctx.fillRect(margin,margin,barWidth,barHeight);

ctx.fillStyle="red";
ctx.fillRect(margin,margin,(playerStats.hp/playerStats.maxHp)*barWidth,barHeight);

ctx.fillStyle="black";
ctx.fillRect(margin,margin*2+barHeight,barWidth,barHeight);

ctx.fillStyle="cyan";
ctx.fillRect(margin,margin*2+barHeight,(playerStats.energy/playerStats.maxEnergy)*barWidth,barHeight);

ctx.fillStyle="gold";
ctx.font="20px Arial";
ctx.fillText("🪙 "+playerStats.coins,margin,margin*5+barHeight*2);

}

}


// ==================== GAME LOOP ====================
const scene=new Scene();

let lastTime = 0;

function gameLoop(time){

  const deltaTime = (time - lastTime) / 1000; // segundos
  lastTime = time;

  ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);

  scene.update(deltaTime);
  scene.draw();

  requestAnimationFrame(gameLoop);

}



bgImage.onload=()=>requestAnimationFrame(gameLoop);