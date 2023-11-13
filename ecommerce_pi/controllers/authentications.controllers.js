const mysql = require('promise-mysql')
const database = require ('../database.js')
const bcryptjs = require('bcryptjs'); // Esta es una librería para encriptar textos.  
const jsonwebtoken = require('jsonwebtoken'); // Libreria para generar y verificar tokens
const dotenv = require ('dotenv'); // Sirve para cargar las variables de entorno desde un archivo .env

// Configuramos las variables de entorno
dotenv.config();

// Creamos un usuario
 const usuarios = [{
    user: 'a',
    email: 'a@a.com',
    password: '$2a$05$7G7/FlT1xlSVAX9WiKLeQuWglujcff/e9yRtxduvl/ZSh0jwwzdHS'
}]
// Funcion de inicio de sesion, login
async function login(req, res){
console.log('recibida una solicitud de inicio de sesion')
console.log(req.body);
try {
    const username = req.body.username;
    const password = req.body.password;

    const connection = await database.getConnection(); // Obtiene la conexión a la base de datos
    // Selecciona la base de datos antes de realizar la consulta
    await connection.query('USE productos_vinos');

  
    // Realiza una consulta para verificar si el usuario ya existe
    const usuarioARevisar = await connection.query('SELECT * FROM users WHERE username = ?', [username]);
  
    if (usuarioARevisar.length === 0) {
      return res.status(400).send({ status: 'Error', message: 'Nombre de usuario no encontrado' });
    }
    
    const hashedPassword = usuarioARevisar[0].password;
    const loginCorrecto = await bcryptjs.compare(password,hashedPassword);

    if (!loginCorrecto) {
      return res.status(401).send({ status: 'Error', message: 'Error al iniciar sesión' });
    }

    const token = jsonwebtoken.sign({ user: usuarioARevisar.user },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION });

      const cookieOption = {
        expires: new Date(Date.now() + parseInt(process.env.JWT_COOKIE_EXPIRES, 10)),
        path: '/',
      };
      

    res.cookie('jwt', token, cookieOption);
    res.send({ status: 'ok', message: 'Usuario loggeado', redirect: '/client/index.html' });
  } catch (error) {
    console.error('Error en el controlador de autenticación:', error);
    res.status(500).send({ status: 'Error', message: 'Error en el servidor' });
  }
}

async function register(req, res) {
    const { username,password,email } = req.body;
  
    const connection = await database.getConnection(); // Obtiene la conexión a la base de datos
    // Selecciona la base de datos antes de realizar la consulta
    await connection.query('USE productos_vinos');

  
    // Realiza una consulta para verificar si el usuario ya existe
    const existingUser = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
  
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }
  
    // Hashea la contraseña y agrega el usuario a la base de datos
    const salt = await bcryptjs.genSalt(5);
    console.log('password:', password);
    console.log('Salt:', salt);
    const hashedPassword = await bcryptjs.hash(password, salt);
  
    try {
      await connection.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);
      res.status(201).json({ message: `Usuario ${username} Agregado` });
    } catch (error) {
      console.error('Error de inserción en la base de datos: ' + error.message);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }
  }
  
//Exportamos las funciones para poder utilizarlas en otras partes de nuestro codigo

module.exports = {
    login,
    register,
    usuarios
};
