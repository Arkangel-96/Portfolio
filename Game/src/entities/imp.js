export function generateImpComponents(k, pos){

    return[
        k.sprite("assets", {
            anim: "imp-idle-down"
        }),
        
        k.area({shape: new k.Rect(k.vec2(3,4),10, 12)}),
        k.body(),
        k.pos(pos),
        k.opacity(),
        k.offscreen(),
        {
            speed: 30,
            attackPower: 0.5,
            direction: "down",
            isAttacking: false,

        },
        "imp"
    ]
}