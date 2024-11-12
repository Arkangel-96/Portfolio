import { generateImpComponents } from "../entities/Imp.js";
import { generatePlayerComponents, setPlayerMovement } from "../entities/player.js";
import { colorizeBackground, drawTiles, fetchMapData } from "../utils.js";


export default async function world(k) {
    
    colorizeBackground(k,0,0,20);       

   const mapData = await fetchMapData("./assets/map/dungeon.json");


    const map = k.add([k.pos(0,0)])

    const entities = {

        player: null,
        imp: []

    }

    const layers = mapData.layers;

    for ( const layer of layers ){

        if (layer.name ==="Boundaries"){

            //to do
            continue;
        }

        if (layer.name ==="SpawnPoints"){
            for (const object of layer.objects){
                if (object.name === "player"){
                    entities.player = map.add(
                        generatePlayerComponents(k,k.vec2(object.x, object.y))
                    )
                    
                }
        
                
                 if (object.name === "imp"){
                    entities.imp.push(map.add(generateImpComponents(
                        k,
                        k.vec2(object.x, object.y)
                    )))
                        
                    
                }
            

            } 
            
        }

        drawTiles(k, map, layer, mapData.tileheight, mapData.tilewidth)
    }

        k.camScale(0.5); 
        k.camPos(entities.player.worldPos()) 

        setPlayerMovement(k, entities.player)
}
       

/*  k.add([k.rect(100,100), k.pos(k.center()), k.area(), k.anchor("center")])*/
