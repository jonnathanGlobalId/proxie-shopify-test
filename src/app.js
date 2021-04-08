const express = require('express');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

app.get('/', (req, res) => {
  res.json({
    mensaje: 'La base de la api'
  });
});

app.listen(process.env.PUERTO, () => {
  console.log('servidor listo en el puerto', process.env.PUERTO);
})