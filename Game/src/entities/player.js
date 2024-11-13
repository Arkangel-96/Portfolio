

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
            SPEED: 100,
            attackPower: 1,
            direction: "down",
            isAttacking: false

        },
        "player"
    ]
}

/* export function setPlayerMovement(k, player){
  

   onKeyDown("right", () => {
		player.move(SPEED, 0)})}
     k.onKeyDown((key) => {
        console.log(key);

        if(["a"].includes(key)){
        player.flipX = true;  
        player.direction = "left"; 
        player.move(0, -100)}}
    
    )}*/
         
            

   

  
  


    

