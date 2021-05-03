let authInformation = {
  token: '',
  shop: '',
}


exports.sendAuthInfo = (req, res, next) => {
  const dataUser = req.body;
  authInformation = dataUser;
  console.log(dataUser);

  res.json({
    mensaje: 'Se ha guardado el usuario exitosamente',
    data: dataUser,
  });
};

exports.getauthInfo = (req, res, next) => {
  res.json({
    mensaje: 'Datos de autenticación del usuario',
    data: authInformation,
  });
}