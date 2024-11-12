export function generatePlayerComponents(k, pos){

    return[
        k.sprite("assets", {
            anim: "player-idle-down"
        }),
        
        k.area({shape: new k.Rect(k.vec2(3,4),10, 12)}),
        k.body(),
        k.pos(pos),
        k.opacity(),
        {
            speed: 100,
            attackPower: 1,
            direction: "down",
            isAttacking: false,

        },
        "player"
    ]
}

export function setPlayerMovement(k, player){
     
    k.onKeyDown("left", () => {
        // .move() is provided by pos() component, move by pixels per second
        player.move(-100, 0)
    })

}
         
    

   

  
     /*      if(["left","a"].includes(key)){
            player.flipX = true;

            player.move(-player.speed,0);
            player.direction = "left"; 
 
            } */



    

