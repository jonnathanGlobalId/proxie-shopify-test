const { expression } = require('joi');
const Order = require('../models/OrderModel');

exports.createOrder = async (req, res) => {
  const dataOrder = req.body;
  try {
    //Verificar que la orden no exista
    const orderExist = await Order.findOne({idOrder: dataOrder.idOrder})
    if (orderExist) {
      res.json({mensaje: 'La orden ya existe'})
      return
    }
    
    //Crear la orden
    await Order(dataOrder).save()
    res.json({
      mensaje: 'Vamos a crear una nueva orden'
    });
  } catch (error) {
    console.log(error);
  }
}

exports.getAllOrders = async (req, res) => {
  const idOwner = req.params;
  try {
    const orders = await Order.find({shopId: idOwner.id});
    res.json({
      mensaje: 'Obteniendo las ordenes',
      data: orders
    });
  } catch (error) {
    console.log(error);
  }
}

exports.acceptOrder = async (req, res) => {
  const orderId = req.body;
  try {
    const orderExist = await Order.findOne({idOrder: orderId.idOrder});
    if (!orderExist | orderExist.shopId.toString() !== orderId.shopId.toString()) {
      res.json({mensaje: 'La orden no existe o no tienes permiso para modificar la orden'})
      return
    }
    await Order.findOneAndUpdate({idOrder: orderId.idOrder}, {status: 'APRROVE'}, {new: true})
    res.json({
      mensaje: 'La orden ha sido aprobada con exito'
    });

  } catch (error) {
    console.log(error);
  }
}

exports.rejectOrder = async (req, res) => {
  const orderId = req.body;
  try {
    const orderExist = await Order.findOne({idOrder: orderId.idOrder});
    if (!orderExist | orderExist.shopId.toString() !== orderId.shopId.toString()) {
      res.json({mensaje: 'La orden no existe'})
      return
    }
    await Order.findOneAndUpdate({idOrder: orderId.idOrder}, {status: 'REJECT'}, {new: true})
    res.json({
      mensaje: 'La orden ha sido rechazada con exito'
    });

  } catch (error) {
    console.log(error);
  }
}