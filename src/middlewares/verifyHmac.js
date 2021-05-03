exports.checkHmac = (req, res, next) => {
  const hmac = req.body;

  res.json({
    mensaje: 'Evaluando el codigo del hmac',
    hmac,
  });
}