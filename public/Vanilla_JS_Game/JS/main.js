
// ==================== CONFIG ====================
export const canvas = document.getElementById("gameCanvas");
export const ctx = canvas.getContext("2d");

export const GAME_WIDTH = 1024;
export const GAME_HEIGHT = 576;
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;

export const WORLD_WIDTH = 6000;
export const WORLD_HEIGHT = 2000;

export const bgImage = new Image();
bgImage.src = "Background_01.png";

export const keys = {};


window.addEventListener("keydown", e => keys[e.key.toLowerCase()] = true);
window.addEventListener("keyup", e => keys[e.key.toLowerCase()] = false);

export const playerStats = { hp: 75, maxHp: 100, energy: 40, maxEnergy: 100, coins: 43 };

// ==================== IMPORT ====================
import { Scene } from "./scene.js";

// ==================== GAME LOOP ====================
const scene = new Scene();

let lastTime = 0;

function gameLoop(time){
  const dt = (time - lastTime) / 1000;
  lastTime = time;

  ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);

  scene.update(dt);
  scene.draw();

  requestAnimationFrame(gameLoop);
}

bgImage.onload = () => requestAnimationFrame(gameLoop);