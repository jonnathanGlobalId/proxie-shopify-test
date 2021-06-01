const Owner = require('../models/UserModel');
const Settings = require('../models/SettingsModel');

exports.createOwner = async (req, res) => {
  const ownerSettings = req.body;
  try {
    const ownerExisted = await Owner.findOne({shopId: ownerSettings.shopId});
    if (ownerExisted) {
      res.json({mensaje: 'El usuario ya existe'});
      return
    }
    const newOwner = await Owner(ownerSettings).save();
    await Settings({idShop: newOwner.shopId}).save();
    res.json({
      mensaje: `El usuario ${newOwner.shopifyDomain} ha sido creado`
    });
  } catch (error) {
    console.log(error);
  }
}

exports.getSettingsOwner = async (req, res) => {
  const settings = req.params;
  try {
    const {maxAmmount, ammountCheck, addressCheck} = await Settings.findOne({idShop: settings.id});
    const settingsData = {
      maxAmmount,
      ammountCheck,
      addressCheck,
    }
    if (!settingsData) {
      res.json({mensaje: 'No se encontro la tienda'})
      return
    }
    res.json({
      mensaje: 'Obteniendo la informacion de configuraciones',
      data: settingsData,
    })
  } catch (error) {
    console.log(error);
  }
}

exports.changeSettings = async (req, res) => {
  const newSettings = req.body;
  try {
    const settings = await Settings.findOne({idShop: newSettings.idShop});
    if (!settings) {
      res.json({mensaje: 'No se encontro la tienda'})
      return
    }
    await Settings.findOneAndUpdate({idShop: newSettings.idShop}, newSettings, {new: true})
    res.json({
      mensaje: 'Las configuraciones del usuario han cambiado',
    });
  } catch (error) {
    console.log(error);
  }
}