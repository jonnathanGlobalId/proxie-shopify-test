const { object } = require('joi');
const {model, Schema} = require('mongoose');

const Order = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  idOrder: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  birthday: {
    type: Date,
    trim: true,
    default: Date.now
  },
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: 'Owner'
  },
  status: {
    type: String,
    trim: true,
    enum: ['PENDDING', 'APRROVE', 'REJECT'],
    default: 'PENDDING'
  },
  issueDate: {
    type: Date,
    default: Date.now
  },
  expirationDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = model('Order', Order);