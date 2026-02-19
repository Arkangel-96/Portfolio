
const WORLD_WIDTH = 3000;
const WORLD_HEIGHT = 3000;



const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const bgImage = new Image();
bgImage.src = "Background_01.png";

const platformImage = new Image();
platformImage.src = "./medieval-ruins/Platformer/Ground_06.png"; // Cambia el nombre/ruta según tu archivo

const projectileImg = new Image();
projectileImg.src = "./ninja/Kunai.png"; // ruta a tu imagen



platformImage.onload = () => {
  platformPattern = ctx.createPattern(platformImage, "repeat");
};
// === CONFIGURACIÓN DE FRAMES ===
const frameCount = 10;
const animations = {
  run: [], idle: [], attack: [], throw: [],
  dead: [], slide: [], jump: [], jump_attack: [], jump_throw: []
};
  loaded = 0;
function preloadImages(folder, array) {
  for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    img.src = `ninja/${folder}/frame_${i}.png`;
    img.onload = () => {
      loaded++;
      if (loaded === Object.keys(animations).length * frameCount) {
        requestAnimationFrame(gameLoop);
      }
    };
    array.push(img);
  }
}
for (let anim in animations) preloadImages(anim, animations[anim]);

// === HITBOX Y SPRITE ===
const hitbox = { x: 200, y: 270, w: 50, h: 80 };
const spriteWidth = 80, spriteHeight = 80;
let facingRight = true;

// === ESTADO DEL JUGADOR ===
let debugMode = true; // ⬅️ NUEVO: modo debug apagado por defecto
let velocityY = 0, jumpHorizontalSpeed = 0;
let jumping = false, actionPlaying = false;
const keys = {};
window.addEventListener("keydown", e => keys[e.key.toLowerCase()] = true);
window.addEventListener("keyup", e => keys[e.key.toLowerCase()] = false);

let playerState = "idle";
let currentFrame = 0, frameCounter = 0;

// === ESCALADO/DELAY ===
const scaleFactors = { 
  idle:{x:.7,y:1}, 
  attack:{x:1.5,y:1.2}, 
  throw:{x:1.03,y:1.03},
  dead:{x:1.2,y:1.2}, 
  jump_attack:{x:1.3,y:1.3}, 
  default:{x:1,y:1}};
const animationOffsets = { attack:{x:15,y:10}, jump_attack:{x:0,y:20}, default:{x:0,y:0}};
const animationDelays = { idle:10, jump:12, default:6 };

// === FÍSICA ===
const jumpBoost = 7, gravity = 0.15;

// === PROYECTILES ===
let projectiles = [];
function shootProjectile(startX, startY, direction) {
  projectiles.push({ x: startX, y: startY, speed: 6, dir: direction });
}

// === PLATAFORMAS ===
const platforms = [
  { x: 0,   y: 400,  w: 3300,  h: 20 },
  { x: 3000, y: 400, w: 100, h: 2000 },
  { x: 1200, y: 275, w: 400, h: 20 },
  { x: 1700, y: 150, w: 400, h: 20 },
  { x: 2250, y: 250, w: 200, h: 20 },
  { x: 2600, y: 150, w: 400, h: 20 }
];

// === CÁMARA ===
let cameraX = 0;

// === FUNCIONES DE ESTADO ===
function updatePlayerState() {
  if (actionPlaying) return;
  if (keys["x"]) { playerState = "dead"; return; }

  if (!jumping) {
    if (keys["arrowleft"]) facingRight = false;
    else if (keys["arrowright"]) facingRight = true;
  }

  if ((jumping || debugMode) && keys["c"]) {
    playerState = "jump_attack";
    actionPlaying = true;
    currentFrame = 0;
    return;
  }
  if ((jumping || debugMode) && keys["v"]) {
    playerState = "jump_throw";
    actionPlaying = true;
    currentFrame = 0;
    shootProjectile(hitbox.x + hitbox.w/2, hitbox.y + hitbox.h/2, facingRight?1:-1);
    return;
  }


  if (keys["z"]) { playerState = "slide"; return; }

  if (keys["d"] && !jumping) {
    actionPlaying=true; currentFrame=0; playerState="attack"; return;
  }
  if (keys["f"] && !jumping) {
    actionPlaying=true; currentFrame=0; playerState="throw";
    shootProjectile(hitbox.x + hitbox.w/2, hitbox.y + hitbox.h/2, facingRight?1:-1);
    return;
  }

  if (jumping) playerState="jump";
  else if (!jumping && keys["arrowup"]) {
    jumping = true; velocityY=-jumpBoost;
    if (keys["arrowleft"]) { jumpHorizontalSpeed=-2.5; facingRight=false; }
    else if (keys["arrowright"]) { jumpHorizontalSpeed=2.5; facingRight=true; }
    else jumpHorizontalSpeed=0;
    playerState="jump";
  } else if (!jumping && (keys["arrowleft"]||keys["arrowright"])) playerState="run";
  else playerState="idle";
}

function updatePosition() {
  const prevX = hitbox.x, prevY = hitbox.y;
  let dx = 0;
// 🚫 Bloquear movimiento mientras ataca o lanza
  if (!jumping && playerState !== "attack" && playerState !== "throw") {
    if (keys["arrowleft"]) dx=-5;
    if (keys["arrowright"]) dx=5;
}
  hitbox.x += dx + jumpHorizontalSpeed;

  // Colisiones horizontales simples
  for (const p of platforms) {
    if (hitbox.x + hitbox.w > p.x &&
        hitbox.x < p.x + p.w &&
        hitbox.y + hitbox.h > p.y - p.h &&
        hitbox.y < p.y) {
      hitbox.x = prevX;
    }
  }

  velocityY += gravity;
  hitbox.y += velocityY;

  // Colisiones verticales
  if (velocityY > 0) {
    for (const p of platforms) {
      const hitboxBottomPrev = prevY + hitbox.h;
      const platformTop = p.y - p.h;
      const hitboxBottomCurr = hitbox.y + hitbox.h;
      if (hitbox.x + hitbox.w > p.x &&
          hitbox.x < p.x + p.w &&
          hitboxBottomPrev <= platformTop &&
          hitboxBottomCurr >= platformTop) {
        hitbox.y = platformTop - hitbox.h;
        velocityY = 0;
        jumping = false;
      }
    }
  }

// === LIMITES DEL MUNDO ===

// Límite izquierdo
if (hitbox.x < 0) {
  hitbox.x = 0;
}

// Límite derecho
if (hitbox.x + hitbox.w > WORLD_WIDTH) {
  hitbox.x = WORLD_WIDTH - hitbox.w;
}

// Límite superior
if (hitbox.y + hitbox.h > WORLD_HEIGHT) {
  hitbox.y = WORLD_HEIGHT - hitbox.h;
  velocityY = 0;
  jumping = false;
}

// Límite inferior
if (hitbox.y + hitbox.h > WORLD_HEIGHT) {
  hitbox.y = WORLD_HEIGHT - hitbox.h;
  velocityY = 0;
  jumping = false;
}

  // Fricción aérea
  if (jumping) jumpHorizontalSpeed *= 0.98;
  else jumpHorizontalSpeed = 0;

  // Actualizar cámara (centra al ninja)
  cameraX = hitbox.x - canvas.width / 2;
  if (cameraX < 0) cameraX = 0;
  
}

function drawSprite(frames, currentFrame, hitbox, state) {
  ctx.save();
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  const factor = scaleFactors[state] || scaleFactors.default;
  const offset = animationOffsets[state] || animationOffsets.default;
  const drawW = Math.round(spriteWidth * factor.x);
  const drawH = Math.round(spriteHeight * factor.y);
  const drawX = hitbox.x - cameraX + (hitbox.w - drawW)/2 + offset.x;
  const drawY = hitbox.y + (hitbox.h - drawH) + offset.y;

  if (!facingRight) {
    ctx.translate(drawX + drawW/2,0);
    ctx.scale(-1,1);
    ctx.drawImage(frames[currentFrame], -drawW/2, drawY, drawW, drawH);
  } else ctx.drawImage(frames[currentFrame], drawX, drawY, drawW, drawH);
  ctx.restore();
}

function gameLoop() {

  // === FONDO REPETIBLE ===
  const bgWidth = bgImage.width;
  const bgHeight = bgImage.height;
  const yOffset = 0; // Ajusta si quieres moverlo verticalmente

  // Calcula desplazamiento basado en la cámara
  let startX = - (cameraX % bgWidth);

  for (let x = startX; x < canvas.width; x += bgWidth) {
    ctx.drawImage(bgImage, x, yOffset, bgWidth, canvas.height);
  }
  
  /* ctx.clearRect(0,0,canvas.width,canvas.height); */
  updatePlayerState();
  updatePosition();

/*   // Dibujar plataformas
  ctx.fillStyle="grey";
  for (const p of platforms) {
    ctx.fillRect(p.x - cameraX, p.y - p.h, p.w, p.h);
  } */

 
  // Dibujar plataformas como imagen
  for (const p of platforms) {
  if (platformPattern) {
    ctx.save(); // Guardamos el estado del contexto

    // Desplazamos el contexto para que el patrón quede fijo en la plataforma
    ctx.translate(p.x - cameraX, p.y - p.h);

    // Ahora rellenamos un rectángulo empezando en (0,0) relativo a la plataforma
    ctx.fillStyle = platformPattern;
    ctx.fillRect(0, 0, p.w, p.h);

    ctx.restore(); // Restauramos para no afectar otros dibujos
  }
}

  // Dibujar hitbox
  ctx.strokeStyle="lime";
  ctx.strokeRect(hitbox.x - cameraX, hitbox.y, hitbox.w, hitbox.h);

  // Dibujar sprite
  const frames = animations[playerState];
  drawSprite(frames, currentFrame, hitbox, playerState);


// Proyectiles  
for (let i = projectiles.length - 1; i >= 0; i--) {
  const p = projectiles[i];

  p.x += p.speed * p.dir;

  const scale = 0.33;
  const width = projectileImg.width * scale;
  const height = projectileImg.height * scale;

  const drawX = Math.round(p.x - cameraX);
  const drawY = Math.round(p.y);

  const angle = p.dir === 1 ? 0 : Math.PI;

  ctx.save();
  ctx.translate(drawX, drawY);
  ctx.rotate(angle + Math.PI / 2);


  ctx.drawImage(
    projectileImg,
    -width / 2,
    -height / 2,
    width,
    height
  );

  ctx.restore();
}


  // Animaciones
  frameCounter++;
  const delay = animationDelays[playerState] || animationDelays.default;
  if (frameCounter % delay === 0){
    currentFrame++;
    if ((playerState==="attack"||playerState==="throw"||
         playerState==="jump_attack"||playerState==="jump_throw") &&
        currentFrame>=frameCount) {
      actionPlaying=false;
      currentFrame=0;
      playerState = jumping?"jump":((keys["arrowleft"]||keys["arrowright"])?"run":"idle");
    } else currentFrame%=frameCount;
  }

  requestAnimationFrame(gameLoop);
}