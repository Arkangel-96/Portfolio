

export function colorizeBackground(k,r,g,b){

    k.add([
        k.rect(k.canvas.width, k.canvas.height),
        k.color(r,g,b),
        k.fixed(),

        // PINTA LA PANTALLA DEL COLOR QUE LE PASEN POR PARÁMETRO
    ])

}

export async function fetchMapData(mapPath) {

    return await(await fetch(mapPath)).json()
   
    // AGARRA EL MAPA 
}

export function drawTiles( k, map, layer, tilewidth, tileheight){

    // DIBUJA CADA CELDA DEL MAPA 

    let nbOfDrawnTiles = 0
    const tilePos = k.vec2(0,0)
    for  ( const tile of layer.data){
        if (nbOfDrawnTiles % layer.width === 0) {
            tilePos.x= 0
            tilePos.y += tileheight

        }
        else {
            tilePos.x += tilewidth
         }
        nbOfDrawnTiles++;
        if(tile ===0) continue;

        map.add([
            k.sprite("assets",{frame: tile -1 }),
            k.pos(tilePos),
            k.offscreen(),
        ])

    }

}