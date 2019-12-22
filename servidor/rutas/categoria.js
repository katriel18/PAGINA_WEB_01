const express = require('express');
let { verificarToken, verificarADMIN_ROLE } = require('../middlewares/autenticacion');
let app = express();

let Categoria = require('../modelos/categoria');

//mostrar datos de la categoria
app.get('/categoria', verificarToken, (req, res) => {

    Categoria.find({})
        .sort('descripcion') //ordenar la lista
        .populate('usuario', 'nombre email') //convierte el objeto usuario
        .exec((error, categorias) => {
            if (error) {
                return res.status(500).json({
                    ok: false,
                    error
                });
            }

            res.json({
                ok: true,
                categorias
            });

        })

});
//mostrar una categoria po ID
app.get('/categoria/:id', (req, res) => {

    let id = req.params.id;

    Categoria.findById(id, (error, categoriaDB) => {

        if (error) {
            return res.status(500).json({
                ok: false,
                error
            });
        }
        if (!categoriaDB) {
            return res.status(500).json({
                ok: false,
                error: {
                    message: 'ID No Encontrado !'
                }
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    })





});

//nueva una categoria po ID
app.post('/categoria', verificarToken, (req, res) => {

    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id

    });
    categoria.save((error, categoriaDB) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                error
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                error
            });
        }

        res.json({
            ok: true,
            Categoria: categoriaDB
        });




    });

});
//actualizar una categoria po ID
app.put('/categoria/:id', verificarToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;
    let nuevaDescripcionCategoria = {
        descripcion: body.descripcion
    }
    Categoria.findByIdAndUpdate(id, nuevaDescripcionCategoria, { new: true, runValidators: true }, (error, categoriaDB) => {

        if (error) {
            return res.status(500).json({
                ok: false,
                error
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                error
            });
        }

        res.json({
            ok: true,
            Categoria: categoriaDB
        });

    });


});

//mostrar una categoria po ID
app.delete('/categoria/:id', [verificarToken, verificarADMIN_ROLE], (req, res) => {

    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (error, categoriaDB) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                error
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'id no existe'
                }
            });
        }

        res.json({
            ok: true,
            message: 'Categoria Borrada!'
        });


    });



});


module.exports = app;