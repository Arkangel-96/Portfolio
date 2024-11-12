import k from "./kaboomContext.js";
import world from "./scenes/world.js";

/* add([
	// text() component is similar to sprite() but renders text
	text("Press arrow keys", { width: width() / 2 }),
	pos(12, 12),
]) */

k.loadSprite ("assets", "./assets/map/dungeonTiles.png",{
    sliceX: 32,
    sliceY: 32,
    anims: { 
        
        "player-idle-down": 40,
        "imp-idle-down": 151
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