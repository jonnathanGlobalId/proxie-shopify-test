const {model, Schema} = require('mongoose');

const CustomerSchema = Schema({
  customer_id: {
    type: String,
    trim: true,
    required: true,
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  date_of_birth: {
    type: Date,
    trim: true,
    default: Date.now
  },
  verification_status: {
    type: String,
    trim: true,
    default: 'Onfido'
  },
  issue_date: {
    type: Date,
    default: Date.now
  },
  expiration_date: {
    type: Date,
    default: Date.now,
  },
});

const Order = new Schema({
  order_id: {
    type: String,
    required: true,
    trim: true
  },
  customer: {
    type: CustomerSchema,
    required: true
  },
  owner_id: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    trim: true,
    enum: ['PENDING', 'APRROVE', 'REJECT'],
    default: 'PENDING'
  }
});

module.exports = model('Order', Order);