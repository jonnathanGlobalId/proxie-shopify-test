const express = require('express');
const dotenv = require('dotenv');
const app = express();
const path = require('path');
dotenv.config();

const proxyRoute = require('./routes/proxyRoutes');

//utilizar Paginas estaticas
app.use(express.static('public'));

//Rutas para la aplicación en heroku
app.use('/', proxyRoute);

app.listen(process.env.PORT, () => {
  console.log('servidor listo en el PORT', process.env.PORT);
})