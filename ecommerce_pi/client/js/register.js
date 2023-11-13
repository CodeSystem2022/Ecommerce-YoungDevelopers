document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
  
    if (registerForm) {
      registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
  
        // Accede a los campos directamente por sus IDs
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
  
        console.log(username);
        console.log(email);
        console.log(password);
  
        const res = await fetch('http://localhost:4002/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username,
            email,
            password
          })
        });
  
        if (!res.ok) {
          // Manejo de error
          console.error('Error en el registro');
        } else {
          const resJson = await res.json();
          if (resJson.redirect) {
            window.location.href = "./index.html";
          }
        }
      });
    }
  });
  
