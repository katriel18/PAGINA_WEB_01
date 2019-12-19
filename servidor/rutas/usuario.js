const express = require('express');

const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../modelos/usuario') //importamos en modelo 
const { verificarToken, verificarADMIN_ROLE } = require('../middlewares/autenticacion');

const app = express();

app.get('/', function(req, res) {
    // res.send('HOLA OSTI'); //formato html
    res.json('HOLA KATRIEL ONLINE'); //formato json
});

app.get('/usuario', verificarToken, (req, res) => {
    // res.send('HOLA OSTI'); //formato html
    // res.json('get usuario katriel LOCAL'); //formato json


    /*  return res.json({
        login: req.usuario.nombre,
    })
*/

    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 0;
    limite = Number(limite);

    //entre las llaves se puede poner condicion de filtrado para listado
    Usuario.find({ estado: true }, 'nombre email role estado google img') //se elige campos a mostrar
        .skip(desde)
        .limit(limite)
        .exec((error, listaUsuario) => {
            if (error) {
                return res.status(400).json({
                    ok: false,
                    error
                });
            }
            Usuario.count({ estado: true }, (error, conteo) => {
                res.json({

                    login: req.usuario.nombre, //persona logueada
                    ok: true,
                    listaUsuario,
                    cantidad: conteo

                });
            });


        })


});

app.post('/usuario', [verificarToken, verificarADMIN_ROLE], function(req, res) {
    let documento = req.body;

    let usuario = new Usuario({
        nombre: documento.nombre,
        email: documento.email,
        password: bcrypt.hashSync(documento.password, 10),
        role: documento.role
    });

    usuario.save((error, usuarioDB) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                error
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
    /*
        if (documento.nombre === undefined) {
            res.status(400).json({
                ok: false,
                mensaje: 'El nombre es requerido'
            });
        } else {
            res.json({
                documentoPersona: documento
            }); //formato json
        }
  */
});


app.put('/usuario/:id', [verificarToken, verificarADMIN_ROLE], function(req, res) {

    let idPersona = req.params.id;

    //filtra valores que se pueden actualizar
    let newBody = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(idPersona, newBody, { new: true, runValidators: true }, (error, usuarioDB) => {

        if (error) {
            return res.status(400).json({
                ok: false,
                error
            });
        }



        res.json({
            ok: true,
            usuario: usuarioDB
                //codigoPersona: idPersona

        }); //formato json   
    });


});

app.delete('/usuario/:id', [verificarToken, verificarADMIN_ROLE], function(req, res) {
    // res.send('HOLA OSTI'); //formato html
    // res.json('delete usuario katriel'); //formato json

    let idUsuario = req.params.id;
    let cambiaEstado = {
        estado: false
    }


    // Usuario.findByIdAndRemove(idUsuario, (error, usuarioBorrado) => {
    Usuario.findByIdAndUpdate(idUsuario, cambiaEstado, { new: true }, (error, usuarioBorrado) => {

        if (error) {
            return res.status(400).json({
                ok: false,
                error
            });
        }
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'usuario no encontrado'
                }
            });
        }
        res.json({

            ok: true,
            usuario: usuarioBorrado

        });


    });



});


module.exports = app;