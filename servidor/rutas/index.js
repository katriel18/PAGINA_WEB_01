const express = require('express');
const app = express();

app.use(require('./usuario')); //referenciamos el archivo usuario.js
app.use(require('./login')); //referenciamos el archivo login.js

app.use(require('./categoria')); //referenciamos el archivo categoria.js
app.use(require('./producto')); //referenciamos el archivo categoria.js


module.exports = app;