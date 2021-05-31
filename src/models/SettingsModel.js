const { Schema, model } = require('mongoose')

const SettingsSchema = Schema({
  maxAmmount: {
    type: Number,
    default: 0
  },
  ammountCheck: {
    type: Boolean,
    default: false,
  },
  addressCheck: {
    type: Boolean,
    default: false,
  },
  idShop: {
    type: Schema.Types.ObjectId,
    require: true,
  }
});

module.exports = model('Settings', SettingsSchema);