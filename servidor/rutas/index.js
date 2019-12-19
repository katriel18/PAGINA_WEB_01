const express = require('express');
const app = express();

app.use(require('./usuario')); //referenciamos el archivo usuario.js
app.use(require('./login')); //referenciamos el archivo login.js



module.exports = app;