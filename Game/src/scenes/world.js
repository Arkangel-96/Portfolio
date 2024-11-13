import { generateImpComponents } from "../entities/Imp.js";
import { generatePlayerComponents, setPlayerMovement } from "../entities/player.js";
import { colorizeBackground, drawBoundaries, drawTiles, fetchMapData } from "../utils.js";


export default async function world(k) {
    
    colorizeBackground(k,0,0,20);      
    k.camScale(1.5);  
    
     

    const mapData = await fetchMapData("./assets/map/dungeon.json");

    const map = k.add([k.pos(0,0)])

    const entities = {

        player: {},
        imp: []

    }

    

    setPlayerMovement(k, entities.player) 
    
    const layers = mapData.layers;

    for ( const layer of layers ){

        if (layer.name ==="Boundaries"){
           drawBoundaries(k, map, layer)
           
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
       k.camPos(entities.player.worldPos())    
    }

       

/*  k.add([k.rect(100,100), k.pos(k.center()), k.area(), k.anchor("center")])*/
