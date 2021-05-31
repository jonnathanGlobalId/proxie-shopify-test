const {model, Schema} = require('mongoose');

const OwnerSchema = Schema({
  shopId: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  shopifyDomain: {
    type: String,
    required: true,
    trim: true,
  }
});

module.exports = model('Owner', OwnerSchema);