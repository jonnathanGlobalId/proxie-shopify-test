exports.getQuery = (req, res, next) => {
  console.log('Buscando la informacion', req.query);
  res.json({
    mensaje: 'Revisando los querys que nos da shopify',
    data: req.query
  });
};