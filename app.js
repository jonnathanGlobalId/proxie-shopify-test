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
  // res.set('Content-Type', 'text/html')
  // .sendFile(__dirname + '/static');
  const ATTESTATION_PAGE_HTML = fs.readFileSync(__dirname + '/static/index.html', 'utf-8');
  res.send(ATTESTATION_PAGE_HTML);
});

app.get('/script', (req, res) => {
  // res.set('Content-Type', 'text/script').sendFile(__dirname + '/public/script-tag.js')
  console.log('recibiendo informacion del script');
  try {
    const data = fs.readFileSync(__dirname + '/public/script-tag.js', 'utf-8');
    res.set('Content-Type', 'text/script').send(data)
  } catch (error) {
    console.log(error);
  }
});

app.get('')

app.listen(process.env.PORT, () => {
  console.log('servidor listo en el PORT', process.env.PORT);
});
