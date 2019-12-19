const express = require('express');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const Usuario = require('../modelos/usuario') //importamos en modelo 
const app = express();


app.post('/login', (req, res) => {

    let validar = req.body;
    Usuario.findOne({ email: validar.email }, (error, usuarioDB) => {

        if (error) {
            return res.status(500).json({
                ok: false,
                error
            });

        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: '(usuario) o contraseña incorrecto'
                }
            });

        }
        //esta funcion es necesaria para validar el ingreso de la passwoord para evitar que se caiga la pagina
        if (!validar.password) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'password requerido!'
                }
            });

        }




        if (!bcrypt.compareSync(validar.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'usuario o (contraseña) incorrecto'
                }
            });

        }
        //CREANDO TOKEN
        let token = jwt.sign({
            usuario: usuarioDB
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });
        //siempre que nos logueamos creamos un token
        //con este token podemos usar el CRUD en las
        //rutas que necesiten un token
        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });


    });




});




module.exports = app;