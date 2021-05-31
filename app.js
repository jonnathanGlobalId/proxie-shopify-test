const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const fs = require('fs');
dotenv.config();

//Habilitando el cors
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}))

//Conectar con la base de datos
require('./src/db');

//Rutas de las aplicaciones
const apiRouter = require('./src/routes/apiRoute');

//Rutas para la aplicación en heroku
app.use('/api', apiRouter);

//utilizar Paginas estaticas
app.use(express.static('static'));

app.get('/', (req, res) => {
  console.log(req.query);
  res.set('Content-Type', 'text/html')
  .sendFile(__dirname + '/static');
});

app.get('/script', (req, res) => {
  // fs.readFile(__dirname + '/public/script-tag.js');
  res.set('Content-Type', 'text/script').sendFile(__dirname + '/public/script-tag.js')
});

app.get('')


app.listen(process.env.PORT, () => {
  console.log('servidor listo en el PORT', process.env.PORT);
});
