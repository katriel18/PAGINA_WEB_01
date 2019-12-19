const jwt = require('jsonwebtoken');
//=====================
//verificar token
//=====================

let verificarToken = (req, res, next) => {

    let token = req.get('token'); //obtengo el token del header


    jwt.verify(token, process.env.SEED, (error, decoded) => {
        if (error) {
            return res.status(401).json({
                ok: false,
                error: {
                    message: 'token no valido'
                }
            });
        }

        req.usuario = decoded.usuario;
        console.log(token);
        next(); //continuamos el proceso sgt

    });

};

//=====================
//verificar ADMIN_ROLE  
//=====================

let verificarADMIN_ROLE = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        res.json({
            ok: false,
            error: {
                message: 'usuario no es administrador'
            }
        });
    }



};





module.exports = {
    verificarToken,
    verificarADMIN_ROLE
}