const express = require('express');
const { verificarToken } = require('../middlewares/autenticacion');

let app = express();
let Producto = require('../modelos/producto');

//listar productos
app.get('/producto', verificarToken, (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);
    Producto.find({ disponible: true })
        .skip(desde)
        .limit(10)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((error, productos) => {
            if (error) {
                return res.status(500).json({
                    ok: false,
                    error
                });
            }

            res.json({
                ok: true,
                productos
            });
        });

});

//obtener un producto por ID
app.get('/producto/:id', verificarToken, (req, res) => {


    let id = req.params.id;
    Producto.findById(id)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec(
            (error, ProductoDB) => {

                if (error) {
                    return res.status(500).json({
                        ok: false,
                        error
                    });
                }

                if (!ProductoDB) {
                    return res.status(400).json({
                        ok: false,
                        error: {
                            message: 'ID no existe'
                        }
                    });
                }


                res.json({
                    ok: true,
                    producto: ProductoDB
                });



            });
});


//buscar productos

app.get('/producto/buscar/:termino', verificarToken, (req, res) => {

    let termino = req.params.termino;
    let regex = new RegExp(termino, 'i') //expresiones regulares para busqueda personalizada
    Producto.find({ nombre: regex })
        .populate('categoria', 'descripcion')
        .exec((error, productos) => {
            if (error) {
                return res.status(500).json({
                    ok: false,
                    error
                });
            }

            res.json({
                ok: true,
                productos
            });


        });

});



//crear un producto por ID
app.post('/producto', verificarToken, (req, res) => {


    let body = req.body;
    let producto = new Producto({
        usuario: req.usuario._id,
        nombre: body.nombre,
        precioUni: body.precioUnitario,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria

    });
    producto.save((error, productoBD) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                error
            });
        }

        res.status(201).json({
            ok: true,
            producto: productoBD
        });

    });

});








//actualizar un producto por ID
app.put('/producto/:id', verificarToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    Producto.findById(id, (error, productoBD) => {

        if (error) {
            return res.status(500).json({
                ok: false,
                error
            });
        }

        if (!productoBD) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'El ID no existe!'
                }
            });
        }
        productoBD.nombre = body.nombre;
        productoBD.precioUni = body.precioUnitario;
        productoBD.categoria = body.categoria;
        productoBD.disponible = body.disponible;
        productoBD.descripcion = body.descripcion;


        productoBD.save((error, productoGuardado) => {

            if (error) {
                return res.status(500).json({
                    ok: false,
                    error
                });
            }

            res.status(500).json({
                ok: ok,
                producto: productoGuardado
            });

        });




    });

});


//eliminar un producto por ID
app.delete('/producto/:id', verificarToken, (req, res) => {


    let id = req.params.id;
    Producto.findById(id, (error, productoBD) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                error
            });
        }

        if (!productoBD) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'El ID no existe!'
                }
            });
        }

        productoBD.disponible = false;

        productoBD.save((error, productoBorrado) => {

            if (error) {
                return res.status(500).json({
                    ok: false,
                    error
                });
            }

            res.status(500).json({
                ok: true,
                producto: productoBorrado,
                mensaje: 'Producto Borrado'
            });

        });



    });

});





module.exports = app;