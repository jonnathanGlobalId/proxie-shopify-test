const express = require('express');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

app.get('/', (req, res) => {
  res.json({
    mensaje: 'Listo en el ersvidor de shopify',
  })
});

app.listen(process.env.PORT, () => {
  console.log('servidor listo en el PORT', process.env.PORT);
})