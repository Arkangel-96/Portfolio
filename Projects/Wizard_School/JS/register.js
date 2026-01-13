document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('registroForm');
    const entrarButton = form.querySelector('button');

    entrarButton.addEventListener('click', function(e) {
        e.preventDefault();
        

        const usuario = document.getElementById('usuario').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const repeatPassword = document.getElementById('repeatPassword').value;

        if (password !== repeatPassword) {
            alert('Las contraseñas no coinciden.')
            return;
        }
        
        const userData = {
            usuario: usuario,
            email: email,
            password: password
        };

        localStorage.setItem('userData', JSON.stringify(userData));

        alert('Registrado con exito');

        window.location.href = '/index.html';
    });
});
