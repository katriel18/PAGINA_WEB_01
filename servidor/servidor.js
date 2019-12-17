require('./config/config');


const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



app.get('/', function(req, res) {
    // res.send('HOLA OSTI'); //formato html
    res.json('HOLA KATRIEL'); //formato json
});

app.get('/usuario', function(req, res) {
    // res.send('HOLA OSTI'); //formato html
    res.json('get usuario katriel'); //formato json
});

app.post('/usuario', function(req, res) {
    let documento = req.body;

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





});

app.put('/usuario/:id', function(req, res) {
    let idPersona = req.params.id;
    res.json({
        codigoPersona: idPersona

    }); //formato json
});

app.delete('/usuario', function(req, res) {
    // res.send('HOLA OSTI'); //formato html
    res.json('delete usuario katriel'); //formato json
});

app.listen(process.env.PORT, () => {
    console.log('puerto:', 3000);
});