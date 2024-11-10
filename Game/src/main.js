import k from "./kaboomContext.js";
import world from "./scenes/world.js";



k.loadSprite ("assets", "./assets/map/dungeonTiles.png",{
    sliceX: 32,
    sliceY: 32,
    anim: { "player-idle-down": 40
        
    }

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