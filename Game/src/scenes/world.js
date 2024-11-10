import { colorizeBackground, drawTiles, fetchMapData } from "../utils.js";


export default async function world(k) {
    
    colorizeBackground(k,0,0,20);       

   const mapData = await fetchMapData("./assets/map/dungeon.json");


    const map = k.add([k.pos(0,0)])

    const entities = {

        player: null,
        slimes: []

    }

    const layers = mapData.layers;

    for ( const layer of layers ){

        if (layer.name ==="Boundaries"){

            //to do
            continue;
        }

        if (layer.name ==="SpawnPoints"){

            //to do
            continue;
        }

        drawTiles(k, map, layer, mapData.tileheight, mapData.tilewidth)
    }

       /*  k.camScale(51); */
}


/*  k.add([k.rect(100,100), k.pos(k.center()), k.area(), k.anchor("center")])*/
