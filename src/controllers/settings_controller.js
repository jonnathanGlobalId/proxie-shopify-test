
let user_settings = {
  limit_ammount: 100,
  settings: {
    address: true,
    ammount: true,
  }
};

exports.getSettings = (req, res, next) => {

  res.json({
    mensaje: 'Obteniendo la información del usuario',
    data: user_settings,
  });
}

exports.changeSettings = (req, res) => {
  const newSettings = req.body;
  user_settings = newSettings;
  console.log(req.body);
  res.json({
    mensaje: 'Cambiando la información del usuario',
    data: newSettings,
  });
}