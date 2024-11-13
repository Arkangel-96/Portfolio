import k from "./kaboomContext.js";
import world from "./scenes/world.js";


kaboom();

k.loadSprite ("assets", "./assets/map/dungeonTiles.png",{
    sliceX: 32,
    sliceY: 32,
    anims: { 
        
        "player-idle-down": {
            from : 40 ,
            to: 48,
            loop: true,
        },

        "imp-idle-down":  { 
            from : 151  ,
            to: 158,
            loop: true,
        }  
    },








    })




const scenes = {

    world ,

};

for (const sceneName in scenes){

    k.scene(sceneName, ()=> scenes[sceneName](k));
}

k.go("world");



/* k.loadSprite ("assets", "./assets/map/Sprite-0002.png",{
    sliceX: 39,
    sliceY: 31

}) */