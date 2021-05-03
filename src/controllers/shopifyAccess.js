exports.getQuery = (req, res, next) => {
  console.log('Buscando la informacion', req);
  res.json({
    mensaje: 'Revisando los querys que nos da shopify',
  });
};