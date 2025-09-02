
    




function generateRandomText() {
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var randomText = "";
  for (var i = 0; i < 6; i++) {
      randomText += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return randomText; 
  }

// Generar el texto para el CAPTCHA
var captchaText = generateRandomText();

// Obtener el canvas y el contexto
var canvas = document.getElementById("captchaCanvas");
var ctx = canvas.getContext("2d");


   
// PROPIEDADES DEL CANVAS
ctx.font = "60px Arial";
ctx.fillStyle = "#9000ff4d"
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "black";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.fillText(captchaText, canvas.width/2, canvas.height/2);
   


/* DECLARACIÓNES PARA EL DOM   */

var email = document.getElementById("e");
var nombre = document.getElementById("tx");
var age = document.getElementById("edad");
var userInput = document.getElementById('captchaInput');
var entrar = document.getElementById("intro");





/* BORRA EL TEXT-AREA */
var txarea = document.getElementById("area");
 
txarea.addEventListener("click", ()=>{

  txarea.value=null;

})


/* VALIDACIÓN DE FORMULARIO POR JS */

function validar() {

  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
 

  if(!regexEmail.test(email.value) == true){
      alert(" Correo electrónico Inválido ")  ;
      checkeo = false;
      
  }
  else{

    if(nombre.value.length <=6){
      alert(" Nombre Inválido ") ;
      
    } 
    else{
      
      if( age.value < 6 || age.value > 110 == true  ) {
        console.log(age.value);
        alert(" Debes seleccionar una edad razonable ") ;
        
        
       } 
      else{

        alert("Espere un momento...");
      
     
          
      
      } 
   
    }
   
  }

  if(userInput.value != captchaText) {
    alert("La validación de CAPTCHA falló! \nInténtalo de nuevo");
    console.log(userInput.value);
    console.log(captchaText);
    
  } else {
    alert("Validación de CAPTCHA exitosa! \nTus datos han sido enviados :D"); 
    unchecked();
    setTimeout(function() {
      location.reload();
    }, 1000); }  
        
}
   

    
    










 
/*   BORRA TODOS LOS DATOS ;D     */
   function unchecked () {
 
    email.value=null;
    nombre.value=null;
    age.value=null;
    
  }
