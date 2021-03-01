const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    // Leer el token de header
    const token = req.header('x-auth-token');

    console.log(token);

    // Revisar si no hay token
    if(!token){
        return res.status(401).json({msg: 'No hay Token, permiso denegado'});
    }

    // validar el token
    try {
        const cifrado = jwt.verify(token, process.env.SECRETA);
        req.usuario = cifrado.usuario;
        next();
    } catch (error) {
        return res.status(401).json({msg: 'Token no válido'});
    }
}