export function generatePlayerComponents(){

    return[
        k.sprite("assets", {
            anim: "player-idle-down"
        }),
        
        k.area({shape: new k.Rect(k.vec2(3,4),10, 12)})
        
    ]
}