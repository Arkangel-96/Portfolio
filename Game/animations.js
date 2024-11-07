export const createAnimations = (game) => {

game.anims.create({
    key:"mario-walk",
    frames: this.anims.generateFrameNumbers(
        "mario",
        {start: 0, end: 3}
    ),
    repeat: -1       
})

game.anims.create({

    key:"mario-idle",
    frames: [{key:"mario",frame:0 }]

})

game.anims.create({

    key:"mario-jump",
    frames: [{key:"mario",frame:5 }]

})

}