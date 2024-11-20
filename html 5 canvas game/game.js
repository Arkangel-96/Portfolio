
window.onload=function(){

    canvas = document.getElementById("canvas")

    if(canvas && canvas.getContext){

        ctx= canvas.getContext("2d");
            
        if(ctx){
         // definir colores
            ctx.fillStyle = "blue"
            ctx.strokeStyle= "#ff0000"
            ctx.lineWidth = 2

            //creación de cuadrado
            ctx.fillRect(50,50,100,100 )
            ctx.strokeRect(50,50,100,100 )

            //otro cuadrado
            ctx.fillStyle = "green "
            ctx.fillRect(200,50,100,100 )
            ctx.strokeRect(200,50,100,100 ) 

            //linea 1
            ctx.lineWidth= 25
            ctx.strokeStyle= "blue"
            ctx.beginPath()
            ctx.lineCap ="round"
            ctx.moveTo(50,250)
            ctx.lineTo(450,250)
            ctx.stroke()

            //linea 2
            ctx.strokeStyle= "purple"
            ctx.beginPath()
            ctx.lineCap ="square"
            ctx.moveTo(50,300)
            ctx.lineTo(450,300)
            ctx.stroke()

            //linea 3
            ctx.strokeStyle= "green"
            ctx.beginPath()
            ctx.lineCap ="butt"
            ctx.moveTo(50,350)
            ctx.lineTo(450,350)
            ctx.stroke()

            //logo
            ctx.strokeStyle = "purple"
            ctx.beginPath()
            ctx.moveTo(50,100)
            ctx.lineTo(100,50)
            ctx.lineTo(150,100)
            ctx.lineTo(100,150)
            ctx.stroke()
            //logo 2
            ctx.beginPath()
            ctx.moveTo(200,100)
            ctx.lineTo(250,50)
            ctx.lineTo(300,100)
            ctx.lineTo(250,150)
            ctx.closePath()
            ctx.stroke()

            //logo 3
            ctx.beginPath()
            ctx.moveTo(350,100)
            ctx.lineTo(400,50)
            ctx.lineTo(450,100)
            ctx.lineTo(400,150)
            ctx.fillStyle ="red"
            ctx.fill()
            ctx.closePath()
            ctx.stroke()

        }



        else{
                
            alert("INCOMPATIBLE")
        }
        }





    }

