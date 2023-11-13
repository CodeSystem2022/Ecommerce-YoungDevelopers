// Maneja el envio de un formulario de inicio de sesion
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const username = e.target.username.value;
            const password = e.target.password.value;
            
            // Creamos la constante de respuesta para verificar si todo esta funcionando
            const res = await fetch('http://localhost:4002/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });

            if (!res.ok) {
                // Manejo de error, por ejemplo, mostrar un mensaje de error
                console.error('Error en el inicio de sesión');
            } else {
                const resJson = await res.json();
                if (resJson.redirect) {
                    window.location.href = "./index.html";
                }
            }
        });
    }
});
