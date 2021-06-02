const {model, Schema} = require('mongoose');

const OwnerSchema = Schema({
  owner_id: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  shop: {
    type: String,
    required: true,
    trim: true,
  },
  order_amount_limit: {
    type: Number,
    default: 0
  },
  order_amount_limit_enabled: {
    type: Boolean,
    default: false,
  },
  different_address_enabled: {
    type: Boolean,
    default: false,
  },
});

module.exports = model('Owner', OwnerSchema);