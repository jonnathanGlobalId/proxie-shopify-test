exports.getQuery = (req, res, next) => {
  res.json({
    mensaje: 'Revisando la información de acceso',
    data: req.query,
  });
};