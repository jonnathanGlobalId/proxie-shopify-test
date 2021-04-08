const express = require('express');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

app.get('/', (req, res) => {
  res.send('Listo en el servidor');
});

app.listen(process.env.PORT, () => {
  console.log('servidor listo en el PORT', process.env.PORT);
})