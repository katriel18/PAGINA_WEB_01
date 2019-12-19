//ARCHIVO PRINCIPAL
require('./config/config');

const mongoose = require('mongoose');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    //parse application/json
app.use(bodyParser.json())

//configuracion global de erutas
app.use(require('./rutas/index'));


//conexion con la base de datos y el puerto
mongoose.connect(process.env.URLDB, (err, res) => {
    if (err) throw err;

    console.log('BASE DE DATOS ONLINE Y LOCAL HOST');
});


//puerto de mi laptop por donde escucha peticiones ala pagina web
app.listen(process.env.PORT, () => {
    console.log('puerto:', process.env.PORT);
});