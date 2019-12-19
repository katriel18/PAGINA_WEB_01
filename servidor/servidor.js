require('./config/config');

const mongoose = require('mongoose');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(require('./rutas/usuario'));

//conexion con la base de datos y el puerto
mongoose.connect(process.env.URLDB, (err, res) => {
    if (err) throw err;

    console.log('BASE DE DATOS ONLINE');
});

//puerto de mi laptop por donde escucha peticiones ala pagina web
app.listen(process.env.PORT, () => {
    console.log('puerto:', 3000);
});