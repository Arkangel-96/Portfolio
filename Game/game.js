/* import {createAnimations} from "./animations.js" */

const config = {

    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    backgroundColor: '#4488AA',
    parent:"container",
    pixelArt : true,
    scene: { preload,create,}

}

new Phaser.Game(config)

function preload(){
    console.log("preload");
    this.load.path ='./assets/';
    this.load.json ('ninja_idle_anim', 'ninja_idle_anim.json');
    this.load.atlas ('ninja_idle','ninja_idle.png', 'ninja_idle_atlas.json');

}

function create(){
  console.log("create");
  
  this.ninja_idle = this.add.sprite(200,300, 'ninja_idle')
 
  this.ninja_idle_anim = this.cache.json.get ('ninja_idle_anim')



  this.anims.fromJSON(this.ninja_idle_anim)

    this.ninja_idle.anims.play("");

}
  