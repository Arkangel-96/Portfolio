import k from "./kaboomContext.js";
import world from "./scenes/world.js";

const scenes = {

    world ,

};

for (const sceneName in scenes){

    k.scene(sceneName, ()=> scenes[sceneName](k));
}

k.go("world");