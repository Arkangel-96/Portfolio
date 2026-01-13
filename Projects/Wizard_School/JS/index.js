// Seleccionamos todas las tarjetas
var cards = document.querySelectorAll('.card');
var harryPotterSombrero = document.querySelector('.imagenharry');

// Iteramos sobre cada tarjeta para agregar eventos de mouse
cards.forEach(function(card) {
  // Evento al pasar el mouse sobre la tarjeta
  card.addEventListener('mouseenter', function() {
    // Hacemos que la tarjeta se agrande un poco más al pasar el mouse
    this.style.transform = 'scale(1.2)';
  });
  
  // Evento al sacar el mouse de la tarjeta
  card.addEventListener('mouseleave', function() {
    // Hacemos que la tarjeta vuelva a su tamaño original
    this.style.transform = 'scale(1)';
  });
});

// Hacemos que la imagen se agrande un poco más al pasar el mouse

harryPotterSombrero.forEach(function(imagenharry){
    imagenharry.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    imagenharry.addEventListener("mouseleave", function () {
        this.style.transform = 'scale(1)';
    });
});

