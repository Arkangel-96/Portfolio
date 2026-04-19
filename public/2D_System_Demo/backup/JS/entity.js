
export class Entity {

constructor(x,y,w,h){
this.x=x; this.y=y; this.w=w; this.h=h;

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
img.src=`./${baseFolder}/${anim}/frame_${i}.png`; 
this.animations[anim].push(img);
}}
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
if(!frames || frames.length===1) return;

this.frameCounter++;
if(this.frameCounter>=this.frameDelay){
this.frameCounter=0;
this.frameIndex++;
if (this.frameIndex >= frames.length) {
this.loop ? this.frameIndex = 0 : this.frameIndex = frames.length - 1;
}}
}

update(){ this.updateAnimation(); }

draw(ctx, cameraX, cameraY) {
const drawX = this.x - cameraX;
const drawY = this.y - cameraY;

const frames = this.animations[this.currentAnimation];
if (!frames) return;

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
}