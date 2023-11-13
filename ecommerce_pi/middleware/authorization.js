// Importamos las librerias que vamos a utilizar
const jsonwebtoken = require('jsonwebtoken'); // Sirve para generar y verificacion de tokens
const dotenv = require ('dotenv'); // Cargar las variables de entorno desde un archivo .env
const usuarios= require ('../controllers/authentications.controllers.js'); //importa el arreglo de usuarios del modulo
//Cargamos la variables de entorno
dotenv.config();
// Verificamos si el usuario esta logueado
function soloAdmin(req,res,next){
   const logueado = revisarCookie(req);
   if(logueado) return next();
   return res.redirect('/') 
}

function soloPublico(req,res,next){
    const logueado = revisarCookie(req);
   if(!logueado) return next();
   return res.redirect('/admin')
}
// Revisa la cookie de la solicitu para obtener el token
function revisarCookie(req){
    try{
        const cookieJWT = req.headers.cookie.split('; ').find(cookie => cookie.startsWith('jwt=')).slice(4);
        const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET); 
        console.log(decodificada)
        const usuarioARevisar = usuarios.find(usuario => usuario.user ===decodificada.user);
        console.log(usuarioARevisar)
        if(!usuarioARevisar){
            throw new Error('usuario no encontrado')
        }
        return true;
    }
    catch(error){
        console.error('error al revisar cookie',error.message)
        return{error:'error al revisar cookie',message:error.message}
    }
}
// Exportamos los metodos para utilizarlos
module.exports = {
    soloAdmin,
    soloPublico
}