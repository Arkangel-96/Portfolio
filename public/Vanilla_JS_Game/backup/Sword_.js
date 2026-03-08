

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

// Llamar al cargar y al cambiar tamaño de ventana
window.addEventListener("resize", resizeCanvas);
resizeCanvas(); // inicial

const WORLD_WIDTH = 4000;
const WORLD_HEIGHT = 4000;

// Fondo
const bgImage = new Image();
bgImage.src = "Background_01.png";

// Teclas
const keys = {};
window.addEventListener("keydown", e => keys[e.key.toLowerCase()] = true);
window.addEventListener("keyup", e => keys[e.key.toLowerCase()] = false);

// Estadísticas del jugador
const playerStats = {
  hp: 75,
  maxHp: 100,
  energy: 40,
  maxEnergy: 100,
  coins: 43
};

// === Clases ===
class Entity {
  constructor(x,y,w,h){ Object.assign(this,{x,y,w,h}); }
  isColliding(other){
    return this.x < other.x + other.w &&
           this.x + this.w > other.x &&
           this.y < other.y + other.h &&
           this.y + this.h > other.y;
  }
  update(){}
  draw(ctx, cameraX){}
}

class Player extends Entity {
  constructor(x,y){
    super(x,y,50,80);
    this.velocityY=0;
    this.jumpSpeedX=0;
    this.jumping=false;
  }

  update(keys, platforms){
  // --- Movimiento horizontal ---
  let dx = 0;
  if(keys["arrowleft"]) dx = -5;
  if(keys["arrowright"]) dx = 5;

  // Intentar mover horizontalmente
  this.x += dx;
  for(let p of platforms){
    if(this.isColliding(p)){
      if(dx > 0) this.x = Math.min(this.x, p.x - this.w); // choca a la derecha
      else if(dx < 0) this.x = Math.max(this.x, p.x + p.w); // choca a la izquierda
      dx = 0; // detener movimiento horizontal
    }
  }

  // --- Física vertical ---
  this.velocityY += 0.15; // gravedad
  this.y += this.velocityY;

  // Colisión vertical
  for(let p of platforms){
    if(this.x + this.w > p.x && this.x < p.x + p.w){
      const playerBottom = this.y + this.h;
      const playerTop = this.y;
      const platformTop = p.y;
      const platformBottom = p.y + p.h;

      // Caída
      if(this.velocityY > 0 && playerBottom > platformTop && playerTop < platformTop){
        this.y = platformTop - this.h;
        this.velocityY = 0;
        this.jumping = false;
      }
      // Salto (techo)
      else if(this.velocityY < 0 && playerTop < platformBottom && playerBottom > platformBottom){
        this.y = platformBottom;
        this.velocityY = 0;
      }
    }
  }

  // --- Salto ---
  if(!this.jumping && keys["arrowup"]){
    this.jumping = true;
    this.velocityY = -7;
    this.jumpSpeedX = keys["arrowleft"] ? -2.5 : keys["arrowright"] ? 2.5 : 0;
  }

  // --- Desplazamiento horizontal durante salto ---
  if(this.jumping){
    this.x += this.jumpSpeedX;

    // Colisión horizontal durante salto
    for(let p of platforms){
      if(this.isColliding(p)){
        if(this.jumpSpeedX > 0) this.x = p.x - this.w;
        else if(this.jumpSpeedX < 0) this.x = p.x + p.w;
        this.jumpSpeedX = 0;
      }
    }

    this.jumpSpeedX *= 0.98; // frena progresivamente
  } else {
    this.jumpSpeedX = 0;
  }
}

  draw(ctx,cameraX){
    ctx.fillStyle = "lime";
    ctx.fillRect(this.x - cameraX, this.y, this.w, this.h);
  }
}

class Platform extends Entity {
  constructor(x,y,w,h){ super(x,y,w,h); }
  draw(ctx,cameraX){ 
    ctx.fillStyle = "grey"; 
    ctx.fillRect(this.x - cameraX, this.y, this.w, this.h); 
  
  }
}

class Pickup extends Entity {
  constructor(x,y,w,h,type,value){ 
    super(x,y,w,h); 
    Object.assign(this,{type,value}); 
  }
  draw(ctx,cameraX){
    let color="white";
    if(this.type==="hp") color="red";
    else if(this.type==="energy") color="cyan";
    else if(this.type==="coin") color="gold";
    ctx.fillStyle=color;
    ctx.fillRect(this.x-cameraX,this.y,this.w,this.h);
  }
  apply(playerStats){
    if(this.type==="hp"){ 
      playerStats.hp += this.value; 
      if(playerStats.hp>playerStats.maxHp) playerStats.hp = playerStats.maxHp;
    }
    else if(this.type==="energy"){ 
      playerStats.energy += this.value; 
      if(playerStats.energy>playerStats.maxEnergy) playerStats.energy = playerStats.maxEnergy;
    }
    else if(this.type==="coin"){ playerStats.coins += this.value; }
  }
}

class Scene {
  constructor(){
    this.player = new Player(200, 270);
    this.platforms = [
      new Platform(0,450,4000,40),
      new Platform(1200,300,400,20),
      new Platform(1700,150,400,20),
      new Platform(2250,250,200,20),
      new Platform(2600,150,400,20),
      new Platform(3300,400,100,400)
    ];
    this.pickups = [
      new Pickup(600,350,30,30,"hp",20),
      new Pickup(900,350,30,30,"energy",15),
      new Pickup(1200,350,30,30,"coin",1)
    ];

    this.cameraX = 0;
    this.cameraY = 0;
  }

  update(){
    // Actualizar jugador
    this.player.update(keys, this.platforms);

    // Colisión con pickups
    for(let i=this.pickups.length-1; i>=0; i--){
      const p = this.pickups[i];
      if(this.player.isColliding(p)){
        p.apply(playerStats);
        this.pickups.splice(i,1);
      }
    }

    // --- Cámara centrada en jugador ---
    this.cameraX = this.player.x + this.player.w/2 - canvas.width/2;
    this.cameraY = this.player.y + this.player.h/2 - canvas.height/2;

    // Limitar cámara a los bordes del mundo
    if(this.cameraX < 0) this.cameraX = 0;
    if(this.cameraY < 0) this.cameraY = 0;
    if(this.cameraX + canvas.width > WORLD_WIDTH) this.cameraX = WORLD_WIDTH - canvas.width;
    if(this.cameraY + canvas.height > WORLD_HEIGHT) this.cameraY = WORLD_HEIGHT - canvas.height;
  }

  draw(){
    // --- Fondo ---
    const bgW = bgImage.width;
    if(bgW>0){ 
      let startX = -(this.cameraX % bgW);
      for(let x=startX; x<canvas.width; x+=bgW){
        ctx.drawImage(bgImage, x, -this.cameraY, bgW, canvas.height);
      }
    }

    // --- Plataformas ---
    this.platforms.forEach(p => p.draw(ctx, this.cameraX, this.cameraY));

    // --- Pickups ---
    this.pickups.forEach(p => p.draw(ctx, this.cameraX, this.cameraY));

    // --- Jugador ---
    this.player.draw(ctx, this.cameraX, this.cameraY);

    // --- UI ---
    this.drawUI(ctx);
  }

  drawUI(ctx){
    const barWidth = 200;
    const barHeight = 20;
    const margin = 10;

    // HP
    ctx.fillStyle = "black";
    ctx.fillRect(margin, margin, barWidth, barHeight);
    ctx.fillStyle = "red";
    ctx.fillRect(margin, margin, (playerStats.hp / playerStats.maxHp) * barWidth, barHeight);

    // Energy
    ctx.fillStyle = "black";
    ctx.fillRect(margin, margin*2 + barHeight, barWidth, barHeight);
    ctx.fillStyle = "cyan";
    ctx.fillRect(margin, margin*2 + barHeight, (playerStats.energy / playerStats.maxEnergy) * barWidth, barHeight);

    // Coins
    ctx.fillStyle = "gold";
    ctx.font = "20px Arial";
    ctx.fillText("🪙 " + playerStats.coins, margin, margin*5 + barHeight*2);
  }
}

const scene = new Scene();

function gameLoop(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  scene.update();
  scene.draw();
  requestAnimationFrame(gameLoop);
}

// Esperar a que cargue el fondo
bgImage.onload = ()=> requestAnimationFrame(gameLoop);